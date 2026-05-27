import React, { useEffect } from "react";
import TeamCard from "../components/TeamCard";

const teamMembers = [
  {
    id: "teamMember1",
    name: "Dr. Aniket Sharma",
    role: "Founder & Executive Director",
    emoji: "👨🏽‍💼",
    gradient: "linear-gradient(135deg, #168e6c, #0d5540)",
    linkedinUrl: "#",
    twitterUrl: "#",
  },
  {
    id: "teamMember2",
    name: "Meera Krishnan",
    role: "Director, Digital Education Path",
    emoji: "👩🏽‍💼",
    gradient: "linear-gradient(135deg, #ef9535, #c86e0f)",
    linkedinUrl: "#",
    twitterUrl: "#",
    delay: 1,
  },
  {
    id: "teamMember3",
    name: "Dr. Rajesh Varma",
    role: "Chief Technology Advisor",
    emoji: "👨🏽‍🔬",
    gradient: "linear-gradient(135deg, #1e88e5, #0d47a1)",
    linkedinUrl: "#",
    twitterUrl: "#",
    delay: 2,
  },
  {
    id: "teamMember4",
    name: "Shreya Deshmukh",
    role: "Head of Community Partnerships",
    emoji: "👩🏽‍🎨",
    gradient: "linear-gradient(135deg, #e040fb, #aa00ff)",
    linkedinUrl: "#",
    twitterUrl: "#",
    delay: 3,
  },
];

