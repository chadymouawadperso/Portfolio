import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { getDict, LINKS, type Dict, type Lang } from "./i18n";
import { methodCopy, type MethodDict, type MethodKey } from "./methodology-copy";

const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });
const img = createImageUrlBuilder({ projectId, dataset });

type L = { en?: string; fr?: string } | undefined;
type Img = { asset?: { _ref?: string } } | undefined;

export type Experience = { company: string; logo: string; logoAlt: string; title: string; description: string };
export type Links = {
  linkedin: string; methodology: string; experience: string; playbooks: string; about: string; cv: string;
};
export type Content = {
  t: Dict;
  links: Links;
  portrait: string;
  experiences: Experience[];
  featured: { title: string; url: string };
  more: [string, string][];
};

const LOCAL_EXPERIENCES = [
  ["Atelier N", "/assets/logo-ateliern.webp", "an"],
  ["Wminded", "/assets/logo-wminded.webp", "wm"],
  ["Protolabs", "/assets/logo-protolabs.webp", "pl"],
] as const;

/** All the homepage content for one language: Sanity first, built-in copy as a fallback. */
export async function getContent(lang: Lang): Promise<Content> {
  const t = getDict(lang);
  let home: Record<string, unknown> | null = null;
  let settings: Record<string, unknown> | null = null;
  try {
    const res = await client.fetch<{ home: Record<string, unknown> | null; settings: Record<string, unknown> | null }>(
      `{"home": *[_id == "homePage"][0], "settings": *[_id == "siteSettings"][0]}`,
      {}
    );
    home = res.home;
    settings = res.settings;
  } catch {
    // Sanity unreachable: the site still renders with the built-in copy.
  }

  const pick = (v: unknown) => {
    const x = (v as L)?.[lang];
    return typeof x === "string" && x.trim() ? x : undefined;
  };
  const set = (key: keyof Dict, v: unknown) => {
    const x = pick(v);
    if (x !== undefined) (t as Record<string, unknown>)[key] = x;
  };
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
  const imgUrl = (v: unknown, w: number) => ((v as Img)?.asset?._ref ? img.image(v as never).width(w).auto("format").quality(82).url() : undefined);

  if (home) {
    const h = home;
    set("hero_lead", h.heroLead); set("cta_connect", h.ctaConnect);
    set("sys_title", h.sysTitle); set("sys_intro", h.sysIntro); set("view_framework", h.viewFramework);
    set("think_a", h.thinkA); set("think_b", h.thinkB); set("think_p1", h.thinkP1); set("think_p2", h.thinkP2); set("think_link", h.thinkLink);
    set("exp_title", h.expTitle); set("pl_big", h.statText); set("pl_stat", h.statLabel); set("exp_link", h.expLink);
    set("pb_feat", h.pbFeatLabel); set("pb_sum", h.featuredSummary); set("pb_read", h.pbRead); set("pb_how", h.pbHow); set("pb_more", h.pbMore);
    set("c_title", h.cTitle); set("c_body", h.cBody); set("c_btn", h.cBtn);
    const caps = (h.capabilities as { line1?: L; line2?: L; description?: L }[] | undefined) ?? [];
    const mapped = caps
      .map((c) => [[pick(c.line1), pick(c.line2)].filter(Boolean).join("|"), pick(c.description) ?? ""] as [string, string])
      .filter(([a]) => a);
    if (mapped.length) t.caps = mapped;
    const steps = ((h.featuredSteps as L[] | undefined) ?? []).map(pick).filter((x): x is string => !!x);
    if (steps.length) t.pb = steps;
  }
  if (settings) {
    const s = settings;
    set("cv", s.cvLabel); set("cv_note", s.cvNote);
    set("nav_method", s.navMethod); set("nav_exp", s.navExp); set("nav_pb", s.navPb); set("nav_about", s.navAbout);
    set("f_site", s.footerSite); set("f_connect", s.footerConnect); set("rights", s.rights); set("draft", s.draftTag);
    set("m_title", s.metaTitle); set("m_desc", s.metaDescription);
    set("skip", s.skip); set("menu_open", s.menuOpen); set("menu_close", s.menuClose);
    set("a_top", s.aTop); set("a_main", s.aMain); set("a_lang", s.aLang); set("a_mobile", s.aMobile); set("a_footer", s.aFooter); set("a_portrait", s.aPortrait);
  }

  const st = settings ?? {};
  const links: Links = {
    linkedin: str(st.linkedin) ?? LINKS.linkedin,
    methodology: lang === "fr" ? "/fr/methodology" : "/methodology",
    experience: str(st.experienceUrl) ?? LINKS.experience,
    playbooks: str(st.playbooksUrl) ?? LINKS.playbooks,
    about: str(st.aboutUrl) ?? LINKS.about,
    cv: str(st.cvUrl) ?? LINKS.cv,
  };

  const hm = home ?? {};
  const fallbackExp: Experience[] = LOCAL_EXPERIENCES.map(([company, logo, k]) => ({
    company,
    logo,
    logoAlt: lang === "fr" ? `Logo ${company}` : `${company} logo`,
    title: t[`${k}_t` as keyof Dict] as string,
    description: t[`${k}_d` as keyof Dict] as string,
  }));
  const exps = ((hm.experiences as { company?: string; logo?: Img; title?: L; description?: L }[] | undefined) ?? [])
    .map((e, i) => {
      const company = str(e.company) ?? fallbackExp[i]?.company ?? "";
      return {
        company,
        logo: imgUrl(e.logo, 200) ?? fallbackExp[i]?.logo ?? "",
        logoAlt: lang === "fr" ? `Logo ${company}` : `${company} logo`,
        title: pick(e.title) ?? fallbackExp[i]?.title ?? "",
        description: pick(e.description) ?? fallbackExp[i]?.description ?? "",
      };
    })
    .filter((e) => e.company);

  const more = ((hm.morePlaybooks as { title?: string; url?: string }[] | undefined) ?? [])
    .filter((m) => str(m.title) && str(m.url))
    .map((m) => [m.title as string, m.url as string] as [string, string]);

  return {
    t,
    links,
    portrait: imgUrl(hm.portrait, 900) ?? "/assets/portrait.webp",
    experiences: exps.length ? exps : fallbackExp,
    featured: {
      title: str(hm.featuredTitle) ?? "The High-Intent Website Visitor Engine",
      url: str(hm.featuredUrl) ?? LINKS.featured,
    },
    more: more.length ? more : LINKS.more.map(([a, b]) => [a, b] as [string, string]),
  };
}

