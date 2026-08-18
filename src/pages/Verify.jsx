import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Verify() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(employeeId || "");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(Boolean(employeeId));
  const [error, setError] = useState(false);
  const isAdmin = sessionStorage.getItem("nexjyoti_admin") === "true";

  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      setEmployee(null);
      return;
    }

    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(false);
        const q = query(
          collection(db, "employees"),
          where("employeeId", "==", employeeId.trim())
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setEmployee(querySnapshot.docs[0].data());
        } else {
          setEmployee(null);
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/verify/${encodeURIComponent(searchInput.trim().toUpperCase())}`);
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--off-white)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              margin: "0 auto 1rem",
              border: "3px solid var(--border)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          ></div>
          <p style={{ color: "var(--text-muted)", fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
            Verifying credential in official records...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "var(--off-white)",
        }}
      >
        <div className="card text-center" style={{ padding: "3.5rem 2rem", maxWidth: "560px" }}>
          <h2 style={{ color: "var(--text-dark)", marginBottom: "1rem" }}>Connection Error</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
            Unable to connect to the verification server. Please check your internet connection or try again later.
          </p>
          <Link to="/" className="btn btn-primary">Return to Homepage</Link>
        </div>
      </div>
    );
  }

  // If no employeeId parameter is given: Show Search UI
  if (!employeeId) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1.5rem",
          backgroundColor: "var(--off-white)",
        }}
      >
        <div className="container" style={{ maxWidth: "560px" }}>
          <div className="card" style={{ padding: "3rem 2.5rem", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <img
              src="/assets/images/logo.jpg"
              alt="NexJyoti Logo"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                margin: "0 auto 12px",
                display: "block",
                boxShadow: "var(--shadow-md)",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="section-label" style={{ marginBottom: "8px" }}>Public Registry</span>
            <h1 style={{ fontSize: "1.8rem", color: "var(--text-dark)", marginBottom: "10px" }}>
              Official ID Verification
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: 1.6 }}>
              Enter the official Employee or Volunteer ID to verify authentic credentials issued by NexJyoti Education Foundation.
            </p>

            <form onSubmit={handleSearch}>
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E.g., NXJY-FD-001"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{ textAlign: "center", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Verify Credential
              </button>
            </form>

            <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Need assistance? Contact us at <a href="mailto:info@nexjyoti.org" style={{ color: "var(--primary)", fontWeight: 600 }}>info@nexjyoti.org</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        backgroundColor: "var(--off-white)",
      }}
    >
      <div className="container" style={{ maxWidth: "620px" }}>
        {employee ? (
          <div
            className="card"
            style={{
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            {/* Header / Top Ribbon */}
            <div
              style={{
                background: "var(--hero-bg)",
                color: "white",
                padding: "2rem 1.5rem",
                textAlign: "center",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/assets/images/logo.jpg"
                alt="NexJyoti Logo"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  padding: "2px",
                  marginBottom: "10px",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.75rem",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  fontWeight: "700",
                  marginBottom: "4px",
                }}
              >
                Authenticated Record
              </span>
              <h2 style={{ color: "#ffffff", margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
                Official ID Verification
              </h2>
              <p style={{ margin: "6px 0 0", fontSize: "0.95rem", color: "#ffffff", fontWeight: "600", letterSpacing: "0.3px" }}>
                NexJyoti Education Foundation
              </p>
            </div>

            <div style={{ padding: "2.5rem 2rem" }}>
              {/* Photo & Status */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid var(--primary-light)",
                    boxShadow: "var(--shadow-md)",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={
                      employee.photoUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        employee.name
                      )}&background=0E8DE6&color=fff&size=200`
                    }
                    alt={employee.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        employee.name
                      )}&background=0E8DE6&color=fff&size=200`;
                    }}
                  />
                </div>

                <div
                  style={{
                    background:
                      employee.status === "Active"
                        ? "var(--green-glow)"
                        : "rgba(220, 38, 38, 0.1)",
                    color:
                      employee.status === "Active" ? "var(--green-dark)" : "#dc2626",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background:
                        employee.status === "Active" ? "var(--green)" : "#dc2626",
                    }}
                  ></span>
                  {employee.status} Staff Member
                </div>
              </div>

              {/* Details Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1.2rem",
                  background: "var(--section-bg-white)",
                  padding: "1.5rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.8rem" }}>
                  <small
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                  >
                    Full Name
                  </small>
                  <div style={{ fontSize: "1.15rem", fontWeight: "700", color: "var(--text-dark)", marginTop: "4px" }}>
                    {employee.name}
                  </div>
                </div>

                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.8rem" }}>
                  <small
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                  >
                    Employee ID
                  </small>
                  <div style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--primary)", marginTop: "4px", fontFamily: "monospace" }}>
                    {employee.employeeId}
                  </div>
                </div>

                {employee.email && (
                  <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.8rem" }}>
                    <small
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "600",
                      }}
                    >
                      Email Address
                    </small>
                    <div style={{ fontSize: "1.05rem", color: "var(--text-dark)", marginTop: "4px", fontWeight: "500" }}>
                      <a
                        href={`mailto:${employee.email}`}
                        style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}
                      >
                        {employee.email}
                      </a>
                    </div>
                  </div>
                )}

                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.8rem" }}>
                  <small
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                  >
                    Designation
                  </small>
                  <div style={{ fontSize: "1.05rem", color: "var(--text-body)", marginTop: "4px", fontWeight: "500" }}>
                    {employee.designation}
                  </div>
                </div>

                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.8rem" }}>
                  <small
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                  >
                    Department
                  </small>
                  <div style={{ fontSize: "1.05rem", color: "var(--text-body)", marginTop: "4px" }}>
                    {employee.department}
                  </div>
                </div>

                <div>
                  <small
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                  >
                    Date of Joining
                  </small>
                  <div style={{ fontSize: "1.05rem", color: "var(--text-body)", marginTop: "4px" }}>
                    {formatDate(employee.dateOfJoining)}
                  </div>
                </div>
              </div>

              {/* Digital Seal & Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginTop: "2rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <small style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>
                    Verified on: {new Date().toLocaleDateString("en-IN")}
                  </small>
                  <small style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>
                    Data updated: {formatDate(employee.lastUpdated)}
                  </small>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "2px dashed var(--gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold)",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      transform: "rotate(-12deg)",
                      opacity: 0.85,
                      lineHeight: 1.2,
                    }}
                  >
                    OFFICIAL<br />SEAL
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: "2rem", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                <Link to="/verify" className="btn btn-outline-blue btn-sm">
                  Search Another ID
                </Link>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="btn btn-primary btn-sm">
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center" style={{ padding: "4rem 2rem", boxShadow: "var(--shadow-lg)" }}>
            <h2 style={{ color: "var(--text-dark)", marginBottom: "1rem" }}>Verification Failed</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
              The Employee ID <strong style={{ color: "var(--primary)" }}>{employeeId}</strong> could not be found in our official registry.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/verify" className="btn btn-primary">
                Try Another ID
              </Link>
              <Link to="/" className="btn btn-outline-blue">
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
