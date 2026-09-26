import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { uploadToCloudinary } from "../utils/cloudinary";
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

// Official ID format: NJEF-<hire year>-<5-digit number>, e.g. NJEF-2021-00001.
// Numbers run on across years, so the next ID is always one above the highest NJEF number in use.
const ID_PREFIX = "NJEF";
const ID_PATTERN = /^NJEF-(\d{4})-(\d{5})$/;

function nextEmployeeId(employees, hireYear) {
  const highest = employees.reduce((max, emp) => {
    const match = String(emp.employeeId || "").trim().toUpperCase().match(ID_PATTERN);
    return match ? Math.max(max, parseInt(match[2], 10)) : max;
  }, 0);
  return `${ID_PREFIX}-${hireYear}-${String(highest + 1).padStart(5, "0")}`;
}

const EMPTY_GALLERY_FORM = {
  eventName: "",
  category: "Education & Learning",
  date: new Date().toISOString().split("T")[0],
  description: "",
  imageUrl: "",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("employees"); // 'employees' | 'contacts' | 'volunteers' | 'registrations' | 'gallery'
  const [employees, setEmployees] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ ...EMPTY_GALLERY_FORM });
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [empImageFile, setEmpImageFile] = useState(null);
  const [empImagePreview, setEmpImagePreview] = useState("");
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewRegistration, setViewRegistration] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);


  // Init EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

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
      await Promise.all([
        fetchEmployees(),
        fetchContacts(),
        fetchVolunteers(),
        fetchRegistrations(),
        fetchGallery(),
      ]);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));
      data.sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
      setGalleryItems(data);
    } catch (err) {
      console.error("Failed to fetch gallery items:", err);
    }
  };

  const extractEmployeeNumber = (empId = "") => {
    const str = String(empId || "").trim();
    const match = str.match(/(\d+)$/);
    if (match) return parseInt(match[1], 10);
    const allNums = str.match(/\d+/g);
    if (allNums && allNums.length > 0) return parseInt(allNums[allNums.length - 1], 10);
    return 0;
  };

  const fetchEmployees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));

      // Sort serial-wise by Employee ID number (e.g. 0001 -> 0024)
      data.sort((a, b) => {
        const numA = extractEmployeeNumber(a.employeeId);
        const numB = extractEmployeeNumber(b.employeeId);
        if (numA !== numB) {
          return numA - numB;
        }
        return (a.employeeId || "").localeCompare(b.employeeId || "", undefined, { numeric: true });
      });

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

  const fetchRegistrations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "registrations"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));
      data.sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));
      setRegistrations(data);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
    }
  };

  const handleUpdateRegistrationStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "registrations", id), { status: newStatus });
      showAlert("success", `Registration marked as ${newStatus}.`);
      await fetchRegistrations();
      if (viewRegistration && viewRegistration._docId === id) {
        setViewRegistration((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      showAlert("error", "Failed to update status: " + err.message);
    }
  };

  const handleConvertToEmployee = (reg) => {
    const autoId = nextEmployeeId(employees, new Date().getFullYear());
    const autoDesignation = reg.type === "volunteer" ? "Volunteer" : "Executive Member";
    const autoDept =
      reg.volunteerAreas?.[0] || reg.memberAreas?.[0] || "Community Outreach";

    setForm({
      name: reg.fullName || "",
      employeeId: autoId,
      designation: autoDesignation,
      department: autoDept,
      dateOfJoining: new Date().toISOString().split("T")[0],
      status: "Active",
      photoUrl: "",
    });
    setEditingId(null);
    setViewRegistration(null);
    setShowForm(true);
    showAlert("info", `Auto-generated ID Card (${autoId}) for ${reg.fullName}. Review and save!`);
  };

  /* ── EmailJS auto-sender ── */
  const sendEmail = async (reg, decision) => {
    const typeName = reg.type === "volunteer" ? "Volunteer" : "Member";
    const areas =
      (reg.memberAreas?.join(", ") || reg.volunteerAreas?.join(", ") || "").trim();

    const templateId = decision === "accepted"
      ? import.meta.env.VITE_EMAILJS_ACCEPTANCE_TEMPLATE_ID
      : import.meta.env.VITE_EMAILJS_REJECTION_TEMPLATE_ID;

    const templateParams = {
      to_name: reg.fullName,
      email: reg.email,
      type: typeName,
      areas_line: areas
        ? `We look forward to having you contribute in the area(s) of: ${areas}.`
        : `We look forward to having you contribute to our mission.`,
    };

    setSendingEmail(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId,
        templateParams
      );
      showAlert("success", `Mail Sent Successfully to ${reg.email}`);
    } catch (err) {
      console.error("EmailJS error:", err);
      showAlert("error", `Mail Not Sent: ${err?.text || err?.message || "Failed to send email. Check EmailJS configuration."}`);
    } finally {
      setSendingEmail(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Store raw value — convert only at save/display time
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setForm({ ...EMPTY_FORM });
    setEmpImageFile(null);
    setEmpImagePreview("");
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
    setEmpImageFile(null);
    setEmpImagePreview(emp.photoUrl || "");
    setEditingId(emp._docId);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setEmpImageFile(null);
    setEmpImagePreview("");
    setForm({ ...EMPTY_FORM });
  };

  const handleEmpImageFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showAlert("error", "Please select a valid image file (JPEG, PNG, WEBP, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showAlert("error", "Image size exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    setEmpImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setEmpImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalPhotoUrl = form.photoUrl ? form.photoUrl.trim() : "";

      // If user selected a local image file, upload it to Cloudinary
      if (empImageFile) {
        try {
          const uploadResult = await uploadToCloudinary(empImageFile, "nexjyoti_employees");
          finalPhotoUrl = uploadResult.url;
        } catch (uploadErr) {
          console.error("Cloudinary employee photo upload error:", uploadErr);
          showAlert("error", "Photo upload failed: " + (uploadErr.message || "Failed to upload photo to Cloudinary"));
          setSaving(false);
          return;
        }
      }

      const employeeId = form.employeeId.trim().toUpperCase();
      const employeeData = {
        ...form,
        photoUrl: finalPhotoUrl,
        employeeId,
        lastUpdated: new Date().toISOString(),
      };

      // IDs must be unique across the registry (older records use random document keys).
      const duplicate = employees.find(
        (emp) => (emp.employeeId || "").toUpperCase() === employeeId && emp._docId !== editingId
      );
      if (duplicate) {
        showAlert("error", `ID ${employeeId} is already assigned to ${duplicate.name}.`);
        setSaving(false);
        return;
      }

      if (editingId) {
        // Records are publicly readable on /verify, so personal emails are removed on save.
        await updateDoc(doc(db, "employees", editingId), { ...employeeData, email: deleteField() });
        showAlert("success", `Employee "${form.name}" updated successfully!`);
      } else {
        // New records use the ID as the document key, which /verify reads directly.
        const docRef = doc(db, "employees", employeeId);
        if ((await getDoc(docRef)).exists()) {
          showAlert("error", `ID ${employeeId} already exists.`);
          setSaving(false);
          return;
        }
        await setDoc(docRef, employeeData);
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

  const handleGalleryChange = (e) => {
    const { name, value } = e.target;
    // Store raw value — convert only at save/display time
    setGalleryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      showAlert("error", "Please select a valid image file (JPEG, PNG, WEBP, etc.)");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert("error", "Image size exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    setSelectedImageFile(file);

    // Create local preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedFile = () => {
    setSelectedImageFile(null);
    setImagePreview("");
  };

  const openGalleryModal = () => {
    setGalleryForm({ ...EMPTY_GALLERY_FORM });
    setSelectedImageFile(null);
    setImagePreview("");
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    setGalleryForm({ ...EMPTY_GALLERY_FORM });
    setSelectedImageFile(null);
    setImagePreview("");
    setUploadingGallery(false);
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();

    if (!galleryForm.eventName.trim()) {
      showAlert("error", "Please enter the Event Name.");
      return;
    }

    if (!selectedImageFile && !galleryForm.imageUrl) {
      showAlert("error", "Please select a photo or provide an image URL.");
      return;
    }

    setUploadingGallery(true);

    try {
      let finalImageUrl = galleryForm.imageUrl ? galleryForm.imageUrl.trim() : "";
      let publicId = "";

      // Upload file to Cloudinary if a local file was selected
      if (selectedImageFile) {
        const uploadResult = await uploadToCloudinary(selectedImageFile, "nexjyoti_gallery");
        finalImageUrl = uploadResult.url;
        publicId = uploadResult.publicId;
      }

      const eventData = {
        eventName: galleryForm.eventName.trim(),
        category: galleryForm.category || "Education & Learning",
        date: galleryForm.date || new Date().toISOString().split("T")[0],
        description: galleryForm.description.trim(),
        imageUrl: finalImageUrl,
        publicId: publicId,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "gallery"), eventData);
      showAlert("success", `Event photo "${galleryForm.eventName}" uploaded and published to gallery!`);
      closeGalleryModal();
      await fetchGallery();
    } catch (err) {
      console.error("Gallery upload error:", err);
      showAlert("error", "Upload failed: " + (err.message || "Failed to upload photo"));
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleGenericDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const { type, id, title } = deleteConfirm;
      let collectionName = "employees";
      if (type === "contact") collectionName = "contacts";
      if (type === "volunteer") collectionName = "volunteers";
      if (type === "registration") collectionName = "registrations";
      if (type === "gallery") collectionName = "gallery";

      await deleteDoc(doc(db, collectionName, id));
      showAlert("success", `Item "${title}" deleted successfully.`);
      setDeleteConfirm(null);

      if (type === "employee") await fetchEmployees();
      if (type === "contact") await fetchContacts();
      if (type === "volunteer") await fetchVolunteers();
      if (type === "registration") await fetchRegistrations();
      if (type === "gallery") await fetchGallery();
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

  const volunteerList = [
    ...registrations.filter((r) => r.type === "volunteer"),
    ...volunteers.map((v) => ({
      ...v,
      fullName: v.name,
      submittedAt: v.createdAt,
      type: "volunteer",
      volunteerAreas: v.role ? [v.role] : [],
      volunteerMotivation: v.message,
      status: v.status || "pending",
    })),
  ].sort((a, b) => new Date(b.submittedAt || b.createdAt || 0) - new Date(a.submittedAt || a.createdAt || 0));

  const memberList = registrations
    .filter((r) => r.type === "member")
    .sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0));

  const pendingVolunteers = volunteerList.filter((v) => (v.status || "pending") === "pending").length;
  const pendingMembers = memberList.filter((m) => (m.status || "pending") === "pending").length;

  if (loading && employees.length === 0 && contacts.length === 0 && registrations.length === 0) {
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
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="admin-btn admin-btn-outline admin-btn-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Floating Toast Notification (always on top of modals & background) */}
      {alert && (
        <div className="admin-toast-container">
          <div className={`admin-toast admin-toast-${alert.type}`}>
            <span>{alert.message}</span>
            <button className="admin-toast-close" onClick={() => setAlert(null)}>✕</button>
          </div>
        </div>
      )}

      <div className="admin-content">
        {/* Inline Alert */}
        {alert && (
          <div
            className={`admin-alert ${alert.type === "error" ? "admin-alert-error" : "admin-alert-success"
              }`}
          >
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
            <div className="stat-number">{employees.length}</div>
            <div className="stat-label">Staff Records ({activeCount} Active)</div>
          </div>

          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "contacts" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("contacts")}
          >
            <div className="stat-number">{contacts.length}</div>
            <div className="stat-label">Messages &amp; Inquiries</div>
          </div>

          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "volunteers" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("volunteers")}
          >
            <div className="stat-number">{volunteerList.length}</div>
            <div className="stat-label">
              Volunteers ({pendingVolunteers} Pending)
            </div>
          </div>

          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "members" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("members")}
          >
            <div className="stat-number">{memberList.length}</div>
            <div className="stat-label">
              Members ({pendingMembers} Pending)
            </div>
          </div>

          <div
            className="admin-stat-card"
            style={{ cursor: "pointer", borderColor: activeTab === "gallery" ? "var(--primary)" : "" }}
            onClick={() => setActiveTab("gallery")}
          >
            <div className="stat-number">{galleryItems.length}</div>
            <div className="stat-label">
              Gallery Photos &amp; Events
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Sleek Segmented Pill Bar) */}
        <div className="admin-tabs-nav">
          <button
            className={`admin-tab-btn ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            <span>Employees &amp; ID Cards</span>
            <span className="admin-tab-badge">{employees.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            <span>Inquiries</span>
            <span className="admin-tab-badge">{contacts.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "volunteers" ? "active" : ""}`}
            onClick={() => setActiveTab("volunteers")}
          >
            <span>Volunteers</span>
            <span className="admin-tab-badge">{volunteerList.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "members" ? "active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            <span>Members</span>
            <span className="admin-tab-badge">{memberList.length}</span>
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <span>Events &amp; Gallery</span>
            <span className="admin-tab-badge">{galleryItems.length}</span>
          </button>

        </div>


        {/* TAB 1: EMPLOYEES */}
        {activeTab === "employees" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Employee Registry</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Changes here immediately reflect on public ID verification cards.
                </span>
              </div>
              <button
                onClick={openAddForm}
                className="admin-btn admin-btn-gold admin-btn-sm"
              >
                + Add Employee
              </button>
            </div>
            <div className="admin-panel-body">
              {employees.length === 0 ? (
                <div className="admin-empty-state">
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
                          <td className="emp-name">
                            <div>{emp.name}</div>
                          </td>
                          <td className="emp-id">{emp.employeeId}</td>
                          <td>{emp.designation}</td>
                          <td>{emp.department}</td>
                          <td>{formatDate(emp.dateOfJoining)}</td>
                          <td>
                            <span
                              className={`status-badge ${emp.status === "Active"
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
                                View ID
                              </Link>
                              <button
                                onClick={() => openEditForm(emp)}
                                className="admin-btn admin-btn-edit admin-btn-sm"
                              >
                                Edit
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
                                Delete
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
                <h3>Contact Form Inquiries</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Messages sent from the Contact Us page on the website.
                </span>
              </div>
            </div>
            <div className="admin-panel-body">
              {contacts.length === 0 ? (
                <div className="admin-empty-state">
                  <h4>No contact inquiries yet</h4>
                  <p>Inquiries submitted via the Contact Us page will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Actions</th>
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
                            <div>
                              <a href={`mailto:${c.email}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                                {c.email}
                              </a>
                              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{c.phone || "—"}</div>
                            </div>
                          </td>
                          <td style={{ fontWeight: 600, color: "var(--text-dark)" }}>{c.subject || "General Inquiry"}</td>
                          <td style={{ fontSize: "0.88rem", maxWidth: "300px" }}>{c.message}</td>
                          <td>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  type: "contact",
                                  id: c._docId,
                                  title: `Inquiry from ${c.name}`,
                                })
                              }
                              className="admin-btn admin-btn-danger admin-btn-sm"
                            >
                              Delete
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
                <h3>Volunteer Applications</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Review volunteer submissions, send acceptance/rejection emails, or generate staff IDs.
                </span>
              </div>
            </div>
            <div className="admin-panel-body">
              {volunteerList.length === 0 ? (
                <div className="admin-empty-state">
                  <h4>No volunteer applications yet</h4>
                  <p>Applications from the Volunteer Registration page will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Interests</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteerList.map((v) => (
                        <tr key={v._docId}>
                          <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                            {formatDate(v.submittedAt || v.createdAt)}
                          </td>
                          <td className="emp-name">{v.fullName}</td>
                          <td>
                            <div>
                              <a href={`mailto:${v.email}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                                {v.email}
                              </a>
                              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{v.mobile || v.phone || "—"}</div>
                            </div>
                          </td>
                          <td style={{ fontSize: "0.9rem" }}>{v.location || "—"}</td>
                          <td style={{ fontSize: "0.88rem", maxWidth: "240px" }}>
                            {v.volunteerAreas?.join(", ") || "—"}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${v.status === "accepted"
                                ? "status-active"
                                : v.status === "rejected"
                                  ? "status-inactive"
                                  : ""
                                }`}
                              style={v.status === "pending" ? {
                                background: "rgba(245,158,11,0.1)",
                                color: "#D97706",
                                border: "none",
                              } : {}}
                            >
                              <span className="status-dot" />
                              {v.status || "pending"}
                            </span>
                          </td>
                          <td>
                            <div className="actions-cell">
                              <button
                                onClick={() => handleConvertToEmployee(v)}
                                className="admin-btn admin-btn-sm"
                                style={{
                                  background: "transparent",
                                  color: "#D97706",
                                  borderColor: "#D97706",
                                  borderWidth: "1.5px",
                                  borderStyle: "solid",
                                }}
                                title="Generate ID Card & Add to Official Records"
                              >
                                Generate ID
                              </button>
                              <button
                                onClick={() => setViewRegistration(v)}
                                className="admin-btn admin-btn-edit admin-btn-sm"
                                title="View full details"
                              >
                                View
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: v.type === "volunteer" && !v.submittedAt ? "volunteer" : "registration",
                                    id: v._docId,
                                    title: `Volunteer application of ${v.fullName}`,
                                  })
                                }
                                className="admin-btn admin-btn-danger admin-btn-sm"
                              >
                                Delete
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

        {/* TAB 4: MEMBERS */}
        {activeTab === "members" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Membership Applications</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Review executive member applications, send emails, or generate staff IDs.
                </span>
              </div>
            </div>
            <div className="admin-panel-body">
              {memberList.length === 0 ? (
                <div className="admin-empty-state">
                  <h4>No membership applications yet</h4>
                  <p>Applications from the Member Registration page will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Areas</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberList.map((m) => (
                        <tr key={m._docId}>
                          <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                            {formatDate(m.submittedAt)}
                          </td>
                          <td className="emp-name">{m.fullName}</td>
                          <td>
                            <div>
                              <a href={`mailto:${m.email}`} style={{ color: "var(--primary)", fontWeight: 600 }}>
                                {m.email}
                              </a>
                              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{m.mobile}</div>
                            </div>
                          </td>
                          <td style={{ fontSize: "0.9rem" }}>{m.location || "—"}</td>
                          <td style={{ fontSize: "0.88rem", maxWidth: "240px" }}>
                            {m.memberAreas?.join(", ") || "—"}
                          </td>
                          <td>
                            <span
                              className={`status-badge ${m.status === "accepted"
                                ? "status-active"
                                : m.status === "rejected"
                                  ? "status-inactive"
                                  : ""
                                }`}
                              style={m.status === "pending" ? {
                                background: "rgba(245,158,11,0.1)",
                                color: "#D97706",
                                border: "none",
                              } : {}}
                            >
                              <span className="status-dot" />
                              {m.status || "pending"}
                            </span>
                          </td>
                          <td>
                            <div className="actions-cell">
                              <button
                                onClick={() => handleConvertToEmployee(m)}
                                className="admin-btn admin-btn-sm"
                                style={{
                                  background: "transparent",
                                  color: "#D97706",
                                  borderColor: "#D97706",
                                  borderWidth: "1.5px",
                                  borderStyle: "solid",
                                }}
                                title="Generate ID Card & Add to Official Records"
                              >
                                Generate ID
                              </button>
                              <button
                                onClick={() => setViewRegistration(m)}
                                className="admin-btn admin-btn-edit admin-btn-sm"
                                title="View full details"
                              >
                                View
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: "registration",
                                    id: m._docId,
                                    title: `Member registration of ${m.fullName}`,
                                  })
                                }
                                className="admin-btn admin-btn-danger admin-btn-sm"
                              >
                                Delete
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

        {/* TAB 5: GALLERY & EVENTS */}
        {activeTab === "gallery" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Events &amp; Photo Gallery</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Photos uploaded here are hosted on Cloudinary and instantly displayed in the website Gallery with the event name.
                </span>
              </div>
              <button
                onClick={openGalleryModal}
                className="admin-btn admin-btn-gold admin-btn-sm"
              >
                + Upload Event Photo
              </button>
            </div>
            <div className="admin-panel-body">
              {galleryItems.length === 0 ? (
                <div className="admin-empty-state">
                  <h4>No event photos uploaded yet</h4>
                  <p>Click "Upload Event Photo" above to add your first event picture to the public gallery.</p>
                </div>
              ) : (
                <div className="admin-gallery-grid">
                  {galleryItems.map((item) => (
                    <div key={item._docId} className="admin-gallery-card">
                      <div className="admin-gallery-img-wrap">
                        <img
                          src={item.imageUrl}
                          alt={item.eventName}
                          className="admin-gallery-img"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80";
                          }}
                        />
                        <span className="admin-gallery-cat-badge">
                          {item.category || "Event"}
                        </span>
                      </div>
                      <div className="admin-gallery-body">
                        <h4 className="admin-gallery-title">{item.eventName}</h4>
                        <div className="admin-gallery-date">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {formatDate(item.date || item.createdAt)}
                        </div>
                        {item.description && (
                          <p className="admin-gallery-desc">{item.description}</p>
                        )}
                        <div className="admin-gallery-footer">
                          <a
                            href={item.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn admin-btn-outline admin-btn-sm"
                            style={{ padding: "4px 10px", fontSize: "0.75rem", textDecoration: "none" }}
                          >
                            View Full Photo
                          </a>
                          <button
                            onClick={() =>
                              setDeleteConfirm({
                                type: "gallery",
                                id: item._docId,
                                title: item.eventName || "Event Photo",
                              })
                            }
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Upload Modal */}
      {showGalleryModal && (
        <div className="admin-modal-overlay" onClick={closeGalleryModal}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "560px", maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="admin-modal-header">
              <h3>Upload Event Photo to Gallery</h3>
              <button className="admin-modal-close" onClick={closeGalleryModal}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <form onSubmit={handleGallerySubmit}>
                <div className="admin-field">
                  <label htmlFor="gal-event-name">Event Name / Title *</label>
                  <input
                    id="gal-event-name"
                    type="text"
                    name="eventName"
                    placeholder="e.g. Free Health Checkup Camp 2025"
                    value={galleryForm.eventName}
                    onChange={handleGalleryChange}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="admin-field">
                    <label htmlFor="gal-category">Category *</label>
                    <select
                      id="gal-category"
                      name="category"
                      value={galleryForm.category}
                      onChange={handleGalleryChange}
                    >
                      <option value="Education & Learning">Education &amp; Learning</option>
                      <option value="Health & Wellness">Health &amp; Wellness</option>
                      <option value="Youth Skilling">Youth Skilling</option>
                      <option value="Community Outreach">Community Outreach</option>
                      <option value="Celebrations & Festivals">Celebrations &amp; Festivals</option>
                      <option value="Workshops & Seminars">Workshops &amp; Seminars</option>
                      <option value="Other">Other Events</option>
                    </select>
                  </div>

                  <div className="admin-field">
                    <label htmlFor="gal-date">Event Date *</label>
                    <input
                      id="gal-date"
                      type="date"
                      name="date"
                      value={galleryForm.date}
                      onChange={handleGalleryChange}
                      required
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="gal-desc">Event Caption / Description (Optional)</label>
                  <textarea
                    id="gal-desc"
                    name="description"
                    rows={2}
                    placeholder="Brief highlight of the event (e.g. Provided free dental and eye checkups to 300+ students)"
                    value={galleryForm.description}
                    onChange={handleGalleryChange}
                  />
                </div>

                {/* File Upload Dropzone */}
                <div className="admin-field">
                  <label>Select Event Photo *</label>
                  <div className="admin-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      id="gal-file-input"
                      style={{ display: "none" }}
                      onChange={handleImageFileSelect}
                    />
                    <label
                      htmlFor="gal-file-input"
                      style={{ cursor: "pointer", display: "block", marginBottom: 0 }}
                    >
                      <div style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <span style={{ fontWeight: 600, color: "var(--primary)" }}>
                        Click to select photo from device
                      </span>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Supports JPG, PNG, WebP (Max 10MB) • Uploaded securely to Cloudinary
                      </p>
                    </label>


                    {imagePreview && (
                      <div style={{ marginTop: "1rem" }}>
                        <img
                          src={imagePreview}
                          alt="Selected Preview"
                          className="admin-dropzone-preview"
                        />
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px" }}>
                          Selected: {selectedImageFile?.name} ({(selectedImageFile?.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fallback Image URL */}
                <div className="admin-field">
                  <label htmlFor="gal-url" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    Or paste an external Image URL / Google Drive Link (Optional)
                  </label>
                  <input
                    id="gal-url"
                    type="text"
                    name="imageUrl"
                    placeholder="Paste Google Drive link or direct image URL"
                    value={galleryForm.imageUrl}
                    onChange={handleGalleryChange}
                  />
                  <small style={{ fontSize: "0.75rem", color: "#0E8DE6", marginTop: "4px", display: "block" }}>
                    Google Drive links are automatically converted
                  </small>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    onClick={closeGalleryModal}
                    className="admin-btn admin-btn-outline admin-btn-sm"
                    disabled={uploadingGallery}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-primary admin-btn-sm"
                    disabled={uploadingGallery || (!selectedImageFile && !galleryForm.imageUrl)}
                    style={{ width: "auto" }}
                  >
                    {uploadingGallery ? (
                      <>
                        <span className="admin-spinner"></span> Uploading to Cloudinary...
                      </>
                    ) : (
                      "Publish to Gallery"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (

        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? "Edit Employee Record" : "Add New Employee Record"}</h3>
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
                      placeholder="e.g. NJEF-2021-00001"
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
                  {/* Employee Photo Upload Dropzone */}
                  <div className="admin-field full-width">
                    <label>Employee Photo</label>
                    <div className="admin-dropzone" style={{ padding: "1.25rem", textAlign: "center", border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", background: "rgba(14, 141, 230, 0.03)" }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="emp-file-input"
                        style={{ display: "none" }}
                        onChange={handleEmpImageFileSelect}
                      />
                      <label
                        htmlFor="emp-file-input"
                        style={{ cursor: "pointer", display: "block", marginBottom: 0 }}
                      >
                        <div style={{ marginBottom: "0.4rem", color: "var(--primary)" }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: "0.9rem" }}>
                          {empImagePreview ? "Click to Change / Choose New Photo" : "Click to Upload Photo File from Device"}
                        </span>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px", margin: 0 }}>
                          Supports JPG, PNG, WebP (Max 5MB) • Uploads directly &amp; securely to Cloudinary
                        </p>
                      </label>

                      {empImagePreview && (
                        <div style={{ marginTop: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                          <img
                            src={empImagePreview}
                            alt="Employee Preview"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid var(--primary)",
                              boxShadow: "var(--shadow-sm)",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          {empImageFile && (
                            <span style={{ fontSize: "0.78rem", color: "var(--text-dark)", fontWeight: 500 }}>
                              {empImageFile.name} ({(empImageFile.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="admin-field full-width">
                    <label htmlFor="emp-photo" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      Or direct Image URL / Cloudinary Link (Optional)
                    </label>
                    <input
                      id="emp-photo"
                      type="url"
                      name="photoUrl"
                      placeholder="https://res.cloudinary.com/... or direct image link"
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
                      "Update Record"
                    ) : (
                      "Add Record"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Registration Detail Modal */}
      {viewRegistration && (
        <div className="admin-modal-overlay" onClick={() => setViewRegistration(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "640px", maxHeight: "85vh", overflowY: "auto" }}
          >
            <div className="admin-modal-header">
              <h3>
                {viewRegistration.fullName}&apos;s Registration
              </h3>
              <button className="admin-modal-close" onClick={() => setViewRegistration(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              {alert && (
                <div
                  className={`admin-alert ${alert.type === "error" ? "admin-alert-error" : "admin-alert-success"}`}
                  style={{ marginBottom: "16px" }}
                >
                  {alert.message}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                {[
                  ["Type", viewRegistration.type === "volunteer" ? "Volunteer" : "Member"],
                  ["Status", viewRegistration.status || "pending"],
                  ["Name", viewRegistration.fullName || "—"],
                  ["Date of Birth", viewRegistration.dateOfBirth || "—"],
                  ["Mobile", viewRegistration.mobile || "—"],
                  ["Email", viewRegistration.email || "—"],
                  ["Location", viewRegistration.location || "—"],
                  ["Prof. Status", viewRegistration.professionalStatus || "—"],
                  ["Qualification", viewRegistration.qualification || "—"],
                  ["Institution", viewRegistration.institution || "—"],
                  ["Heard From", viewRegistration.heardFrom || "—"],
                  ["Referral", viewRegistration.referralName || "—"],
                  ["Submitted", formatDate(viewRegistration.submittedAt)],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: "var(--off-white)", padding: "12px", borderRadius: "10px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{label}</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-dark)", fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>

              {viewRegistration.type === "volunteer" && (
                <>
                  {viewRegistration.volunteerMotivation && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Motivation</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.6 }}>{viewRegistration.volunteerMotivation}</p>
                    </div>
                  )}
                  {viewRegistration.volunteerAreas?.length > 0 && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "8px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Areas of Interest</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {viewRegistration.volunteerAreas.map((a) => (
                          <span key={a} style={{ background: "rgba(14,141,230,0.1)", color: "var(--primary)", padding: "3px 10px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 600 }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {viewRegistration.volunteerSkills && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Skills &amp; Strengths</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.6 }}>{viewRegistration.volunteerSkills}</p>
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                    {viewRegistration.volunteerMode && (
                      <div style={{ background: "var(--off-white)", padding: "10px", borderRadius: "8px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Mode</div>
                        <div style={{ fontSize: "0.88rem", marginTop: "3px" }}>{viewRegistration.volunteerMode}</div>
                      </div>
                    )}
                    {viewRegistration.volunteerTimeCommitment && (
                      <div style={{ background: "var(--off-white)", padding: "10px", borderRadius: "8px" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Time Commitment</div>
                        <div style={{ fontSize: "0.88rem", marginTop: "3px" }}>{viewRegistration.volunteerTimeCommitment}</div>
                      </div>
                    )}
                  </div>
                  {viewRegistration.previousVolunteeringExp && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Previous Volunteering Experience</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.6 }}>{viewRegistration.previousVolunteeringExp}</p>
                    </div>
                  )}
                </>
              )}

              {viewRegistration.type === "member" && (
                <>
                  {viewRegistration.memberMotivation && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Motivation</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.6 }}>{viewRegistration.memberMotivation}</p>
                    </div>
                  )}
                  {viewRegistration.memberAreas?.length > 0 && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "8px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Areas of Interest</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {viewRegistration.memberAreas.map((a) => (
                          <span key={a} style={{ background: "rgba(217,119,6,0.1)", color: "var(--gold-dark)", padding: "3px 10px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 600 }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {viewRegistration.memberExpertise && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Skills &amp; Expertise</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.6 }}>{viewRegistration.memberExpertise}</p>
                    </div>
                  )}
                  {viewRegistration.memberContributionType?.length > 0 && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "8px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Contribution Types</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {viewRegistration.memberContributionType.map((a) => (
                          <span key={a} style={{ background: "rgba(217,119,6,0.1)", color: "var(--gold-dark)", padding: "3px 10px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 600 }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {viewRegistration.previousAssociationDesc && (
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontWeight: 700, marginBottom: "6px", fontSize: "0.87rem", color: "var(--text-dark)" }}>Previous Association</div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: 1.6 }}>{viewRegistration.previousAssociationDesc}</p>
                    </div>
                  )}
                </>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border)",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    className="admin-btn admin-btn-sm"
                    style={{
                      background: "transparent",
                      color: "#D97706",
                      borderColor: "#D97706",
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={() => handleConvertToEmployee(viewRegistration)}
                  >
                    Generate ID Card &amp; Add Record
                  </button>

                  {/* Accept + auto email */}
                  <button
                    className="admin-btn admin-btn-sm"
                    style={{
                      background: "transparent",
                      color: "#10B981",
                      borderColor: "#10B981",
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                    }}
                    disabled={sendingEmail}
                    onClick={async () => {
                      await handleUpdateRegistrationStatus(viewRegistration._docId, "accepted");
                      await sendEmail(viewRegistration, "accepted");
                    }}
                    title="Mark as Accepted & send acceptance email automatically"
                  >
                    {sendingEmail ? "Sending..." : "Accept & Mail"}
                  </button>

                  {/* Reject + auto email */}
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    disabled={sendingEmail}
                    onClick={async () => {
                      await handleUpdateRegistrationStatus(viewRegistration._docId, "rejected");
                      await sendEmail(viewRegistration, "rejected");
                    }}
                    title="Mark as Rejected & send rejection email automatically"
                  >
                    {sendingEmail ? "Sending..." : "Reject & Mail"}
                  </button>

                  {/* Resend mail only */}
                  <button
                    className="admin-btn admin-btn-sm"
                    style={{
                      background: "transparent",
                      color: "#3B82F6",
                      borderColor: "#3B82F6",
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                    }}
                    disabled={sendingEmail}
                    onClick={() => sendEmail(viewRegistration, viewRegistration.status === "rejected" ? "rejected" : "accepted")}
                    title="Resend email without changing status"
                  >
                    {sendingEmail ? "Sending..." : "Resend Mail"}
                  </button>

                  <button
                    className="admin-btn admin-btn-outline admin-btn-sm"
                    onClick={() => handleUpdateRegistrationStatus(viewRegistration._docId, "pending")}
                  >
                    Reset Pending
                  </button>
                </div>
                <button
                  className="admin-btn admin-btn-outline admin-btn-sm"
                  onClick={() => setViewRegistration(null)}
                >
                  Close
                </button>
              </div>
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
                    Yes, Delete
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
