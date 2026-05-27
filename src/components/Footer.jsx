import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img 
              src="/assets/images/logo-fullname.jpeg" 
              onError={(e) => { e.target.src = "/assets/images/logo.jpg"; }} 
              alt="NexJyoti Education Foundation" 
            />
            <p>
              NexJyoti Education Foundation works to bring quality education and opportunity to every underprivileged child and youth across India.
              <br />
              <br />
              Registered NGO | 80G & 12A Certified | FCRA Compliant
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">f</a>
              <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">→ Home</Link></li>
              <li><Link to="/about">→ About Us</Link></li>
              <li><Link to="/programs">→ Our Programs</Link></li>
              <li><Link to="/donate">→ Donate</Link></li>
              <li><Link to="/donate#volunteer">→ Volunteer</Link></li>
              <li><Link to="/contact">→ Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/programs?tab=edu">→ Children's Education</Link></li>
              <li><Link to="/programs?tab=skill">→ Youth Skill Development</Link></li>
              <li><Link to="/programs?tab=women">→ Women Empowerment</Link></li>
              <li><Link to="/programs">→ Community Development</Link></li>
              <li><Link to="/programs">→ Digital Literacy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <span className="icon">📍</span>
              <span>NexJyoti Complex, 2nd Floor, Vasant Kunj Sector C, New Delhi - 110070</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <span>+91 (11) 4567 8900</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">✉️</span>
              <span>connect@nexjyoti.org</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">🕐</span>
              <span>Mon–Fri: 9:30 AM – 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-wrapper">
        <div className="container">
          <div className="footer-bottom">
            <span>© 2024 NexJyoti Education Foundation. All rights reserved.</span>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Annual Report</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
