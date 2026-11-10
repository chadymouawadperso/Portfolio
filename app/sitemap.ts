import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES, frPath } from "@/lib/site";

/** /sitemap.xml — every page in English and French, each with its language pair. */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`);
  return ROUTES.flatMap((en) => {
    const languages = { en: abs(en), fr: abs(frPath(en)), "x-default": abs(en) };
    return [en, frPath(en)].map((p) => ({ url: abs(p), alternates: { languages } }));
  });
}
