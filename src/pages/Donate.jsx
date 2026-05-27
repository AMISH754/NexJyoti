import React, { useState, useEffect } from "react";

export default function Donate() {
  // Donation states
  const [preset, setPreset] = useState("1000");
  const [customAmount, setCustomAmount] = useState("1000");
  const [donorInfo, setDonorInfo] = useState({ name: "", email: "", phone: "" });
  const [donationSuccess, setDonationSuccess] = useState(false);

  // Volunteer states
  const [volInfo, setVolInfo] = useState({ name: "", email: "", role: "", message: "" });
  const [volSuccess, setVolSuccess] = useState(false);

  useEffect(() => {
    // Scroll animations observer
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => scrollObserver.observe(el));

    // Handle hash routing to volunteer section
    if (window.location.hash === "#volunteer") {
      const el = document.getElementById("volunteerSection");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }

    return () => scrollObserver.disconnect();
  }, []);

  // Preset click handler
  const handlePresetSelect = (value) => {
    setPreset(value);
    if (value !== "custom") {
      setCustomAmount(value);
    } else {
      setCustomAmount("");
    }
  };

  // Custom amount text handler
  const handleCustomAmountInput = (e) => {
    const val = e.target.value;
    setCustomAmount(val);

    // Sync preset active highlight
    if (["500", "1000", "2000", "5000"].includes(val)) {
      setPreset(val);
    } else {
      setPreset("custom");
    }
  };

  // Impact text calculator
  const getImpactDescription = (value) => {
    const impactMap = {
      "500": "₹500 provides a child with learning materials, school uniforms, and writing notebooks for an entire term.",
      "1000": "₹1,000 sponsors complete health checkups and basic nutritional supplements for 2 marginalized children.",
      "2000": "₹2,000 funds a full month of certified vocational IT & basic digital literacy classes for an under-resourced youth.",
      "5000": "₹5,000 provides hardware modules (solar energy cell, networking terminal, Raspberry Pi unit) for a rural school."
    };

    if (impactMap[value]) {
      return impactMap[value];
    }

    const amt = parseInt(value) || 0;
    if (amt <= 0) {
      return "Enter an amount to see how your contribution changes real lives.";
    } else if (amt < 1000) {
      return `₹${amt.toLocaleString("en-IN")} will support learning kits, pencils, and textbook packages for underprivileged children.`;
    } else if (amt < 3000) {
      return `₹${amt.toLocaleString("en-IN")} sponsors vocational training courses, IT skill guidance, and career workshops for local youth.`;
    } else {
      return `₹${amt.toLocaleString("en-IN")} contributes directly to building solar-powered digital classrooms and computer equipment libraries in rural villages.`;
    }
  };

  // Submit Donation
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  // Submit Volunteer Signup
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    setVolSuccess(true);
  };

  return (
    <div>
      {/* Support Header */}
      <section className="about-hero" id="donateHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">Make an Impact Today</span>
          <h1>Every Contribution Shapes a Future</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Your support provides essential computer kits, solar-powered systems, and career-oriented textbooks to youth striving for a brighter tomorrow.
          </p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="section donate-interface bg-white" id="donationSection">
        <div className="container donate-grid">
          {/* Donation FAQ / Story block */}
          <div className="donate-story animate-on-scroll">
            <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0, marginBottom: "12px" }}>
              Your Social Investment
            </span>
            <h2 style={{ textAlign: "left", marginTop: "10px" }}>Why Choose NexJyoti?</h2>
            <div className="divider divider-left"></div>
            <p className="mt-24">
              We believe every supporter is a social investor. We apply stringent business efficiency models to non-profit executions, guaranteeing maximum return of social benefits for every rupee spent.
            </p>

            <div style={{ margin: "2.5rem 0", display: "grid", gap: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <span style={{ fontSize: "1.25rem", color: "var(--primary)", fontWeight: "bold", lineHeight: 1 }}>✔</span>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Tax Deductible Benefits</strong>: All donations are 100% tax exempt under Section 80G of the Indian Income Tax Act. Receipts are generated automatically.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <span style={{ fontSize: "1.25rem", color: "var(--primary)", fontWeight: "bold", lineHeight: 1 }}>✔</span>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Actionable Tracking</strong>: Class enrollment details and solar lab setup locations are shared with sponsors openly so you can track progress.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
                <span style={{ fontSize: "1.25rem", color: "var(--primary)", fontWeight: "bold", lineHeight: 1 }}>✔</span>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Transparency Audits</strong>: Annual financial balance logs are emailed to your registered address automatically.
                </p>
              </div>
            </div>

            <div className="card" style={{ backgroundColor: "var(--primary-glow)", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "24px" }}>
              <h4 style={{ color: "var(--primary)", marginBottom: "0.5rem", fontWeight: 700 }}>Alternative Modes of Support</h4>
              <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-body)" }}>
                If you prefer bank wire transfer or contributing hardware (laptops, solar units) directly, please connect with us at <strong>finance@nexjyoti.org</strong> or via phone at <strong>+91 (11) 4567 8900</strong>.
              </p>
            </div>
          </div>

          {/* Modern Form Container */}
          <div className="donate-form-card animate-on-scroll delay-1" id="donationCard">
            {donationSuccess ? (
              <div className="alert alert-success" style={{ padding: "48px 24px", textAlign: "center", borderRadius: "var(--radius-lg)" }}>
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>💖</div>
                <h3 style={{ color: "#065f46", marginBottom: "12px", fontWeight: 700 }}>Pledge Received!</h3>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "24px" }}>
                  Thank you, <strong>{donorInfo.name}</strong>, for your generous support of <strong>₹{parseInt(customAmount).toLocaleString("en-IN")}</strong>.
                </p>
                <p style={{ fontSize: "0.9rem", color: "#065f46" }}>
                  We have sent an confirmation summary and your 80G tax receipt details to <strong>{donorInfo.email}</strong>.
                </p>
                <button className="btn btn-outline-blue mt-24" onClick={() => { setDonationSuccess(false); setDonorInfo({ name: "", email: "", phone: "" }); }}>
                  Make Another Donation
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonationSubmit}>
                <h3 style={{ marginBottom: "1.5rem", color: "var(--primary-dark)" }}>Secure Pledge Portal</h3>

                <label className="form-label">1. Choose a Social Impact Preset (INR)</label>
                <div className="preset-group" id="presetGroup">
                  <button type="button" className={`preset-btn ${preset === "500" ? "active" : ""}`} onClick={() => handlePresetSelect("500")}>₹500</button>
                  <button type="button" className={`preset-btn ${preset === "1000" ? "active" : ""}`} onClick={() => handlePresetSelect("1000")}>₹1,000</button>
                  <button type="button" className={`preset-btn ${preset === "2000" ? "active" : ""}`} onClick={() => handlePresetSelect("2000")}>₹2,000</button>
                  <button type="button" className={`preset-btn ${preset === "5000" ? "active" : ""}`} onClick={() => handlePresetSelect("5000")}>₹5,000</button>
                  <button type="button" className={`preset-btn ${preset === "custom" ? "active" : ""}`} id="presetCustomBtn" onClick={() => handlePresetSelect("custom")}>Custom</button>
                </div>

                <label className="form-label" htmlFor="custom-amount">Or Enter Custom Amount (₹)</label>
                <div className="custom-amount-wrapper">
                  <span className="amount-symbol">₹</span>
                  <input
                    type="number"
                    className="amount-input"
                    id="custom-amount"
                    value={customAmount}
                    onChange={handleCustomAmountInput}
                    placeholder="1000"
                    min="100"
                    required
                  />
                </div>

                {/* Dynamic Impact Widget */}
                <div className="donation-impact-card" id="donationImpactCard">
                  <h4 id="donation-impact-title">Social / Educational Impact</h4>
                  <p id="donation-impact-text" style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {getImpactDescription(customAmount)}
                  </p>
                </div>

                <label className="form-label">2. Your Contact Information</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number (10 digits)"
                    pattern="[0-9]{10}"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full" id="btnSubmitDonation" style={{ justifyContent: "center", width: "100%" }}>
                  Securely Proceed to Payment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Education Can't Wait Section */}
      <section className="section education-urgency bg-white" id="urgencySection">
        <div className="container story-grid">
          <div className="why-visual animate-on-scroll">
            <div className="why-img-wrap">
              <img src="/assets/images/why-us.jpg" alt="Children studying in a classroom" className="left-img" style={{ height: "440px" }} />
            </div>
          </div>

          <div className="urgency-content animate-on-scroll delay-1">
            <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0, marginBottom: "12px" }}>
              Why Education Can't Wait
            </span>
            <h2 style={{ textAlign: "left", marginTop: "10px" }}>Why the Education Can't Wait?</h2>
            <div className="divider divider-left" style={{ marginBottom: "2rem" }}></div>

            <p className="lead-text" style={{ fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.7, color: "var(--primary)" }}>
              Children of today need continuous exposure to quality education, personal values, and life skills. They will grow up to become the decision makers, the trendsetters of tomorrow, and they need to be equipped with an ideal upbringing.
            </p>
            <p className="mt-16">
              Education of the entire generation was disrupted due to the pandemic, which has impacted marginalized children the hardest. They are at risk of being pushed into poverty or forced to work as their families struggle to survive.
            </p>
            <p className="mt-16" style={{ fontWeight: 600, color: "var(--primary-dark)" }}>
              168 million children are facing learning losses that will lead to:
            </p>
            <ul className="mt-16" style={{ display: "grid", gap: "12px", listStyle: "none", paddingLeft: 0 }}>
              <li style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "0.95rem", color: "var(--text-body)" }}>
                <span style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.2rem" }}>✔</span> less access to higher education
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "0.95rem", color: "var(--text-body)" }}>
                <span style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.2rem" }}>✔</span> lower future incomes
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "0.95rem", color: "var(--text-body)" }}>
                <span style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.2rem" }}>✔</span> increasing unemployment
              </li>
            </ul>
            <p className="mt-24">
              Our children need quality education to have a better chance at a future. The years are not waiting and their dreams shouldn't either.
            </p>
            <h4 className="mt-24" style={{ color: "var(--gold)", fontFamily: "Outfit, sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>
              #EducationCantWait
            </h4>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="section volunteer-enrollment bg-off-white" id="volunteerSection">
        <div className="container story-grid" id="volunteerFormContainer">
          {/* Left Info */}
          <div className="volunteer-intro animate-on-scroll">
            <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0, marginBottom: "12px" }}>
              Contribute Time & Talent
            </span>
            <h2 style={{ textAlign: "left", marginTop: "10px" }}>Become a Certified NexJyoti Volunteer</h2>
            <div className="divider divider-left"></div>
            <p className="mt-24">
              Donating capital isn't the only way to support growth. We run structural volunteer programs, focusing on teaching computer concepts, mentoring vocational skill sessions, or advising on small business operations.
            </p>
            <p className="mt-16">
              As a registered volunteer, you will receive an official certificate from NexJyoti, professional career mentors, and direct exposure to grassroot development initiatives across rural India.
            </p>

            <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem", borderLeft: "4px solid var(--primary)" }}>
              <div style={{ fontSize: "2.5rem" }}>🤝</div>
              <div>
                <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>2,500+ Active Members</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>Join a highly driven, warm national network of changemakers!</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="card form-card animate-on-scroll delay-1" id="volunteerFormCard">
            {volSuccess ? (
              <div className="alert alert-success" style={{ padding: "32px 16px", textAlign: "center", borderRadius: "var(--radius-md)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🤝</div>
                <h4 style={{ color: "#065f46", marginBottom: "8px", fontWeight: 700 }}>Application Submitted!</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Thank you for applying, <strong>{volInfo.name}</strong>. Our volunteer coordinator will reach out to you at <strong>{volInfo.email}</strong> to schedule an onboarding call soon.
                </p>
                <button className="btn btn-outline-blue mt-24" onClick={() => { setVolSuccess(false); setVolInfo({ name: "", email: "", role: "", message: "" }); }}>
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit}>
                <h3 style={{ marginBottom: "1.5rem", color: "var(--primary-dark)" }}>Volunteer Sign-Up</h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="vol-name">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vol-name"
                    placeholder="E.g., Rohan Mehra"
                    value={volInfo.name}
                    onChange={(e) => setVolInfo({ ...volInfo, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vol-email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="vol-email"
                    placeholder="E.g., rohan@gmail.com"
                    value={volInfo.email}
                    onChange={(e) => setVolInfo({ ...volInfo, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vol-role">Preferred Area of Impact</label>
                  <select
                    className="form-control"
                    id="vol-role"
                    value={volInfo.role}
                    onChange={(e) => setVolInfo({ ...volInfo, role: e.target.value })}
                    required
                    style={{
                      appearance: "none",
                      backgroundImage: "linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)",
                      backgroundPosition: "calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)",
                      backgroundSize: "5px 5px, 5px 5px",
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    <option value="" disabled>Select an area</option>
                    <option value="teaching">📚 Teaching (Computer Skills)</option>
                    <option value="mentoring">⚙ Vocational Career Mentoring</option>
                    <option value="healthcare">🩺 Health Camps Coordination</option>
                    <option value="pr">📣 Public Relations & Writing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vol-message">Briefly tell us why you want to join (Optional)</label>
                  <textarea
                    className="form-control"
                    id="vol-message"
                    rows="4"
                    placeholder="Share your experience or motivation..."
                    value={volInfo.message}
                    onChange={(e) => setVolInfo({ ...volInfo, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-secondary w-full" id="btnSubmitVolunteer" style={{ justifyContent: "center", width: "100%" }}>
                  Submit Volunteer Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
