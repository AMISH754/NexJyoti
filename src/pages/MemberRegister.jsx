import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/register.css";

/* ── Steps ── */
const S = { PERSONAL: 1, PROFILE: 2, ASSOCIATION: 3, CONNECTION: 4, DECLARATION: 5, SUCCESS: 6 };
const PROGRESS = { 1: 14, 2: 36, 3: 56, 4: 74, 5: 90, 6: 100 };

/* ── Options ── */
const STATUS_OPTIONS = [
  "School Student", "College / University Student", "Educator / Teacher",
  "Employed Professional", "Self-employed / Entrepreneur",
  "Competitive Examination Aspirant", "Other",
];
const MEMBER_AREAS = [
  "Academic Programmes & Educational Initiatives", "Mission Udaan",
  "Community Outreach", "Rural Development", "Student Welfare",
  "Volunteer Development", "Events & Campaigns", "Technology & Digital Systems",
  "Communications & Public Engagement", "Fundraising & Partnerships",
  "Administration & Operations", "Organisational Development", "Other",
];
const MEMBER_CONTRIBUTION = [
  "Programme implementation", "Academic / educational initiatives",
  "Professional or technical expertise", "Community engagement",
  "Organisational development", "Partnerships & networking",
  "Fundraising / resource mobilisation", "Events and campaigns",
  "Wherever my skills are most useful",
];
const HEARD_FROM = [
  "Existing NexJyoti Volunteer / Member", "Friend / Family",
  "School / College / University", "NexJyoti Programme / Event",
  "Social Media", "WhatsApp", "Website", "Other",
];
const MEDIA_OPTIONS = [
  "I consent to appropriate use of photographs/videos featuring me.",
  "Please seek my permission before using identifiable photographs/videos of me.",
  "I do not consent.",
];
const DECLARATIONS = [
  { name: "decl1", text: "I confirm that the information provided by me is accurate to the best of my knowledge." },
  { name: "decl2", text: "If accepted, I agree to follow the applicable Code of Conduct, safeguarding requirements and organisational policies of NexJyoti Education Foundation." },
  { name: "decl3", text: "I consent to the information submitted through this form being used by NexJyoti Education Foundation for reviewing my registration, communicating with me, onboarding and related internal administrative purposes." },
  { name: "decl4", text: "I understand that information concerning children, beneficiaries and confidential organisational matters must be handled responsibly, and I agree to maintain appropriate confidentiality." },
  { name: "decl5", text: "I understand that submission of this form expresses my interest in joining NexJyoti Education Foundation and does not by itself constitute confirmation of volunteering, membership, appointment or any organisational position." },
];

const INITIAL = {
  fullName: "", dateOfBirth: "", mobile: "", email: "", location: "",
  professionalStatus: "", qualification: "", institution: "",
  memberMotivation: "", memberAreas: [], memberExpertise: "",
  memberContributionType: [], hasPreviousAssociation: "",
  previousAssociationDesc: "", heardFrom: "", referralName: "",
  decl1: false, decl2: false, decl3: false, decl4: false, decl5: false,
  mediaConsent: "",
};

/* ── Shared UI ── */
const ErrorMsg = ({ msg }) => msg ? <p className="reg-error" role="alert">{msg}</p> : null;

const Field = ({ label, required, hint, error, children }) => (
  <div className={`reg-field ${error ? "reg-field-error" : ""}`}>
    <label className="reg-label">
      {label}{required && <span className="reg-required"> *</span>}
    </label>
    {hint && <p className="reg-hint">{hint}</p>}
    {children}
    <ErrorMsg msg={error} />
  </div>
);

const CheckboxGrid = ({ name, options, selected, onChange }) => (
  <div className="reg-checkbox-grid" role="group">
    {options.map(opt => (
      <label key={opt} className={`reg-checkbox-pill ${selected.includes(opt) ? "checked" : ""}`}>
        <input type="checkbox" checked={selected.includes(opt)} onChange={() => onChange(name, opt)} />
        <span className="reg-pill-checkmark">✓</span>{opt}
      </label>
    ))}
  </div>
);

const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="reg-radio-group" role="radiogroup">
    {options.map(opt => (
      <label key={opt} className={`reg-radio-option ${value === opt ? "selected" : ""}`}>
        <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} />
        <span className="reg-radio-dot" />{opt}
      </label>
    ))}
  </div>
);

const SectionHeader = ({ label, title, desc }) => (
  <div className="reg-section-header">
    <span className="reg-section-label">{label}</span>
    <h2 className="reg-section-title">{title}</h2>
    {desc && <p className="reg-section-desc">{desc}</p>}
  </div>
);

const NavButtons = ({ onBack, onNext, nextLabel = "Continue →", disabled }) => (
  <div className="reg-nav-buttons">
    {onBack && <button type="button" className="reg-btn-back" onClick={onBack}>← Back</button>}
    <button type="button" className="reg-btn-next" onClick={onNext} disabled={disabled}>{nextLabel}</button>
  </div>
);

