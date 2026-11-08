import type { Metadata, Viewport } from "next";
import type { Lang } from "./i18n";
import { getContent, getExperience, getMethodology } from "./content";

export const viewport: Viewport = { themeColor: "#0B0B0C", width: "device-width", initialScale: 1 };

export async function pageMetadata(lang: Lang): Promise<Metadata> {
  const { t } = await getContent(lang);
  return {
    metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
    title: t.m_title,
    description: t.m_desc,
    alternates: { canonical: lang === "fr" ? "/fr" : "/", languages: { en: "/", fr: "/fr" } },
    openGraph: {
      title: t.m_title,
      description: t.m_desc,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.m_title }],
    },
    twitter: { card: "summary_large_image", title: t.m_title, description: t.m_desc, images: ["/og.png"] },
    icons: { icon: "/icon.svg" },
    robots: { index: false, follow: false }, // preview only: switch to true at launch
  };
}

export async function methodMetadata(lang: Lang): Promise<Metadata> {
  const { m } = await getMethodology(lang);
  const base = await pageMetadata(lang);
  return {
    ...base,
    title: m.m_title,
    description: m.m_desc,
    alternates: { canonical: lang === "fr" ? "/fr/methodology" : "/methodology", languages: { en: "/methodology", fr: "/fr/methodology" } },
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
    alternates: { canonical: lang === "fr" ? "/fr/experience" : "/experience", languages: { en: "/experience", fr: "/fr/experience" } },
    openGraph: { ...base.openGraph, title: x.m_title, description: x.m_desc, url: lang === "fr" ? "/fr/experience" : "/experience" },
    twitter: { card: "summary_large_image", title: x.m_title, description: x.m_desc, images: ["/og.png"] },
  };
}
