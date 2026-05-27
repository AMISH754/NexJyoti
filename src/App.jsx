import React from "react";
import { Routes, Route } from "react-router-dom";

// Shared Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

// Page Views
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

// Global Stylesheet Imports
import "./styles/styles.css";
import "./styles/home.css";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: "calc(100vh - var(--nav-height) - 400px)", paddingTop: "var(--nav-height)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