export default function About() {
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

  return (
    <div>
      {/* About Page Hero */}
      <section className="about-hero" id="aboutPageHero">
        <div className="container animate-on-scroll">
          <span className="section-subtitle">Our Journey & Purpose</span>
          <h1>Bringing Light to Grassroots Learning</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            NexJyoti blends structured digital education with modern vocational skilling to resolve the critical career and education gaps in rural spaces.
          </p>
        </div>
      </section>

      {/* Detailed Story Section */}
      <section className="section story-detailed bg-white" id="storyDetailedSection">
        <div className="container story-grid">
          <div className="story-content animate-on-scroll">
            <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0, marginBottom: "12px" }}>
              Our Roots
            </span>
            <h2 style={{ textAlign: "left", marginTop: "10px" }}>Born from a Simple Promise to Ignite Minds</h2>
            <div className="divider divider-left"></div>
            <p className="mt-24">
              NexJyoti Education Foundation started in 2014 when a group of software engineers and social scientists visited rural parts of central India. They witnessed firsthand the massive digital divide. While city schools integrated advanced online modules, rural classrooms lacked even basic electrical connectivity, let alone access to computer resources—leaving brilliant young minds completely cut off from the modern digital economy.
            </p>
            <p className="mt-16">
              We realized that to give these children a fair shot at the future, we must bring the "Jyoti" (light) of digital learning straight to their schools. By installing solar-powered computer units, setting up offline study networks, and providing hands-on training to local teachers, we built self-sustaining models of academic growth.
            </p>
          </div>

          <div className="why-visual animate-on-scroll delay-2">
            <div className="why-img-wrap">
              <img src="/assets/images/why-us.jpg" alt="Students learning at NexJyoti center" style={{ height: "360px" }} />
              <div className="why-badge-float">
                <span>💡</span>
                <div>
                  <strong>Est. 2014</strong>
                  <small>Over a Decade of Impact</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Detailed React Port) */}
      <section className="section bg-off-white" id="missionVisionSection">
        <div class="container">
          <div className="about-card-container">
            {/* Mission Card */}
            <div className="about-detailed-card animate-on-scroll">
              <h2 className="huge-heading">Mission</h2>
              <p className="lead-text">
                <strong>Breaking the Chains of Poverty through Education</strong> — our mission is clear and resolute: to break the chain of continued poverty from generation to generation. We passionately believe that no child should be deprived of quality education, and we are dedicated to making this belief a reality. By focusing on education, we aim to empower each child with the tools and knowledge needed to break free from the cycle of poverty, ensuring a brighter future for generations to come. Our mission is a pledge to create a world where education becomes the key that unlocks doors to opportunity, dreams, and sustainable change.
              </p>
            </div>

            {/* Vision Card */}
            <div className="about-detailed-card animate-on-scroll delay-1">
              <h2 className="huge-heading">Vision</h2>
              <p className="lead-text">
                <strong>Nurturing Dreams, Creating Futures</strong> — Our vision at NexJyoti extends beyond the present into a future where every child's dream is nurtured and realized. We envision a world where education is not a luxury but a fundamental right, accessible to every child irrespective of their socio-economic background. Through quality education, we aspire to empower children to envision a future filled with possibilities, enabling them to become architects of their destinies. Our vision is to create a ripple effect, transforming communities and societies by investing in the potential of each child, one dream at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section core-values bg-white" id="coreValuesSection">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">What Guides Us</span>
            <h2>Our Fundamental Core Values</h2>
            <div className="divider"></div>
            <p className="mt-16">These three foundational pillars shape every project we fund, evaluate, and scale across states.</p>
          </div>

          <div className="grid-3" id="valuesGrid">
            {/* Value 1 */}
            <div className="card text-center animate-on-scroll" id="valEcoCard" style={{ padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>💻</div>
              <h3 style={{ marginBottom: "12px" }}>Digital Equality</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                Every student deserves high-quality computer education. We ensure our classes are interactive, modern, and aligned with current industrial career requirements.
              </p>
            </div>

            {/* Value 2 */}
            <div className="card text-center animate-on-scroll delay-1" id="valTransCard" style={{ padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>💎</div>
              <h3 style={{ marginBottom: "12px" }}>Radical Transparency</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                We share audit sheets, class registration records, and classroom equipment counts openly. Over 88% of all funds flow directly to local projects.
              </p>
            </div>

            {/* Value 3 */}
            <div className="card text-center animate-on-scroll delay-2" id="valEmpCard" style={{ padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🤝</div>
              <h3 style={{ marginBottom: "12px" }}>Community Empowerment</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                We do not enforce external frameworks. Our programs are designed, managed, and sustained in collaboration with rural Gram Panchayats and local guilds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section (Detailed Team Intro Port) */}
      <section className="section leadership bg-off-white" id="leadershipSection">
        <div className="container">
          <div className="section-header text-center animate-on-scroll">
            <span className="section-label">Our Pioneers</span>
            <h2>A Collective Force for Change</h2>
            <div className="divider"></div>
            <p className="mt-16" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-body)" }}>
              Our team is the driving force behind our impactful initiatives. Comprising dedicated individuals who share a common passion for education and social change, our team works tirelessly to turn our mission and vision into reality. Each member brings unique skills, experiences, and perspectives, contributing to the diverse tapestry of our organization. Together, we are united by a singular purpose: to create lasting change in the lives of children facing adversity. Meet the faces behind NexJyoti, a collective force committed to breaking barriers and fostering a brighter future for every child.
            </p>
          </div>

          <div className="team-grid" id="teamGridWrapper">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Transparency & Audits Section */}
      <section className="section transparency" id="transparencySection">
        <div className="container">
          <div className="story-grid">
            <div className="transparency-content animate-on-scroll">
              <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0, marginBottom: "12px" }}>
                Financial Responsibility
              </span>
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>Trust Built on Meticulous Accountability</h2>
              <div className="divider divider-left"></div>
              <p className="mt-24">
                We take pride in our robust audit mechanisms. We are certified under Section 80G and 12A of the Income Tax Act. Our accounts are audited annually by certified independent firms, and our allocation reports are shared in open access formats with all supporters.
              </p>
              <p className="mt-16">
                Over 88% of your donations fund direct classroom and vocational training assets (computer units, networking tools, textbooks, solar panels). 7% covers essential operational supervision, and 5% is allocated for fundraising efforts.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <a href="#" className="btn btn-primary" id="btnDownloadReport">
                  Download Annual Report 2025 (PDF)
                </a>
              </div>
            </div>

            <div className="transparency-visual animate-on-scroll delay-1" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ fontSize: "2.5rem" }}>📊</div>
                <div>
                  <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>CRISIL Rated A+</h4>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>Top rating for overall non-profit execution integrity & financial control.</p>
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ fontSize: "2.5rem" }}>📜</div>
                <div>
                  <h4 style={{ margin: 0, color: "var(--primary-dark)" }}>GuideStar Platinum Seal</h4>
                  <p style={{ margin: 0, fontSize: "0.875rem" }}>Premium rank for transparency and extensive results disclosure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
