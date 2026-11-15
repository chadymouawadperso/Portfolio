import type { Lang } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { legalCopy } from "@/lib/legal-copy";
import Header from "./Header";
import Footer from "./Footer";
import Email from "./Email";

/** Legal notice + privacy note, in the site's own header, hero style and footer. */
export default async function Legal({ lang }: { lang: Lang }) {
  const { t, links } = await getContent(lang);
  const c = legalCopy[lang];
  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} paths={{ en: "/legal", fr: "/fr/legal" }} />
      <main id="main">
        <section className="mh legal-hero" id="top" aria-labelledby="legal-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker">{c.kicker}</p>
              <h1 id="legal-title">
                <span className="tl">{c.h1a}</span>
                <span className="tl">{c.h1b}</span>
              </h1>
              <p className="mh-lead">{c.lead}</p>
            </div>
          </div>
        </section>
        <section className="legal" aria-label={c.kicker}>
          <div className="wrap legal-grid">
            {c.sections.map((s) => (
              <div className="legal-block" key={s.h}>
                <h2>{s.h}</h2>
                <div className="legal-copy">
                  {s.p.map((line, i) =>
                    line === "{contact}" ? (
                      <p key={i}>{c.contact} <Email user="chady.perso" domain="gmail.com" /></p>
                    ) : (
                      <p key={i}>{line}</p>
                    ),
                  )}
                </div>
              </div>
            ))}
            <p className="legal-updated">{c.updated}</p>
          </div>
        </section>
      </main>
      <Footer t={t} links={links} />
    </>
  );
}
