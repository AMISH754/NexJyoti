import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { ENGAGEMENTS, MAX_PHOTO, MAX_RESUME, MODES, fetchOpenings, formatDate, sendApplication, shrinkPhoto } from "../utils/careers";
import "../styles/register.css";
import "../styles/careers.css";

/* nexjyoti.org/careers: the open roles, posted by HR and Leadership in the NexJyoti Hub, and /careers/<role> with the
 * job description and the application form. Applications go straight to the Hub. */
export default function Careers() {
  const { slug } = useParams();
  const [openings, setOpenings] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    fetchOpenings().then((o) => alive && setOpenings(o)).catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, []);

  const opening = slug && openings ? openings.find((o) => o.slug === slug) : null;

  return (
    <>
      <SEOHead path="/careers" />
      <div className="register-page careers-page">
        <div className="register-hero">
          <div className="reg-hero-bg-dots" aria-hidden="true" />
          <div className="register-hero-content">
            <span className="reg-hero-label">Careers</span>
            <h1>{opening ? opening.title : "Work With NexJyoti"}</h1>
            <p>
              {opening
                ? [ENGAGEMENTS[opening.engagement]?.label, opening.team, opening.location, MODES[opening.work_mode]].filter(Boolean).join(" · ")
                : "Join a team bringing quality education to children and young people across Jharkhand. Staff roles and internships, paid and unpaid."}
            </p>
          </div>
        </div>

        <div className="register-container careers-container">
          {error ? (
            <div className="reg-submit-error" role="alert">{error}. Please refresh the page, or write to <a href="mailto:info@nexjyoti.org">info@nexjyoti.org</a>.</div>
          ) : openings === null ? (
            <div className="careers-loading" aria-live="polite"><span className="reg-spinner careers-spinner" /> Loading openings…</div>
          ) : slug ? (
            opening ? <OpeningPage opening={opening} /> : <NotOpen />
          ) : (
            <OpeningList openings={openings} />
          )}
        </div>
      </div>
    </>
  );
}

function OpeningList({ openings }) {
  const [type, setType] = useState("");
  const types = useMemo(() => Object.keys(ENGAGEMENTS).filter((k) => openings.some((o) => o.engagement === k)), [openings]);
  const shown = openings.filter((o) => !type || o.engagement === type);

  if (!openings.length) {
    return (
      <div className="careers-empty">
        <h2 className="reg-section-title">No openings right now</h2>
        <p>We don’t have a role open at the moment. New ones are posted here first, so please check back soon.</p>
        <p>Want to help in the meantime? <Link to="/register">Volunteer with us</Link>.</p>
      </div>
    );
  }
  return (
    <>
      <div className="reg-landing-header">
        <span className="reg-section-label">Open Roles</span>
        <h2 className="reg-section-title" style={{ textAlign: "center", marginTop: "8px" }}>
          {openings.length === 1 ? "1 opening" : `${openings.length} openings`}
        </h2>
      </div>
      {types.length > 1 && (
        <div className="careers-filters" role="group" aria-label="Filter by type">
          <button type="button" className={!type ? "on" : ""} onClick={() => setType("")}>All</button>
          {types.map((k) => <button key={k} type="button" className={type === k ? "on" : ""} onClick={() => setType(k)}>{ENGAGEMENTS[k].label}</button>)}
        </div>
      )}
      <div className="careers-list">
        {shown.map((o) => (
          <Link key={o.id} to={`/careers/${o.slug}`} className="careers-card">
            <div className="careers-card-top">
              <span className={`careers-type ${ENGAGEMENTS[o.engagement]?.paid ? "paid" : "unpaid"}`}>{ENGAGEMENTS[o.engagement]?.label}</span>
              {o.closes_on && <span className="careers-closes">Apply by {formatDate(o.closes_on)}</span>}
            </div>
            <h3>{o.title}</h3>
            <div className="careers-meta">{[o.team, o.location, MODES[o.work_mode], o.duration].filter(Boolean).join(" · ")}</div>
            {o.summary && <p>{o.summary}</p>}
            <div className="careers-card-foot">
              {o.pay ? <span className="careers-pay">{o.pay}</span> : <span />}
              <span className="careers-view">View &amp; apply →</span>
            </div>
          </Link>
        ))}
      </div>
      <p className="reg-landing-note">
        NexJyoti Education Foundation is an equal-opportunity organisation. We welcome applications from everyone, especially from the communities we serve.
      </p>
    </>
  );
}

function NotOpen() {
  return (
    <div className="careers-empty">
      <h2 className="reg-section-title">This role isn’t open</h2>
      <p>It may have closed or been filled.</p>
      <Link to="/careers" className="reg-btn-home">See all openings</Link>
    </div>
  );
}

