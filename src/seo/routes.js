// One place for every public route's search metadata.
// Used by <SEOHead> (head tags in the browser), scripts/prerender.mjs (static HTML for each route)
// and the generated sitemap.xml. To add a page: add its <Route> in App.jsx and an entry here.

export const SITE_URL = "https://nexjyoti.org";
export const SITE_NAME = "NexJyoti Education Foundation";
export const HOME_TITLE = "NexJyoti Education Foundation — Educate. Empower. Elevate.";
export const DEFAULT_IMAGE = `${SITE_URL}/assets/images/logo-fullname.jpeg`;

export const ROBOTS = {
  index: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  utility: "noindex, follow", // forms and tools: crawlable, kept out of search results and the sitemap
  notFound: "noindex",
};

/**
 * path         route path, no trailing slash
 * name         page name: used in "<name> | NexJyoti Education Foundation" and in breadcrumbs
 * title        full <title> (homepage only)
 * description  140–160 characters, taken from the page's own content
 * robots       "index" (default) or "utility"
 * sources      files whose last git commit becomes the page's <lastmod> in sitemap.xml
 */
export const ROUTES = [
  {
    path: "/",
    name: "Home",
    title: HOME_TITLE,
    description: "NexJyoti Education Foundation empowers 1000+ underprivileged children in Jharkhand, India through free education, youth skilling and women empowerment.",
    sources: ["src/pages/Home.jsx"],
  },
  {
    path: "/about",
    name: "About Us",
    description: "Learn about NexJyoti's mission to break the chain of generational poverty through education, founded in 2021 in Jharkhand, and meet our leadership team.",
    sources: ["src/pages/About.jsx", "src/components/TeamCard.jsx"],
  },
  {
    path: "/programs",
    name: "Our Programs",
    description: "Explore NexJyoti's four core programs: free education for children, youth skill development, women empowerment and community development in rural Jharkhand.",
    sources: ["src/pages/Programs.jsx"],
  },
  {
    path: "/gallery",
    name: "Photo Gallery",
    description: "See photos from NexJyoti's education programs, Mission Udaan centres, community events and volunteer activities across Jharkhand, India. Our work in pictures.",
    sources: ["src/pages/Gallery.jsx"],
  },
  {
    path: "/donate",
    name: "Donate",
    description: "Your donation of ₹500 provides a month of quality education for a child. NexJyoti is 80G registered for tax deduction and fully transparent. Donate today.",
    sources: ["src/pages/Donate.jsx"],
  },
  {
    path: "/contact",
    name: "Contact Us",
    description: "Contact NexJyoti Education Foundation in Ranchi, Jharkhand for partnerships, volunteering, donations or general enquiries. Call, email or send us a message.",
    sources: ["src/pages/Contact.jsx"],
  },
  {
    path: "/annual-report",
    name: "Annual Report",
    description: "Read NexJyoti Education Foundation's annual report on our impact, programme outcomes and finances in Jharkhand, published for full transparency as an 80G NGO.",
    sources: ["src/pages/AnnualReport.jsx"],
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    description: "Read NexJyoti Education Foundation's privacy policy: how we collect, use and protect your personal information when you use our website, forms and services.",
    sources: ["src/pages/Privacy.jsx"],
  },
  {
    path: "/terms",
    name: "Terms & Conditions",
    description: "Terms and conditions for using the NexJyoti Education Foundation website, including our policies on donations, volunteering, registration and general use.",
    sources: ["src/pages/Terms.jsx"],
  },
  {
    path: "/register",
    name: "Join Us",
    robots: "utility",
    description: "Join NexJyoti Education Foundation as a volunteer or a member and help us educate, empower and elevate underprivileged communities in Jharkhand, India.",
    sources: ["src/pages/Register.jsx"],
  },
  {
    path: "/volunteer-register",
    name: "Volunteer Registration",
    robots: "utility",
    description: "Register as a volunteer with NexJyoti Education Foundation and contribute your time and skills to educate underprivileged children and youth in Jharkhand.",
    sources: ["src/pages/VolunteerRegister.jsx"],
  },
  {
    path: "/member-register",
    name: "Member Registration",
    robots: "utility",
    description: "Become a member of NexJyoti Education Foundation and join our community of changemakers bringing quality education to underprivileged children in India.",
    sources: ["src/pages/MemberRegister.jsx"],
  },
  {
    path: "/verify",
    name: "Verify Credentials",
    robots: "utility",
    description: "Verify the official employee, member or volunteer ID of anyone representing NexJyoti Education Foundation using our public credential registry online.",
    sources: ["src/pages/Verify.jsx"],
  },
];

// Rendered by the "*" route and prerendered to 404.html (served with HTTP 404 by Firebase Hosting).
export const NOT_FOUND = {
  path: "/404",
  name: "Page Not Found",
  robots: "notFound",
  description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
};

export const pageTitle = (route) => route.title || `${route.name} | ${SITE_NAME}`;
export const canonicalUrl = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
export const robotsContent = (route) => ROBOTS[route.robots || "index"];
export const isIndexable = (route) => (route.robots || "index") === "index";

/** The route entry for a path ("/verify/NJEF-2021-0001" → "/verify"); NOT_FOUND if none. */
export function findRoute(path) {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return ROUTES.find((r) => r.path === clean)
    || ROUTES.find((r) => r.path !== "/" && clean.startsWith(`${r.path}/`))
    || NOT_FOUND;
}
