"use client";

import type { Lang } from "@/lib/i18n";

const TEXT = {
  en: { t: "Something went wrong.", retry: "Try again", home: "Back to home", href: "/" },
  fr: { t: "Une erreur s’est produite.", retry: "Réessayer", home: "Retour à l’accueil", href: "/fr" },
};

/** Shown if a page fails to render. Plain on purpose: it must work even when content cannot load. */
export default function ErrorView({ lang, reset }: { lang: Lang; reset: () => void }) {
  const x = TEXT[lang];
  return (
    <main id="main" className="mh nf">
      <div className="wrap mh-grid">
        <div className="mh-main">
          <h1><span className="tl">{x.t}</span></h1>
          <div className="cta-row">
            <button type="button" className="btn" onClick={reset}><span>{x.retry}</span></button>
            <a className="link-arrow" href={x.href}><span>{x.home}</span></a>
          </div>
        </div>
      </div>
    </main>
  );
}
