import { defineArrayMember, defineField, defineType } from "sanity";

const s = (name: string, title: string, group: string, description?: string) =>
  defineField({ name, title, type: "localeString", group, description });
const p = (name: string, title: string, group: string, description?: string) =>
  defineField({ name, title, type: "localeText", group, description });

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "1 · Top of page", default: true },
    { name: "system", title: "2 · How I build" },
    { name: "think", title: "3 · How I think" },
    { name: "experience", title: "4 · Experience" },
    { name: "playbooks", title: "5 · Playbooks" },
    { name: "connect", title: "6 · Closing" },
  ],
  fields: [
    // 1 · Top of page
    p("heroLead", "Sentence under your name", "hero", "Keep it to about 2 lines on desktop."),
    s("ctaConnect", "LinkedIn button", "hero"),

    // 2 · How I build
    s("sysTitle", "Section title", "system"),
    p("sysIntro", "Intro sentence (right of the title)", "system"),
    s("viewFramework", "Button label", "system"),
    defineField({
      name: "capabilities",
      title: "The six capabilities",
      type: "array",
      group: "system",
      description: "Each title is shown on two lines on desktop: line 1 and line 2.",
      validation: (r) => r.max(6),
      of: [
        defineArrayMember({
          type: "object",
          name: "capability",
          fields: [
            defineField({ name: "line1", title: "Title, line 1", type: "localeString" }),
            defineField({ name: "line2", title: "Title, line 2", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText" }),
          ],
          preview: { select: { a: "line1.en", b: "line2.en" }, prepare: ({ a, b }) => ({ title: `${a ?? ""} ${b ?? ""}` }) },
        }),
      ],
    }),

    // 3 · How I think
    s("thinkA", "Title, first line", "think"),
    s("thinkB", "Title, second line (in blue)", "think"),
    defineField({ name: "portrait", title: "Your photo (round frame)", type: "image", group: "think", options: { hotspot: true }, description: "Square photos work best. Use the hotspot to keep your face centred." }),
    p("thinkP1", "Left paragraph", "think"),
    p("thinkP2", "Right paragraph", "think"),
    s("thinkLink", "Button label", "think"),

    // 4 · Experience
    s("expTitle", "Section title", "experience"),
    defineField({ name: "statNumber", title: "Pipeline figure (in millions of dollars)", type: "number", group: "experience", description: "Shown as $55M+ in English and +55 M$ in French." }),
    s("statLabel", "Label next to the figure", "experience"),
    s("expLink", "Button label", "experience"),
    defineField({
      name: "experiences",
      title: "Companies",
      type: "array",
      group: "experience",
      of: [
        defineArrayMember({
          type: "object",
          name: "experience",
          fields: [
            defineField({ name: "company", title: "Company name", type: "string" }),
            defineField({ name: "logo", title: "Logo (square)", type: "image" }),
            defineField({ name: "title", title: "Headline", type: "localeString" }),
            defineField({ name: "description", title: "Description", type: "localeText", description: "Keep all three roughly the same length." }),
          ],
          preview: { select: { title: "company", subtitle: "title.en", media: "logo" } },
        }),
      ],
    }),

    // 5 · Playbooks
    s("pbFeatLabel", "Small label above the featured playbook", "playbooks"),
    defineField({ name: "featuredTitle", title: "Featured playbook title", type: "string", group: "playbooks" }),
    p("featuredSummary", "Featured playbook summary", "playbooks"),
    defineField({ name: "featuredUrl", title: "Featured playbook link", type: "url", group: "playbooks" }),
    s("pbRead", "Button label", "playbooks"),
    s("pbHow", "Label above the steps", "playbooks"),
    defineField({ name: "featuredSteps", title: "Steps of the engine", type: "array", group: "playbooks", of: [defineArrayMember({ type: "localeString" })] }),
    s("pbMore", "Label above the other playbooks", "playbooks"),
    defineField({
      name: "morePlaybooks",
      title: "Other playbooks",
      type: "array",
      group: "playbooks",
      of: [
        defineArrayMember({
          type: "object",
          name: "playbookLink",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "url", title: "Link", type: "url" }),
          ],
        }),
      ],
    }),

    // 6 · Closing
    s("cTitle", "Title", "connect"),
    p("cBody", "Text", "connect"),
    s("cBtn", "LinkedIn button", "connect"),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
