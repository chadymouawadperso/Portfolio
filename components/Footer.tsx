import type { Dict } from "@/lib/i18n";
import type { Links } from "@/lib/content";
import { Monogram } from "./Icons";

export default function Footer({ t, links: LINKS }: { t: Dict; links: Links }) {
  const cvHref = LINKS.cv || "#cv";
  return (
    <footer>
      <div className="wrap foot-top">
        <div className="foot-brand">
          <a className="brand" href="#top" aria-label={t.a_top}>
            <Monogram />
            <span>Chady Mouawad</span>
          </a>
          <p><span>GTM Engineer</span><br /><span>{t.hero_lead}</span></p>
        </div>
        <nav className="foot-col" aria-label={t.a_footer}>
          <p className="foot-h">{t.f_site}</p>
          <a href={LINKS.methodology}>{t.nav_method}</a>
          <a href={LINKS.experience}>{t.nav_exp}</a>
          <a href={LINKS.playbooks}>{t.nav_pb}</a>
          <a href={LINKS.about}>{t.nav_about}</a>
        </nav>
        <div className="foot-col">
          <p className="foot-h">{t.f_connect}</p>
          <a href={LINKS.linkedin}>LinkedIn ↗</a>
          <a href={cvHref} data-cv download={LINKS.cv ? true : undefined}>{t.cv}</a>
          <p className="cv-note foot-note" role="status" hidden>{t.cv_note}</p>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 Chady Mouawad. {t.rights}</span>
        <span className="draft-tag">{t.draft}</span>
      </div>
    </footer>
  );
}
