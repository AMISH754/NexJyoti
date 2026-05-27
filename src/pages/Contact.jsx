import React, { useState, useEffect } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

    return () => scrollObserver.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Contact Header */}
      <section className="about-hero" id="contactHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">Connect With Us</span>
          <h1>We are Here to Listen</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Have questions about our transparency, digital school setups, or how to sponsor a vocational lab? Drop us a line!
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="section contact-details-form bg-white" id="contactSection">
        <div className="container contact-grid">
          {/* Left Info Block */}
          <div className="contact-info animate-on-scroll" id="contactInfoCard">
            <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0, marginBottom: "12px" }}>
              Our Headquarters
            </span>
            <h2 style={{ textAlign: "left", marginTop: "10px" }}>Reach Out Directly</h2>
            <div className="divider divider-left" style={{ marginBottom: "2rem" }}></div>

            <div className="contact-info-list" id="contactInfoList">
              {/* Address Card */}
              <div className="contact-item-card" id="contactAddress">
                <div className="contact-icon-wrapper">📍</div>
                <div className="contact-details">
                  <h4>Office Location</h4>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>NexJyoti Complex, 2nd Floor, Vasant Kunj Sector C, New Delhi - 110070</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="contact-item-card" id="contactEmail">
                <div className="contact-icon-wrapper">✉</div>
                <div className="contact-details">
                  <h4>General Inquiries</h4>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>connect@nexjyoti.org</p>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    For partnerships: <strong>partner@nexjyoti.org</strong>
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="contact-item-card" id="contactPhone">
                <div className="contact-icon-wrapper">📞</div>
                <div className="contact-details">
                  <h4>Telephone Hotline</h4>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>+91 (11) 4567 8900</p>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>Mon to Fri, 9:30 AM to 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Card */}
          <div className="card form-card animate-on-scroll delay-1" id="inquiryFormCard">
            {submitted ? (
              <div className="alert alert-success" id="formSuccess" style={{ padding: "24px", textAlign: "center", borderRadius: "var(--radius-md)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✉️</div>
                <h4 style={{ color: "#065f46", marginBottom: "8px", fontWeight: 700 }}>Message Sent Successfully!</h4>
                <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>, for reaching out. A representative from NexJyoti will get back to you at <strong>{formData.email}</strong> within 24-48 business hours.
                </p>
                <button className="btn btn-outline-blue mt-24" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: "1.5rem", color: "var(--primary-dark)" }}>Send an Inquiry</h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactName"
                    placeholder="E.g., Priya Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="contactEmail"
                    placeholder="E.g., priya@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactSubject"
                    placeholder="What is your query about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">Message Details</label>
                  <textarea
                    className="form-control"
                    id="contactMessage"
                    rows="5"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full" id="btnSubmitInquiry" style={{ justifyContent: "center", width: "100%" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section map-embed-container" id="mapEmbedSection" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="map-card" id="googleMapCard">
            <iframe
              className="map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14019.539268688463!2d77.14589254247545!3d28.542419460599427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1c47233df867%3A0xe54e3d3663a89045!2sVasant%20Kunj%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1716584288000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NexJyoti Delhi Headquarters Map Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
