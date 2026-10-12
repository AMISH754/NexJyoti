import React from "react";
import { Helmet } from "react-helmet-async";
import {
  DEFAULT_IMAGE, SITE_NAME, canonicalUrl, findRoute, isIndexable, pageTitle, robotsContent,
} from "../seo/routes";
import { breadcrumbSchema, ngoSchema } from "../seo/schema";

/**
 * Head tags for a page: title, description, canonical, robots, Open Graph, Twitter Card and JSON-LD.
 * Everything comes from the route's entry in src/seo/routes.js, so the same tags are used in the
 * browser and in the prerendered HTML.
 *
 * @param {string} [path="/"]   – the page's route, e.g. "/about"
 * @param {string} [ogImage]    – optional share image (defaults to the logo)
 */
export default function SEOHead({ path = "/", ogImage }) {
  const route = findRoute(path);
  const title = pageTitle(route);
  const { description } = route;
  const image = ogImage || DEFAULT_IMAGE;
  const isNotFound = route.robots === "notFound";
  const url = isNotFound ? null : canonicalUrl(route.path);

  const schemas = [];
  if (route.path === "/") schemas.push(ngoSchema);
  else if (isIndexable(route)) schemas.push(breadcrumbSchema(route));

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      <meta name="robots" content={robotsContent(route)} />
      {url && <link rel="alternate" hrefLang="en-IN" href={url} />}
      {url && <link rel="alternate" hrefLang="x-default" href={url} />}

      {/* Regional & Geographic Signals (Local & Geo SEO) */}
      <meta name="geo.region" content="IN-JH" />
      <meta name="geo.placename" content="Ranchi, Jharkhand, India" />
      <meta name="geo.position" content="23.3699;85.3253" />
      <meta name="ICBM" content="23.3699, 85.3253" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="NexJyoti Education Foundation logo" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data: the organisation on the homepage, breadcrumbs on inner pages */}
      {schemas.map((schema) => (
        <script key={schema["@type"]} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}
