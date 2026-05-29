import React, { useEffect } from "react";
import TeamCard from "../components/TeamCard";

const teamMembers = [
  {
    id: "teamMember1",
    name: "Shivnarayan Kumar",
    role: "Founder & Executive Director",
    emoji: "👨🏽‍💼",
    imageSrc: "/assets/images/shiv.jpeg",
    gradient: "linear-gradient(135deg, #168e6c, #0d5540)",
    linkedinUrl: "#",
    twitterUrl: "#",
  },
  {
    id: "teamMember2",
    name: "Gagan Mahto",
    role: "Co-Founder & Director-Community & Human Development",
    emoji: "👩🏽‍💼",
    imageSrc: "/assets/images/gagan.jpeg",
    gradient: "linear-gradient(135deg, #ef9535, #c86e0f)",
    linkedinUrl: "https://www.linkedin.com/in/gagankrmahto/",
    twitterUrl: "#",
    delay: 1,
  },
  {
    id: "teamMember3",
    name: "Akash Kumar Dubey",
    role: "Director- Technology Innovation & Institutional Systems ",
    emoji: "👨🏽‍🔬",
    imageSrc: "/assets/images/akash.jpeg",
    gradient: "linear-gradient(135deg, #1e88e5, #0d47a1)",
    linkedinUrl: "https://www.linkedin.com/in/akashkumardubey/",
    twitterUrl: "#",
    delay: 2,
  },
  {
    id: "teamMember4",
    name: "Ashish Kumar",
    role: "Director- Academic Innovation & Student Development",
    emoji: "👩🏽‍🎨",
    imageSrc: "/assets/images/ashish.jpeg",
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
          <h1>Transforming Generations Through Education, Values & Opportunity</h1>
          <p className="lead" style={{ maxWidth: "700px", margin: "0 auto" }}>
            Empowering underprivileged children through education, values, and opportunity to break generational poverty.
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
            <h2 style={{ textAlign: "left", marginTop: "10px" }}>From Forgotten Streets to Brighter Futures</h2>
            <div className="divider divider-left"></div>
            <p className="mt-24">
              NexJyoti Education Foundation began with a simple belief — no child should remain trapped in poverty because of where they were born. Our journey started among ragpicker families and economically marginalized communities, where countless children were growing up without access to quality education, guidance, or opportunity.
            </p>
            <p className="mt-16">
              What began as a grassroots effort soon became a mission to transform generations through education, values, and holistic development. Through academic mentorship, preparation for institutions like Jawahar Navodaya Vidyalayas and Netarhat schools, yoga, arts, dance, and Sanskar Varga, we nurture not only capable students but responsible human beings.
            </p>
            <p className='mt-16'>
              Today, NexJyoti is building pathways of hope for children from slum, tribal, and backward communities — empowering them with knowledge, confidence, character, and the opportunity to create a better future for themselves and their generations to come.
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
            <h2>Our Core Principles of Transformation</h2>
            <div className="divider"></div>
            <p className="mt-16">These foundational values drive our mission to break generational poverty and create lasting educational and social impact across communities, states, and future generations.</p>
          </div>

          <div className="grid-3" id="valuesGrid">
            {/* Value 1 */}
            <div className="card text-center animate-on-scroll" id="valEcoCard" style={{ padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>📚</div>
              <h3 style={{ marginBottom: "12px" }}>Transformative Education</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                We believe education is the strongest force for social and economic transformation. By providing foundational learning, mentorship, and preparation for institutions like Jawahar Navodaya Vidyalayas, Netarhat schools, and other centers of excellence, we empower children from marginalized communities to rise beyond poverty and unlock lifelong opportunities.
              </p>
            </div>

            {/* Value 2 */}
            <div className="card text-center animate-on-scroll delay-1" id="valTransCard" style={{ padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🌱</div>
              <h3 style={{ marginBottom: "12px" }}>Holistic Development & Human Values</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                True progress begins with character. Alongside academics, we nurture confidence, discipline, creativity, leadership, and compassion through yoga, arts, dance, personality development, and Sanskar Varga — shaping not only successful students, but responsible and value-driven human beings.              </p>
            </div>

            {/* Value 3 */}
            <div className="card text-center animate-on-scroll delay-2" id="valEmpCard" style={{ padding: "32px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🌍</div>
              <h3 style={{ marginBottom: "12px" }}>Scalable Community Impact</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>
                What began as a grassroots effort among ragpickers in Ranchi has transformed into a scalable model that now operates across multiple states. By empowering local communities to take ownership of education and development initiatives, we create sustainable change that multiplies with every new center we open.
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
            <h2>Driven by Purpose and United for Generational Change.</h2>
            <div className="divider"></div>
            <p className="mt-16" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-body)" }}>
              Behind NexJyoti Education Foundation is a dedicated team of educators, mentors, professionals, and social changemakers united by one mission — to break the cycle of generational poverty through education, values, and opportunity. Every member works towards empowering underserved children with knowledge, confidence, character, and hope to create lasting change in their families and communities.Together, we are building more than educational programs — we are nurturing responsible, compassionate, and empowered future generations capable of transforming society at scale.
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
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>Accountability Rooted in Trust & Transparency</h2>
              <div className="divider divider-left"></div>
              <p className="mt-24">
                NexJyoti Education Foundation is committed to transparency, accountability, and ethical governance in every aspect of its work. We strive to ensure that the majority of our resources directly support educational access, holistic child development, community initiatives, and long-term social transformation programs.
              </p>
              <p className="mt-16">
                Through responsible financial practices and sustainable organizational systems, we aim to build an institution that creates enduring impact across generations and communities.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <a href="/assets/documents/annual-report-2025.pdf" className="btn btn-primary" id="btnDownloadReport" download>
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
