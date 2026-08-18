import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/register.css";

/* ── Steps ── */
const S = { PERSONAL: 1, PROFILE: 2, EXPERIENCE: 3, CONNECTION: 4, DECLARATION: 5, SUCCESS: 6 };

const PROGRESS = { 1: 14, 2: 36, 3: 56, 4: 74, 5: 90, 6: 100 };

/* ── Options ── */
const STATUS_OPTIONS = [
  "School Student", "College / University Student", "Educator / Teacher",
  "Employed Professional", "Self-employed / Entrepreneur",
  "Competitive Examination Aspirant", "Other",
];
const VOLUNTEER_AREAS = [
  "Teaching & Academic Support", "Student Mentoring", "Mission Udaan",
  "Community Outreach", "Rural Development", "Tribal & Underprivileged Student Welfare",
  "Events & Volunteer Coordination", "Social Media & Content", "Graphic Design",
  "Photography / Videography", "IT & Technology", "Research & Documentation",
  "Fundraising & Partnerships", "Administration & Operations", "Other",
];
const VOLUNTEER_MODES = [
  "On-ground / Offline", "Online / Remote", "Both", "Flexible depending on the activity",
];
const VOLUNTEER_AVAILABILITY = [
  "Weekdays", "Weekday evenings", "Weekends",
  "During specific events/programmes", "Flexible / Depends on my schedule",
];
const VOLUNTEER_TIME = [
  "A few hours per month", "2–4 hours per week", "5–8 hours per week",
  "More than 8 hours per week", "Event / activity based", "Depends on my schedule",
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
  volunteerMotivation: "", volunteerAreas: [], volunteerSkills: "",
  volunteerMode: "", volunteerAvailability: [], volunteerTimeCommitment: "",
  hasPreviousVolunteering: "", previousVolunteeringExp: "",
  heardFrom: "", referralName: "",
  decl1: false, decl2: false, decl3: false, decl4: false, decl5: false,
  mediaConsent: "",
  website_hp: "",
};

/* ── Shared UI ── */
const ErrorMsg = ({ msg }) => msg
  ? <p className="reg-error" role="alert">{msg}</p> : null;

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
      {/* Invisible Honeypot Spam Trap */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
        <label htmlFor="vol-website-hp">Leave this field blank</label>
        <input
          type="text"
          id="vol-website-hp"
          name="website_hp"
          tabIndex="-1"
          autoComplete="off"
          value={data.website_hp || ""}
          onChange={onChange}
        />
      </div>

      <div className="reg-pathway-badge reg-pathway-volunteer">Volunteer Registration</div>
      <SectionHeader label="Step 1 of 5 — Personal Information" title="Your Personal Details"
        desc="Please provide your basic information. This helps us understand who you are and how to reach you." />

      <Field label="Full Name" required error={errors.fullName}>
        <input id="vol-fullName" className={`reg-input ${errors.fullName ? "input-error" : ""}`}
          type="text" name="fullName" value={data.fullName} onChange={onChange}
          placeholder="As you'd like it to appear in our organisational records" autoComplete="name" />
      </Field>

      <div className="reg-grid-2">
        <Field label="Date of Birth" required error={errors.dateOfBirth}>
          <input id="vol-dob" className={`reg-input reg-input-date ${errors.dateOfBirth ? "input-error" : ""}`}
            type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={onChange}
            max={new Date().toISOString().split("T")[0]} />
        </Field>
        <Field label="Mobile / WhatsApp Number" required error={errors.mobile}>
          <input id="vol-mobile" className={`reg-input ${errors.mobile ? "input-error" : ""}`}
            type="tel" name="mobile" value={data.mobile} onChange={onChange}
            placeholder="10-digit mobile number" maxLength={10} />
        </Field>
      </div>

      <Field label="Email Address" required error={errors.email}>
        <input id="vol-email" className={`reg-input ${errors.email ? "input-error" : ""}`}
          type="email" name="email" value={data.email} onChange={onChange}
          placeholder="your@email.com" autoComplete="email" />
      </Field>

      <Field label="Current City / District & State" required error={errors.location} hint="Example: Ranchi, Jharkhand">
        <input id="vol-location" className={`reg-input ${errors.location ? "input-error" : ""}`}
          type="text" name="location" value={data.location} onChange={onChange}
          placeholder="e.g. Ranchi, Jharkhand" />
      </Field>

      <div className="reg-grid-2">
        <Field label="Current Professional / Educational Status" required error={errors.professionalStatus}>
          <select id="vol-status" className={`reg-input ${errors.professionalStatus ? "input-error" : ""}`}
            name="professionalStatus" value={data.professionalStatus} onChange={onChange}>
            <option value="">Select your status...</option>
            {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Highest Qualification / Profession" required error={errors.qualification}>
          <input id="vol-qual" className={`reg-input ${errors.qualification ? "input-error" : ""}`}
            type="text" name="qualification" value={data.qualification} onChange={onChange}
            placeholder="Your qualification or profession" />
        </Field>
      </div>

      <Field label="Current Institution / Organisation" error={errors.institution}
        hint="College, university, school, employer or organisation name.">
        <input id="vol-institution" className="reg-input" type="text" name="institution"
          value={data.institution} onChange={onChange} placeholder="Optional" />
      </Field>

      <NavButtons onNext={onNext} nextLabel="Continue →" />
    </div>
  );
}

