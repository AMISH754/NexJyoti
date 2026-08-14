import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        sessionStorage.setItem("nexjyoti_admin", "true");
        navigate("/admin/dashboard", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      if (userCredential.user) {
        sessionStorage.setItem("nexjyoti_admin", "true");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Firebase Auth error:", err);
      let msg = "Invalid email or password. Access denied.";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        msg = "Incorrect email or password. Please verify your credentials.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many failed attempts. Please try again in a few minutes.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Please enter a valid email address.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-login-card">
        <div className="login-logo">
          <img
            src="/assets/images/logo.jpg"
            alt="NexJyoti Logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h2>Admin Portal</h2>
          <p>NexJyoti Education Foundation</p>
        </div>

        {error && (
          <div className="admin-alert admin-alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-field">
            <label htmlFor="admin-email">Admin Email</label>
            <input
              id="admin-email"
              type="email"
              placeholder="e.g. info@nexjyoti.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button
              type="submit"
              className="admin-btn admin-btn-gold"
              disabled={loading || !email || !password}
              style={{ width: "100%", maxWidth: "280px", justifyContent: "center" }}
            >
              {loading ? (
                <>
                  <span className="admin-spinner"></span> Authenticating...
                </>
              ) : (
                <>🔐 Login to Dashboard</>
              )}
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            onClick={() => navigate("/")}
            className="admin-btn admin-btn-outline admin-btn-sm"
            style={{ width: "auto" }}
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}
