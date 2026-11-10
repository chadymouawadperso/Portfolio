import type { Dict, Lang } from "@/lib/i18n";
import { LINKS } from "@/lib/i18n";
import { SITE_URL, PLAYBOOKS, frPath } from "@/lib/site";

/**
 * JSON-LD for search engines. Only facts already shown on the site:
 * name, job title, current employer, LinkedIn. Home gets Person + WebSite,
 * inner pages get a BreadcrumbList.
 */
export default function StructuredData({ t, lang, en }: { t: Dict; lang: Lang; en: string }) {
  const abs = (p: string) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`);
  const loc = (p: string) => abs(lang === "fr" ? frPath(p) : p);
  const person = `${SITE_URL}/#person`;
  const graph: object[] = [];

  if (en === "/") {
    graph.push(
      {
        "@type": "Person",
        "@id": person,
        name: "Chady Mouawad",
        url: SITE_URL,
        jobTitle: "GTM Engineer",
        worksFor: { "@type": "Organization", name: "Protolabs" },
        sameAs: [LINKS.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Chady Mouawad",
        inLanguage: ["en", "fr"],
        publisher: { "@id": person },
      },
    );
  } else {
    const names: Record<string, string> = {
      methodology: t.nav_method,
      experience: t.nav_exp,
      "gtm-playbooks": t.nav_pb,
      about: t.nav_about,
    };
    for (const [title, slug] of PLAYBOOKS) names[slug] = title;
    const segs = en.split("/").filter(Boolean);
    const items = [{ name: lang === "fr" ? "Accueil" : "Home", path: "/" }].concat(
      segs.map((s, i) => ({ name: names[s] ?? s, path: "/" + segs.slice(0, i + 1).join("/") })),
    );
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: loc(it.path) })),
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
