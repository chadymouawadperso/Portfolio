import { createRequire } from "node:module";

const PDFS = createRequire(import.meta.url)("./lib/playbook-pdfs.json");
const SANITY_FILES = "https://cdn.sanity.io/files/t88q36f5/production/";

/** Current PDF file of each playbook, read from the GTM Playbooks page in Sanity at build time.
    Falls back to the files listed in lib/playbook-pdfs.json if Sanity cannot be reached.
    A PDF replaced in the Studio is picked up at the next deploy. */
async function playbookPdfFiles() {
  const files = Object.fromEntries(PDFS.map((p) => [p.key, `${p.file}.pdf`]));
  try {
    const fields = PDFS.map((p) => `"${p.key}": pb_${p.key}_pdf.asset._ref`).join(",");
    const query = encodeURIComponent(`*[_id == "playbooksPage"][0]{${fields}}`);
    const res = await fetch(`https://t88q36f5.apicdn.sanity.io/v2024-01-01/data/query/production?query=${query}`, { signal: AbortSignal.timeout(5000) });
    const refs = (await res.json()).result ?? {};
    for (const [key, ref] of Object.entries(refs)) {
      const m = typeof ref === "string" && ref.match(/^file-([a-f0-9]+)-(\w+)$/);
      if (m) files[key] = `${m[1]}.${m[2]}`;
    }
  } catch {
    // Sanity unreachable at build time: keep the listed files.
  }
  return files;
}

/** Old WordPress addresses that have no page of the same name on the new site. */
const wordpressRedirects = [
  ...PDFS.map((p) => ({ source: `/wp-content/uploads/2026/07/${p.wp}`, destination: `/playbooks/${p.slug}.pdf` })),
  { source: "/wp-content/uploads/:path*", destination: "/" },
  { source: "/brizy-project", destination: "/" },
  { source: "/author/:path*", destination: "/about" },
  { source: "/feed", destination: "/" },
  { source: "/comments/feed", destination: "/" },
  { source: "/:file(wp-sitemap.*\\.xml)", destination: "/sitemap.xml" },
  { source: "/wp-login.php", destination: "/" },
  { source: "/wp-admin/:path*", destination: "/" },
].map((r) => ({ ...r, statusCode: 301 }));

/** Security headers applied to every page of the website. */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/** The editing Studio at /studio talks to Sanity, so it gets its own, wider policy. */
const studioHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity-cdn.com https://*.sanity.io",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.sanity.work https://*.sanity-cdn.com",
      "frame-src 'self' https://*.sanity.io",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  ...securityHeaders.filter((h) => h.key !== "Content-Security-Policy"),
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/((?!studio).*)", headers: securityHeaders },
      { source: "/studio", headers: studioHeaders },
      { source: "/studio/:path*", headers: studioHeaders },
      // Temporary Vercel addresses must never be indexed, even after launch.
      { source: "/:path*", has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  async redirects() {
    return wordpressRedirects;
  },
  async rewrites() {
    // Playbook PDFs live at chadymouawad.com/playbooks/<playbook>.pdf; the file itself is served from Sanity.
    const files = await playbookPdfFiles();
    return PDFS.map((p) => ({
      source: `/playbooks/${p.slug}.pdf`,
      destination: `${SANITY_FILES}${files[p.key]}?dl=${p.name}`,
    }));
  },
};

export default nextConfig;
