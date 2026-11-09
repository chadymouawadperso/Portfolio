import { defineArrayMember, defineField, defineType } from "sanity";
import type { Template } from "sanity";
import { pbWvCopy } from "@/lib/pb-wv-copy";
import { pbWvLabels } from "@/lib/pb-wv-labels";
import { pbCtCopy } from "@/lib/pb-ct-copy";
import { pbCtLabels } from "@/lib/pb-ct-labels";
import { pbEvCopy } from "@/lib/pb-ev-copy";
import { pbEvLabels } from "@/lib/pb-ev-labels";

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

/** A playbook page. Its texts are one list (label + English + French), so every playbook shares the same structure
    and the dataset's field-name count stays flat. Empty texts fall back to the built-in copy. */
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
  preview: { select: { title: "name" } },
});

type Copy = { en: Readonly<Record<string, string>>; fr: Readonly<Record<string, string>> };
const prefill = (id: string, name: string, labels: [string, string][], copy: Copy): Template => ({
  id,
  title: name,
  schemaType: "playbookPage",
  value: {
    name,
    texts: labels.map(([key, label]) => ({ _type: "pbText", _key: key, key, label, en: copy.en[key], fr: copy.fr[key] })),
  },
});

/** One pre-filled template per playbook: opening a playbook for the first time shows its current texts. */
export const playbookTemplates: Template[] = [
  prefill("pb-wv", "The High-Intent Website Visitor Engine", pbWvLabels, pbWvCopy),
  prefill("pb-ct", "The Competitor Takeout Engine", pbCtLabels, pbCtCopy),
  prefill("pb-ev", "The Event & Webinar-to-Pipeline Engine", pbEvLabels, pbEvCopy),
];
