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
