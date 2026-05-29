import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Programs() {
  const { hash } = useLocation();

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

    // Handle hash scrolling on load or path change
    if (hash) {
      const targetId = hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }

    return () => scrollObserver.disconnect();
  }, [hash]);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const programsData = [
    {
      id: "edu-access",
      badge: "Pillar 1 — Academic Foundations",
      title: "Educational Access & Excellence",
      icon: "📚",
      desc: "Quality primary and secondary education should not be a privilege. We establish free study support centers and run intensive school enrollment drives to bring children from slum, tribal, and marginalized communities into active classrooms.",
      points: [
        "Free tuition support for school students (Class 1–10)",
        "Daily subject mentoring, textbooks, and learning kits",
        "School enrollment campaigns targeting dropouts",
        "Continuous teacher capacity-building workshops"
      ],
      ctaText: "Sponsor a Child's Education",
      ctaLink: "/donate",
      statNum: "12,000+",
      statLabel: "Children Educated",
      statDesc: "Students provided with foundational academic support and learning toolkits.",
      gradient: "linear-gradient(135deg, #168e6c, #0d5540)",
      bgColor: "bg-white"
    },
    {
      id: "mentorship",
      badge: "Pillar 2 — Excellence & Opportunity",
      title: "Student Mentorship & Talent Development",
      icon: "🎓",
      desc: "We actively identify talented students from underprivileged backgrounds and prepare them for admissions to top residential schools like Jawahar Navodaya Vidyalayas, Netarhat, and other centers of excellence.",
      points: [
        "Rigorous entrance exam preparation & mocks",
        "One-on-one professional mentorship & counseling",
        "Merit-cum-means scholarships for secondary studies",
        "Guidance on national talent exams and scholarship schemes"
      ],
      ctaText: "Support Merit Scholarships",
      ctaLink: "/donate",
      statNum: "500+",
      statLabel: "Admissions Secured",
      statDesc: "Underprivileged students placed in prestigious centers of excellence.",
      gradient: "linear-gradient(135deg, #1e88e5, #0d47a1)",
      bgColor: "bg-off-white"
    },
    {
      id: "holistic-edu",
      badge: "Pillar 3 — Character & Wellness",
      title: "Holistic Learning & Value Education",
      icon: "🧘",
      desc: "True education builds both capability and character. Through our Sanskar Varga sessions, we nurture values, self-discipline, and confidence in children, preparing them to be responsible citizens.",
      points: [
        "Sanskar Varga (value education & ethical lessons)",
        "Regular yoga, meditation, and physical fitness sessions",
        "Creative expression via arts, dance, drama, and craft",
        "Confidence building and public speaking workshops"
      ],
      ctaText: "Volunteer for Holistic Camps",
      ctaLink: "/donate#volunteer",
      statNum: "1,200+",
      statLabel: "Daily Attendees",
      statDesc: "Children actively attending Sanskar Varga and character building sessions.",
      gradient: "linear-gradient(135deg, #e040fb, #aa00ff)",
      bgColor: "bg-white"
    },
    {
      id: "youth-skilling",
      badge: "Pillar 4 — Career Pathways",
      title: "Youth Skilling & Career Readiness",
      icon: "🛠️",
      desc: "We bridge the gap between formal education and real-world employment. Our specialized vocational training equips young adults with professional skills, helping them secure sustainable jobs.",
      points: [
        "Web development, coding, and basic software skills",
        "Data-entry systems and administrative tools training",
        "English communication, soft skills, and interview prep",
        "Job placement support and local industry connections"
      ],
      ctaText: "Fund Skilling Tuition",
      ctaLink: "/donate",
      statNum: "3,500+",
      statLabel: "Youth Employed",
      statDesc: "Graduates working in technology, administration, and services.",
      gradient: "linear-gradient(135deg, #ef9535, #c86e0f)",
      bgColor: "bg-off-white"
    },
    {
      id: "digital-literacy",
      badge: "Pillar 5 — Technology Access",
      title: "Digital Inclusion & Literacy",
      icon: "💻",
      desc: "To survive in the modern economy, digital literacy is essential. We install solar-powered computer labs in rural government schools, giving children access to advanced digital tools.",
      points: [
        "Solar-powered computer configurations in rural areas",
        "Offline educational servers loaded with interactive curriculum",
        "Practical classes on browsing, coding, and document design",
        "Free community digital kiosks for online government forms"
      ],
      ctaText: "Sponsor a Solar Tech Lab",
      ctaLink: "/donate",
      statNum: "120+",
      statLabel: "Tech Labs Built",
      statDesc: "Solar classrooms running uninterrupted by rural electricity failures.",
      gradient: "linear-gradient(135deg, #2A62B5, #0D2E5C)",
      bgColor: "bg-white"
    },
    {
      id: "community-empowerment",
      badge: "Pillar 6 — Sustainable Livelihoods",
      title: "Community & Women Empowerment",
      icon: "🌱",
      desc: "We foster financial independence and leadership at the grassroots level. By training women's self-help groups in sustainable skills, we create self-sustaining village economies.",
      points: [
        "Organic farming inputs and local processing workshops",
        "Micro-enterprise setups (seed-oil, eco-bags, organic items)",
        "Bookkeeping, digital bank accounts, and marketing training",
        "Awareness camps on health, hygiene, and women rights"
      ],
      ctaText: "Support Women Guilds",
      ctaLink: "/donate",
      statNum: "4,200+",
      statLabel: "Women Entrepreneurs",
      statDesc: "Guild members earning independent livelihoods inside their native villages.",
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      bgColor: "bg-off-white"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero" id="programsHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">What We Do</span>
          <h1>Our Core Initiatives</h1>
          <p className="lead" style={{ maxWidth: "750px", margin: "0 auto" }}>
            We combine quality primary education, character building, technology access, and career training to create permanent pathways of progress.
          </p>
        </div>
      </section>

      {/* Program Index Quick Navigator */}
      <section className="programs-nav-strip" style={{ 
        position: "sticky", 
        top: "var(--nav-height)", 
        zIndex: 90, 
        borderBottom: "1px solid var(--border)",
        background: "var(--nav-bg-scrolled)",
        backdropFilter: "blur(12px)",
        padding: "12px 0"
      }}>
        <div className="container">
          <ul style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "16px", 
            listStyle: "none", 
            padding: 0, 
            margin: 0,
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollbarWidth: "none"
          }} className="programs-quick-nav">
            {programsData.map((prog) => (
              <li key={prog.id}>
                <button 
                  onClick={() => handleNavClick(prog.id)}
                  style={{
                    border: "none",
                    background: "none",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    padding: "8px 16px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    transition: "all var(--transition)",
                    backgroundColor: "var(--off-white)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--primary-glow)";
                    e.target.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "var(--off-white)";
                    e.target.style.color = "var(--text-dark)";
                  }}
                >
                  {prog.icon} {prog.title.split(" & ")[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detailed Program Sections */}
      {programsData.map((prog, idx) => (
        <section 
          className={`section ${prog.bgColor}`} 
          id={prog.id} 
          key={prog.id}
          style={{ 
            padding: "80px 0", 
            borderBottom: idx < programsData.length - 1 ? "1px solid var(--border)" : "none",
            scrollMarginTop: "calc(var(--nav-height) + 60px)"
          }}
        >
          <div className="container">
            <div className="story-grid" style={{ alignItems: "center" }}>
              
              {/* Left Column: Details (alternate layouts can be visually interesting, but standard story-grid handles stack nicely on mobile) */}
              <div className="animate-on-scroll">
                <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0 }}>
                  {prog.badge}
                </span>
                <h2 style={{ textAlign: "left", marginTop: "10px", fontSize: "2rem", color: "var(--primary-dark)" }}>
                  {prog.icon} {prog.title}
                </h2>
                <div className="divider divider-left" style={{ marginBottom: "2rem" }}></div>
                
                <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-body)" }}>
                  {prog.desc}
                </p>

                <ul style={{ display: "grid", gap: "12px", listStyle: "none", padding: 0, margin: "24px 0 32px" }}>
                  {prog.points.map((point, pIdx) => (
                    <li key={pIdx} style={{ display: "flex", gap: "12px", alignItems: "start", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--green)", fontWeight: "bold", fontSize: "1.2rem", lineHeight: 1 }}>✔</span>
                      <span style={{ color: "var(--text-body)" }}>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link to={prog.ctaLink} className="btn btn-secondary" style={{ display: "inline-flex" }}>
                  {prog.ctaText} →
                </Link>
              </div>

              {/* Right Column: Dynamic Statistics Card */}
              <div className="animate-on-scroll delay-1" style={{ display: "flex", justifyContent: "center" }}>
                <div className="card" style={{ 
                  width: "100%", 
                  maxWidth: "380px", 
                  borderRadius: "var(--radius-lg)", 
                  overflow: "hidden", 
                  boxShadow: "var(--shadow-lg)" 
                }}>
                  <div style={{ 
                    background: prog.gradient, 
                    padding: "40px 30px", 
                    color: "white", 
                    textAlign: "center" 
                  }}>
                    <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "10px" }}>{prog.icon}</span>
                    <h3 style={{ fontSize: "3rem", fontWeight: 800, color: "white", margin: 0, lineHeight: 1 }}>
                      {prog.statNum}
                    </h3>
                    <h4 style={{ color: "var(--gold-light)", margin: "8px 0 0", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
                      {prog.statLabel}
                    </h4>
                  </div>
                  <div className="card-body" style={{ padding: "28px", textAlign: "center", backgroundColor: "var(--card-bg)" }}>
                    <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
                      {prog.statDesc}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="cta-banner" aria-label="Support Programs">
        <div className="cta-overlay"></div>
        <div className="container cta-inner animate-on-scroll">
          <div className="cta-text">
            <h2>Partner With Us for Local Transformation</h2>
            <p>Whether you want to sponsor a digital lab, fund vocational classes, or volunteer your talent, your support creates generational change.</p>
          </div>
          <div className="cta-actions">
            <Link to="/donate" className="btn btn-primary btn-lg" id="ctaDonate">Support Programs ❤️</Link>
            <Link to="/contact" className="btn btn-outline btn-lg" id="ctaContact">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
