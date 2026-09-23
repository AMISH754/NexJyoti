import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Enhanced SEO & GEO Head component.
 * Configures title, meta tags, canonical link, Open Graph, Twitter Cards,
 * geographic location signals (Local SEO), and JSON-LD structured data (GEO).
 *
 * @param {string} title         – Page title (appears in browser tab & search results)
 * @param {string} description   – Meta description (shown in search snippets & previews)
 * @param {string} [path="/"]    – URL path, e.g. "/about" (used for canonical & OG URL)
 * @param {string} [ogImage]     – Optional OG image URL (defaults to high-res logo)
 * @param {string} [keywords]    – Optional target keywords
 * @param {boolean} [noindex]    – When true, prevents search engines from indexing the page
 * @param {object|array} [schema]– Optional JSON-LD structured data object or array of schemas
 */
export default function SEOHead({
  title,
  description,
  path = "/",
  ogImage,
  keywords,
  noindex = false,
  schema = null,
}) {
  const siteUrl = "https://nexjyoti.org";
  const canonicalUrl = `${siteUrl}${path}`;
  const image = ogImage || `${siteUrl}/assets/images/logo-fullname.jpeg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      {/* Regional & Geographic Signals (Local & Geo SEO) */}
      <meta name="geo.region" content="IN-JH" />
      <meta name="geo.placename" content="Ranchi, Jharkhand, India" />
      <meta name="geo.position" content="23.3699;85.3253" />
      <meta name="ICBM" content="23.3699, 85.3253" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="NexJyoti Education Foundation" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Optional Page-Specific JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