/* ── STEP 2: Volunteer Profile ── */
function StepProfile({ data, errors, onChange, onCheckboxGroup, onNext, onBack }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-volunteer">Volunteer Registration</div>
      <SectionHeader label="Step 2 of 5 — Volunteer Profile"
        title="Tell Us About Yourself"
        desc="Help us understand your motivations and how you'd like to contribute." />

      <Field label="What motivates you to volunteer with NexJyoti Education Foundation?" required
        error={errors.volunteerMotivation} hint="Please tell us briefly in 2–4 sentences.">
        <textarea id="vol-motivation" className={`reg-input reg-textarea ${errors.volunteerMotivation ? "input-error" : ""}`}
          name="volunteerMotivation" value={data.volunteerMotivation} onChange={onChange}
          placeholder="Share what drives you to volunteer with us..." rows={4} />
      </Field>

      <Field label="Which areas would you be interested in contributing to?" required
        error={errors.volunteerAreas} hint="You may select more than one.">
        <CheckboxGrid name="volunteerAreas" options={VOLUNTEER_AREAS}
          selected={data.volunteerAreas} onChange={onCheckboxGroup} />
      </Field>

      <Field label="What skills or strengths would you like to contribute?" error={errors.volunteerSkills}
        hint="e.g. teaching, communication, mentoring, technology, design, writing, photography, event management, leadership, etc.">
        <textarea id="vol-skills" className="reg-input reg-textarea" name="volunteerSkills"
          value={data.volunteerSkills} onChange={onChange}
          placeholder="Optional — describe your key skills..." rows={3} />
      </Field>

      <Field label="Preferred Mode of Volunteering" required error={errors.volunteerMode}>
        <RadioGroup name="volunteerMode" options={VOLUNTEER_MODES}
          value={data.volunteerMode} onChange={onChange} />
      </Field>

      <Field label="When are you generally available to volunteer?" required error={errors.volunteerAvailability}>
        <CheckboxGrid name="volunteerAvailability" options={VOLUNTEER_AVAILABILITY}
          selected={data.volunteerAvailability} onChange={onCheckboxGroup} />
      </Field>

      <Field label="Approximately how much time would you normally be able to contribute?" required
        error={errors.volunteerTimeCommitment} hint="This is an indication only and not a binding commitment.">
        <RadioGroup name="volunteerTimeCommitment" options={VOLUNTEER_TIME}
          value={data.volunteerTimeCommitment} onChange={onChange} />
      </Field>

      <Field label="Have you previously volunteered with an NGO, educational initiative or community programme?"
        required error={errors.hasPreviousVolunteering}>
        <RadioGroup name="hasPreviousVolunteering" options={["Yes", "No"]}
          value={data.hasPreviousVolunteering} onChange={onChange} />
      </Field>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Continue →" />
    </div>
  );
}

/* ── STEP 3: Previous Experience ── */
function StepExperience({ data, errors, onChange, onNext, onBack }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-volunteer">Volunteer Registration</div>
      <SectionHeader label="Step 3 of 5 — Previous Experience"
        title="Your Previous Volunteering"
        desc="This section is optional. Please share what you are comfortable with." />

      <Field label="Please briefly tell us about your previous volunteering experience." error={errors.previousVolunteeringExp}
        hint="You may mention the organisation/initiative, your role and approximate duration.">
        <textarea id="vol-prevexp" className="reg-input reg-textarea" name="previousVolunteeringExp"
          value={data.previousVolunteeringExp} onChange={onChange}
          placeholder="Optional — share your previous volunteering experience..." rows={5} />
      </Field>

      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Continue →" />
    </div>
  );
}

