import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "75vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <div className="card" style={{ maxWidth: "560px", padding: "3.5rem 2rem", margin: "0 auto" }}>
        <span className="section-label" style={{ marginBottom: "10px" }}>Error 404</span>
        <h1 style={{ fontSize: "2.2rem", color: "var(--text-dark)", marginBottom: "12px" }}>Page Not Found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.6 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary">
            ← Return to Home
          </Link>
          <Link to="/contact" className="btn btn-outline-blue">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
