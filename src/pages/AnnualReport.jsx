import React, { useEffect } from "react";

export default function AnnualReport() {
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
      {/* Hero Section */}
      <section className="about-hero" id="annualReportHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">Accountability & Transparency</span>
          <h1>Annual Report</h1>
          <p className="lead" style={{ maxWidth: "750px", margin: "0 auto" }}>
            Transforming Lives Through Education, Values & Opportunity
          </p>
        </div>
      </section>

      {/* Intro Block */}
      <section className="section bg-white" style={{ padding: "60px 0 30px" }}>
        <div className="container-narrow text-center animate-on-scroll">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-body)" }}>
            The Annual Report of NexJyoti Education Foundation reflects our continued commitment to
            breaking the cycle of generational poverty through education, holistic development, and
            community transformation. It highlights the journeys, initiatives, impact stories, and collective
            efforts that are shaping brighter futures for underserved children and communities.
          </p>
          <p className="mt-16" style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--primary)" }}>
            Through this report, we aim to maintain transparency, accountability, and meaningful
            engagement with our supporters, partners, volunteers, and communities.
          </p>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="section bg-off-white" id="foundersMessageSection">
        <div className="container">
          <div className="story-grid">
            <div className="why-visual animate-on-scroll" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", textAlign: "center" }}>
                <img 
                  src="/assets/images/shiv.jpeg" 
                  alt="Shivnarayan Kumar" 
                  style={{ 
                    width: "160px", 
                    height: "160px", 
                    borderRadius: "50%", 
                    objectFit: "cover", 
                    objectPosition: "center top",
                    margin: "0 auto 20px",
                    display: "block",
                    boxShadow: "var(--shadow-md)",
                    border: "3px solid var(--white)"
                  }}
                />
                <h4 style={{ margin: "0 0 4px", fontSize: "1.2rem", color: "var(--primary-dark)" }}>Shivnarayan Kumar</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Founder & Executive Director</p>
                <div style={{ 
                  marginTop: "12px", 
                  display: "inline-block", 
                  padding: "4px 12px", 
                  background: "var(--gold-glow)", 
                  color: "var(--gold-dark)", 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  borderRadius: "50px" 
                }}>
                  ESTD. 2021
                </div>
              </div>
            </div>

            <div className="transparency-content animate-on-scroll delay-1">
              <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0 }}>Leadership Voice</span>
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>Founder’s Message</h2>
              <div className="divider divider-left" style={{ marginBottom: "2rem" }}></div>
              
              <blockquote style={{ 
                position: "relative",
                paddingLeft: "30px",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--text-dark)",
                fontStyle: "italic",
                borderLeft: "4px solid var(--gold)"
              }}>
                <span style={{ 
                  position: "absolute", 
                  left: "10px", 
                  top: "-15px", 
                  fontSize: "4rem", 
                  color: "rgba(217, 119, 6, 0.15)",
                  fontFamily: "serif",
                  lineHeight: 1
                }}>“</span>
                At NexJyoti Education Foundation, we believe that education is not merely a
                pathway to employment — it is a force capable of transforming generations. What
                began as a grassroots effort among ragpicker and economically marginalized
                communities is steadily evolving into a larger movement for educational equity,
                human development, and social transformation.
              </blockquote>

              <p className="mt-16" style={{ fontSize: "0.98rem", lineHeight: 1.7 }}>
                Every child we mentor, every family we support, and every opportunity we create
                strengthens our commitment to building a future where no child’s potential is limited
                by poverty or circumstance.
              </p>

              <p className="mt-16" style={{ fontSize: "0.98rem", lineHeight: 1.7 }}>
                This report reflects not only our achievements, but also the collective hope, trust, and
                determination that continue to drive our mission forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Key Focus Areas */}
      <section className="section bg-white" id="missionFocusSection">
        <div className="container">
          <div className="grid-2">
            
            {/* Left Col: Mission */}
            <div className="card animate-on-scroll" style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "4px solid var(--primary)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📖</div>
              <h3 style={{ fontSize: "1.5rem", color: "var(--primary-dark)", marginBottom: "12px" }}>Our Mission</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7, margin: 0 }}>
                To empower underserved children and communities through education, values, holistic
                development, and opportunity creation — enabling long-term social transformation and breaking
                the cycle of generational poverty.
              </p>
            </div>

            {/* Right Col: Focus Areas */}
            <div className="animate-on-scroll delay-1">
              <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0 }}>Pillars of Action</span>
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>Key Focus Areas</h2>
              <div className="divider divider-left" style={{ marginBottom: "1.5rem" }}></div>
              <ul style={{ display: "grid", gap: "12px", padding: 0, listStyle: "none" }}>
                {[
                  { icon: "📚", text: "Foundational Education & Academic Mentorship" },
                  { icon: "🎓", text: "Competitive Exam Preparation & Talent Development" },
                  { icon: "🧘", text: "Holistic Child Development & Sanskar Varga" },
                  { icon: "💻", text: "Digital Literacy & Technology Access" },
                  { icon: "🛠️", text: "Youth Skill Development & Career Guidance" },
                  { icon: "👩", text: "Community & Women Empowerment" }
                ].map((item, idx) => (
                  <li key={idx} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    padding: "10px 16px", 
                    background: "var(--off-white)", 
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--primary-dark)"
                  }}>
                    <span>{item.icon}</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="section bg-off-white" id="impactHighlightsSection">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Quantifiable Change</span>
            <h2>Impact Highlights</h2>
            <div className="divider"></div>
            <p className="mt-16">Metrics and statistics showing our growing impact across communities and schools.</p>
          </div>

          <div className="grid-3" style={{ marginBottom: "40px" }}>
            {[
              { num: "12,000+", label: "Students Supported", desc: "Through core educational and local literacy drives.", icon: "📚", color: "var(--primary)" },
              { num: "500+", label: "Children Mentored", desc: "Prepared for Jawahar Navodaya & Netarhat school admissions.", icon: "🎓", color: "var(--gold)" },
              { num: "300+", label: "Community Outreach Programs", desc: "Outreach, health checkups, and child rights campaigns.", icon: "📣", color: "var(--green)" },
              { num: "1,200+", label: "Holistic Sessions", desc: "Yoga, arts, dance, character building, and Sanskar Varga.", icon: "🧘", color: "var(--gold)" },
              { num: "2,500+", label: "Volunteers Engaged", desc: "Highly driven mentors and educators across states.", icon: "👥", color: "var(--primary)" },
              { num: "25+", label: "Collaborative Partnerships", desc: "With state departments, corporate CSRs, and local guilds.", icon: "🏢", color: "var(--green)" }
            ].map((stat, idx) => (
              <div key={idx} className="card animate-on-scroll" style={{ padding: "28px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{stat.icon}</div>
                <span className="stat-number" style={{ color: stat.color, fontSize: "2.5rem" }}>{stat.num}</span>
                <h4 style={{ margin: "8px 0 4px", fontSize: "1.05rem", color: "var(--primary-dark)" }}>{stat.label}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Transformation */}
      <section className="section bg-white" id="storiesSection">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Lives Changed</span>
            <h2>Stories of Transformation</h2>
            <div className="divider"></div>
            <p className="mt-16">Behind every program and donation is a real journey of hope, struggle, and achievement.</p>
          </div>

          <div className="grid-2">
            
            {/* Story 1 */}
            <div className="card animate-on-scroll" style={{ overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(135deg, var(--primary-dark), var(--primary))", padding: "30px", color: "white" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "var(--gold-light)" }}>Success Story — Ranchi</span>
                <h3 style={{ color: "white", margin: "6px 0 0", fontSize: "1.3rem" }}>Pathways out of the Slums</h3>
              </div>
              <div className="card-body">
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  "Coming from a family of ragpickers, school was a distant dream for Rohan. He joined our community center in Ranchi, where he was provided with basic numeracy training and rigorous academic guidance. With constant mentoring, Rohan cleared the admission test for a local state residential center. Today, he is reading, drawing, and dreaming of becoming a science teacher."
                </p>
                <div style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ fontSize: "1.2rem" }}>🧑🏽‍🎓</div>
                  <div>
                    <strong style={{ fontSize: "0.88rem", display: "block" }}>Rohan M.</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Class 6 Student, Ranchi Center</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="card animate-on-scroll delay-1" style={{ overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", padding: "30px", color: "white" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "var(--white)" }}>Sanskar Varga Impact</span>
                <h3 style={{ color: "white", margin: "6px 0 0", fontSize: "1.3rem" }}>Nurturing Character & Confidence</h3>
              </div>
              <div className="card-body">
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                  "Kriti, a shy girl from a tribal village, struggled with low self-esteem and stage fright. Through our daily Sanskar Varga sessions combining public speaking, value education, and yoga, she found her voice. She recently represented her district in a regional debate championship, winning second place. Kriti is now a youth peer mentor, guiding younger girls in her community."
                </p>
                <div style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ fontSize: "1.2rem" }}>👩🏽‍🎓</div>
                  <div>
                    <strong style={{ fontSize: "0.88rem", display: "block" }}>Kriti K.</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Debater & Youth Mentor, Kishore Ganj</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transparency, Accountability & Looking Ahead */}
      <section className="section bg-off-white" id="transparencyOutlookSection" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="grid-2">
            
            <div className="animate-on-scroll">
              <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0 }}>Financial Integrity</span>
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>Transparency & Accountability</h2>
              <div className="divider divider-left" style={{ marginBottom: "1.5rem" }}></div>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.7 }}>
                NexJyoti Education Foundation is committed to ethical governance, financial responsibility, and
                transparent utilization of resources. We continuously strive to ensure that contributions create
                meaningful, measurable, and sustainable impact across communities.
              </p>
              <p className="mt-12" style={{ fontSize: "0.98rem", lineHeight: 1.7 }}>
                Our operations are audited annually by certified independent firms, and all financial logs, 80G
                records, and project expenditures are kept in public domains for stakeholders' review.
              </p>
            </div>

            <div className="animate-on-scroll delay-1">
              <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0 }}>Future Goals</span>
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>Looking Ahead</h2>
              <div className="divider divider-left" style={{ marginBottom: "1.5rem" }}></div>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.7 }}>
                As we continue expanding our initiatives, our vision remains rooted in creating large-scale
                educational and social transformation across underserved communities. We aspire to build an
                institution that nurtures empowered, educated, and value-driven future generations capable of
                transforming society at scale.
              </p>
              <p className="mt-12" style={{ fontSize: "0.98rem", lineHeight: 1.7 }}>
                Over the next year, we aim to double our learning centers, establish five solar computer lab stations,
                and expand support structures for children's admission in centers of excellence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PDF Download Section */}
      <section className="section bg-white" id="downloadReportSection">
        <div className="container">
          <div className="card form-card animate-on-scroll" style={{ 
            maxWidth: "750px", 
            margin: "0 auto", 
            padding: "48px 40px", 
            borderRadius: "var(--radius-lg)",
            background: "linear-gradient(135deg, var(--primary-dark) 0%, #173d75 100%)",
            color: "white",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>📄</div>
            <h3 style={{ color: "white", fontSize: "1.6rem", marginBottom: "10px" }}>Download Full Annual Report</h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.98rem", maxWidth: "500px", margin: "0 auto 24px" }}>
              Get detailed insights into our financial reports, audit balances, classroom expenditures, and complete student tracking data.
            </p>
            <a 
              href="/assets/documents/annual-report-2025.pdf" 
              className="btn btn-primary btn-lg" 
              download
              style={{ display: "inline-flex", justifyContent: "center" }}
            >
              📥 Download PDF Report
            </a>
          </div>
        </div>
      </section>

      {/* Thank you Footer */}
      <section className="section bg-off-white" style={{ padding: "60px 0" }}>
        <div className="container text-center animate-on-scroll">
          <h2 style={{ color: "var(--primary-dark)", fontSize: "1.8rem" }}>Thank You</h2>
          <div className="divider" style={{ marginBottom: "1.5rem" }}></div>
          <p className="lead-text" style={{ maxWidth: "700px", margin: "0 auto 12px", fontSize: "1.05rem", lineHeight: 1.7 }}>
            We extend our heartfelt gratitude to our students, families, educators, volunteers, supporters, and
            partners who continue to believe in our mission and contribute towards creating lasting
            generational change.
          </p>
          <strong style={{ fontSize: "1.1rem", color: "var(--primary-dark)" }}>NexJyoti Education Foundation</strong>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>Ranchi, Jharkhand, India</p>
        </div>
      </section>
    </div>
  );
}
