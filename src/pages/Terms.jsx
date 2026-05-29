import React, { useEffect } from "react";

export default function Terms() {
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
      <section className="about-hero" id="termsHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">Legal & Policies</span>
          <h1>Terms & Conditions</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Please read these terms and conditions carefully before using our website or services.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section bg-white" id="termsContentSection" style={{ padding: "60px 0 90px" }}>
        <div className="container-narrow">
          <div className="card form-card animate-on-scroll" style={{ padding: "40px", borderRadius: "var(--radius-lg)" }}>
            
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", textAlign: "left" }}>
                NexJyoti Education Foundation
              </h2>
              <div className="divider divider-left"></div>
              <p className="mt-24" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-body)" }}>
                Welcome to the official website of NexJyoti Education Foundation. By accessing or using this
                website, you agree to comply with and be bound by the following Terms & Conditions. Please read
                them carefully before using our website or services.
              </p>
              <p className="mt-12" style={{ fontWeight: "600", color: "var(--primary)" }}>
                If you do not agree with any part of these terms, you are advised not to use this website.
              </p>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

            <div style={{ display: "grid", gap: "2rem" }}>
              
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>1.</span> About the Organization
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation is a social impact and educational organization committed to
                  empowering underserved communities through education, holistic development, digital literacy,
                  mentorship, and community transformation initiatives.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>2.</span> Use of Website
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Users may access and use this website for lawful, informational, educational, or charitable
                  purposes only.
                </p>
                <p className="mt-12" style={{ fontWeight: "600", fontSize: "0.95rem" }}>You agree not to:</p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "grid", gap: "8px", listStyle: "disc" }}>
                  <li style={{ fontSize: "0.95rem" }}>Misuse or attempt to disrupt website functionality</li>
                  <li style={{ fontSize: "0.95rem" }}>Engage in unauthorized access or malicious activities</li>
                  <li style={{ fontSize: "0.95rem" }}>Use website content for unlawful or misleading purposes</li>
                  <li style={{ fontSize: "0.95rem" }}>Violate any applicable laws or regulations while using this platform</li>
                </ul>
                <p className="mt-16" style={{ fontSize: "0.95rem", fontStyle: "italic" }}>
                  NexJyoti Education Foundation reserves the right to restrict or terminate access if misuse or
                  harmful activity is detected.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>3.</span> Intellectual Property
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  All content available on this website, including text, graphics, logos, photographs, reports, designs,
                  videos, and other materials, is the property of NexJyoti Education Foundation unless otherwise
                  stated.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  No material may be copied, reproduced, modified, distributed, or used commercially without prior
                  written permission from the Foundation.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Reasonable sharing for educational, awareness, or non-commercial purposes with proper
                  acknowledgment is permitted.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>4.</span> Donations & Contributions
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  All donations made to NexJyoti Education Foundation are voluntary and used to support the
                  organization’s educational and social impact initiatives.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  While we strive to ensure responsible utilization of funds, the Foundation reserves the right to
                  allocate donations according to organizational priorities, emergency needs, sustainability
                  requirements, and ongoing programs.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Donation receipts and applicable acknowledgments shall be provided as per organizational policies
                  and applicable laws.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>5.</span> External Links
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  This website may contain links to third-party websites or platforms for informational or convenience
                  purposes.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation does not control or endorse the content, policies, or practices of
                  external websites and shall not be responsible for any loss, damage, or issues arising from their
                  use.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>6.</span> Accuracy of Information
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We strive to maintain accurate, updated, and reliable information on our website. However,
                  NexJyoti Education Foundation does not guarantee the completeness, accuracy, or uninterrupted
                  availability of all content at all times.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Information may be updated, modified, or removed without prior notice.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>7.</span> Limitation of Liability
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation shall not be held liable for any direct, indirect, incidental, or
                  consequential damages arising from the use of this website, reliance on its content, or inability to
                  access the platform.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Users access and use the website at their own discretion and responsibility.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>8.</span> Privacy
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Use of this website is also governed by our Privacy Policy, which explains how personal
                  information is collected, used, and protected.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>9.</span> Changes to Terms
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation reserves the right to modify or update these Terms & Conditions at
                  any time without prior notice.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Continued use of the website after changes are published shall constitute acceptance of the
                  revised terms.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>10.</span> Governing Jurisdiction
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  These Terms & Conditions shall be governed in accordance with the applicable laws of India. Any
                  disputes arising in connection with the use of this website shall fall under the jurisdiction of
                  competent courts in Ranchi, Jharkhand.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--gold)" }}>11.</span> Contact Us
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  For any questions regarding these Terms & Conditions, please contact:
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