/* ── STEP 4: Connection ── */
function StepConnection({ data, errors, onChange, onNext, onBack }) {
  return (
    <div className="reg-section animate-reg-in">
      <div className="reg-pathway-badge reg-pathway-volunteer">Volunteer Registration</div>
      <SectionHeader label="Step 4 of 5 — Connection with NexJyoti"
        title="How Did You Find Us?" desc="A brief section to understand how you came to know us." />

      <Field label="How did you hear about us?" required error={errors.heardFrom}>
        <RadioGroup name="heardFrom" options={HEARD_FROM} value={data.heardFrom} onChange={onChange} />
      </Field>

      <Field label="Referral" error={errors.referralName}
        hint="If someone from NexJyoti referred you, please mention their name.">
        <input id="vol-referral" className="reg-input" type="text" name="referralName"
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
      {/* Invisible Honeypot Spam Trap */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
        <label htmlFor="vol-website-hp-decl">Leave this field blank</label>
        <input
          type="text"
          id="vol-website-hp-decl"
          name="website_hp"
          tabIndex="-1"
          autoComplete="off"
          value={data.website_hp || ""}
          onChange={onChange}
        />
      </div>

      <div className="reg-pathway-badge reg-pathway-volunteer">Volunteer Registration</div>
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
        <button type="button" id="vol-submit-btn" className="reg-btn-submit reg-btn-submit-blue"
          onClick={onSubmit} disabled={submitting}>
          {submitting ? <><span className="reg-spinner" /> Submitting...</> : "Submit Volunteer Registration"}
        </button>
      </div>
    </div>
  );
}

/* ── Success ── */
function SuccessScreen() {
  return (
    <div className="reg-success animate-reg-in" aria-live="polite">
      <div className="reg-success-icon-wrap"><span className="reg-success-check">✓</span></div>
      <h2>Thank You for Registering!</h2>
      <p>Your volunteer registration has been received successfully.</p>
      <p>Our team will review your submission and contact you regarding relevant volunteering opportunities.</p>
      <p>We look forward to working together to make a difference.</p>
      <div className="reg-success-org">— NexJyoti Education Foundation</div>
      <Link to="/" className="reg-btn-home" id="vol-home-btn">← Return to Home</Link>
    </div>
  );
}

/* ── MAIN ── */
export default function VolunteerRegister() {
  const [step, setStep] = useState(S.PERSONAL);
  const [data, setData] = useState({ ...INITIAL });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loadTime] = useState(Date.now());

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
    if (!data.volunteerMotivation.trim()) e.volunteerMotivation = "Please share your motivation.";
    if (!data.volunteerAreas.length) e.volunteerAreas = "Please select at least one area.";
    if (!data.volunteerMode) e.volunteerMode = "Please select a preferred mode.";
    if (!data.volunteerTimeCommitment) e.volunteerTimeCommitment = "Please select your time commitment.";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateExperience = () => {
    if (!data.hasPreviousVolunteering) {
      setErrors({ hasPreviousVolunteering: "Please answer this question." });
      return false;
    }
    return true;
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
  const next_S2 = () => { if (validateProfile()) go(S.EXPERIENCE); };
  const next_S3 = () => {
    if (validateExperience())
      go(data.hasPreviousVolunteering === "Yes" ? S.EXP_DETAILS : S.CONNECTION);
  };
  const next_S3b = () => go(S.CONNECTION);
  const next_S4 = () => { if (validateConnection()) go(S.DECLARATION); };

  const handleSubmit = async () => {
    if (!validateDeclaration()) return;

    // Anti-Bot Honeypot & Timestamp Check
    if (data.website_hp || (Date.now() - loadTime < 1000)) {
      go(S.SUCCESS);
      return;
    }

    setSubmitting(true); setSubmitError("");
    try {
      const { website_hp, ...cleanData } = data;
      await addDoc(collection(db, "registrations"), {
        ...cleanData, type: "volunteer", status: "pending", submittedAt: new Date().toISOString(),
      });
      go(S.SUCCESS);
    } catch (err) {
      console.error("Firestore submission error:", err);
      setSubmitError(`Submission failed: ${err?.message || "Please try again or contact us directly."}`);
    } finally {
      setSubmitting(false);
    }
  };

  const backFromS4 = () => go(data.hasPreviousVolunteering === "Yes" ? S.EXPERIENCE : S.PROFILE);

  return (
    <>
      <title>Volunteer Registration — NexJyoti Education Foundation</title>
      <div className="register-page">
        <div className="register-hero">
          <div className="reg-hero-bg-dots" aria-hidden="true" />
          <div className="register-hero-content">
            <span className="reg-hero-label">Volunteer Pathway</span>
            <h1>Volunteer Registration</h1>
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
                <div className="reg-progress-fill" style={{ width: `${PROGRESS[step]}%` }} />
              </div>
              <span className="reg-progress-label">{PROGRESS[step]}% complete</span>
            </div>
          )}

          <div className="register-form-card">
            {step === S.PERSONAL && <StepPersonal data={data} errors={errors} onChange={handleChange} onNext={next_S1} />}
            {step === S.PROFILE && <StepProfile data={data} errors={errors} onChange={handleChange} onCheckboxGroup={handleCheckboxGroup} onNext={next_S2} onBack={() => go(S.PERSONAL)} />}
            {step === S.EXPERIENCE && <StepExperience data={data} errors={errors} onChange={handleChange} onNext={next_S3} onBack={() => go(S.PROFILE)} />}
            {step === S.CONNECTION && <StepConnection data={data} errors={errors} onChange={handleChange} onNext={next_S4} onBack={backFromS4} />}
            {step === S.DECLARATION && <StepDeclaration data={data} errors={errors} onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} submitError={submitError} onBack={() => go(S.CONNECTION)} />}
            {step === S.SUCCESS && <SuccessScreen />}
          </div>
        </div>
      </div>
    </>
  );
}