/* ── STEP 1: Personal ── */
function StepPersonal({ data, errors, onChange, onNext }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-member">Member Registration</div>
      <SectionHeader label="Step 1 of 5 — Personal Information" title="Your Personal Details"
        desc="Please provide your basic information. This helps us understand who you are and how to reach you." />

      <Field label="Full Name" required error={errors.fullName}>
        <input id="mem-fullName" className={`reg-input ${errors.fullName ? "input-error" : ""}`}
          type="text" name="fullName" value={data.fullName} onChange={onChange}
          placeholder="As you'd like it to appear in our organisational records" autoComplete="name" />
      </Field>

      <div className="reg-grid-2">
        <Field label="Date of Birth" required error={errors.dateOfBirth}>
          <input id="mem-dob" className={`reg-input reg-input-date ${errors.dateOfBirth ? "input-error" : ""}`}
            type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={onChange}
            max={new Date().toISOString().split("T")[0]} />
        </Field>
        <Field label="Mobile / WhatsApp Number" required error={errors.mobile}>
          <input id="mem-mobile" className={`reg-input ${errors.mobile ? "input-error" : ""}`}
            type="tel" name="mobile" value={data.mobile} onChange={onChange}
            placeholder="10-digit mobile number" maxLength={10} />
        </Field>
      </div>

      <Field label="Email Address" required error={errors.email}>
        <input id="mem-email" className={`reg-input ${errors.email ? "input-error" : ""}`}
          type="email" name="email" value={data.email} onChange={onChange}
          placeholder="your@email.com" autoComplete="email" />
      </Field>

      <Field label="Current City / District & State" required error={errors.location} hint="Example: Ranchi, Jharkhand">
        <input id="mem-location" className={`reg-input ${errors.location ? "input-error" : ""}`}
          type="text" name="location" value={data.location} onChange={onChange}
          placeholder="e.g. Ranchi, Jharkhand" />
      </Field>

      <div className="reg-grid-2">
        <Field label="Current Professional / Educational Status" required error={errors.professionalStatus}>
          <select id="mem-status" className={`reg-input ${errors.professionalStatus ? "input-error" : ""}`}
            name="professionalStatus" value={data.professionalStatus} onChange={onChange}>
            <option value="">Select your status...</option>
            {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Highest Qualification / Profession" required error={errors.qualification}>
          <input id="mem-qual" className={`reg-input ${errors.qualification ? "input-error" : ""}`}
            type="text" name="qualification" value={data.qualification} onChange={onChange}
            placeholder="Your qualification or profession" />
        </Field>
      </div>

      <Field label="Current Institution / Organisation" error={errors.institution}
        hint="College, university, school, employer or organisation name.">
        <input id="mem-institution" className="reg-input" type="text" name="institution"
          value={data.institution} onChange={onChange} placeholder="Optional" />
      </Field>

      <NavButtons onNext={onNext} nextLabel="Continue →" />
    </div>
  );
}

/* ── STEP 2: Member Profile ── */
function StepProfile({ data, errors, onChange, onCheckboxGroup, onNext, onBack }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-member">Member Registration</div>
      <SectionHeader label="Step 2 of 5 — Membership Profile"
        title="Tell Us About Yourself"
        desc="Help us understand your motivations and how you'd like to contribute as a member." />

      <Field label="Why would you like to become a member of NexJyoti Education Foundation?" required
        error={errors.memberMotivation} hint="Please share your motivation briefly in 2–4 sentences.">
        <textarea id="mem-motivation" className={`reg-input reg-textarea ${errors.memberMotivation ? "input-error" : ""}`}
          name="memberMotivation" value={data.memberMotivation} onChange={onChange}
          placeholder="Share what drives you to become a member..." rows={4} />
      </Field>

      <Field label="In which areas would you be interested in contributing as a member?" required
        error={errors.memberAreas}>
        <CheckboxGrid name="memberAreas" options={MEMBER_AREAS}
          selected={data.memberAreas} onChange={onCheckboxGroup} />
      </Field>

      <Field label="What skills, experience or professional expertise could you contribute?" error={errors.memberExpertise}
        hint="Please mention only what you consider relevant.">
        <textarea id="mem-expertise" className="reg-input reg-textarea" name="memberExpertise"
          value={data.memberExpertise} onChange={onChange}
          placeholder="Optional — describe your relevant skills or expertise..." rows={3} />
      </Field>

      <Field label="How would you primarily like to contribute to the organisation?" required
        error={errors.memberContributionType} hint="Select all that apply.">
        <CheckboxGrid name="memberContributionType" options={MEMBER_CONTRIBUTION}
          selected={data.memberContributionType} onChange={onCheckboxGroup} />
      </Field>

      <Field label="Have you previously been associated with an NGO, non-profit organisation or social initiative?"
        required error={errors.hasPreviousAssociation}>
        <RadioGroup name="hasPreviousAssociation" options={["Yes", "No"]}
          value={data.hasPreviousAssociation} onChange={onChange} />
      </Field>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Continue →" />
    </div>
  );
}

