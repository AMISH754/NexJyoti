import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { ID_KINDS, MAX_PHOTO, MAX_RESUME, fetchJoining, formatDate, sendJoining, shrinkPhoto } from "../utils/careers";
import { Field } from "./Careers";
import "../styles/register.css";
import "../styles/careers.css";

const DOC_TYPES = "application/pdf,image/jpeg,image/png,image/webp";
// UIDAI's own videos (the "Aadhaar UIDAI" YouTube channel): a masked Aadhaar from the website, and from the Aadhaar app.
const AADHAAR_VIDEO = "https://www.youtube.com/watch?v=rSCp1FUtGXI";
const AADHAAR_APP_VIDEO = "https://www.youtube.com/shorts/jNaqPc8-eeA";
const BLOOD = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

/* nexjyoti.org/careers/joining/<token>: after accepting an offer, the new hire sends their joining documents to the
 * NexJyoti Hub. Everyone: the Gmail for the Hub, date of birth, address, an emergency contact, a photo and a photo ID.
 * Paid roles: masked Aadhaar, PAN and the bank account for their pay. The token in the link is the only key, so the
 * page is kept out of search engines; the files go to the Hub's private storage. */
export default function CareerJoining() {
  const { token } = useParams();
  const [joining, setJoining] = useState(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) { setError("This link has no joining documents in it."); return undefined; }
    let alive = true;
    fetchJoining(token).then((j) => alive && setJoining(j)).catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, [token]);

  const expired = joining && joining.status === "requested" && joining.expires_on < new Date().toISOString().slice(0, 10);
  const closed = joining && ["verified", "added"].includes(joining.status);

  return (
    <>
      <SEOHead path="/careers/joining" />
      <div className="register-page careers-page">
        <div className="register-container careers-container">
          <h1 className="offer-title">{joining?.title ? `Joining documents: ${joining.title}` : "Your joining documents"}</h1>
          {error ? (
            <div className="careers-empty">
              <h2 className="reg-section-title">We couldn’t open this page</h2>
              <p>{error}</p>
              <p>Please check the link in your email, or write to <a href="mailto:info@nexjyoti.org">info@nexjyoti.org</a>.</p>
            </div>
          ) : !joining ? (
            <div className="careers-loading" aria-live="polite"><span className="reg-spinner careers-spinner" /> Opening…</div>
          ) : done ? (
            <div className="reg-success animate-reg-in" aria-live="polite">
              <div className="reg-success-icon-wrap"><span className="reg-success-check">✓</span></div>
              <h2>Thank you, {joining.name.split(/\s+/)[0]}!</h2>
              <p>Your joining documents have reached our HR team. We’ll check them and then email you how to sign in to the <strong>NexJyoti Hub</strong>, our team app.</p>
              <div className="reg-success-org">— NexJyoti Education Foundation</div>
            </div>
          ) : closed ? (
            <div className="offer-banner ok">✓ We have checked your documents. Welcome to NexJyoti! To change anything, write to <a href="mailto:info@nexjyoti.org">info@nexjyoti.org</a>.</div>
          ) : expired ? (
            <div className="offer-banner warn">This link expired on {formatDate(joining.expires_on)}. Please write to <a href="mailto:info@nexjyoti.org">info@nexjyoti.org</a> for a new one.</div>
          ) : (
            <JoiningForm token={token} joining={joining} onDone={() => setDone(true)} />
          )}
          <p className="reg-landing-note"><Link to="/careers">NexJyoti careers</Link></p>
        </div>
      </div>
    </>
  );
}

function FilePick({ label, hint, required, error, file, accept, onPick, picture }) {
  const url = useMemo(() => (file && picture && file.type.startsWith("image/") ? URL.createObjectURL(file) : null), [file, picture]);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  return (
    <Field label={label} required={required} error={error} hint={hint}>
      <label className={`careers-file${file ? " has" : ""}`}>
        <input type="file" accept={accept} onChange={onPick} />
        {url ? <span className="careers-photo"><img src={url} alt="" /> Change</span> : <span>{file ? `📄 ${file.name}` : "Choose file"}</span>}
      </label>
    </Field>
  );
}

