import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Programs() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("edu");

  useEffect(() => {
    // Tab routing support via simple url parameter
    const tabParam = searchParams.get("tab");
    if (tabParam === "edu" || tabParam === "skill" || tabParam === "women") {
      setActiveTab(tabParam);
    }

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
  }, [searchParams]);

  return (
    <div>
      {/* Programs Header */}
      <section className="about-hero" id="programsHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">What We Do</span>
          <h1>Holistic Grassroots Solutions</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            We combine long-term technology access with actionable career guidance to generate permanent paths of rural progress.
          </p>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="section programs-tabs bg-white" id="programsTabsSection">
        <div className="container">
          {/* Tabs Navigation */}
          <ul className="tabs-nav animate-on-scroll" id="programsTabsNav">
            <li>
              <button 
                className={`tab-btn ${activeTab === "edu" ? "active" : ""}`} 
                onClick={() => setActiveTab("edu")}
              >
                📚 Jyoti Gyan Pathshala
              </button>
            </li>
            <li>
              <button 
                className={`tab-btn ${activeTab === "skill" ? "active" : ""}`} 
                onClick={() => setActiveTab("skill")}
              >
                ⚙ Kaushal Jyoti Skilling
              </button>
            </li>
            <li>
              <button 
                className={`tab-btn ${activeTab === "women" ? "active" : ""}`} 
                onClick={() => setActiveTab("women")}
              >
                🤝 Nari Jyoti Guilds
              </button>
            </li>
          </ul>

          {/* Tab 1: Education */}
          {activeTab === "edu" && (
            <div className="tab-content active" id="eduProgram">
              <div className="story-grid" style={{ alignItems: "start", marginBottom: "2rem" }}>
                <div className="animate-on-scroll">
                  <h2>Bridging the Deep Rural Digital Divide</h2>
                  <p className="lead mt-16" style={{ color: "var(--primary)", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.7 }}>
                    Quality education should not be a privilege limited to urban spaces. We build solar-powered computer and internet-linked labs in rural government schools.
                  </p>
                  <p className="mt-16">
                    Our flagship <strong>Jyoti Gyan Pathshala</strong> setup integrates highly robust Raspberry Pi computer systems, off-grid educational intranets loaded with interactive regional-language lessons, and dynamic curriculum templates designed to foster basic logical analysis and creative science concepts.
                  </p>
                  <p className="mt-16">
                    We train local schoolteachers in active digital pedagogical tools and run daily afternoon open computer labs for youth groups, enabling rural boys and girls to apply for colleges and explore job prospects confidently.
                  </p>
                  
                  <div className="flex gap-16 mt-32" style={{ flexWrap: "wrap" }}>
                    <Link to="/donate" className="btn btn-primary">Sponsor a Solar School Lab</Link>
                    <Link to="/contact" className="btn btn-outline-blue">Collaborate as Educational Partner</Link>
                  </div>
                </div>
                
                <div className="story-values-box animate-on-scroll delay-1">
                  <div className="card" style={{ borderLeft: "4px solid var(--primary)", padding: "28px" }}>
                    <h3 style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "0.25rem", fontWeight: 800 }}>35,000+</h3>
                    <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>Students Digitally Literate</h4>
                    <p className="mt-8" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Grade 5 to 10 pupils who can confidently browse, compose, and utilize digital spreadsheets for research.
                    </p>
                  </div>
                  
                  <div className="card" style={{ borderLeft: "4px solid var(--gold)", padding: "28px" }}>
                    <h3 style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "0.25rem", fontWeight: 800 }}>120+</h3>
                    <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>Solar Classrooms Maintained</h4>
                    <p className="mt-8" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Active learning cells running unhindered by common rural load-shedding and power failures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Skilling */}
          {activeTab === "skill" && (
            <div className="tab-content active" id="skillProgram">
              <div className="story-grid" style={{ alignItems: "start", marginBottom: "2rem" }}>
                <div className="animate-on-scroll">
                  <h2>Providing Under-Resourced Youth With Advanced Skills</h2>
                  <p className="lead mt-16" style={{ color: "var(--primary)", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.7 }}>
                    True rural independence requires strong local career capabilities. We provide under-resourced youth with advanced vocational courses.
                  </p>
                  <p className="mt-16">
                    Our program, <strong>Kaushal Jyoti Skilling</strong>, provides fully certified advanced courses in web development basics, data-entry systems, graphic design tools, local network configurations, and dynamic English communication modules. We provide career mentoring booths, directly align graduates with secure digital outsourcing hubs, and help local youth secure dignified jobs right in their native districts.
                  </p>
                  
                  <div className="flex gap-16 mt-32" style={{ flexWrap: "wrap" }}>
                    <Link to="/donate" className="btn btn-primary">Fund a Student's Tuition</Link>
                    <Link to="/contact" className="btn btn-outline-blue">Hire Our Graduates</Link>
                  </div>
                </div>
                
                <div className="story-values-box animate-on-scroll delay-1">
                  <div className="card" style={{ borderLeft: "4px solid var(--primary)", padding: "28px" }}>
                    <h3 style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "0.25rem", fontWeight: 800 }}>15,000+</h3>
                    <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>Job-Ready Youth</h4>
                    <p className="mt-8" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Graduates successfully holding secure local technology and database administrative positions.
                    </p>
                  </div>
                  
                  <div className="card" style={{ borderLeft: "4px solid var(--gold)", padding: "28px" }}>
                    <h3 style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "0.25rem", fontWeight: 800 }}>95%</h3>
                    <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>Course Placement Rate</h4>
                    <p className="mt-8" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Achieved through our direct collaborations with local industries and software service hubs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Women Livelihoods */}
          {activeTab === "women" && (
            <div className="tab-content active" id="womenProgram">
              <div className="story-grid" style={{ alignItems: "start", marginBottom: "2rem" }}>
                <div className="animate-on-scroll">
                  <h2>Fostering Financial Independence for Women</h2>
                  <p className="lead mt-16" style={{ color: "var(--primary)", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.7 }}>
                    True rural progress requires strong local business engines. We train women's self-help guilds in high-demand micro-businesses.
                  </p>
                  <p className="mt-16">
                    We supply training facilities for sustainable organic farming inputs, processing of high-value natural herbs, pressing of seed oils, and manufacturing of zero-waste biodegradable packaging options. We set up physical machinery inside common community clusters, establish basic bookkeeping software skills, and directly connect rural guilds with sustainable e-commerce retail networks across larger metros.
                  </p>
                  <p className="mt-16">
                    This allows mothers and young women to earn an independent livelihood while working right inside their native villages, lowering rural migration rates.
                  </p>
                  
                  <div className="flex gap-16 mt-32" style={{ flexWrap: "wrap" }}>
                    <Link to="/donate" className="btn btn-primary">Support Women Guild Capital</Link>
                    <Link to="/contact" className="btn btn-outline-blue">Procure Wholesale Eco Goods</Link>
                  </div>
                </div>
                
                <div className="story-values-box animate-on-scroll delay-1">
                  <div className="card" style={{ borderLeft: "4px solid var(--primary)", padding: "28px" }}>
                    <h3 style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "0.25rem", fontWeight: 800 }}>2.5x</h3>
                    <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>Average Family Income Growth</h4>
                    <p className="mt-8" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Experienced by our registered guild households within 12 months of skill integration.
                    </p>
                  </div>
                  
                  <div className="card" style={{ borderLeft: "4px solid var(--gold)", padding: "28px" }}>
                    <h3 style={{ fontSize: "2.5rem", color: "var(--gold)", marginBottom: "0.25rem", fontWeight: 800 }}>4,200+</h3>
                    <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>Rural Women Trained</h4>
                    <p className="mt-8" style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      Actively earning and leading community development groups across 5 states.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