/* ── STEP 3: Previous Association ── */
function StepAssociation({ data, errors, onChange, onNext, onBack }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-member">Member Registration</div>
      <SectionHeader label="Step 3 of 5 — Previous Association"
        title="Your Previous Social-Sector Association"
        desc="This section is optional. Please share what you are comfortable with." />

      <Field label="Please briefly describe your previous association." error={errors.previousAssociationDesc}
        hint="Organisation/initiative, nature of your involvement and approximate duration are sufficient.">
        <textarea id="mem-prevassoc" className="reg-input reg-textarea" name="previousAssociationDesc"
          value={data.previousAssociationDesc} onChange={onChange}
          placeholder="Optional — describe your previous association..." rows={5} />
      </Field>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Continue →" />
    </div>
  );
}

/* ── STEP 4: Connection ── */
function StepConnection({ data, errors, onChange, onNext, onBack }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-member">Member Registration</div>
      <SectionHeader label="Step 4 of 5 — Connection with NexJyoti"
        title="How Did You Find Us?" desc="A brief section to understand how you came to know us." />

      <Field label="How did you hear about us?" required error={errors.heardFrom}>
        <RadioGroup name="heardFrom" options={HEARD_FROM} value={data.heardFrom} onChange={onChange} />
      </Field>

      <Field label="Referral" error={errors.referralName}
        hint="If someone from NexJyoti referred you, please mention their name.">
        <input id="mem-referral" className="reg-input" type="text" name="referralName"
          value={data.referralName} onChange={onChange}
          placeholder="Optional — name of the person who referred you" />
      </Field>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Proceed to Declaration →" />
    </div>
  );
}

/* ── STEP 5: Declaration ── */
function StepDeclaration({ data, errors, onChange, onSubmit, submitting, submitError, onBack }) {
  const hasAnyDeclError = DECLARATIONS.some(d => errors[d.name]);
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-member">Member Registration</div>
      <SectionHeader label="Step 5 of 5 — Declaration & Consent"
        title="Before You Submit"
        desc="Please review and confirm each of the following declarations." />

      <div className="reg-declarations">
        {DECLARATIONS.map(({ name, text }) => (
          <label key={name} className={`reg-decl-item ${data[name] ? "checked" : ""} ${errors[name] ? "decl-error" : ""}`}>
            <input type="checkbox" name={name} checked={data[name]} onChange={onChange} />
            <div className="reg-decl-checkmark">{data[name] ? "✓" : ""}</div>
            <p>{text}</p>
          </label>
        ))}
        {hasAnyDeclError && <p className="reg-error" role="alert">Please confirm all declarations before submitting.</p>}
      </div>

      <Field label="Photography & Media Preference" error={errors.mediaConsent}
        hint="During programmes and events, photographs or videos may be taken for documentation and official communication. Please indicate your preference (optional):">
        <RadioGroup name="mediaConsent" options={MEDIA_OPTIONS} value={data.mediaConsent} onChange={onChange} />
        <p className="reg-hint" style={{ marginTop: "8px" }}>
          A person's choice regarding media consent will not affect their registration.
        </p>
      </Field>

      {submitError && <div className="reg-submit-error" role="alert">{submitError}</div>}

      <div className="reg-nav-buttons">
        <button type="button" className="reg-btn-back" onClick={onBack}>← Back</button>
        <button type="button" id="mem-submit-btn" className="reg-btn-submit reg-btn-submit-gold"
          onClick={onSubmit} disabled={submitting}>
          {submitting ? <><span className="reg-spinner" /> Submitting...</> : "Submit Member Registration"}
        </button>
      </div>
    </div>
  );
}

/* ── Success ── */
function SuccessScreen() {
  return (
    <div className="reg-success animate-reg-in" aria-live="polite">
      <div className="reg-success-icon-wrap reg-success-icon-gold"><span className="reg-success-check">✓</span></div>
      <h2>Thank You for Your Interest!</h2>
      <p>Your membership registration has been received successfully.</p>
      <p>Our team will review your submission and contact you regarding the next step, where applicable.</p>
      <p>We appreciate your willingness to contribute towards creating meaningful educational opportunities.</p>
      <div className="reg-success-org">— NexJyoti Education Foundation</div>
      <Link to="/" className="reg-btn-home" id="mem-home-btn">← Return to Home</Link>
    </div>
  );
}

