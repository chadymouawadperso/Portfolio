import type { Lang } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowRight } from "./Icons";

/** The "page not found" screen, in the site's own header, hero style and footer. */
export default async function NotFound({ lang }: { lang: Lang }) {
  const { t, links } = await getContent(lang);
  const home = lang === "fr" ? "/fr" : "/";
  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} paths={{ en: "/", fr: "/fr" }} />
      <main id="main">
        <section className="mh nf" id="top" aria-labelledby="nf-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker">404 · {t.nf_k}</p>
              <h1 id="nf-title">
                <span className="tl">{t.nf_a}</span>
                <span className="tl">{t.nf_b}</span>
              </h1>
              <p className="mh-lead">{t.nf_sub}</p>
              <div className="cta-row">
                <a className="btn" href={home}><span>{t.nf_home}</span></a>
                <a className="link-arrow" href={links.playbooks}><span>{t.nf_pb}</span><ArrowRight /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} links={links} />
    </>
  );
}
