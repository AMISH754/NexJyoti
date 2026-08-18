import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Staggered CountUp Component
function CountUp({ target, suffix, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const step = target / steps;

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, trigger]);

  return <span className="stat-number">{count.toLocaleString("en-IN")}{suffix}</span>;
}

export default function Home() {
  // Testimonials Tab & Slider State
  const [activeTab, setActiveTab] = useState("leadership"); // 'leadership' | 'volunteers'
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef(null);

  const leadershipTestimonials = [
    {
      quote: "NexJyoti is more than an organisation to me—it is a commitment to ensure that a child’s future is not decided by poverty or circumstance. Through education, mentorship and sustained support, we aim to help children break the cycle of generational poverty and grow into confident contributors to society.",
      author: "Shivnarayan Kumar",
      role: "Founder, Chairman & Executive Director",
      avatar: "SK",
      linkedinUrl: "https://www.linkedin.com/in/physicswithsn/",
    },
    {
      quote: "Real change begins when communities are involved, respected and empowered. At NexJyoti, I believe our responsibility is not only to educate children, but also to strengthen families and build an environment where every child receives encouragement to dream and progress.",
      author: "Gagan Kumar Mahto",
      role: "Co-Founder & Director – Community Development",
      avatar: "GM",
      linkedinUrl: "https://www.linkedin.com/in/gagankrmahto/",
    },
    {
      quote: "Technology and strong systems can multiply social impact when used with purpose. My vision is to help NexJyoti become a transparent, efficient and data-driven institution where technology strengthens education, accountability and long-term growth.",
      author: "Akash Kumar Dubey",
      role: "Director – Technology & Institutional Systems",
      avatar: "AD",
      linkedinUrl: "https://www.linkedin.com/in/akashkumardubey/",
    },
    {
      quote: "Education must go beyond completing a syllabus. It should build curiosity, confidence, discipline and character. At NexJyoti, our academic efforts are focused on helping every child discover their potential and develop the foundation required for a better future.",
      author: "Ashish Kumar",
      role: "Director – Academics & Student Development",
      avatar: "AK",
      linkedinUrl: "https://www.linkedin.com/in/ashish-kumar-9ba64521b/",
    },
    {
      quote: "Mission Udaan represents hope in action. Every child we teach carries dreams that deserve guidance and opportunity. My commitment is to ensure that our students receive consistent mentoring, quality learning and the confidence to aim beyond the limitations around them.",
      author: "Vivekanand Vidhikar",
      role: "Deputy Director & Head – Mission Udaan",
      avatar: "VV",
    },
    {
      quote: "Volunteers are the energy behind every meaningful initiative at NexJyoti. I believe that when committed people are organised around a common purpose, even small contributions can create lasting change in the lives of children and communities.",
      author: "Pappu Kumar",
      role: "Deputy Director – Events & Volunteer Management",
      avatar: "PK",
    },
    {
      quote: "Every child learns differently, and meaningful education must respond to that reality. My focus is to develop practical, engaging and innovative learning approaches that make education understandable, enjoyable and effective for the children we serve.",
      author: "Ashish Kumar",
      role: "Deputy Director – Academic Innovation",
      avatar: "AK",
    },
    {
      quote: "Talent is not limited by geography. Children in rural communities deserve the same access to guidance, quality education and opportunity as anyone else. Through NexJyoti, I am committed to helping bridge that gap and bring educational opportunities closer to underserved families.",
      author: "Santosh Kumar Mehta",
      role: "Deputy Director – Rural Development",
      avatar: "SM",
    },
    {
      quote: "Every child, volunteer and community we work with has a story worth telling. My role is to ensure that NexJyoti’s work is communicated with authenticity, dignity and responsibility so that our impact can inspire more people to participate in the mission.",
      author: "Jageshwar Vishwakarma",
      role: "Head – Media & Communications",
      avatar: "JV",
    },
    {
      quote: "Tribal children possess immense potential, but many still lack access to the opportunities and guidance they deserve. My commitment is to help identify, support and mentor these students so they can continue their education with confidence and build a stronger future.",
      author: "Nishant Kumar",
      role: "Tribal Students Welfare Officer",
      avatar: "NK",
    },
  ];

  const volunteerTestimonials = [
    {
      quote: "Being associated with NexJyoti has strengthened my belief that even a small contribution of time and effort can create a meaningful difference in a child’s life. I feel proud to be part of a team that works with sincerity, compassion and purpose to make education more accessible for children who deserve better opportunities.",
      author: "Shivani Kumari",
      role: "Volunteer",
      avatar: "SK",
    },
    {
      quote: "NexJyoti has given me an opportunity to contribute to something larger than myself. Working with children and communities has shown me how powerful education can be in changing confidence, aspirations and possibilities. I am grateful to be part of a mission where every volunteer’s effort contributes towards building a brighter and more equal future.",
      author: "Swati Kumari",
      role: "Volunteer",
      avatar: "SK",
    },
    {
      quote: "For me, volunteering with NexJyoti is about giving children the encouragement and opportunities they may not otherwise receive. Every interaction reminds me that education can change not just one child’s life, but the future of an entire family. I feel privileged to contribute alongside people who genuinely believe in creating long-term social impact.",
      author: "Sapna Kumari",
      role: "Volunteer",
      avatar: "SK",
    },
    {
      quote: "My journey with NexJyoti has taught me that meaningful change begins with consistency, patience and genuine concern for others. Supporting children in their learning and development is both a responsibility and a source of inspiration. I am proud to contribute to a mission that believes every child deserves the opportunity to learn, grow and dream.",
      author: "Vandana Kumari",
      role: "Volunteer",
      avatar: "VK",
    },
    {
      quote: "Volunteering at NexJyoti has helped me understand the true value of service through education. Seeing children participate, learn and become more confident motivates me to contribute with greater dedication. I believe that when we guide children with care and provide them the right opportunities, we help build stronger individuals, families and communities.",
      author: "Harshita",
      role: "Volunteer",
      avatar: "H",
    },
    {
      quote: "Every child carries potential, but not every child receives the same opportunity to discover it. Through NexJyoti, I have the chance to contribute towards bridging that gap. The experience has made me more committed to serving children and communities through education, teamwork and consistent effort toward creating meaningful and lasting social change.",
      author: "Raju Mehta",
      role: "Volunteer",
      avatar: "RM",
    },
    {
      quote: "NexJyoti represents the belief that education can create lasting transformation when combined with dedication and opportunity. Being part of this journey allows me to contribute my time and energy toward supporting children who need encouragement and guidance. I feel proud to work alongside volunteers who are united by a common purpose and responsibility.",
      author: "Ajay Kumar",
      role: "Volunteer",
      avatar: "AK",
    },
    {
      quote: "Being a volunteer with NexJyoti has shown me how collective effort can create real impact. Every activity, interaction and small contribution becomes meaningful when it helps a child move closer to a better future. I am grateful to be part of a team committed to education, empowerment and creating opportunities for underserved children.",
      author: "Sushane Kumar Mahto",
      role: "Volunteer",
      avatar: "SM",
    },
    {
      quote: "To me, volunteering with NexJyoti means standing beside children who have dreams and potential but may lack access to the right opportunities. Education can open doors that circumstances often keep closed. I am proud to contribute to an organisation that works with compassion and determination to help children build confidence, knowledge and a stronger future.",
      author: "Sufia Jawed",
      role: "Volunteer",
      avatar: "SJ",
    },
    {
      quote: "My experience with NexJyoti has reinforced my belief that change begins when people choose to contribute with sincerity. Supporting children through education and encouragement gives purpose to every effort we make. I am happy to be part of a team that is committed to helping underserved children discover their potential and create better possibilities for themselves.",
      author: "Saloni Kumari",
      role: "Volunteer",
      avatar: "SK",
    },
    {
      quote: "Working on the NexJyoti website has been more than a technical task for me; it has been an opportunity to contribute wholeheartedly to a mission I genuinely believe in. My aim is to build the strongest and most meaningful digital presence possible so that NexJyoti’s work, values and impact can reach and inspire more people.",
      author: "Amish Kumar Dubey",
      role: "Website Development Volunteer",
      avatar: "AD",
    },
    {
      quote: "Design gives a mission a visual identity, and at NexJyoti I am grateful to contribute creatively to that journey. Through graphics and communication materials, I aim to present the organisation’s work with clarity, consistency and purpose. Being part of this team allows me to learn, create and support a cause that is making a meaningful difference.",
      author: "Ansh Kumar",
      role: "Graphic Design Intern",
      avatar: "AK",
    },
  ];

  const currentTestimonials = activeTab === "leadership" ? leadershipTestimonials : volunteerTestimonials;

  // Stats counter trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsSectionRef = useRef(null);

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

    // Stats section observer
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsSectionRef.current) {
      statsObserver.observe(statsSectionRef.current);
    }

    // Testimonials slider timer
    startSlider();

    return () => {
      scrollObserver.disconnect();
      statsObserver.disconnect();
      stopSlider();
    };
  }, [activeTab]);

  const startSlider = () => {
    stopSlider();
    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentTestimonials.length);
    }, 6000);
  };

  const stopSlider = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentSlide(0);
  };

  const prevSlide = () => {
    startSlider();
    setCurrentSlide((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  const nextSlide = () => {
    startSlider();
    setCurrentSlide((prev) => (prev + 1) % currentTestimonials.length);
  };

  return (
    <div>
      {/* ── HERO SECTION ── */}
      <section className="hero" id="hero" aria-label="Hero Banner">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-particles" aria-hidden="true">
          <span className="particle p1"></span>
          <span className="particle p2"></span>
          <span className="particle p3"></span>
          <span className="particle p4"></span>
          <span className="particle p5"></span>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge animate-on-scroll">
              <span className="badge-dot"></span>
              Transforming Lives Since 2021
            </div>
            <h1 className="animate-on-scroll delay-1">
              Breaking the Cycle of Poverty<br />
              <span className="hero-highlight">Through Education</span>
            </h1>
            <p className="hero-subtitle animate-on-scroll delay-2">
              NexJyoti Education Foundation believes every child deserves quality education,
              every youth deserves opportunity, and every community deserves dignity.
            </p>
            <div className="hero-tagline animate-on-scroll delay-3">
              <span>✦ Educate</span>
              <span>✦ Empower</span>
              <span>✦ Elevate</span>
            </div>
            <div className="hero-actions animate-on-scroll delay-4">
              <Link to="/programs" className="btn btn-primary btn-lg" id="heroPrograms">Explore Programs</Link>
              <Link to="/donate" className="btn btn-outline btn-lg" id="heroDonate">Donate Today</Link>
            </div>
          </div>
          <div className="hero-visual animate-on-scroll delay-2">
            <div className="hero-card-stack">
              <div className="hero-stat-card hc1">
                <span className="hc-num">1000+</span>
                <span className="hc-lbl">Children Educated</span>
              </div>
              <div className="hero-stat-card hc2">
                <span className="hc-num">100+</span>
                <span className="hc-lbl">Girls Empowered</span>
              </div>
              <div className="hero-stat-card hc3">
                <span className="hc-num">4+</span>
                <span className="hc-lbl">Centers</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator" aria-hidden="true">
          <span>Scroll Down</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="stats-section" id="statsSection" ref={statsSectionRef} aria-label="Impact Statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-block animate-on-scroll">
              <CountUp target={1000} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Student Educated</span>
            </div>
            <div className="stat-block animate-on-scroll delay-1">
              <CountUp target={10} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Excursion and science education trips</span>
            </div>
            <div className="stat-block animate-on-scroll delay-2">
              <CountUp target={4} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Centers</span>
            </div>
            <div className="stat-block animate-on-scroll delay-3">
              <CountUp target={100} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Girls Empowered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION STRIP ── */}
      <section className="mission-strip section-sm bg-off-white">
        <div className="container">
          <div className="mission-inner animate-on-scroll">
            <div className="mission-text">
              <h3>Our Mission</h3>
              <p>To provide inclusive, quality education and skill development opportunities to underprivileged children and youth, enabling them to lead dignified and self-reliant lives.</p>
            </div>
            <Link to="/about" className="btn btn-outline-blue" id="missionLearnMore">Learn More →</Link>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS SECTION ── */}
      <section className="section bg-white" id="programs" aria-label="Our Programs">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">What We Do</span>
            <h2>Our Core Programs</h2>
            <div className="divider"></div>
            <p>Four pillars that uphold our commitment to education, opportunity, and community growth.</p>
          </div>

          <div className="programs-grid">
            <div className="prog-card animate-on-scroll" id="progEducation">
              <div className="prog-card-body">
                <span className="tag tag-blue">Education</span>
                <h3>Children's Education</h3>
                <p>Foundational literacy, numeracy, and school support programs for underprivileged children from Class 1 to Class 10.</p>
                <ul className="prog-features">
                  <li>✓ Free Tuition Centers</li>
                  <li>✓ School Enrollment Drives</li>
                  <li>✓ Scholarship Program</li>
                </ul>
                <Link to="/programs#edu-access" className="prog-link" id="learnEducation">Learn More →</Link>
              </div>
            </div>

            <div className="prog-card animate-on-scroll delay-1" id="progSkill">
              <div className="prog-card-body">
                <span className="tag tag-gold">Skilling</span>
                <h3>Youth Skill Development</h3>
                <p>Vocational training and employment-linked programs to equip youth with market-ready skills and confidence.</p>
                <ul className="prog-features">
                  <li>✓ IT & Digital Literacy</li>
                  <li>✓ Vocational Training</li>
                  <li>✓ Job Placement Support</li>
                </ul>
                <Link to="/programs#youth-skilling" className="prog-link" id="learnSkill">Learn More →</Link>
              </div>
            </div>

            <div className="prog-card animate-on-scroll delay-2" id="progWomen">
              <div className="prog-card-body">
                <span className="tag tag-purple">Women</span>
                <h3>Women Empowerment</h3>
                <p>Creating platforms for women to gain financial independence, leadership skills, and access to healthcare and legal rights.</p>
                <ul className="prog-features">
                  <li>✓ Self-Help Groups (SHGs)</li>
                  <li>✓ Livelihood Training</li>
                  <li>✓ Legal Awareness Camps</li>
                </ul>
                <Link to="/programs#community-empowerment" className="prog-link" id="learnWomen">Learn More →</Link>
              </div>
            </div>

            <div className="prog-card animate-on-scroll delay-3" id="progCommunity">
              <div className="prog-card-body">
                <span className="tag tag-green">Community</span>
                <h3>Community Development</h3>
                <p>Holistic village-level interventions covering health, sanitation, environment, and digital connectivity for rural communities.</p>
                <ul className="prog-features">
                  <li>✓ Health Camps</li>
                  <li>✓ Sanitation Drives</li>
                  <li>✓ Digital Villages</li>
                </ul>
                <Link to="/programs#community-empowerment" className="prog-link" id="learnCommunity">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US SECTION ── */}
      <section className="section bg-off-white" aria-label="Why NexJyoti">
        <div className="container">
          <div className="why-grid">
            <div className="why-visual animate-on-scroll">
              <div className="why-img-wrap">
                <img src="/assets/images/why-us.png" alt="Students learning at NexJyoti center" />
                <div className="why-badge-float">
                  <div>
                    <strong>Est. 2021</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-content animate-on-scroll delay-2">
              <span className="section-label" style={{ textAlign: "left", display: "block", padding: 0 }}>Why Choose Us</span>
              <h2 style={{ textAlign: "left", marginTop: "10px" }}>We Don't Just Help — We Transform</h2>
              <div className="divider divider-left"></div>
              <p className="mt-16">At NexJyoti, we believe in long-term, sustainable impact. Our data-driven approach ensures every rupee donated creates measurable change in real lives.</p>
              <div className="why-features mt-32">
                <div className="why-feature">
                  <div>
                    <h4>Data-Driven Impact</h4>
                    <p>Every program is evaluated using rigorous metrics and third-party audits.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div>
                    <h4>Community-First Approach</h4>
                    <p>We work with communities, not just for them — local ownership drives our success.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div>
                    <h4>Full Transparency</h4>
                    <p>80G registered. Annual reports published openly.</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary mt-32" id="whyAboutBtn">Our Full Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SLIDER ── */}
      <section className="section testimonials-section" aria-label="Testimonials">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Voices of NexJyoti</span>
            <h2>Reflections, Vision &amp; Stories of Change</h2>
            <div className="divider"></div>
            <p>Insights from our leadership council and dedicated volunteers driving our mission forward.</p>
          </div>

          {/* Category Tabs */}
          <div className="testi-tabs animate-on-scroll">
            <button
              className={`testi-tab-btn ${activeTab === "leadership" ? "active" : ""}`}
              onClick={() => handleTabChange("leadership")}
            >
              <span>Leadership Perspectives</span>
              <span className="testi-tab-badge">{leadershipTestimonials.length}</span>
            </button>
            <button
              className={`testi-tab-btn ${activeTab === "volunteers" ? "active" : ""}`}
              onClick={() => handleTabChange("volunteers")}
            >
              <span>Voices of Our Volunteers</span>
              <span className="testi-tab-badge">{volunteerTestimonials.length}</span>
            </button>
          </div>

          <div
            className="testimonial-slider animate-on-scroll"
            role="region"
            aria-label="Testimonial Slider"
            onMouseEnter={stopSlider}
            onMouseLeave={startSlider}
          >
            <div
              className="testimonial-track"
              id="sliderTrack"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {currentTestimonials.map((testi, i) => (
                <div className="testimonial-slide" key={`${activeTab}-${i}`}>
                  <div className="testi-card">
                    <div className="testi-quote">“</div>
                    <p className="testi-text">{testi.quote}</p>
                    <div className="testi-author">
                      <div className="testi-avatar">{testi.avatar}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <strong>{testi.author}</strong>
                          {testi.linkedinUrl && (
                            <a
                              href={testi.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="testi-linkedin"
                              title={`${testi.author}'s LinkedIn Profile`}
                              aria-label={`${testi.author}'s LinkedIn Profile`}
                            >
                              IN
                            </a>
                          )}
                        </div>
                        <span>{testi.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="slider-controls">
              <button className="slider-btn" id="sliderPrev" aria-label="Previous testimonial" onClick={prevSlide}>‹</button>
              
              <div className="slider-dots" role="tablist" aria-label="Slide indicators">
                {currentTestimonials.map((_, i) => (
                  <button
                    className={`slider-dot ${currentSlide === i ? "active" : ""}`}
                    aria-label={`Slide ${i + 1}`}
                    role="tab"
                    key={i}
                    onClick={() => {
                      startSlider();
                      setCurrentSlide(i);
                    }}
                  ></button>
                ))}
              </div>

              <button className="slider-btn" id="sliderNext" aria-label="Next testimonial" onClick={nextSlide}>›</button>
            </div>

            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <span className="slider-counter">
                {currentSlide + 1} of {currentTestimonials.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner" aria-label="Call to Action">
        <div className="cta-overlay"></div>
        <div className="container cta-inner animate-on-scroll">
          <div className="cta-text">
            <h2>Your Support Can Change a Life Today</h2>
            <p>As little as ₹500 can provide a child with an entire month of quality education. Be their Jyoti.</p>
          </div>
          <div className="cta-actions">
            <Link to="/donate" className="btn btn-primary btn-lg" id="ctaDonate">Donate Now</Link>
            <Link to="/donate#volunteer" className="btn btn-outline btn-lg" id="ctaVolunteer">Volunteer With Us</Link>
          </div>
        </div>
      </section>


    </div>
  );
}
