import { defineField, defineType } from "sanity";

// A short text written in both languages, shown side by side in the Studio.
export const localeString = defineType({
  name: "localeString",
  title: "Text (EN / FR)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "fr", title: "Français", type: "string" }),
  ],
});

// A longer text (paragraph) written in both languages.
export const localeText = defineType({
  name: "localeText",
  title: "Paragraph (EN / FR)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
    defineField({ name: "fr", title: "Français", type: "text", rows: 4 }),
  ],
});