function OpeningPage({ opening }) {
  const [applying, setApplying] = useState(false);
  return (
    <div className="careers-opening">
      <Link to="/careers" className="careers-back">← All openings</Link>
      <div className="careers-facts">
        <Fact label="Type" value={ENGAGEMENTS[opening.engagement]?.label} />
        {opening.team && <Fact label="Team" value={opening.team} />}
        {opening.location && <Fact label="Location" value={`${opening.location} (${MODES[opening.work_mode]})`} />}
        {opening.pay && <Fact label={opening.engagement.endsWith("intern") ? "Stipend" : "Pay"} value={opening.pay} />}
        {opening.duration && <Fact label="Duration" value={opening.duration} />}
        {opening.positions > 1 && <Fact label="Positions" value={opening.positions} />}
        {opening.closes_on && <Fact label="Apply by" value={formatDate(opening.closes_on)} />}
      </div>
      {opening.summary && <p className="careers-summary">{opening.summary}</p>}
      <div className="careers-jd"><JobText text={opening.description} /></div>
      {applying
        ? <ApplyForm opening={opening} />
        : <button type="button" className="reg-btn-submit reg-btn-submit-blue careers-apply-btn" onClick={() => setApplying(true)}>Apply for this role</button>}
    </div>
  );
}

const Fact = ({ label, value }) => (
  <div className="careers-fact"><span>{label}</span><strong>{value}</strong></div>
);

/* The job description: the Hub's Markdown subset (## headings, - bullets, **bold**, paragraphs), as React elements
 * (never as HTML). */
export function JobText({ text }) {
  const blocks = [];
  let list = null;
  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) { if (!list) { list = []; blocks.push({ list }); } if (bullet[1]) list.push(bullet[1]); continue; }
    list = null;
    if (!line) continue;
    const head = line.match(/^#{1,4}\s+(.*)$/);
    blocks.push(head ? { head: head[1] } : { para: line });
  }
  const inline = (s) => s.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (/^\*\*[^*]+\*\*$/.test(part) ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
  return blocks.map((b, i) => (b.head ? <h3 key={i}>{inline(b.head)}</h3>
    : b.list ? (b.list.length ? <ul key={i}>{b.list.map((x, j) => <li key={j}>{inline(x)}</li>)}</ul> : null)
      : <p key={i}>{inline(b.para)}</p>));
}

