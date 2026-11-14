# chadymouawad.com

Personal portfolio of Chady Mouawad. Next.js 15 (App Router, TypeScript, React 19), content in Sanity, hosted on Vercel.
English at `/`, French at `/fr`.

## Run it

- `npm install`, then `npm run dev` (local) or `npm run build && npm start`.
- `npm run test:smoke` checks every page, the SEO files, the 404 page and the old WordPress redirects.
  Point it at another server with `BASE=https://… npm run test:smoke`.

## Where things live

- Pages: `app/(en)` and `app/(fr)/fr` (one folder per page). Studio: `app/(studio)/studio`.
- Page components: `components/` (`Home.tsx`, `About.tsx`, `Experience.tsx`, `Methodology.tsx`, `Playbooks.tsx`, `Playbook*.tsx`).
- Shared playbook parts and animations: `components/PlaybookParts.tsx`, `components/PlaybookFx.tsx`.
- Inner-page animations: `components/PageInteractions.tsx`, `lib/heroFx.ts`. Homepage: `components/Interactions.tsx`, `components/Monogram3D.tsx`.
- Styles: `app/globals.css` (all pages), `app/inner.css` (inner pages) and one CSS file per page.
- Site URL, routes, canonical and language links: `lib/site.ts`. Page titles and descriptions: `lib/meta.ts`.
- `robots.txt` and `sitemap.xml`: `app/robots.ts`, `app/sitemap.ts`. Structured data: `components/StructuredData.tsx`.
- Security headers, redirects from the old WordPress site, and `/playbooks/<slug>.pdf`: `next.config.mjs`.
- CV files: `public/cv/`.

## Content (Sanity)

- Editor: `/studio` on the site (log in with your Sanity account). Project `t88q36f5`, dataset `production`. Schema: `sanity/schemaTypes`.
- Published text changes appear within about a minute (pages refresh every 60 seconds).
- A new playbook PDF uploaded in the Studio goes live at the next deploy (the `/playbooks/<slug>.pdf` links are built then).
- If Sanity is unreachable, pages fall back to the built-in copy in `lib/*-copy.ts` and `lib/i18n.ts`.

## Analytics

Vercel Web Analytics (`@vercel/analytics`), cookie-free, so no consent banner. Not loaded on `/studio`.
It must be switched on once in the Vercel project (Analytics tab).

## Launch switch

Search engines are blocked until launch: `noindex` on every page and `Disallow: /` in `robots.txt`.
At launch, set the Vercel environment variable `SITE_INDEXABLE=true` and redeploy.
`*.vercel.app` addresses always send `noindex`.
