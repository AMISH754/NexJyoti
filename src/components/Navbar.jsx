import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container">
          <Link to="/" className="nav-logo" aria-label="NexJyoti Home" onClick={closeMenu}>
            <img src="/assets/images/logo.jpg" alt="NexJyoti Education Foundation Logo" />
          </Link>
          <ul className="nav-menu" role="list">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/programs" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
                Programs
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
                Get Involved
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
          <Link to="/donate" className="btn btn-green nav-cta" id="navDonateBtn" onClick={closeMenu}>
            Donate Now ❤️
          </Link>
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M20 12h2"/><path d="M2 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
          <button className={`nav-hamburger ${isOpen ? "open" : ""}`} id="hamburger" aria-label="Toggle menu" aria-expanded={isOpen} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-drawer ${isOpen ? "open" : ""}`} id="navDrawer" role="dialog" aria-label="Mobile Navigation">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end onClick={closeMenu}>
          🏠 Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
          ℹ️ About Us
        </NavLink>
        <NavLink to="/programs" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
          📚 Programs
        </NavLink>
        <NavLink to="/donate" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
          🤝 Get Involved
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
          ✉️ Contact
        </NavLink>
        <Link to="/donate" className="btn btn-green mt-24" style={{ textAlign: "center" }} onClick={closeMenu}>
          Donate Now ❤️
        </Link>
      </div>
    </>
  );
}
