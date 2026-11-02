import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { ENGAGEMENTS, answerOffer, fetchOffer, formatDate } from "../utils/careers";
import { JobText } from "./Careers";
import "../styles/register.css";
import "../styles/careers.css";

/* nexjyoti.org/careers/offer/<token>: the offer letter made in the NexJyoti Hub, on the letterhead, signed. The candidate
 * accepts (typing their full name) or declines, and can print it or save it as a PDF. The token in the link is the
 * only key, so the page is kept out of search engines. */
export default function CareerOffer() {
  const { token } = useParams();
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState("");
  const [choice, setChoice] = useState(null); // "accept" | "decline"
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [answerError, setAnswerError] = useState("");

  useEffect(() => {
    if (!token) { setError("This link has no offer in it."); return undefined; }
    let alive = true;
    fetchOffer(token).then((o) => alive && setOffer(o)).catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, [token]);

  const answer = async () => {
    setAnswerError("");
    if (choice === "accept" && (!name.trim() || !agree)) { setAnswerError("Please type your full name and tick the box to accept."); return; }
    setBusy(true);
    try {
      const result = await answerOffer(token, { accept: choice === "accept", name: name.trim(), note: note.trim() });
      setOffer((o) => ({ ...o, status: result, response_name: choice === "accept" ? name.trim() : null, responded_on: new Date().toISOString().slice(0, 10) }));
    } catch (e) { setAnswerError(e.message); } finally { setBusy(false); }
  };

  const head = offer?.letterhead || {};
  const expired = offer && offer.status === "sent" && offer.expires_on < new Date().toISOString().slice(0, 10);

  return (
    <>
      <SEOHead path="/careers/offer" />
      <div className="register-page careers-page offer-page">
        <div className="register-container careers-container offer-container">
          <h1 className="offer-title no-print">{offer ? `Your offer: ${offer.title}` : "Your offer letter"}</h1>
          {error ? (
            <div className="careers-empty">
              <h2 className="reg-section-title">We couldn’t open this offer</h2>
              <p>{error}</p>
              <p>Please check the link in your email, or write to <a href="mailto:info@nexjyoti.org">info@nexjyoti.org</a>.</p>
            </div>
          ) : !offer ? (
            <div className="careers-loading" aria-live="polite"><span className="reg-spinner careers-spinner" /> Opening your offer…</div>
          ) : (
            <>
              <OfferStatus offer={offer} expired={expired} />
              <article className="offer-sheet">
                <img className="offer-watermark" src="/assets/letterhead/a4-watermark.png" alt="" />
                <header className="offer-head"><img src="/assets/letterhead/a4-header.png" alt={head.name} /></header>
                <div className="offer-content">
                <div className="offer-meta"><span>{formatDate(offer.issued_on)}</span></div>
                <div className="offer-to"><strong>{offer.candidate}</strong>{offer.candidate_city && <span>{offer.candidate_city}</span>}</div>
                <p className="offer-subject"><strong>Subject:</strong> {offer.subject}</p>
                <div className="offer-body"><JobText text={offer.body} /></div>
                <div className="offer-sign-row">
                  <div className="offer-sign">
                    {offer.signature && <img src={offer.signature} alt="Signature" />}
                    {offer.signer && <strong>{offer.signer.name}</strong>}
                    {offer.signer?.title && <span>{offer.signer.title}</span>}
                    <span>{head.name}</span>
                  </div>
                  <img className="offer-seal" src="/assets/letterhead/seal.png" alt={`Seal of ${head.name}`} />
                </div>
                {offer.status === "accepted" && (
                  <div className="offer-accepted">Accepted on {formatDate(offer.responded_on)}{offer.response_name ? ` by ${offer.response_name}` : ""}</div>
                )}
                </div>
                <footer className="offer-foot"><img src="/assets/letterhead/a4-footer.png" alt={[head.address, head.phone, head.email, head.website].filter(Boolean).join(" · ")} /></footer>
              </article>

              <div className="offer-actions no-print">
                <button type="button" className="reg-btn-back" onClick={() => window.print()}>Print or save as PDF</button>
              </div>

              {offer.status === "sent" && !expired && (
                <div className="register-form-card offer-answer no-print">
                  <div className="reg-section-header">
                    <span className="reg-section-label">Your answer</span>
                    <h2 className="reg-section-title">Will you join us?</h2>
                    <p className="reg-section-desc">Please answer by {formatDate(offer.expires_on)}. Questions first? Write to <a href="mailto:info@nexjyoti.org">info@nexjyoti.org</a>.</p>
                  </div>
                  <div className="offer-choice" role="radiogroup" aria-label="Your answer">
                    <button type="button" role="radio" aria-checked={choice === "accept"} className={choice === "accept" ? "on accept" : ""} onClick={() => setChoice("accept")}>✓ Accept the offer</button>
                    <button type="button" role="radio" aria-checked={choice === "decline"} className={choice === "decline" ? "on decline" : ""} onClick={() => setChoice("decline")}>Decline</button>
                  </div>
                  {choice === "accept" && (
                    <>
                      <div className="reg-field">
                        <label className="reg-label" htmlFor="offer-name">Type your full name to sign<span className="reg-required"> *</span></label>
                        <input id="offer-name" className="reg-input" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} autoComplete="name" placeholder={offer.candidate} />
                      </div>
                      <label className="careers-consent">
                        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                        <span>I accept the role of <strong>{offer.title}</strong> ({ENGAGEMENTS[offer.engagement]?.label || offer.engagement}) on the terms in this letter.</span>
                      </label>
                    </>
                  )}
                  {choice && (
                    <div className="reg-field">
                      <label className="reg-label" htmlFor="offer-note">{choice === "accept" ? "A note for us (optional)" : "Would you tell us why? (optional)"}</label>
                      <textarea id="offer-note" className="reg-input reg-textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} maxLength={2000} />
                    </div>
                  )}
                  {answerError && <div className="reg-submit-error" role="alert">{answerError}</div>}
                  {choice && (
                    <div className="reg-nav-buttons">
                      <button type="button" className="reg-btn-submit reg-btn-submit-blue" onClick={answer} disabled={busy}>
                        {busy ? <><span className="reg-spinner" /> Saving…</> : choice === "accept" ? "Accept and sign" : "Decline the offer"}
                      </button>
                    </div>
                  )}
                </div>
              )}
              <p className="reg-landing-note no-print"><Link to="/careers">NexJyoti careers</Link></p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function OfferStatus({ offer, expired }) {
  if (offer.status === "accepted") return <div className="offer-banner ok no-print">🎉 You’ve accepted this offer. Welcome to NexJyoti! We’ll email you about your joining documents next.</div>;
  if (offer.status === "declined") return <div className="offer-banner no-print">You declined this offer. Thank you for letting us know, and we wish you the very best.</div>;
  if (offer.status === "withdrawn") return <div className="offer-banner warn no-print">This offer has been withdrawn. Please write to info@nexjyoti.org if you have questions.</div>;
  if (expired) return <div className="offer-banner warn no-print">This offer expired on {formatDate(offer.expires_on)}. Please write to info@nexjyoti.org if you’d still like to talk.</div>;
  return null;
}
