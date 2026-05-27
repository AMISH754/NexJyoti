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
  // Testimonials Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef(null);

  const testimonials = [
    {
      quote: "NexJyoti's free tuition center changed my life. I was about to drop out of school, but their teachers never gave up on me. Today, I am preparing for engineering entrance exams. Main unka hamesha shukarguzaar rahunga.",
      author: "Rahul Kumar",
      role: "Student, Class 12 — Varanasi",
      avatar: "RK"
    },
    {
      quote: "Mujhe computer sikhaya, English sikhaya aur ek naukri dilwai. Ab meri khud ki family hai aur main apne chhote bhai ki fees bhi bharta hoon. NexJyoti ne sirf naukri nahi, izzat di.",
      author: "Priya Soni",
      role: "Youth Program Graduate — Lucknow",
      avatar: "PS"
    },
    {
      quote: "Our village had no access to quality schooling. NexJyoti set up a learning center and within one year, every child in our village was enrolled in school. The transformation has been unbelievable.",
      author: "Ram Deen Patel",
      role: "Village Head — Mirzapur District",
      avatar: "RD"
    }
  ];

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
  }, []);

  const startSlider = () => {
    stopSlider();
    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopSlider = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  };

  const prevSlide = () => {
    startSlider();
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    startSlider();
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
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
              Transforming Lives Since 2018
            </div>
            <h1 className="animate-on-scroll delay-1">
              Lighting the Path to a<br />
              <span className="hero-highlight">Brighter Tomorrow</span>
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
                <span className="hc-num">12,000+</span>
                <span className="hc-lbl">Children Educated</span>
              </div>
              <div className="hero-stat-card hc2">
                <span className="hc-num">₹2.4 Cr</span>
                <span className="hc-lbl">Scholarships Given</span>
              </div>
              <div className="hero-stat-card hc3">
                <span className="hc-num">98%</span>
                <span className="hc-lbl">Success Rate</span>
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
              <CountUp target={12000} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Children Educated</span>
            </div>
            <div className="stat-block animate-on-scroll delay-1">
              <CountUp target={3500} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Youth Skilled</span>
            </div>
            <div className="stat-block animate-on-scroll delay-2">
              <CountUp target={240} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Villages Reached</span>
            </div>
            <div className="stat-block animate-on-scroll delay-3">
              <CountUp target={850} suffix="+" trigger={statsVisible} />
              <span className="stat-label">Women Empowered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION STRIP ── */}
      <section className="mission-strip section-sm bg-off-white">
        <div className="container">
          <div className="mission-inner animate-on-scroll">
            <div className="mission-icon">📖</div>
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
              <div className="prog-card-icon">📚</div>
              <div className="prog-card-body">
                <span className="tag tag-blue">Education</span>
                <h3>Children's Education</h3>
                <p>Foundational literacy, numeracy, and school support programs for underprivileged children from Class 1 to Class 10.</p>
                <ul className="prog-features">
                  <li>✓ Free Tuition Centers</li>
                  <li>✓ School Enrollment Drives</li>
                  <li>✓ Scholarship Program</li>
                </ul>
                <Link to="/programs?tab=edu" className="prog-link" id="learnEducation">Learn More →</Link>
              </div>
            </div>

            <div className="prog-card animate-on-scroll delay-1" id="progSkill">
              <div className="prog-card-icon">🛠️</div>
              <div className="prog-card-body">
                <span className="tag tag-gold">Skilling</span>
                <h3>Youth Skill Development</h3>
                <p>Vocational training and employment-linked programs to equip youth with market-ready skills and confidence.</p>
                <ul className="prog-features">
                  <li>✓ IT & Digital Literacy</li>
                  <li>✓ Vocational Training</li>
                  <li>✓ Job Placement Support</li>
                </ul>
                <Link to="/programs?tab=skill" className="prog-link" id="learnSkill">Learn More →</Link>
              </div>
            </div>

            <div className="prog-card animate-on-scroll delay-2" id="progWomen">
              <div className="prog-card-icon">👩</div>
              <div className="prog-card-body">
                <span className="tag tag-purple">Women</span>
                <h3>Women Empowerment</h3>
                <p>Creating platforms for women to gain financial independence, leadership skills, and access to healthcare and legal rights.</p>
                <ul className="prog-features">
                  <li>✓ Self-Help Groups (SHGs)</li>
                  <li>✓ Livelihood Training</li>
                  <li>✓ Legal Awareness Camps</li>
                </ul>
                <Link to="/programs?tab=women" className="prog-link" id="learnWomen">Learn More →</Link>
              </div>
            </div>

            <div className="prog-card animate-on-scroll delay-3" id="progCommunity">
              <div className="prog-card-icon">🌱</div>
              <div className="prog-card-body">
                <span className="tag tag-green">Community</span>
                <h3>Community Development</h3>
                <p>Holistic village-level interventions covering health, sanitation, environment, and digital connectivity for rural communities.</p>
                <ul className="prog-features">
                  <li>✓ Health Camps</li>
                  <li>✓ Sanitation Drives</li>
                  <li>✓ Digital Villages</li>
                </ul>
                <Link to="/programs" className="prog-link" id="learnCommunity">Learn More →</Link>
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
                <img src="/assets/images/why-us.jpg" alt="Students learning at NexJyoti center" />
                <div className="why-badge-float">
                  <span>🏆</span>
                  <div>
                    <strong>Award Winning</strong>
                    <small>NGO of the Year 2024</small>
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
                  <div className="wf-icon">🎯</div>
                  <div>
                    <h4>Data-Driven Impact</h4>
                    <p>Every program is evaluated using rigorous metrics and third-party audits.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div className="wf-icon">🤝</div>
                  <div>
                    <h4>Community-First Approach</h4>
                    <p>We work with communities, not just for them — local ownership drives our success.</p>
                  </div>
                </div>
                <div className="why-feature">
                  <div className="wf-icon">💎</div>
                  <div>
                    <h4>Full Transparency</h4>
                    <p>80G registered, FCRA compliant. Annual reports published openly.</p>
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
            <span className="section-label">Stories of Change</span>
            <h2>Lives We've Touched</h2>
            <div className="divider"></div>
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
              {testimonials.map((testi, i) => (
                <div className="testimonial-slide" key={i}>
                  <div className="testi-card">
                    <div className="testi-quote">"</div>
                    <p className="testi-text">{testi.quote}</p>
                    <div className="testi-author">
                      <div className="testi-avatar">{testi.avatar}</div>
                      <div>
                        <strong>{testi.author}</strong>
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
                {testimonials.map((_, i) => (
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
            <Link to="/donate" className="btn btn-primary btn-lg" id="ctaDonate">Donate Now ❤️</Link>
            <Link to="/donate#volunteer" className="btn btn-outline btn-lg" id="ctaVolunteer">Volunteer With Us</Link>
          </div>
        </div>
      </section>

      {/* ── PARTNERS STRIP ── */}
      <section className="partners-section section-sm bg-white" aria-label="Our Partners">
        <div className="container">
          <p className="partners-title text-center text-muted animate-on-scroll">Trusted by Donors & Partners Across India</p>
          <div className="partners-logos animate-on-scroll">
            <div className="partner-logo">🏦 SBI Foundation</div>
            <div className="partner-logo">🏛️ CSR India</div>
            <div className="partner-logo">🌍 UNICEF</div>
            <div className="partner-logo">📘 Teach For India</div>
            <div className="partner-logo">🤝 GiveIndia</div>
            <div className="partner-logo">🇮🇳 NITI Aayog</div>
          </div>
        </div>
      </section>
    </div>
  );
}