const RESUME_TYPES = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function ApplyForm({ opening }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", city: "", qualification: "", experience: "", links: "", note: "", website_hp: "" });
  const [answers, setAnswers] = useState(() => opening.questions.map(() => ""));
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const photoUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : null), [photo]);
  useEffect(() => () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, [photoUrl]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(null);
  const set = (k) => (e) => { setF((x) => ({ ...x, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: "" })); };

  const pickResume = (e) => {
    const file = e.target.files?.[0] || null;
    e.target.value = "";
    if (!file) return;
    if (!/\.(pdf|docx?)$/i.test(file.name)) { setErrors((x) => ({ ...x, resume: "Please choose a PDF or Word file." })); return; }
    if (file.size > MAX_RESUME) { setErrors((x) => ({ ...x, resume: "Your résumé must be 2 MB or smaller." })); return; }
    setResume(file); setErrors((x) => ({ ...x, resume: "" }));
  };
  const pickPhoto = async (e) => {
    const file = e.target.files?.[0] || null;
    e.target.value = "";
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) { setErrors((x) => ({ ...x, photo: "Please choose a JPG, PNG or WebP photo." })); return; }
    const small = await shrinkPhoto(file);
    if (small.size > MAX_PHOTO) { setErrors((x) => ({ ...x, photo: "This photo is too big. Please choose a smaller one." })); return; }
    setPhoto(small); setErrors((x) => ({ ...x, photo: "" }));
  };

  const check = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Please enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
    if (!/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) e.phone = "Please enter a phone number we can call.";
    if (!f.note.trim()) e.note = "Please tell us a little about why you’re applying.";
    if (!resume) e.resume = "Please attach your résumé.";
    if (!consent) e.consent = "Please agree so we can consider your application.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    setSubmitError("");
    if (!check()) return;
    const form = new FormData();
    form.append("opening_id", opening.id);
    for (const [k, v] of Object.entries(f)) form.append(k, v.trim());
    answers.forEach((a, i) => form.append(`answer_${i}`, a.trim()));
    form.append("consent", "true");
    form.append("resume", resume, resume.name);
    if (photo) form.append("photo", photo, photo.name || "photo.jpg");
    setBusy(true);
    try { setDone(await sendApplication(form)); } catch (e) { setSubmitError(e.message); } finally { setBusy(false); }
  };

  if (done) {
    return (
      <div className="reg-success animate-reg-in" aria-live="polite">
        <div className="reg-success-icon-wrap"><span className="reg-success-check">✓</span></div>
        <h2>{done === "in_progress" ? "We already have your application" : "Thank you for applying!"}</h2>
        {done === "in_progress"
          ? <p>Your application for <strong>{opening.title}</strong> is already being reviewed. We’ll write to you about the next steps.</p>
          : <>
            <p>Your application for <strong>{opening.title}</strong> has reached our team{done === "updated" ? " (we updated the one you sent before)" : ""}.</p>
            <p>We’ve emailed you a confirmation at <strong>{f.email.trim()}</strong> and will write to you there about the next steps.</p>
          </>}
        <div className="reg-success-org">— NexJyoti Education Foundation</div>
        <Link to="/careers" className="reg-btn-home">← All openings</Link>
      </div>
    );
  }

  return (
    <div className="register-form-card careers-form animate-reg-in">
      <div className="reg-section-header">
        <span className="reg-section-label">Apply</span>
        <h2 className="reg-section-title">Your application</h2>
        <p className="reg-section-desc">It takes about 5 minutes. Fields marked * are needed.</p>
      </div>
      {/* Hidden from people; bots fill it in. */}
      <input type="text" name="website_hp" value={f.website_hp} onChange={set("website_hp")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="careers-hp" />

      <div className="careers-grid">
        <Field label="Full name" required error={errors.name}><input className="reg-input" value={f.name} onChange={set("name")} autoComplete="name" maxLength={120} /></Field>
        <Field label="Email" required error={errors.email} hint="We’ll write to you here."><input className="reg-input" type="email" value={f.email} onChange={set("email")} autoComplete="email" maxLength={200} /></Field>
        <Field label="Phone" required error={errors.phone}><input className="reg-input" type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" maxLength={30} placeholder="+91" /></Field>
        <Field label="City"><input className="reg-input" value={f.city} onChange={set("city")} autoComplete="address-level2" maxLength={80} /></Field>
        <Field label="Highest qualification"><input className="reg-input" value={f.qualification} onChange={set("qualification")} maxLength={200} placeholder="e.g. B.Ed., Ranchi University" /></Field>
        <Field label="Experience"><input className="reg-input" value={f.experience} onChange={set("experience")} maxLength={200} placeholder="e.g. 2 years teaching, or Fresher" /></Field>
      </div>
      <Field label="Links" hint="LinkedIn, portfolio or work samples (optional)."><input className="reg-input" value={f.links} onChange={set("links")} maxLength={500} /></Field>
      <Field label="Why do you want this role?" required error={errors.note}>
        <textarea className="reg-input reg-textarea" rows={4} value={f.note} onChange={set("note")} maxLength={3000} />
      </Field>
      {opening.questions.map((q, i) => (
        <Field key={i} label={q}>
          <textarea className="reg-input reg-textarea" rows={2} value={answers[i]} maxLength={1500}
            onChange={(e) => setAnswers((a) => a.map((x, j) => (j === i ? e.target.value : x)))} />
        </Field>
      ))}

      <div className="careers-grid">
        <Field label="Résumé / CV" required error={errors.resume} hint="PDF or Word, up to 2 MB.">
          <label className={`careers-file${resume ? " has" : ""}`}>
            <input type="file" accept={RESUME_TYPES} onChange={pickResume} />
            <span>{resume ? `📄 ${resume.name}` : "Choose file"}</span>
          </label>
        </Field>
        <Field label="Photo" error={errors.photo} hint="A clear recent photo of your face (optional).">
          <label className={`careers-file${photo ? " has" : ""}`}>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pickPhoto} />
            {photo ? <span className="careers-photo"><img src={photoUrl} alt="" /> Change photo</span> : <span>Choose photo</span>}
          </label>
        </Field>
      </div>

      <label className={`careers-consent${errors.consent ? " invalid" : ""}`}>
        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((x) => ({ ...x, consent: "" })); }} />
        <span>
          I agree that NexJyoti Education Foundation may use the details and files I send to consider me for this and similar roles, as described in the <Link to="/privacy" target="_blank">privacy policy</Link>. We don’t ask for Aadhaar, PAN or bank details at this stage.
        </span>
      </label>
      {errors.consent && <p className="reg-error" role="alert">{errors.consent}</p>}

      {submitError && <div className="reg-submit-error" role="alert">{submitError}</div>}
      <div className="reg-nav-buttons">
        <button type="button" className="reg-btn-submit reg-btn-submit-blue" onClick={submit} disabled={busy}>
          {busy ? <><span className="reg-spinner" /> Sending…</> : "Send application"}
        </button>
      </div>
    </div>
  );
}

const Field = ({ label, required, hint, error, children }) => (
  <div className={`reg-field ${error ? "reg-field-error" : ""}`}>
    <label className="reg-label">{label}{required && <span className="reg-required"> *</span>}</label>
    {hint && <p className="reg-hint">{hint}</p>}
    {children}
    {error && <p className="reg-error" role="alert">{error}</p>}
  </div>
);
