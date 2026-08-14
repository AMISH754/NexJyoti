import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import "../styles/admin.css";

const EMPTY_FORM = {
  name: "",
  employeeId: "",
  designation: "",
  department: "",
  dateOfJoining: "",
  status: "Active",
  photoUrl: "",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("employees"); // 'employees' | 'contacts' | 'volunteers'
  const [employees, setEmployees] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'employee'|'contact'|'volunteer', id, title }

  // Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        sessionStorage.setItem("nexjyoti_admin", "true");
      } else {
        sessionStorage.removeItem("nexjyoti_admin");
        navigate("/admin", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchEmployees(), fetchContacts(), fetchVolunteers()]);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setContacts(data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "volunteers"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setVolunteers(data);
    } catch (err) {
      console.error("Failed to fetch volunteers:", err);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (emp) => {
    setForm({
      name: emp.name || "",
      employeeId: emp.employeeId || "",
      designation: emp.designation || "",
      department: emp.department || "",
      dateOfJoining: emp.dateOfJoining || "",
      status: emp.status || "Active",
      photoUrl: emp.photoUrl || "",
    });
    setEditingId(emp._docId);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const employeeData = {
        ...form,
        employeeId: form.employeeId.trim().toUpperCase(),
        lastUpdated: new Date().toISOString(),
      };

      if (editingId) {
        const docRef = doc(db, "employees", editingId);
        await updateDoc(docRef, employeeData);
        showAlert("success", `Employee "${form.name}" updated successfully!`);
      } else {
        await addDoc(collection(db, "employees"), employeeData);
        showAlert("success", `Employee "${form.name}" added successfully!`);
      }

      closeForm();
      await fetchEmployees();
    } catch (err) {
      showAlert("error", "Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleGenericDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const { type, id, title } = deleteConfirm;
      let collectionName = "employees";
      if (type === "contact") collectionName = "contacts";
      if (type === "volunteer") collectionName = "volunteers";

      await deleteDoc(doc(db, collectionName, id));
      showAlert("success", `Item "${title}" deleted successfully.`);
      setDeleteConfirm(null);

      if (type === "employee") await fetchEmployees();
      if (type === "contact") await fetchContacts();
      if (type === "volunteer") await fetchVolunteers();
    } catch (err) {
      showAlert("error", "Failed to delete: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
    sessionStorage.removeItem("nexjyoti_admin");
    navigate("/admin");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const activeCount = employees.filter((e) => e.status === "Active").length;

  if (loading && employees.length === 0 && contacts.length === 0 && volunteers.length === 0) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Top Bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <img
            src="/assets/images/logo.jpg"
            alt="Logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div>
            <h3>Admin Portal</h3>
            <span>{currentUser?.email || "NexJyoti Education Foundation"}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to="/" className="admin-btn admin-btn-outline admin-btn-sm" style={{ textDecoration: "none" }}>
            🌐 View Site
          </Link>
          <button
            onClick={handleLogout}
            className="admin-btn admin-btn-outline admin-btn-sm"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Alert */}
        {alert && (
          <div
            className={`admin-alert ${
              alert.type === "error" ? "admin-alert-error" : "admin-alert-success"
            }`}
          >
            <span>{alert.type === "error" ? "❌" : "✅"}</span>
            {alert.message}
          </div>
        )}

        {/* Stats Bar */}
        <div className="admin-stats">
          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "employees" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("employees")}
          >
            <div
              className="stat-icon"
              style={{ background: "rgba(14, 141, 230, 0.15)", color: "#0E8DE6" }}
            >
              👥
            </div>
            <div className="stat-number">{employees.length}</div>
            <div className="stat-label">Staff Records ({activeCount} Active)</div>
          </div>

          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "contacts" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("contacts")}
          >
            <div
              className="stat-icon"
              style={{ background: "rgba(217, 119, 6, 0.15)", color: "#D97706" }}
            >
              ✉️
            </div>
            <div className="stat-number">{contacts.length}</div>
            <div className="stat-label">Messages & Inquiries</div>
          </div>

          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "volunteers" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("volunteers")}
          >
            <div
              className="stat-icon"
              style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981" }}
            >
              🤝
            </div>
            <div className="stat-number">{volunteers.length}</div>
            <div className="stat-label">Volunteer Applications</div>
          </div>
        </div>

        {/* Navigation Tabs (Sleek Segmented Pill Bar) */}
        <div className="admin-tabs-nav">
          <button
            className={`admin-tab-btn ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            👥 <span>Employees &amp; ID Cards</span>
            <span className="admin-tab-badge">{employees.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            ✉️ <span>Inquiries</span>
            <span className="admin-tab-badge">{contacts.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "volunteers" ? "active" : ""}`}
            onClick={() => setActiveTab("volunteers")}
          >
            🤝 <span>Volunteers</span>
            <span className="admin-tab-badge">{volunteers.length}</span>
          </button>
        </div>

        {/* TAB 1: EMPLOYEES */}
        {activeTab === "employees" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>👤 Employee Registry</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Changes here immediately reflect on public ID verification cards.
                </span>
              </div>
              <button
                onClick={openAddForm}
                className="admin-btn admin-btn-gold admin-btn-sm"
              >
                ➕ Add Employee
              </button>
            </div>
            <div className="admin-panel-body">
              {employees.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="empty-icon">📋</div>
                  <h4>No employees recorded yet</h4>
                  <p>Click "Add Employee" above to create your first employee record.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Joined</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp) => (
                        <tr key={emp._docId}>
                          <td>
                            <img
                              className="emp-avatar"
                              src={
                                emp.photoUrl ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  emp.name
                                )}&background=0E8DE6&color=fff`
                              }
                              alt={emp.name}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  emp.name
                                )}&background=0E8DE6&color=fff`;
                              }}
                            />
                          </td>
                          <td className="emp-name">{emp.name}</td>
                          <td className="emp-id">{emp.employeeId}</td>
                          <td>{emp.designation}</td>
                          <td>{emp.department}</td>
                          <td>{formatDate(emp.dateOfJoining)}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                emp.status === "Active"
                                  ? "status-active"
                                  : "status-inactive"
                              }`}
                            >
                              <span className="status-dot"></span>
                              {emp.status}
                            </span>
                          </td>
                          <td>
                            <div className="actions-cell">
                              <Link
                                to={`/verify/${emp.employeeId}`}
                                target="_blank"
                                className="admin-btn admin-btn-outline admin-btn-sm"
                                title="Preview Verification Card"
                              >
                                🪪
                              </Link>
                              <button
                                onClick={() => openEditForm(emp)}
                                className="admin-btn admin-btn-edit admin-btn-sm"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: "employee",
                                    id: emp._docId,
                                    title: `${emp.name} (${emp.employeeId})`,
                                  })
                                }
                                className="admin-btn admin-btn-danger admin-btn-sm"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES */}
        {activeTab === "contacts" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>✉️ Contact Form Inquiries</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Messages sent from the Contact Us page on the website.
                </span>
              </div>
            </div>
            <div className="admin-panel-body">
              {contacts.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="empty-icon">📫</div>
                  <h4>No contact inquiries yet</h4>
                  <p>Inquiries submitted on the Contact page will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c) => (
                        <tr key={c._docId}>
                          <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                            {formatDate(c.createdAt)}
                          </td>
                          <td className="emp-name">{c.name}</td>
                          <td>
                            <a href={`mailto:${c.email}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                              {c.email}
                            </a>
                          </td>
                          <td style={{ fontWeight: 600 }}>{c.subject}</td>
                          <td style={{ maxWidth: "300px", lineHeight: 1.5 }}>{c.message}</td>
                          <td>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "contact",
                                  id: c._docId,
                                  title: `Message from ${c.name}`,
                                })
                              }
                              className="admin-btn admin-btn-danger admin-btn-sm"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: VOLUNTEERS */}
        {activeTab === "volunteers" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>🤝 Volunteer Applications</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Applications submitted from the Get Involved / Donate page.
                </span>
              </div>
            </div>
            <div className="admin-panel-body">
              {volunteers.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="empty-icon">🤝</div>
                  <h4>No volunteer applications yet</h4>
                  <p>Applications submitted on the Get Involved page will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Impact Area</th>
                        <th>Motivation / Experience</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteers.map((v) => (
                        <tr key={v._docId}>
                          <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                            {formatDate(v.createdAt)}
                          </td>
                          <td className="emp-name">{v.name}</td>
                          <td>
                            <a href={`mailto:${v.email}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                              {v.email}
                            </a>
                          </td>
                          <td>
                            <span className="status-badge status-active">
                              {v.role}
                            </span>
                          </td>
                          <td style={{ maxWidth: "300px", lineHeight: 1.5 }}>
                            {v.message || "—"}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "volunteer",
                                  id: v._docId,
                                  title: `Application of ${v.name}`,
                                })
                              }
                              className="admin-btn admin-btn-danger admin-btn-sm"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? "✏️ Edit Employee Record" : "➕ Add New Employee Record"}</h3>
              <button className="admin-modal-close" onClick={closeForm}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="admin-form-grid">
                  <div className="admin-field">
                    <label htmlFor="emp-name">Full Name *</label>
                    <input
                      id="emp-name"
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="emp-id">Employee ID *</label>
                    <input
                      id="emp-id"
                      type="text"
                      name="employeeId"
                      placeholder="e.g. NXJY-FD-001"
                      value={form.employeeId}
                      onChange={handleChange}
                      style={{ textTransform: "uppercase" }}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="emp-designation">Designation *</label>
                    <input
                      id="emp-designation"
                      type="text"
                      name="designation"
                      placeholder="e.g. Program Director"
                      value={form.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="emp-department">Department *</label>
                    <input
                      id="emp-department"
                      type="text"
                      name="department"
                      placeholder="e.g. Education Programs"
                      value={form.department}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="emp-doj">Date of Joining *</label>
                    <input
                      id="emp-doj"
                      type="date"
                      name="dateOfJoining"
                      value={form.dateOfJoining}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="emp-status">Status *</label>
                    <select
                      id="emp-status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="admin-field full-width">
                    <label htmlFor="emp-photo">Photo URL (Optional)</label>
                    <input
                      id="emp-photo"
                      type="url"
                      name="photoUrl"
                      placeholder="https://example.com/photo.jpg (Cloudinary or public URL)"
                      value={form.photoUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="admin-btn admin-btn-outline admin-btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-primary admin-btn-sm"
                    disabled={saving}
                    style={{ width: "auto" }}
                  >
                    {saving ? (
                      <>
                        <span className="admin-spinner"></span> Saving...
                      </>
                    ) : editingId ? (
                      "💾 Update Record"
                    ) : (
                      "➕ Add Record"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteConfirm(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-body">
              <div className="admin-confirm-dialog">
                <div className="confirm-icon">⚠️</div>
                <h4>Delete Confirmation</h4>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{deleteConfirm.title}</strong>? This action cannot be undone.
                </p>
                <div className="admin-confirm-actions">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="admin-btn admin-btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenericDelete}
                    className="admin-btn admin-btn-danger"
                  >
                    🗑️ Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