/* ── MAIN ── */
export default function MemberRegister() {
  const [step, setStep] = useState(S.PERSONAL);
  const [data, setData] = useState({ ...INITIAL });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const handleCheckboxGroup = (name, value) => {
    setData(p => ({
      ...p,
      [name]: p[name].includes(value) ? p[name].filter(v => v !== value) : [...p[name], value],
    }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const go = (s) => { window.scrollTo({ top: 0, behavior: "smooth" }); setStep(s); setErrors({}); setSubmitError(""); };

  const validatePersonal = () => {
    const e = {};
    if (!data.fullName.trim()) e.fullName = "Full name is required.";
    if (!data.dateOfBirth) e.dateOfBirth = "Date of birth is required.";
    if (!data.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(data.mobile.trim())) e.mobile = "Please enter a valid 10-digit Indian mobile number.";
    if (!data.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email address.";
    if (!data.location.trim()) e.location = "Current location is required.";
    if (!data.professionalStatus) e.professionalStatus = "Please select your status.";
    if (!data.qualification.trim()) e.qualification = "This field is required.";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateProfile = () => {
    const e = {};
    if (!data.memberMotivation.trim()) e.memberMotivation = "Please share your motivation.";
    if (!data.memberAreas.length) e.memberAreas = "Please select at least one area.";
    if (!data.memberContributionType.length) e.memberContributionType = "Please select at least one option.";
    if (!data.hasPreviousAssociation) e.hasPreviousAssociation = "Please answer this question.";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateConnection = () => {
    if (!data.heardFrom) { setErrors({ heardFrom: "Please select how you heard about us." }); return false; }
    return true;
  };

  const validateDeclaration = () => {
    const e = {};
    DECLARATIONS.forEach(({ name }) => { if (!data[name]) e[name] = "Required."; });
    setErrors(e); return Object.keys(e).length === 0;
  };

  const next_S1 = () => { if (validatePersonal()) go(S.PROFILE); };
  const next_S2 = () => {
    if (validateProfile())
      go(data.hasPreviousAssociation === "Yes" ? S.ASSOCIATION : S.CONNECTION);
  };
  const next_S3 = () => go(S.CONNECTION);
  const next_S4 = () => { if (validateConnection()) go(S.DECLARATION); };

  const handleSubmit = async () => {
    if (!validateDeclaration()) return;
    setSubmitting(true); setSubmitError("");
    try {
      await addDoc(collection(db, "registrations"), {
        ...data, type: "member", status: "pending", submittedAt: new Date().toISOString(),
      });
      go(S.SUCCESS);
    } catch (err) {
      console.error("Firestore submission error:", err);
      setSubmitError(`Submission failed: ${err?.message || "Please try again or contact us directly."}`);
    } finally {
      setSubmitting(false);
    }
  };

  const backFromS4 = () => go(data.hasPreviousAssociation === "Yes" ? S.ASSOCIATION : S.PROFILE);

  return (
    <>
      <title>Member Registration — NexJyoti Education Foundation</title>
      <div className="register-page">
        <div className="register-hero register-hero-gold">
          <div className="reg-hero-bg-dots" aria-hidden="true" />
          <div className="register-hero-content">
            <span className="reg-hero-label" style={{ color: "var(--gold-light)" }}>Member Pathway</span>
            <h1>Member Registration</h1>
            <p>NexJyoti Education Foundation</p>
            <div className="reg-hero-meta">
              <span>Approx. 4–6 minutes</span><span>·</span><span>Secure &amp; Confidential</span>
            </div>
          </div>
        </div>

        <div className="register-container">
          {step !== S.SUCCESS && (
            <div className="reg-progress-wrap">
              <div className="reg-progress-bar">
                <div className="reg-progress-fill reg-progress-fill-gold" style={{ width: `${PROGRESS[step]}%` }} />
              </div>
              <span className="reg-progress-label">{PROGRESS[step]}% complete</span>
            </div>
          )}

          <div className="register-form-card">
            {step === S.PERSONAL && <StepPersonal data={data} errors={errors} onChange={handleChange} onNext={next_S1} />}
            {step === S.PROFILE && <StepProfile data={data} errors={errors} onChange={handleChange} onCheckboxGroup={handleCheckboxGroup} onNext={next_S2} onBack={() => go(S.PERSONAL)} />}
            {step === S.ASSOCIATION && <StepAssociation data={data} errors={errors} onChange={handleChange} onNext={next_S3} onBack={() => go(S.PROFILE)} />}
            {step === S.CONNECTION && <StepConnection data={data} errors={errors} onChange={handleChange} onNext={next_S4} onBack={backFromS4} />}
            {step === S.DECLARATION && <StepDeclaration data={data} errors={errors} onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} submitError={submitError} onBack={() => go(S.CONNECTION)} />}
            {step === S.SUCCESS && <SuccessScreen />}
          </div>
        </div>
      </div>
    </>
  );
}
