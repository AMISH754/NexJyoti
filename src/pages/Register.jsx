import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  return (
    <>
      <title>Join Us — NexJyoti Education Foundation</title>

      <div className="register-page">
        {/* Hero */}
        <div className="register-hero">
          <div className="reg-hero-bg-dots" aria-hidden="true" />
          <div className="register-hero-content">
            <span className="reg-hero-label">Be the Change</span>
            <h1>Join NexJyoti Education Foundation</h1>
            <p>
              Choose how you would like to associate with us. Both pathways are equally valued
              and contribute meaningfully to our mission.
            </p>
            <div className="reg-hero-meta">
              <span>Approx. 4–6 minutes</span>
              <span>·</span>
              <span>Secure &amp; Confidential</span>
            </div>
          </div>
        </div>

        {/* Choose Path */}
        <div className="register-container">
          <div className="reg-landing-header">
            <span className="reg-section-label">Select Your Path</span>
            <h2 className="reg-section-title" style={{ textAlign: "center", marginTop: "8px" }}>
              How Would You Like to Join Us?
            </h2>
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "8px", fontSize: "0.97rem" }}>
              Please select one of the following. You will be shown only the questions relevant to your choice.
            </p>
          </div>

          <div className="reg-landing-cards">
            {/* Volunteer Card */}
            <div className="reg-landing-card volunteer" onClick={() => navigate("/volunteer-register")}>
              <div className="reg-landing-card-glow volunteer" />
              <div className="reg-landing-card-inner">
                <div className="reg-landing-badge volunteer">Volunteer Pathway</div>
                <h3>Volunteer</h3>
                <p>
                  I would like to contribute my time and skills to programmes, activities or
                  organisational initiatives.
                </p>
                <ul className="reg-landing-features">
                  <li>✓ Teaching &amp; Academic Support</li>
                  <li>✓ Community Outreach</li>
                  <li>✓ Events &amp; Coordination</li>
                  <li>✓ Social Media &amp; Content</li>
                  <li>✓ IT &amp; Technology</li>
                  <li>+ many more areas</li>
                </ul>
                <button
                  className="reg-landing-btn volunteer"
                  id="reg-volunteer-btn"
                  onClick={() => navigate("/volunteer-register")}
                >
                  Apply as Volunteer →
                </button>
              </div>
            </div>

            {/* Member Card */}
            <div className="reg-landing-card member" onClick={() => navigate("/member-register")}>
              <div className="reg-landing-card-glow member" />
              <div className="reg-landing-card-inner">
                <div className="reg-landing-badge member">Member Pathway</div>
                <h3>Member</h3>
                <p>
                  I would like to become formally associated with the organisation and contribute
                  towards its mission and development.
                </p>
                <ul className="reg-landing-features">
                  <li>✓ Academic Programmes</li>
                  <li>✓ Organisational Development</li>
                  <li>✓ Fundraising &amp; Partnerships</li>
                  <li>✓ Communications &amp; Outreach</li>
                  <li>✓ Technology &amp; Digital Systems</li>
                  <li>+ many more areas</li>
                </ul>
                <button
                  className="reg-landing-btn member"
                  id="reg-member-btn"
                  onClick={() => navigate("/member-register")}
                >
                  Apply as Member →
                </button>
              </div>
            </div>
          </div>

          <p className="reg-landing-note">
            Submission of the form expresses your interest and does not constitute confirmation
            of membership, volunteering, appointment or any organisational position.
          </p>
        </div>
      </div>
    </>
  );
}
