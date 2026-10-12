// Build-time rendering of a route to static HTML (used only by scripts/prerender.mjs).
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

export { ROUTES, NOT_FOUND, SITE_URL, canonicalUrl, pageTitle, isIndexable, robotsContent } from "./seo/routes";

/** Renders `url` and returns the page HTML plus the head tags set by <SEOHead>. */
export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const { helmet } = helmetContext;
  const head = ["title", "meta", "link", "script"]
    .map((part) => helmet[part].toString())
    .filter(Boolean)
    .join("\n  ");
  return { html, head };
}
