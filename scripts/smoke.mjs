// Smoke test: every page, the SEO files, the 404 and the WordPress redirects.
// Usage: BASE=http://localhost:3000 npm run test:smoke   (start the site first with `npm run start`)
import { createRequire } from "node:module";

const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://chadymouawad.com";
const PDFS = createRequire(import.meta.url)("../lib/playbook-pdfs.json");

const en = ["/", "/methodology", "/experience", "/gtm-playbooks", ...PDFS.map((p) => `/gtm-playbooks/${p.slug}`), "/about"];
const pages = [...en, ...en.map((p) => (p === "/" ? "/fr" : `/fr${p}`))];
const redirects = [
  ...PDFS.map((p) => [`/wp-content/uploads/2026/07/${p.wp}`, `/playbooks/${p.slug}.pdf`]),
  ["/wp-content/uploads/2025/01/old.jpg", "/"],
  ["/brizy-project", "/"],
  ["/author/chadymouawad", "/about"],
  ["/feed", "/"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/wp-login.php", "/"],
];

let failed = 0;
const check = (ok, label) => {
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
};
const get = (path) => fetch(BASE + path, { redirect: "manual" });

for (const path of pages) {
  const res = await get(path);
  const html = res.status === 200 ? await res.text() : "";
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const want = SITE + (path === "/" ? "" : path);
  check(res.status === 200 && h1 === 1 && canonical === want, `${path} (status ${res.status}, h1 ${h1}, canonical ${canonical ?? "none"})`);
}
for (const path of ["/robots.txt", "/sitemap.xml"]) check((await get(path)).status === 200, path);
for (const path of ["/this-page-does-not-exist", "/fr/cette-page-nexiste-pas"]) {
  const res = await get(path);
  check(res.status === 404 && (await res.text()).includes("nf-title"), `${path} shows the branded 404 (status ${res.status})`);
}
for (const [from, to] of redirects) {
  const res = await get(from);
  const loc = res.headers.get("location") || "";
  check(res.status === 301 && new URL(loc, BASE).pathname === to, `${from} -> ${to} (${res.status} ${loc})`);
}

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
