import type { Lang } from "@/lib/i18n";
import { getPlaybooks, type PlaybookItem } from "@/lib/content";
import type { PlaybooksDict } from "@/lib/playbooks-copy";
import Header from "./Header";
import Footer from "./Footer";
import PageInteractions from "./PageInteractions";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

const PATHS = { en: "/gtm-playbooks", fr: "/fr/gtm-playbooks" };

function Download() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M12 4 V15 M7 10 L12 15 L17 10 M5 20 H19" fill="none" stroke="#8DB0C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Row({ it, p }: { it: PlaybookItem; p: PlaybooksDict }) {
  return (
    <article className="pbk compact" id={it.id} aria-labelledby={`${it.id}-t`} data-reveal>
      <a className="cover" href={it.url} tabIndex={-1} aria-hidden="true">
        <img src={it.cover} width={600} height={600} alt="" loading="lazy" decoding="async" />
      </a>
      <div className="pbk-body">
        <p className="meta"><span>{p[it.group]}</span> · <span>{it.steps}</span> <span>{p.u_steps}</span></p>
        <h2 className="pbk-t" id={`${it.id}-t`}>{it.title}</h2>
        <p className="hook">{p[`h_${it.key}`]}</p>
        <div className="links">
          <a className="link-arrow" href={it.url}><span>{p.read}</span><ArrowRight /></a>
          <a className="link-arrow" href={it.pdf}><span>{p.pdf}</span><Download /></a>
        </div>
      </div>
    </article>
  );
}

export default async function Playbooks({ lang }: { lang: Lang }) {
  const { base, p, items } = await getPlaybooks(lang);
  const { t, links } = base;
  const first = (g: PlaybookItem["group"]) => items.find((i) => i.group === g)?.id ?? "library";

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} current={links.playbooks} paths={PATHS} />

      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />

        {/* Top of page */}
        <section className="mh" id="top" aria-labelledby="p-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker" data-anchor>{p.eyebrow}</p>
              <h1 id="p-title"><span className="tl">{p.h1a}</span><span className="tl">{p.h1b}</span></h1>
              {p.sub ? <p className="subtitle">{p.sub}</p> : null}
              <p className="mh-lead">{p.lead}</p>
              <div className="cta-row">
                <a className="btn" href="#library"><span>{p.cta_feat}</span><ArrowDown /></a>
                <a className="link-arrow" href={links.methodology}><span>{p.cta_think}</span><ArrowRight /></a>
              </div>
            </div>
            <figure className="mh-vis sys" id="sys" aria-hidden="true">
              <div className="sys-h"><span>{p.h_sig}</span><span>{p.h_eng}</span><span>{p.h_act}</span></div>
              <div className="sys-rows">
                {items.map((it, i) => (
                  <a key={it.key} className="sys-r" href={`#${it.id}`} tabIndex={-1} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                    <span className="sg">{p[`sg_${it.key}`]}</span>
                    <span className="en">{p[`nl_${it.key}`]}</span>
                    <span className="ac">{p[`ac_${it.key}`]}</span>
                  </a>
                ))}
              </div>
            </figure>
            <nav className="mh-index" aria-label={p.a_idx}>
              <a href={`#${first("zn")}`}><strong>{p.zn}</strong><ArrowDown /><span className="sub">{p.zn_s}</span></a>
              <a href={`#${first("zg")}`}><strong>{p.zg}</strong><ArrowDown /><span className="sub">{p.zg_s}</span></a>
              <a href={`#${first("zb")}`}><strong>{p.zb}</strong><ArrowDown /><span className="sub">{p.zb_s}</span></a>
            </nav>
          </div>
        </section>

        {/* Library */}
        <section className="sec lib" id="library" aria-labelledby="l-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>{p.l_k}</p>
                <h2 className="display" id="l-title"><span className="tl">{p.l_a}</span><span className="tl">{p.l_b}</span></h2>
                {p.l_sub ? <p className="subtitle">{p.l_sub}</p> : null}
              </div>
            </div>
            {items.map((it) => <Row key={it.key} it={it} p={p} />)}
          </div>
        </section>

        {/* Same structure (light) */}
        <section className="sec think" aria-labelledby="an-title">
          <div className="wrap">
            <h2 className="display think-title" id="an-title" data-reveal><span className="tl">{p.an_a}</span><em className="tl">{p.an_b}</em></h2>
            {p.an_sub ? <p className="subtitle" data-reveal>{p.an_sub}</p> : null}
            <ol className="anat-list" data-reveal>
              {([1, 2, 3, 4, 5] as const).map((n) => (
                <li key={n}><b>{p[`an${n}`]}</b><span>{p[`an${n}s`]}</span></li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing */}
        <section className="connect" id="connect" aria-labelledby="c-title">
          <div className="wrap connect-in" data-reveal>
            <span className="end" id="thread-end" aria-hidden="true" />
            <h2 className="display" id="c-title"><span className="tl">{p.c_t1}</span> <span className="tl">{p.c_t2}</span></h2>
            <p className="sub"><span>{p.c_q1}</span> <em>{p.c_q2}</em></p>
            <div className="cta-row">
              <a className="btn" href={links.linkedin}><span>{p.c_btn}</span><ArrowUpRight /></a>
              <a className="link-arrow" href={links.about}><span>{p.c_why}</span><ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} links={links} />
      <PageInteractions lang={lang} />
    </>
  );
}
