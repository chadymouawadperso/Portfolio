import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES, frPath } from "@/lib/site";
import { getUpdatedAt } from "@/lib/content";

export const revalidate = 3600;

/** /sitemap.xml — every page in English and French, each with its language pair and its last edit date. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const abs = (p: string) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`);
  const updated = await getUpdatedAt();
  return ROUTES.flatMap((en) => {
    const languages = { en: abs(en), fr: abs(frPath(en)), "x-default": abs(en) };
    const lastModified = updated[en];
    return [en, frPath(en)].map((p) => ({ url: abs(p), alternates: { languages }, ...(lastModified ? { lastModified } : {}) }));
  });
}
