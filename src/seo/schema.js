// JSON-LD structured data: the organisation (homepage) and breadcrumbs (inner pages).
import { ROUTES, SITE_NAME, SITE_URL, canonicalUrl } from "./routes";

const HOME = ROUTES.find((r) => r.path === "/");

export const ngoSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  alternateName: ["NexJyoti", "Nex Jyoti", "NJEF"],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/images/logo-fullname.jpeg`,
  description: HOME.description,
  foundingDate: "2021",
  founder: { "@type": "Person", name: "Shivnarayan Kumar" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Irgu Toli Road, Raja Hata Lane, Kishore Ganj",
    addressLocality: "Ranchi",
    addressRegion: "Jharkhand",
    postalCode: "834001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "23.3699", longitude: "85.3253" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9572570256",
    contactType: "General Inquiries",
    email: "info@nexjyoti.org",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: "India",
  nonprofitStatus: "Registered under Section 80G of the Indian Income Tax Act",
  // Official profiles linked in the site footer.
  sameAs: [
    "https://www.instagram.com/nexjyoti_edu/",
    "https://www.linkedin.com/company/nexjyoti-education-foundation/",
  ],
};

/** Home › Page, for inner pages. */
export function breadcrumbSchema(route) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: route.name, item: canonicalUrl(route.path) },
    ],
  };
}