function JoiningForm({ token, joining, onDone }) {
  const paid = joining.kit === "paid";
  const again = !!joining.submitted_on;
  const [f, setF] = useState({
    gmail: joining.gmail_hint || "", date_of_birth: "", blood_group: "", address: "", emergency_name: "", emergency_phone: "",
    id_kind: paid ? "aadhaar" : "aadhaar", id_last4: "", pan: "", account_holder: joining.name || "", account_number: "", account_number_again: "", ifsc: "", bank_name: "",
  });
  const [files, setFiles] = useState({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const set = (k) => (e) => { setF((x) => ({ ...x, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: "" })); };

  const pick = (kind) => async (e) => {
    const file = e.target.files?.[0] || null;
    e.target.value = "";
    if (!file) return;
    const isPhoto = kind === "photo";
    if (isPhoto ? !/^image\/(jpeg|png|webp)$/.test(file.type) : !/^(application\/pdf|image\/(jpeg|png|webp))$/.test(file.type)) {
      setErrors((x) => ({ ...x, [kind]: isPhoto ? "Please choose a JPG, PNG or WebP photo." : "Please choose a PDF or a photo (JPG, PNG or WebP)." }));
      return;
    }
    const small = await shrinkPhoto(file, isPhoto ? 900 : 1600);
    if (small.size > (isPhoto ? MAX_PHOTO : MAX_RESUME)) { setErrors((x) => ({ ...x, [kind]: `This file is too big (${isPhoto ? "1" : "2"} MB at most).` })); return; }
    setFiles((x) => ({ ...x, [kind]: small }));
    setErrors((x) => ({ ...x, [kind]: "" }));
  };

  const check = () => {
    const e = {};
    const v = (k) => f[k].trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("gmail"))) e.gmail = "Please enter the Gmail you’ll sign in with.";
    if (!v("date_of_birth")) e.date_of_birth = "Please enter your date of birth.";
    if (v("address").length < 8) e.address = "Please enter your full address.";
    if (!v("emergency_name") || !/^[+\d][\d\s-]{6,}$/.test(v("emergency_phone"))) e.emergency = "Please give someone we can call in an emergency, and their phone number.";
    if (!/^[A-Za-z0-9]{4}$/.test(v("id_last4").replace(/\s/g, ""))) e.id_last4 = "Please enter the last 4 characters of the ID number.";
    if (!files.photo && !again) e.photo = "Please add a photo of yourself.";
    if (!files.id && !again) e.id = "Please add your ID.";
    if (paid) {
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v("pan").replace(/\s/g, "").toUpperCase())) e.pan = "Please check your PAN: like ABCDE1234F.";
      if (!files.pan && !again) e.pan_file = "Please add your PAN card.";
      if (!v("account_holder")) e.account_holder = "Please enter the name on the account.";
      if (!/^\d{9,18}$/.test(v("account_number").replace(/\s/g, ""))) e.account_number = "Please check the account number.";
      else if (v("account_number").replace(/\s/g, "") !== v("account_number_again").replace(/\s/g, "")) e.account_number_again = "The two account numbers don’t match.";
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v("ifsc").replace(/\s/g, "").toUpperCase())) e.ifsc = "Please check the IFSC: 11 characters, like SBIN0001234.";
      if (!files.bank && !again) e.bank = "Please add a passbook page or cancelled cheque.";
    }
    if (!consent) e.consent = "Please agree so we can keep your documents.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    setSubmitError("");
    if (!check()) return;
    const form = new FormData();
    form.append("action", "joining");
    form.append("token", token);
    for (const [k, v] of Object.entries(f)) form.append(k, v.trim());
    if (paid) form.set("id_kind", "aadhaar");
    for (const [k, file] of Object.entries(files)) form.append(k, file, file.name || `${k}.jpg`);
    setBusy(true);
    try { await sendJoining(form); onDone(); } catch (e) { setSubmitError(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="register-form-card careers-form animate-reg-in">
      <div className="reg-section-header">
        <span className="reg-section-label">Welcome to NexJyoti</span>
        <h2 className="reg-section-title">Hi {joining.name.split(/\s+/)[0]}, please send your joining documents</h2>
        <p className="reg-section-desc">
          For <strong>{joining.title}</strong>{joining.start_on ? `, starting ${formatDate(joining.start_on)}` : ""}. Please send them by {formatDate(joining.expires_on)}.
          Only our HR and Leadership can see what you send.
        </p>
      </div>
      {joining.review_note && <div className="offer-banner warn">Please fix this and send again: {joining.review_note}</div>}
      {again && !joining.review_note && <div className="offer-banner">You sent your documents on {formatDate(joining.submitted_on)}. Send again only to change something; files you don’t choose again stay as they are.</div>}

      <h3 className="careers-subhead">About you</h3>
      <div className="careers-grid">
        <Field label="Gmail for the NexJyoti Hub" required error={errors.gmail} hint="You’ll sign in to our team app with this Google account.">
          <input className="reg-input" type="email" value={f.gmail} onChange={set("gmail")} autoComplete="email" maxLength={200} placeholder="you@gmail.com" />
        </Field>
        <Field label="Date of birth" required error={errors.date_of_birth}><input className="reg-input" type="date" value={f.date_of_birth} onChange={set("date_of_birth")} autoComplete="bday" /></Field>
        <Field label="Blood group">
          <select className="reg-input" value={f.blood_group} onChange={set("blood_group")}>{BLOOD.map((b) => <option key={b} value={b}>{b || "Choose (optional)"}</option>)}</select>
        </Field>
        <FilePick label="Your photo" required={!again} error={errors.photo} hint="A clear recent photo of your face, for your NexJyoti ID card." file={files.photo} accept="image/jpeg,image/png,image/webp" onPick={pick("photo")} picture />
      </div>
      <Field label="Address" required error={errors.address}><textarea className="reg-input reg-textarea" rows={2} value={f.address} onChange={set("address")} autoComplete="street-address" maxLength={500} /></Field>
      <div className="careers-grid">
        <Field label="Emergency contact: name" required error={errors.emergency}><input className="reg-input" value={f.emergency_name} onChange={set("emergency_name")} maxLength={120} placeholder="e.g. Sanjay Kujur (father)" /></Field>
        <Field label="Emergency contact: phone" required><input className="reg-input" type="tel" value={f.emergency_phone} onChange={set("emergency_phone")} maxLength={30} placeholder="+91" /></Field>
      </div>

      <h3 className="careers-subhead">Your ID</h3>
      {paid ? (
        <p className="reg-hint">Please send your <strong>masked Aadhaar</strong>: download it from <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noreferrer noopener">myaadhaar.uidai.gov.in</a> (choose “masked Aadhaar”), so only the last 4 digits show. We never keep your full Aadhaar number.
          {" "}UIDAI’s own videos show how: <a href={AADHAAR_VIDEO} target="_blank" rel="noreferrer noopener">on the website</a> or <a href={AADHAAR_APP_VIDEO} target="_blank" rel="noreferrer noopener">in the Aadhaar app</a>.</p>
      ) : (
        <Field label="Which ID are you sending?" required hint={f.id_kind === "aadhaar" ? <>Please send the masked Aadhaar, so only the last 4 digits show. <a href={AADHAAR_VIDEO} target="_blank" rel="noreferrer noopener">UIDAI’s video shows how</a>.</> : null}>
          <select className="reg-input" value={f.id_kind} onChange={set("id_kind")}>{Object.entries(ID_KINDS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        </Field>
      )}
      <div className="careers-grid">
        <Field label="Last 4 characters of the ID number" required error={errors.id_last4}><input className="reg-input" value={f.id_last4} onChange={set("id_last4")} maxLength={4} inputMode={paid || f.id_kind === "aadhaar" ? "numeric" : "text"} /></Field>
        <FilePick label={paid ? "Masked Aadhaar" : "The ID"} required={!again} error={errors.id} hint="A PDF, or a clear photo of the front." file={files.id} accept={DOC_TYPES} onPick={pick("id")} />
      </div>

      {paid && (
        <>
          <h3 className="careers-subhead">PAN and bank account for your pay</h3>
          <div className="careers-grid">
            <Field label="PAN" required error={errors.pan}><input className="reg-input" value={f.pan} onChange={set("pan")} maxLength={12} placeholder="ABCDE1234F" style={{ textTransform: "uppercase" }} /></Field>
            <FilePick label="PAN card" required={!again} error={errors.pan_file} hint="A PDF, or a clear photo." file={files.pan} accept={DOC_TYPES} onPick={pick("pan")} />
            <Field label="Name on the account" required error={errors.account_holder}><input className="reg-input" value={f.account_holder} onChange={set("account_holder")} maxLength={120} /></Field>
            <Field label="Bank and branch"><input className="reg-input" value={f.bank_name} onChange={set("bank_name")} maxLength={120} placeholder="e.g. SBI, Ratu Road" /></Field>
            <Field label="Account number" required error={errors.account_number}><input className="reg-input" value={f.account_number} onChange={set("account_number")} inputMode="numeric" maxLength={22} autoComplete="off" /></Field>
            <Field label="Account number again" required error={errors.account_number_again}><input className="reg-input" value={f.account_number_again} onChange={set("account_number_again")} inputMode="numeric" maxLength={22} autoComplete="off" onPaste={(e) => e.preventDefault()} /></Field>
            <Field label="IFSC" required error={errors.ifsc}><input className="reg-input" value={f.ifsc} onChange={set("ifsc")} maxLength={11} placeholder="SBIN0001234" style={{ textTransform: "uppercase" }} /></Field>
            <FilePick label="Passbook page or cancelled cheque" required={!again} error={errors.bank} hint="Showing your name, account number and IFSC." file={files.bank} accept={DOC_TYPES} onPick={pick("bank")} />
          </div>
        </>
      )}

      <label className={`careers-consent${errors.consent ? " invalid" : ""}`}>
        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((x) => ({ ...x, consent: "" })); }} />
        <span>
          The details and documents are mine and correct. NexJyoti Education Foundation may keep them privately for my employment{paid ? " and pay" : ""}, as described in the <Link to="/privacy" target="_blank">privacy policy</Link>.
        </span>
      </label>
      {errors.consent && <p className="reg-error" role="alert">{errors.consent}</p>}

      {submitError && <div className="reg-submit-error" role="alert">{submitError}</div>}
      <div className="reg-nav-buttons">
        <button type="button" className="reg-btn-submit reg-btn-submit-blue" onClick={submit} disabled={busy}>
          {busy ? <><span className="reg-spinner" /> Sending…</> : again ? "Send again" : "Send my documents"}
        </button>
      </div>
    </div>
  );
}
