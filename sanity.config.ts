"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./sanity/env";
import { schemaTypes, SINGLETONS } from "./sanity/schemaTypes";

// The editing Studio, available at /studio on the website.
export default defineConfig({
  name: "default",
  title: "Chady Mouawad · Website",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website content")
          .items([
            S.listItem().title("Homepage").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem().title("Methodology page").id("methodologyPage").child(S.document().schemaType("methodologyPage").documentId("methodologyPage")),
            S.listItem().title("Experience page").id("experiencePage").child(S.document().schemaType("experiencePage").documentId("experiencePage")),
            S.listItem().title("About page").id("aboutPage").child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem().title("GTM Playbooks page").id("playbooksPage").child(S.document().schemaType("playbooksPage").documentId("playbooksPage")),
            S.listItem().title("Playbook · Website Visitor Engine").id("pbWebsiteVisitor").child(S.document().schemaType("playbookPage").documentId("pbWebsiteVisitor").initialValueTemplate("playbookPage")),
            S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType) || context.schemaType === "playbookPage"
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
});
