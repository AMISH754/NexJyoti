import { NavLink } from "react-router-dom";

// Shared pieces of the Privacy Policy and Terms & Conditions pages. Each page sets its
// accent colour with the legal-page--privacy / legal-page--terms class (see styles.css).

const ICONS = {
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
};

export function LegalIcon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const PAGES = [
  { to: "/privacy", label: "Privacy Policy", icon: "shield" },
  { to: "/terms", label: "Terms & Conditions", icon: "document" },
];

// Switches between the two pages; the current one is highlighted.
export function LegalTabs() {
  return (
    <nav className="legal-tabs" aria-label="Legal pages">
      {PAGES.map((page) => (
        <NavLink key={page.to} to={page.to} className="legal-tab">
          <LegalIcon name={page.icon} size={18} />
          {page.label}
        </NavLink>
      ))}
    </nav>
  );
}

// "On this page" list; sections is [[id, title], ...] matching the ids of the sections.
export function LegalToc({ sections }) {
  return (
    <nav className="legal-toc" aria-label="On this page">
      <p className="legal-toc-title">On this page</p>
      <ol>
        {sections.map(([id, title]) => (
          <li key={id}>
            <a href={`#${id}`}>{title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
