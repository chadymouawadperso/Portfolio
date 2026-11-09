import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { getDict, LINKS, type Dict, type Lang } from "./i18n";
import { methodCopy, type MethodDict, type MethodKey } from "./methodology-copy";
import { aboutCopy, type AboutDict, type AboutKey } from "./about-copy";
import { pbWvCopy, type PbWvDict } from "./pb-wv-copy";
import { pbCtCopy, type PbCtDict } from "./pb-ct-copy";
import { pbEvCopy, type PbEvDict } from "./pb-ev-copy";
import { pbAmCopy, type PbAmDict } from "./pb-am-copy";
import { playbooksCopy, type PlaybooksDict, type PlaybooksKey } from "./playbooks-copy";
import { expCopy, type ExpDict, type ExpKey } from "./experience-copy";

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
    experience: lang === "fr" ? "/fr/experience" : "/experience",
    playbooks: lang === "fr" ? "/fr/gtm-playbooks" : "/gtm-playbooks",
    about: lang === "fr" ? "/fr/about" : "/about",
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
    .map((m) => [m.title as string, localPath(m.url as string, lang)] as [string, string]);

  return {
    t,
    links,
    portrait: imgUrl(hm.portrait, 900) ?? "/assets/portrait.webp",
    experiences: exps.length ? exps : fallbackExp,
    featured: {
      title: str(hm.featuredTitle) ?? "The High-Intent Website Visitor Engine",
      url: localPath(str(hm.featuredUrl) ?? LINKS.featured, lang),
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

export type ExpImage = { src: string; alt: string };
export type ExpContent = { base: Content; x: ExpDict; images: Record<"pl" | "wm" | "an", ExpImage[]> };

const EXP_IMAGES: Record<"pl" | "wm" | "an", [string, string, string][]> = {
  pl: [
    ["fa75ab10f31b9324bb712c259aca21242e74ee1f", "3D-printed anatomical skull model", "Modèle de crâne anatomique imprimé en 3D"],
    ["d375826c2de40f182022dabf34d23a1405d6f1f8", "Drone built with manufactured parts", "Drone réalisé avec des pièces fabriquées"],
    ["eec67ee0e36cd8f1dfec77bbf7766b961c710282", "Robot vehicle prototype", "Prototype de véhicule robotisé"],
  ],
  wm: [
    ["56d700ec94ada850b1dbd574d845f1da8b3ed543", "Website design work", "Travail de design web"],
    ["fb61aebce8c7ba2e2a99bc225fe306db6d3dd164", "E-commerce shopping cart", "Panier e-commerce"],
    ["e1536f86a0304498162120bda37689383fcf9ab8", "Performance marketing dashboard", "Tableau de bord de marketing de performance"],
  ],
  an: [
    ["2179fc3da416a31df07eeb76a1427de6d955fe64", "Atelier N white hoodie", "Hoodie blanc Atelier N"],
    ["861150a19cada23300acd3d5f7c927b74d736ec9", "Atelier N sportswear", "Vêtements de sport Atelier N"],
    ["d7c7fce079603543405f5515df80eb1260fdf35c", "Atelier N black hoodie", "Hoodie noir Atelier N"],
  ],
};

/** Experience page content for one language: Sanity first, built-in copy as a fallback. */
export async function getExperience(lang: Lang): Promise<ExpContent> {
  const base = await getContent(lang);
  const x = { ...expCopy[lang] } as ExpDict;
  let doc: Record<string, unknown> | null = null;
  try {
    doc = await client.fetch<Record<string, unknown> | null>(`*[_id == "experiencePage"][0]`, {});
  } catch {
    // Sanity unreachable: built-in copy.
  }
  if (doc) {
    (Object.keys(x) as ExpKey[]).forEach((k) => {
      const v = (doc![k] as L)?.[lang];
      if (typeof v === "string" && v.trim()) x[k] = v;
    });
  }
  const images = {} as ExpContent["images"];
  (["pl", "wm", "an"] as const).forEach((co) => {
    images[co] = EXP_IMAGES[co].map(([id, en, fr], i) => {
      const field = doc?.[`img_${co}${i + 1}`] as (Img & { alt?: L }) | undefined;
      const src = field?.asset?._ref
        ? img.image(field as never).width(420).height(420).fit("crop").auto("format").quality(82).url()
        : `${CDN}${id}-500x500.webp?w=420&fm=webp`;
      const alt = (field?.alt as L)?.[lang] || (lang === "fr" ? fr : en);
      return { src, alt };
    });
  });
  return { base, x, images };
}

export type AboutImages = {
  event: string;
  atelier: string;
  protolabs: string;
  wm: ExpImage[];
};
export type AboutContent = { base: Content; a: AboutDict; images: AboutImages };

/** About page content for one language: Sanity first, built-in copy as a fallback. */
export async function getAbout(lang: Lang): Promise<AboutContent> {
  const base = await getContent(lang);
  const a = { ...aboutCopy[lang] } as AboutDict;
  let doc: Record<string, unknown> | null = null;
  try {
    doc = await client.fetch<Record<string, unknown> | null>(`*[_id == "aboutPage"][0]`, {});
  } catch {
    // Sanity unreachable: built-in copy.
  }
  if (doc) {
    (Object.keys(a) as AboutKey[]).forEach((k) => {
      const v = (doc![k] as L)?.[lang];
      if (typeof v === "string" && v.trim()) a[k] = v;
    });
  }
  const photo = (v: unknown, w: number, fallback: string) =>
    (v as Img)?.asset?._ref ? img.image(v as never).width(w).fit("max").auto("format").quality(84).url() : fallback;
  const wm = EXP_IMAGES.wm.map(([id, en, fr], i) => {
    const field = doc?.[`img_wm${i + 1}`] as (Img & { alt?: L }) | undefined;
    const src = field?.asset?._ref
      ? img.image(field as never).width(420).height(420).fit("crop").auto("format").quality(82).url()
      : `${CDN}${id}-500x500.webp?w=420&fm=webp`;
    return { src, alt: (field?.alt as L)?.[lang] || (lang === "fr" ? fr : en) };
  });
  return {
    base,
    a,
    images: {
      event: photo(doc?.img_event, 1100, "/assets/about-event.webp"),
      atelier: photo(doc?.img_atelier, 1200, `${CDN}291d59c8a8e4145217b3a85c562cea8dc62d33b8-600x400.webp?w=600&fm=webp`),
      protolabs: photo(doc?.img_protolabs, 1200, `${CDN}0f6cb9eba6e4fc92a3a11083fa0342c4ab6e4c36-555x420.webp?w=555&fm=webp`),
      wm,
    },
  };
}

/* ---------- GTM Playbooks page ---------- */
export type PlaybookKey = "w" | "c" | "e" | "a" | "d";
export type PlaybookItem = {
  key: PlaybookKey;
  id: string;
  title: string;
  group: "zn" | "zg" | "zb";
  steps: number;
  url: string;
  cover: string;
  pdf: string;
};
export type PlaybooksContent = { base: Content; p: PlaybooksDict; items: PlaybookItem[] };

const WP_PB = "https://chadymouawad.com/gtm-playbooks/";
const FILES = "https://cdn.sanity.io/files/t88q36f5/production/";
// Built-in defaults: key, anchor id, title, signal group, steps, page, cover id, PDF id, PDF download name.
const PLAYBOOKS: [PlaybookKey, string, string, PlaybookItem["group"], number, string, string, string, string][] = [
  ["w", "website", "The High-Intent Website Visitor Engine", "zn", 12, "high-intent-website-visitor-engine/", "1f81f652a6ae902652f5254c95c67b8387929a4d-600x600.webp", "befefa1ee50a19e20dd75f36df6c050d9963218c", "Chady-Mouawad-High-Intent-Website-Visitor-Engine.pdf"],
  ["c", "competitor", "The Competitor Takeout Engine", "zn", 12, "competitor-takeout-engine/", "2ae3d03db002e457aa452ec3df69defb2d036a32-600x600.jpg", "2cc2d4085d2c9f8dfbb697a252db52ba2face6f5", "Chady-Mouawad-Competitor-Takeout-Engine.pdf"],
  ["e", "events", "The Event & Webinar-to-Pipeline Engine", "zg", 13, "event-webinar-to-pipeline-engine/", "34bde108686fc48cd248771cfc62c59f2f613e59-600x600.webp", "86ced49235560ccd78a9225af3b864787b93ad6b", "Chady-Mouawad-Event-Webinar-to-Pipeline-Engine.pdf"],
  ["a", "expansion", "The Account Manager Expansion Engine", "zb", 10, "account-manager-expansion-engine/", "26a0ee61065966b95e29acb709cb3d2f8f0557ec-600x600.webp", "7c55ac5d5ed7063b16b7e1b9c6f4fdce23bdeac5", "Chady-Mouawad-Account-Manager-Expansion-Engine.pdf"],
  ["d", "reactivation", "The Dormant Customer Reactivation Engine", "zb", 13, "dormant-customer-reactivation-engine/", "3a10d9fc5d203bce0d49689253f76ecdb8309a9d-600x600.webp", "d26934b152d9f7eaa8c67d24cf0b23ad8996e64f", "Chady-Mouawad-Dormant-Customer-Reactivation-Engine.pdf"],
];

const sv = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);

/** A page link from Sanity: site-relative paths ("/gtm-playbooks/...") get the /fr prefix in French. */
const localPath = (url: string, lang: Lang) => (url.startsWith("/") && lang === "fr" ? `/fr${url}` : url);

/** A Sanity file reference ("file-<id>-pdf") as a public URL. */
function fileUrl(v: unknown): string | undefined {
  const ref = (v as { asset?: { _ref?: string } })?.asset?._ref;
  const m = ref?.match(/^file-([a-f0-9]+)-(\w+)$/);
  return m ? `${FILES}${m[1]}.${m[2]}` : undefined;
}

/** GTM Playbooks page content for one language: Sanity first, built-in copy as a fallback. */
export async function getPlaybooks(lang: Lang): Promise<PlaybooksContent> {
  const base = await getContent(lang);
  const p = { ...playbooksCopy[lang] } as PlaybooksDict;
  let doc: Record<string, unknown> | null = null;
  try {
    doc = await client.fetch<Record<string, unknown> | null>(`*[_id == "playbooksPage"][0]`, {});
  } catch {
    // Sanity unreachable: built-in copy.
  }
  if (doc) {
    (Object.keys(p) as PlaybooksKey[]).forEach((k) => {
      const v = (doc![k] as L)?.[lang];
      if (typeof v === "string" && v.trim()) p[k] = v;
    });
  }
  const items = PLAYBOOKS.map(([key, id, title, group, steps, page, cover, pdfId, pdfName]): PlaybookItem => {
    const f = (n: string) => doc?.[`pb_${key}_${n}`];
    const coverField = f("cover") as Img;
    const pdf = fileUrl(f("pdf")) ?? `${FILES}${pdfId}.pdf`;
    return {
      key,
      id,
      title: sv(f("title")) ?? title,
      group,
      steps: typeof f("steps") === "number" ? (f("steps") as number) : steps,
      url: localPath(sv(f("url")) ?? WP_PB + page, lang),
      cover: coverField?.asset?._ref
        ? img.image(coverField as never).width(600).height(600).fit("crop").auto("format").quality(84).url()
        : `${CDN}${cover}?w=600&fm=webp`,
      pdf: `${pdf}?dl=${pdfName}`,
    };
  });
  return { base, p, items };
}

/* ---------- Playbook pages (one per playbook) ---------- */
export type PlaybookPageContent<D> = { base: Content; w: D; pdf: string; hub: string; next: { title: string; url: string } };

/** Content of one playbook page: built-in copy, overridden by the texts list of its Sanity "Playbook page" document.
    The PDF and the next playbook come from the GTM Playbooks page. */
async function getPlaybookPage<D extends Record<string, string>>(
  lang: Lang, docId: string, copy: Record<Lang, Readonly<D>>, me: PlaybookKey, nextKey: PlaybookKey
): Promise<PlaybookPageContent<D>> {
  const { base, items } = await getPlaybooks(lang);
  const w = { ...copy[lang] } as D;
  let doc: { texts?: { key?: string; en?: string; fr?: string }[] } | null = null;
  try {
    doc = await client.fetch(`*[_id == $id][0]{texts}`, { id: docId });
  } catch {
    // Sanity unreachable: built-in copy.
  }
  (doc?.texts ?? []).forEach((t) => {
    const v = t?.[lang];
    if (t?.key && t.key in w && typeof v === "string" && v.trim()) (w as Record<string, string>)[t.key] = v;
  });
  const self = items.find((i) => i.key === me)!;
  const next = items.find((i) => i.key === nextKey)!;
  return { base, w, pdf: self.pdf, hub: base.links.playbooks, next: { title: next.title, url: next.url } };
}

export const getPbWv = (lang: Lang) => getPlaybookPage<PbWvDict>(lang, "pbWebsiteVisitor", pbWvCopy, "w", "c");
export const getPbCt = (lang: Lang) => getPlaybookPage<PbCtDict>(lang, "pbCompetitorTakeout", pbCtCopy, "c", "e");
export const getPbEv = (lang: Lang) => getPlaybookPage<PbEvDict>(lang, "pbEventWebinar", pbEvCopy, "e", "a");
export const getPbAm = (lang: Lang) => getPlaybookPage<PbAmDict>(lang, "pbAccountExpansion", pbAmCopy, "a", "d");
