import { defineField, defineType } from "sanity";

const s = (name: string, title: string, group: string, description?: string) =>
  defineField({ name, title, type: "localeString", group, description });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "links", title: "Links & CV", default: true },
    { name: "menu", title: "Menu & footer" },
    { name: "seo", title: "Google & sharing" },
    { name: "a11y", title: "Accessibility labels" },
  ],
  fields: [
    defineField({ name: "linkedin", title: "LinkedIn profile", type: "url", group: "links" }),
    defineField({ name: "cvUrl", title: "CV link (PDF)", type: "url", group: "links", description: "Leave empty until the CV is hosted: the button then shows a short 'coming soon' note.", validation: (r) => r.uri({ allowRelative: true }) }),
    s("cvLabel", "CV button label", "links"),
    s("cvNote", "Note shown while the CV is not available", "links"),
    defineField({ name: "methodologyUrl", title: "Methodology page link", type: "url", group: "links", hidden: true }), // the page now lives on this site
    defineField({ name: "experienceUrl", title: "Experience page link", type: "url", group: "links", hidden: true }), // the page now lives on this site
    defineField({ name: "playbooksUrl", title: "GTM Playbooks page link", type: "url", group: "links" }),
    defineField({ name: "aboutUrl", title: "About page link", type: "url", group: "links" }),

    s("navMethod", "Menu: Methodology", "menu"),
    s("navExp", "Menu: Experience", "menu"),
    s("navPb", "Menu: GTM Playbooks", "menu"),
    s("navAbout", "Menu: About", "menu"),
    s("footerSite", "Footer: first column title", "menu"),
    s("footerConnect", "Footer: second column title", "menu"),
    s("rights", "Footer: rights line", "menu"),
    s("draftTag", "Footer: draft tag (remove at launch)", "menu"),

    s("metaTitle", "Browser tab and Google title", "seo"),
    defineField({ name: "metaDescription", title: "Google and LinkedIn description", type: "localeText", group: "seo", description: "About 150 characters." }),

    s("skip", "'Skip to content' link", "a11y"),
    s("menuOpen", "Menu button (closed)", "a11y"),
    s("menuClose", "Menu button (open)", "a11y"),
    s("aTop", "Logo link", "a11y"),
    s("aMain", "Main menu", "a11y"),
    s("aLang", "Language switch", "a11y"),
    s("aMobile", "Mobile menu", "a11y"),
    s("aFooter", "Footer menu", "a11y"),
    s("aPortrait", "Photo description", "a11y"),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
