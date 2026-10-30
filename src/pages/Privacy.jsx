import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { LegalIcon, LegalTabs, LegalToc } from "../components/LegalPage";

// [id, title] of each numbered section, for the "On this page" list.
const SECTIONS = [
  ["information-we-collect", "Information We Collect"],
  ["how-we-use-information", "How We Use Information"],
  ["data-protection-and-security", "Data Protection & Security"],
  ["sharing-of-information", "Sharing of Information"],
  ["cookies-and-website-analytics", "Cookies & Website Analytics"],
  ["external-links", "External Links"],
  ["nexjyoti-hub", "NexJyoti Hub App, Registrations and Sign-In"],
  ["childrens-privacy", "Children’s Privacy"],
  ["policy-updates", "Policy Updates"],
  ["contact-us", "Contact Us"],
];

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
    <div className="legal-page legal-page--privacy">
      <SEOHead path="/privacy" />

      {/* Hero Header */}
      <section className="about-hero legal-hero" id="privacyHero">
        <div className="container animate-on-scroll">
          <span className="legal-hero-icon"><LegalIcon name="shield" size={30} /></span>
          <span className="section-subtitle">Data & Privacy</span>
          <h1>Privacy Policy</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            This policy explains how we collect, use, protect, and manage information shared with us.
          </p>
          <LegalTabs />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section bg-white" id="privacyContentSection" style={{ padding: "60px 0 90px" }}>
        <div className="container-narrow">
          <div className="card form-card legal-card animate-on-scroll" style={{ padding: "40px", borderRadius: "var(--radius-lg)" }}>
            
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.8rem", color: "var(--primary-dark)", textAlign: "left" }}>
                Our Commitment to Your Privacy
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
              <LegalToc sections={SECTIONS} />
            </div>

            <hr style={{ border: "0", borderTop: "1px solid var(--border)", margin: "2rem 0" }} />

            <div style={{ display: "grid", gap: "2rem" }}>
              
              <div className="legal-section" id="information-we-collect">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">1.</span> Information We Collect
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We may collect the following types of information:
                </p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "grid", gap: "8px", listStyle: "disc" }}>
                  <li style={{ fontSize: "0.95rem" }}>Personal information such as name, email address, phone number, and mailing address</li>
                  <li style={{ fontSize: "0.95rem" }}>Donation and transaction details</li>
                  <li style={{ fontSize: "0.95rem" }}>Volunteer, membership or partnership registration details, including date of birth, blood group, city, qualifications, areas of interest and availability</li>
                  <li style={{ fontSize: "0.95rem" }}>Educational or program-related information shared during registrations</li>
                  <li style={{ fontSize: "0.95rem" }}>Website usage information including browser type, IP address, and pages visited</li>
                </ul>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We collect information only when voluntarily submitted or automatically generated through standard website technologies.
                </p>
              </div>

              <div className="legal-section" id="how-we-use-information">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">2.</span> How We Use Information
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

              <div className="legal-section" id="data-protection-and-security">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">3.</span> Data Protection & Security
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

              <div className="legal-section" id="sharing-of-information">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">4.</span> Sharing of Information
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

              <div className="legal-section" id="cookies-and-website-analytics">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">5.</span> Cookies & Website Analytics
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

              <div className="legal-section" id="external-links">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">6.</span> External Links
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Our website may contain links to third-party websites or platforms. NexJyoti Education Foundation
                  is not responsible for the privacy practices or content of external websites.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Users are encouraged to review the privacy policies of any third-party platforms they visit.
                </p>
              </div>

              <div className="legal-section" id="nexjyoti-hub">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">7.</span> NexJyoti Hub App, Registrations and Sign-In
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Hub (hub.nexjyoti.org and its Android app) is our internal workspace for staff and
                  volunteers: team chat, tasks and projects, the calendar, the help desk, the intranet and the
                  organisation directory. Only people on our member register can use it.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Registrations from this website.</strong> When you submit the volunteer or membership
                  registration form, your answers are saved in our website database and also sent to the Hub. A
                  volunteer registration is reviewed there by the relevant team lead or coordinator; if it is
                  accepted, your member profile is created and you are invited to the Hub. A membership registration
                  is kept with our supporter (donor) records, which only authorised staff can see. We email you to
                  confirm we have received it. To stop automated abuse, we keep a scrambled (one-way hashed) form of
                  your device’s network address for up to two days. You do not need to verify your email to register.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Signing in.</strong> You sign in with Google, or with a one-time code we email to your
                  address. With Google, we receive only your name, email address and profile photo. We do not receive
                  your Google password, the Hub has no Hub password of its own, and it does not access your Gmail,
                  Drive, contacts or any other Google data.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>What the Hub stores.</strong>
                </p>
                <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "grid", gap: "8px", listStyle: "disc" }}>
                  <li style={{ fontSize: "0.95rem" }}>Your directory entry: name, member ID, email, phone, team, role, manager, city, skills and joining date</li>
                  <li style={{ fontSize: "0.95rem" }}>Private details, if given: date of birth, blood group, address and emergency contact. Only you and the administrators who manage your record can see them. We do not ask for Aadhaar, PAN or bank details in the Hub.</li>
                  <li style={{ fontSize: "0.95rem" }}>The messages, files, tasks, projects, events and availability you add, and your notification settings</li>
                  <li style={{ fontSize: "0.95rem" }}>Letters issued to you (such as a welcome or appointment letter), which are also emailed to you</li>
                  <li style={{ fontSize: "0.95rem" }}>When you use the Hub: the first and last time on each day, and whether on the web or the Android app. Only the Hub’s administrators and you can see this, it never includes what you read or type, and it is deleted after 180 days.</li>
                  <li style={{ fontSize: "0.95rem" }}>A notification address for your phone and the app version it runs, and error reports when something in the app breaks, so we can fix it</li>
                </ul>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>How we use it.</strong> To confirm you are a NexJyoti member and sign you in; to show your
                  name and photo to other members in chat, tasks and the directory; to organise our work and
                  volunteering; to send you invitations, sign-in codes, letters and the notifications you choose; and
                  to keep the Hub secure and working.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Who can see it.</strong> Other members see what is shared in the spaces and conversations
                  they belong to. Private conversations, private teams and meetings are visible only to the people in
                  them. Information is never sold, never used for advertising, and never shared outside NexJyoti,
                  except with the services that run the Hub: Supabase (database and files, stored in Mumbai, India),
                  Google Firebase (website hosting and phone notifications) and Google Workspace (sending our emails).
                  If a member shares a Canva design link, its preview loads from Canva only when you choose to open it.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Security and backups.</strong> Access to every piece of information is controlled by rules
                  in the database itself, data is encrypted in transit and at rest, and we keep encrypted backups so it
                  can be recovered.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  The Hub’s use of information received from Google APIs adheres to the{" "}
                  <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", fontWeight: "600" }}>
                    Google API Services User Data Policy
                  </a>, including the Limited Use requirements.
                </p>
                <p className="mt-12" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  <strong>Your choices, leaving and deleting.</strong> You can see and update your profile, private
                  details and notification settings in the Hub at any time. When you leave NexJyoti, your access to the
                  Hub is removed. To get a copy of your information, correct it, or have your Hub account and personal
                  information deleted, email{" "}
                  <a href="mailto:info@nexjyoti.org" style={{ color: "var(--primary)", fontWeight: "600" }}>info@nexjyoti.org</a>.
                  We may keep records we are required to keep by law. You can also remove the Hub’s access at any time
                  from your Google Account (Security → Your connections to third-party apps &amp; services).
                </p>
              </div>

              <div className="legal-section" id="childrens-privacy">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">8.</span> Children’s Privacy
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

              <div className="legal-section" id="policy-updates">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">9.</span> Policy Updates
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  NexJyoti Education Foundation may update this Privacy Policy periodically to reflect organizational,
                  legal, or technological changes. Updated versions will be published on this page with revised
                  effective dates.
                </p>
              </div>

              <div className="legal-section" id="contact-us">
                <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="legal-num">10.</span> Contact Us
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  For questions, concerns, or requests related to this Privacy Policy, please contact:
                </p>
                <div style={{ 
                  marginTop: "12px", 
                  padding: "16px 20px", 
                  background: "var(--off-white)", 
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--legal-accent)" 
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
              Last Updated: October 2026
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
