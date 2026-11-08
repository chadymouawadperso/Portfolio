# chadymouawad.com — new site (homepage)

Next.js 14 (App Router, TypeScript). English at `/`, French at `/fr`.

- Copy (EN + FR): `lib/i18n.ts`
- Page structure: `components/Home.tsx`
- 3D monogram: `components/Monogram3D.tsx`
- Blue thread, reveal, counter: `components/Interactions.tsx`
- Styles: `app/globals.css`
- Security headers: `next.config.mjs`
- CV link: set `LINKS.cv` in `lib/i18n.ts` once the PDF is hosted.
- Search engines are blocked while in preview (`robots` in `lib/meta.ts`); switch to `index: true` at launch.

Run locally: `npm install`, then `npm run dev`.

## Editing content (Sanity)

- Editor: `/studio` on the site (log in with your Sanity account).
- Project ID `t88q36f5`, dataset `production`. Schema: `sanity/schemaTypes`.
- Published changes appear on the site within about a minute (pages refresh every 60 seconds).
- If Sanity is unreachable, the site falls back to the copy in `lib/i18n.ts`.
