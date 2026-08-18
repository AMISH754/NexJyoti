# 🌅 NexJyoti Education Foundation Website

**🔗 Live Demo**: [https://nexjyoti.org](https://nexjyoti.org)

Welcome to the official repository for the **NexJyoti Education Foundation** web application. This is a high-performance, responsive Single Page Application (SPA) designed to empower communities, promote educational transparency, manage official staff credentials, and facilitate secure donations.

The application is built using **React 18**, **Vite**, **Firebase (Auth & Firestore)**, **EmailJS**, and **Vanilla HSL CSS**, hosted seamlessly on **Firebase Hosting**.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
*   **Routing**: [React Router DOM 6](https://reactrouter.com/)
*   **Backend & Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) + [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Email Automation**: [EmailJS](https://www.emailjs.com/) for automated acceptance/rejection applicant notices
*   **Styling**: Modern Vanilla CSS with HSL design tokens, responsive CSS grid/flexbox, and dynamic **Light/Dark Mode**.
*   **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📂 Project Structure

```text
d:\ngo\
├── public/                 # Static assets (logos, icons, images, documents)
│   └── assets/
│       ├── images/         # Logo files, background images, and team photos
│       └── documents/      # Annual reports and PDF publications
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BackToTop.jsx   # Dynamic scroll-to-top button
│   │   ├── Footer.jsx      # Multi-column dynamic footer with quick links & verify link
│   │   ├── Navbar.jsx      # Mobile-drawer responsive navbar with theme toggle
│   │   ├── TeamCard.jsx    # Component showcasing organization members & social links
│   │   └── ScrollToTop.jsx # Router listener that scrolls to top, respecting hash anchors
│   ├── pages/              # Main routing views
│   │   ├── About.jsx       # Vision, Mission, Core Principles & Pioneers team grid
│   │   ├── AdminDashboard.jsx # Admin management portal (Staff, Inquiries, Volunteers, Members)
│   │   ├── AdminLogin.jsx  # Secure Firebase Auth login for foundation administrators
│   │   ├── AnnualReport.jsx# Interactive Annual Report with Founder's message & metrics
│   │   ├── Contact.jsx     # Contact inquiry form & office details
│   │   ├── Donate.jsx      # Secure Pledge Portal & Donation options
│   │   ├── Home.jsx        # Landing page with interactive tabbed testimonials & programs
│   │   ├── MemberRegister.jsx    # Executive Member Application Portal
│   │   ├── NotFound.jsx    # 404 Error page
│   │   ├── Privacy.jsx     # NGO Privacy Policy compliance statement
│   │   ├── Programs.jsx    # 6 detailed scrollable program pillars
│   │   ├── Register.jsx    # Get Involved registration landing page
│   │   ├── Terms.jsx       # Terms & Conditions compliance page
│   │   ├── Verify.jsx      # Public Official ID Verification Portal & Credential Cards
│   │   └── VolunteerRegister.jsx # Volunteer Application Portal
│   ├── styles/
│   │   ├── admin.css       # Admin dashboard & management portal styles
│   │   ├── home.css        # Homepage animations, hero & testimonial sliders
│   │   └── styles.css      # Core HSL design system & global components
│   ├── firebase.js         # Firebase initialization (Auth & Firestore)
│   ├── App.jsx             # React routing configurations & page layout
│   └── main.jsx            # React root entry point
├── index.html              # HTML shell & SEO meta configuration
├── package.json            # Scripts & project dependencies
├── firebase.json           # Firebase Hosting configuration (Rewrites all paths to index.html)
└── .firebaserc             # Firebase active project mappings
```

---

## ✨ Key Features

1.  **Tabbed Voices of NexJyoti Testimonials**:
    *   **Leadership Perspectives (10 Leaders)**: Features reflections and LinkedIn integrations for the Leadership Council.
    *   **Voices of Our Volunteers (12 Volunteers)**: Dedicated volunteer recognition quotes and stories of impact with responsive slider navigation.
2.  **Public Credential & ID Verification Portal (`/verify`)**:
    *   Search and authenticate official staff/volunteer IDs (e.g. `NXJY-FD-001`, `NXJY-VL-001`).
    *   Generates official digital verification credential cards with photo, designation, department, email, and digital seal.
3.  **Comprehensive Admin Portal (`/admin/dashboard`)**:
    *   **Staff Registry**: Add, edit, and delete staff records with instant live reflection on verification cards.
    *   **Inquiries Inbox**: Manage and view inquiries submitted via the Contact page.
    *   **Volunteer & Member Management**: Review applications, send automated EmailJS acceptance/rejection emails, or convert applicants directly into official staff with auto-generated IDs.
4.  **Volunteer & Executive Member Registration Portals**:
    *   Multi-field detailed application forms with area selection, motivation, skills, and mode preferences stored in Firestore.
5.  **6-Pillar Scrollable Programs Layout**:
    *   Detailed coverage of Children's Education, Youth Skilling, Women Empowerment, and Community Development initiatives.
6.  **Sleek Dark / Light Theme Toggle**:
    *   Native HSL CSS variables for seamless theme switching with persistence in `localStorage`.
7.  **Interactive Annual Report**:
    *   Transparent metrics, financial accountability breakdowns, and downloadable PDF report.

---

## 🚀 Getting Started

### 📋 Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [Git](https://git-scm.com/)

---

### 📥 1. Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/nexjyoti-ngo.git
    cd nexjyoti-ngo
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the project root with your Firebase and EmailJS credentials:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

    VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
    VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
    VITE_EMAILJS_ACCEPTANCE_TEMPLATE_ID=your_acceptance_template_id
    VITE_EMAILJS_REJECTION_TEMPLATE_ID=your_rejection_template_id
    ```

---

### 💻 2. Running Locally for Development

Launch the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

### 🏗️ 3. Production Build & Preview

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## ☁️ Deploying to Firebase Hosting

```bash
# Login to Firebase
firebase login

# Build project
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

---

## 📄 License & Attribution

© 2021–Present **NexJyoti Education Foundation**. All rights reserved. Registered under Section 8 of the Companies Act, 2013 with 80G & 12A tax exemption certifications.
