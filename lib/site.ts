/**
 * Site-wide address and search-engine settings.
 *
 * SITE_URL is the one public address of the site. Canonical links, hreflang,
 * Open Graph URLs, the sitemap and structured data are all built from it,
 * so previews and temporary Vercel URLs never leak into what Google sees.
 *
 * INDEXABLE stays false until launch day. To let Google index the site, set
 * the Vercel environment variable SITE_INDEXABLE=true (Production only) and
 * redeploy. Until then every page says "noindex" and robots.txt blocks crawling.
 */
export const SITE_URL = "https://chadymouawad.com";
export const INDEXABLE = process.env.SITE_INDEXABLE === "true";

/** The five playbook pages, in the order of the GTM Playbooks page. Titles stay in English in both languages. */
export const PLAYBOOKS: [string, string][] = [
  ["The High-Intent Website Visitor Engine", "high-intent-website-visitor-engine"],
  ["The Competitor Takeout Engine", "competitor-takeout-engine"],
  ["The Event & Webinar-to-Pipeline Engine", "event-webinar-to-pipeline-engine"],
  ["The Account Manager Expansion Engine", "account-manager-expansion-engine"],
  ["The Dormant Customer Reactivation Engine", "dormant-customer-reactivation-engine"],
];

/** Every public page, as its English path (French = "/fr" + path). Used by the sitemap. */
export const ROUTES: string[] = [
  "/",
  "/methodology",
  "/experience",
  "/gtm-playbooks",
  ...PLAYBOOKS.map(([, slug]) => `/gtm-playbooks/${slug}`),
  "/about",
];

export const frPath = (en: string) => (en === "/" ? "/fr" : `/fr${en}`);

/** canonical + hreflang pairs (en, fr, x-default → English) for one page. */
export function alternates(en: string, lang: "en" | "fr") {
  const fr = frPath(en);
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}
