import type { Metadata, Viewport } from "next";
import type { Lang } from "./i18n";
import { SITE_URL, INDEXABLE, alternates } from "./site";
import { getAbout, getContent, getExperience, getMethodology, getPbAm, getPbCt, getPbDr, getPbEv, getPbWv, getPlaybooks } from "./content";

export const viewport: Viewport = { themeColor: "#0B0B0C", width: "device-width", initialScale: 1 };

export async function pageMetadata(lang: Lang): Promise<Metadata> {
  const { t } = await getContent(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.m_title,
    description: t.m_desc,
    alternates: alternates("/", lang),
    openGraph: {
      title: t.m_title,
      description: t.m_desc,
      type: "website",
      url: lang === "fr" ? "/fr" : "/",
      siteName: "Chady Mouawad",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.m_title }],
    },
    twitter: { card: "summary_large_image", title: t.m_title, description: t.m_desc, images: ["/og.png"] },
    icons: { icon: "/icon.svg" },
    robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false }, // see lib/site.ts
  };
}

export async function methodMetadata(lang: Lang): Promise<Metadata> {
  const { m } = await getMethodology(lang);
  const base = await pageMetadata(lang);
  return {
    ...base,
    title: m.m_title,
    description: m.m_desc,
    alternates: alternates("/methodology", lang),
    openGraph: { ...base.openGraph, title: m.m_title, description: m.m_desc, url: lang === "fr" ? "/fr/methodology" : "/methodology" },
    twitter: { card: "summary_large_image", title: m.m_title, description: m.m_desc, images: ["/og.png"] },
  };
}

export async function expMetadata(lang: Lang): Promise<Metadata> {
  const { x } = await getExperience(lang);
  const base = await pageMetadata(lang);
  return {
    ...base,
    title: x.m_title,
    description: x.m_desc,
    alternates: alternates("/experience", lang),
    openGraph: { ...base.openGraph, title: x.m_title, description: x.m_desc, url: lang === "fr" ? "/fr/experience" : "/experience" },
    twitter: { card: "summary_large_image", title: x.m_title, description: x.m_desc, images: ["/og.png"] },
  };
}

export async function aboutMetadata(lang: Lang): Promise<Metadata> {
  const { a } = await getAbout(lang);
  const base = await pageMetadata(lang);
  return {
    ...base,
    title: a.m_title,
    description: a.m_desc,
    alternates: alternates("/about", lang),
    openGraph: { ...base.openGraph, title: a.m_title, description: a.m_desc, url: lang === "fr" ? "/fr/about" : "/about" },
    twitter: { card: "summary_large_image", title: a.m_title, description: a.m_desc, images: ["/og.png"] },
  };
}

export async function playbooksMetadata(lang: Lang): Promise<Metadata> {
  const { p } = await getPlaybooks(lang);
  const base = await pageMetadata(lang);
  const path = lang === "fr" ? "/fr/gtm-playbooks" : "/gtm-playbooks";
  return {
    ...base,
    title: p.m_title,
    description: p.m_desc,
    alternates: alternates("/gtm-playbooks", lang),
    openGraph: { ...base.openGraph, title: p.m_title, description: p.m_desc, url: path },
    twitter: { card: "summary_large_image", title: p.m_title, description: p.m_desc, images: ["/og.png"] },
  };
}

async function playbookMetadata(lang: Lang, slug: string, w: { m_title: string; m_desc: string }): Promise<Metadata> {
  const base = await pageMetadata(lang);
  const en = `/gtm-playbooks/${slug}`;
  const path = lang === "fr" ? `/fr${en}` : en;
  return {
    ...base,
    title: w.m_title,
    description: w.m_desc,
    alternates: alternates(en, lang),
    openGraph: { ...base.openGraph, type: "article", title: w.m_title, description: w.m_desc, url: path },
    twitter: { card: "summary_large_image", title: w.m_title, description: w.m_desc, images: ["/og.png"] },
  };
}

export const pbWvMetadata = async (lang: Lang) => playbookMetadata(lang, "high-intent-website-visitor-engine", (await getPbWv(lang)).w);
export const pbCtMetadata = async (lang: Lang) => playbookMetadata(lang, "competitor-takeout-engine", (await getPbCt(lang)).w);
export const pbAmMetadata = async (lang: Lang) => playbookMetadata(lang, "account-manager-expansion-engine", (await getPbAm(lang)).w);
export const pbDrMetadata = async (lang: Lang) => playbookMetadata(lang, "dormant-customer-reactivation-engine", (await getPbDr(lang)).w);
export const pbEvMetadata = async (lang: Lang) => playbookMetadata(lang, "event-webinar-to-pipeline-engine", (await getPbEv(lang)).w);
