import React, { useEffect } from "react";

export default function Privacy() {
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
      { threshold: 0.08 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => scrollObserver.observe(el));

    return () => scrollObserver.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Header */}
      <section className="about-hero" id="privacyHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">Legal & Policies</span>
          <h1>Privacy Policy</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            This policy explains how we collect, use, protect, and manage information shared with us.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section bg-white" id="privacyContentSection" style={{ padding: "60px 0 90px" }}>
        <div className="container-narrow">
          <div className="card form-card animate-on-scroll" style={{ padding: "40px", borderRadius: "var(--radius-lg)" }}>
            
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", textAlign: "left" }}>
                NexJyoti Education Foundation
              </h2>
              <div className="divider divider-left"></div>
              <p className="mt-24" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-body)" }}>
                At NexJyoti Education Foundation, we value the trust of our students, parents, donors, volunteers,
                partners, and website visitors. This Privacy Policy explains how we collect, use, protect, and
                manage information shared with us through our website, programs, and communications.
              </p>
              <p className="mt-12" style={{ fontWeight: "600", color: "var(--primary)" }}>
                By accessing or using our website and services, you agree to the practices described in this Privacy Policy.
              </p>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

            <div style={{ display: "grid", gap: "2rem" }}>
              
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>1.</span> Information We Collect
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We may collect the following types of information:
                </p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "grid", gap: "8px", listStyle: "disc" }}>
                  <li style={{ fontSize: "0.95rem" }}>Personal information such as name, email address, phone number, and mailing address</li>
                  <li style={{ fontSize: "0.95rem" }}>Donation and transaction details</li>
                  <li style={{ fontSize: "0.95rem" }}>Volunteer or partnership application information</li>
                  <li style={{ fontSize: "0.95rem" }}>Educational or program-related information shared during registrations</li>
                  <li style={{ fontSize: "0.95rem" }}>Website usage information including browser type, IP address, and pages visited</li>
                </ul>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We collect information only when voluntarily submitted or automatically generated through standard website technologies.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>2.</span> How We Use Information
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  The information collected may be used to:
                </p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "grid", gap: "8px", listStyle: "disc" }}>
                  <li style={{ fontSize: "0.95rem" }}>Provide educational and community services</li>
                  <li style={{ fontSize: "0.95rem" }}>Respond to inquiries and communications</li>
                  <li style={{ fontSize: "0.95rem" }}>Process donations and maintain records</li>
                  <li style={{ fontSize: "0.95rem" }}>Improve our programs, outreach, and website experience</li>
                  <li style={{ fontSize: "0.95rem" }}>Share updates, newsletters, and impact reports</li>
                  <li style={{ fontSize: "0.95rem" }}>Ensure organizational transparency and accountability</li>
                  <li style={{ fontSize: "0.95rem" }}>Comply with applicable legal and regulatory obligations</li>
                </ul>
                <p className="mt-16" style={{ fontSize: "0.95rem", fontStyle: "italic", color: "var(--primary-dark)", fontWeight: "600" }}>
                  We do not sell, trade, or misuse personal information for commercial purposes.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>3.</span> Data Protection & Security
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation is committed to maintaining appropriate technical and
                  organizational safeguards to protect personal information against unauthorized access, misuse,
                  loss, or disclosure.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  While we strive to use commercially acceptable security practices, no digital platform can
                  guarantee absolute security.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>4.</span> Sharing of Information
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We may share information only when necessary with:
                </p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "grid", gap: "8px", listStyle: "disc" }}>
                  <li style={{ fontSize: "0.95rem" }}>Authorized service providers and technology partners</li>
                  <li style={{ fontSize: "0.95rem" }}>Financial institutions or payment processors for donations</li>
                  <li style={{ fontSize: "0.95rem" }}>Government or legal authorities when required by law</li>
                </ul>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We ensure that such sharing is limited, responsible, and aligned with our mission and legal obligations.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>5.</span> Cookies & Website Analytics
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Our website may use cookies and analytics tools to improve functionality, understand visitor
                  engagement, and enhance user experience.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Users may choose to disable cookies through their browser settings, though some website features
                  may not function properly.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>6.</span> External Links
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Our website may contain links to third-party websites or platforms. NexJyoti Education Foundation
                  is not responsible for the privacy practices or content of external websites.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Users are encouraged to review the privacy policies of any third-party platforms they visit.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>7.</span> Children’s Privacy
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Protecting children's dignity and privacy is extremely important to us. Any student-related
                  information, photographs, or stories shared publicly are used responsibly and with appropriate
                  consent wherever applicable.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We do not knowingly collect sensitive personal information from children through our website
                  without appropriate authorization.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>8.</span> Policy Updates
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation may update this Privacy Policy periodically to reflect organizational,
                  legal, or technological changes. Updated versions will be published on this page with revised
                  effective dates.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>9.</span> Contact Us
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  For questions, concerns, or requests related to this Privacy Policy, please contact:
                </p>
                <div style={{ 
                  marginTop: "12px", 
                  padding: "16px 20px", 
                  background: "var(--off-white)", 
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--gold)" 
                }}>
                  <strong style={{ display: "block", color: "var(--primary-dark)", marginBottom: "4px" }}>
                    NexJyoti Education Foundation
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-body)" }}>
                    Irgu Toli Road (Raja Hata Lane), Kumhartoli, Ranchi – 834001, Jharkhand, India
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: "0.9rem", color: "var(--text-body)" }}>
                    Email: <a href="mailto:info@nexjyoti.org" style={{ color: "var(--primary)", fontWeight: "600" }}>info@nexjyoti.org</a>
                  </p>
                </div>
              </div>

            </div>

            <div style={{ marginTop: "3rem", textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Last Updated: May 2026
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
