# 🌅 NexJyoti Education Foundation Website

**🔗 Live Demo**: [https://nexjyoti-f92e5.web.app](https://nexjyoti-f92e5.web.app)

Welcome to the official repository for the **NexJyoti Education Foundation** web application. This is a high-performance, responsive Single Page Application (SPA) designed to empower communities, promote educational transparency, and facilitate secure donations.

The application is built using **React 18**, **Vite**, **Vanilla HSL CSS**, and is set up to host on **Firebase Hosting**.

---

## 🛠️ Tech Stack & Architecture

*   **Core**: [React 18](https://react.dev/)
*   **Routing**: [React Router DOM 6](https://reactrouter.com/)
*   **Build Tool**: [Vite 5](https://vitejs.dev/)
*   **Styles**: Premium Vanilla CSS using CSS Variables (HSL) supporting a dynamic **Light/Dark Mode**.
*   **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📂 Project Structure

```text
d:\ngo\
├── public/                 # Static assets (logos, icons, images)
│   └── assets/
│       └── images/         # Logo files, background images, and team photos
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BackToTop.jsx   # Dynamic scroll-to-top button
│   │   ├── Footer.jsx      # Multi-column dynamic footer
│   │   ├── Navbar.jsx      # Mobile-drawer responsive navbar with theme toggle & logo fallback
│   │   ├── TeamCard.jsx    # Component showcasing organization members (image/emoji support)
│   │   └── ScrollToTop.jsx # Router listener that scrolls to top, respecting hash anchors
│   ├── pages/              # Main routing views
│   │   ├── About.jsx       # Vision, Mission, Values & Pioneers team grid
│   │   ├── AnnualReport.jsx# Interactive Annual Report with Founder's message & metrics
│   │   ├── Contact.jsx     # Google maps, Ranchi office contacts, and contact forms
│   │   ├── Donate.jsx      # Secure Pledge Portal & Volunteer application form
│   │   ├── Home.jsx        # Landing page with hero section & program cards
│   │   ├── Privacy.jsx     # NGO Privacy Policy compliance statement page
│   │   ├── Programs.jsx    # 6 detailed scrollable program pillars with quick links
│   │   └── Terms.jsx       # Terms & Conditions page
│   ├── styles/
│   │   ├── styles.css      # Core HSL design system, page styling & dark theme variables
│   │   └── home.css        # Homepage specific animations & layouts
│   ├── App.jsx             # React routing configurations & page layout
│   └── main.jsx            # React root entry point
├── index.html              # HTML shell & SEO meta configuration
├── package.json            # Scripts & project dependencies
├── firebase.json           # Firebase Hosting configuration (Rewrites all paths to index.html)
└── .firebaserc             # Firebase active project mappings (nexjyoti-f92e5)
```

---

## 🚀 Getting Started

Follow these step-by-step instructions to get a copy of the project running on your local machine and deploy it to the web.

### 📋 Prerequisites

Before you start, make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (LTS version is recommended)
*   [Git](https://git-scm.com/)

---

### 📥 1. Installation

1.  **Clone the repository** (replace with your repository URL):
    ```bash
    git clone https://github.com/your-username/nexjyoti-ngo.git
    ```

2.  **Navigate into the project directory**:
    ```bash
    cd nexjyoti-ngo
    ```

3.  **Install the required package dependencies**:
    ```bash
    npm install
    ```
    *This command reads the dependencies listed in `package.json` (such as `react`, `react-router-dom`, `vite`) and installs them into the `node_modules` directory.*

---

### 💻 2. Running Locally for Development

To launch the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

*   By default, the server will start at `http://localhost:5173` (or the next available port).
*   Open that URL in your browser to view the app and test animations, dark/light theme switching, and routing instantly.

---

### 🏗️ 3. Production Build & Local Preview

To build the project into static files optimized for deployment, and preview that production-ready build locally:

1.  **Build the application**:
    ```bash
    npm run build
    ```
    *This compiles the React code and bundles it into a highly-optimized, minified output inside the `dist/` directory.*

2.  **Preview the production build**:
    ```bash
    npm run preview
    ```
    *This spins up a local server to test the actual build in the `dist/` folder, ensuring everything loads correctly before launching.*

---

## ☁️ Deploying to Firebase Hosting

This project is pre-configured to host on Firebase under the project ID `nexjyoti-f92e5`.

### Step 1: Install Firebase CLI
Install the Firebase command-line interface tools globally:
```bash
npm install -g firebase-tools
```

### Step 2: Log in to Firebase
Authenticate your command line with your Google Account:
```bash
firebase login
```
*A browser window will open. Allow permission for the Firebase CLI to connect.*

### Step 3: Test and Deploy

1.  **Verify the Build**:
    Always ensure you have run a fresh build so the latest changes are copied into the `dist/` folder:
    ```bash
    npm run build
    ```

2.  **Deploy to Hosting**:
    Run the deployment command:
    ```bash
    firebase deploy
    ```

Firebase will upload the contents of the `dist/` folder and output your live hosting URL (e.g., `https://nexjyoti-f92e5.web.app`).

---

## ✨ Features Highlighted

1.  **6-Pillar Scrollable Programs Layout**: The Programs page details all six primary initiatives (Educational Access, Student Mentorship, Holistic Learning, Youth Skilling, Digital Inclusion, and Community Empowerment) as distinct, beautifully animated sections with custom stats.
2.  **Smooth Anchor / Hash Routing**: Clicking a program link in the footer or home page scrolls the user directly to the correct detailed section on the Programs page.
3.  **Sleek Dark Mode Toggle**: Leverages native HSL CSS variables for smooth transitioning, saving choice preferences locally via `localStorage`.
4.  **Tax Exempt Pledge Portal**: Custom donation selection slider adjusting social & educational impact descriptions on the fly, with automated 80G tax receipt notifications.
5.  **Interactive Annual Report**: Built-in page displaying key stats, executive letters, stories of change, and a download link to the complete financial report.
6.  **Full legal coverage**: Added dedicated legal compliance pages for **Terms & Conditions** and **Privacy Policy**.
