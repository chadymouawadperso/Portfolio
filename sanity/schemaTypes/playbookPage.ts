import { defineArrayMember, defineField, defineType } from "sanity";
import { pbWvCopy } from "@/lib/pb-wv-copy";
import { pbWvLabels } from "@/lib/pb-wv-labels";

/** One text on a playbook page, with its English and French version. */
export const pbText = defineType({
  name: "pbText",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Where it appears", type: "string", readOnly: true }),
    defineField({ name: "key", title: "Internal key", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "en", title: "English", type: "text", rows: 2 }),
    defineField({ name: "fr", title: "French", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "label", subtitle: "en" } },
});

/** A playbook page. Its texts are one list (label + English + French), so every playbook shares the same structure.
    When the page is first opened in the Studio, the list is pre-filled with the built-in copy. Empty texts fall back to it. */
export const playbookPage = defineType({
  name: "playbookPage",
  title: "Playbook page",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Playbook", type: "string", readOnly: true }),
    defineField({
      name: "texts",
      title: "Texts on the page",
      description: "Each entry shows where the text appears. Edit the English and French versions, then Publish.",
      type: "array",
      of: [defineArrayMember({ type: "pbText" })],
    }),
  ],
  // Pre-fills the Website Visitor Engine page. Other playbooks will get their own template when they are built.
  initialValue: () => ({
    name: "The High-Intent Website Visitor Engine",
    texts: pbWvLabels.map(([key, label]) => ({
      _type: "pbText",
      _key: key,
      key,
      label,
      en: pbWvCopy.en[key as keyof typeof pbWvCopy.en],
      fr: pbWvCopy.fr[key as keyof typeof pbWvCopy.fr],
    })),
  }),
  preview: { select: { title: "name" } },
});
