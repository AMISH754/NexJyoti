// Build step 3 of 3 (see "build" in package.json). Writes static HTML for every public route,
// then checks the result. The build fails if a page breaks one of the SEO rules.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, ROUTES, NOT_FOUND, SITE_URL, canonicalUrl, pageTitle, robotsContent } =
  await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html has no <!--app-head--> / <!--app-html--> markers (see index.html).");
}

const fill = (head, html) => template.replace("<!--app-head-->", head).replace("<!--app-html-->", () => html);
const fileFor = (routePath) => (routePath === "/" ? "index.html" : `${routePath.slice(1)}.html`);
const write = (file, content) => {
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), content);
};

// ── Reading the rendered HTML back, for the checks ────────────────────────────
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const tagAttr = (html, pattern, attr) => {
  const tag = html.match(pattern)?.[0];
  const value = tag?.match(new RegExp(`${attr}="([^"]*)"`))?.[1];
  return value === undefined ? undefined : decode(value);
};
const inspect = (html) => {
  const body = html.slice(html.indexOf('<div id="root">'));
  const text = decode(body.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return {
    title: decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || ""),
    description: tagAttr(html, /<meta[^>]*name="description"[^>]*>/, "content"),
    canonical: tagAttr(html, /<link[^>]*rel="canonical"[^>]*>/, "href"),
    robots: tagAttr(html, /<meta[^>]*name="robots"[^>]*>/, "content"),
    ogUrl: tagAttr(html, /<meta[^>]*property="og:url"[^>]*>/, "content"),
    ogTitle: tagAttr(html, /<meta[^>]*property="og:title"[^>]*>/, "content"),
    twitterTitle: tagAttr(html, /<meta[^>]*name="twitter:title"[^>]*>/, "content"),
    h1Count: (body.match(/<h1[\s>]/g) || []).length,
    textLength: text.length,
  };
};

// ── Pages ─────────────────────────────────────────────────────────────────────
const problems = [];
const seen = { title: new Map(), description: new Map() };
const results = [];

for (const route of ROUTES) {
  const { head, html } = render(route.path);
  const page = fill(head, html);
  const info = inspect(page);
  const expectTitle = pageTitle(route);
  const where = `${route.path}:`;

  if (info.title === pageTitle(NOT_FOUND)) problems.push(`${where} rendered "Page Not Found"; is there a <Route> for it in App.jsx?`);
  if (info.title !== expectTitle) problems.push(`${where} title is "${info.title}", expected "${expectTitle}"`);
  if (info.description !== route.description) problems.push(`${where} meta description doesn't match src/seo/routes.js`);
  const length = [...route.description].length;
  if (length < 140 || length > 160) problems.push(`${where} description is ${length} characters (needs 140–160)`);
  if (info.canonical !== canonicalUrl(route.path)) problems.push(`${where} canonical is ${info.canonical}`);
  if (info.ogUrl !== canonicalUrl(route.path)) problems.push(`${where} og:url is ${info.ogUrl}`);
  if (info.ogTitle !== expectTitle || info.twitterTitle !== expectTitle) problems.push(`${where} og/twitter title mismatch`);
  if (info.robots !== robotsContent(route)) problems.push(`${where} robots is "${info.robots}"`);
  if (info.h1Count !== 1) problems.push(`${where} has ${info.h1Count} <h1> elements (needs exactly 1)`);
  if (info.textLength < 200) problems.push(`${where} has almost no text in the HTML (${info.textLength} characters)`);
  for (const key of ["title", "description"]) {
    if (seen[key].has(info[key])) problems.push(`${where} same ${key} as ${seen[key].get(info[key])}`);
    seen[key].set(info[key], route.path);
  }

  write(fileFor(route.path), page);
  results.push({ path: route.path, file: fileFor(route.path), robots: route.robots || "index", ...info });
}

// ── Report ────────────────────────────────────────────────────────────────────
console.log(`\nPrerendered ${results.length} pages into dist/\n`);
console.table(results.map((r) => ({
  path: r.path, file: r.file, robots: r.robots, h1: r.h1Count, textChars: r.textLength, title: r.title,
})));
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

if (problems.length) {
  console.error(`\nSEO checks failed:\n- ${problems.join("\n- ")}\n`);
  process.exit(1);
}
console.log(`SEO checks passed. Site: ${SITE_URL}`);