export type MethodContent = {
  base: Content;
  m: MethodDict;
  images: { meta: string; linkedin: string; google: string };
};

const CDN = "https://cdn.sanity.io/images/t88q36f5/production/";
const DEFAULT_IMAGES = {
  meta: CDN + "8034b9d689646d9a76c2089753e86fa0faaeda32-600x600.webp?w=300&fm=webp",
  linkedin: CDN + "fb820b43c6f9812d4382b6cda151d7b58ce168d1-600x600.webp?w=300&fm=webp",
  google: CDN + "b941e4371241ba64877c92779658fd95f04c865d-600x600.webp?w=300&fm=webp",
};

/** Methodology page content for one language: Sanity first, built-in copy as a fallback. */
export async function getMethodology(lang: Lang): Promise<MethodContent> {
  const base = await getContent(lang);
  const m = { ...methodCopy[lang] } as MethodDict;
  let doc: Record<string, unknown> | null = null;
  try {
    doc = await client.fetch<Record<string, unknown> | null>(`*[_id == "methodologyPage"][0]`, {});
  } catch {
    // Sanity unreachable: built-in copy.
  }
  if (doc) {
    (Object.keys(m) as MethodKey[]).forEach((k) => {
      const v = (doc![k] as L)?.[lang];
      if (typeof v === "string" && v.trim()) m[k] = v;
    });
  }
  const im = (v: unknown, fallback: string) =>
    (v as Img)?.asset?._ref ? img.image(v as never).width(300).auto("format").quality(82).url() : fallback;
  return {
    base,
    m,
    images: {
      meta: im(doc?.imgMeta, DEFAULT_IMAGES.meta),
      linkedin: im(doc?.imgLinkedin, DEFAULT_IMAGES.linkedin),
      google: im(doc?.imgGoogle, DEFAULT_IMAGES.google),
    },
  };
}
