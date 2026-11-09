import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import type { Content } from "@/lib/content";
import Header from "./Header";
import Footer from "./Footer";
import PageInteractions from "./PageInteractions";
import PlaybookFx from "./PlaybookFx";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

// Sections shared by every GTM playbook page. Each page passes its own texts (w) and keeps its own hero and problem section.
type W = Record<string, string>;
export type Phases = [string, number[]][];

export function Download() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 4 V15 M7 10 L12 15 L17 10 M5 20 H19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hand() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M9 11 V5.5 a1.5 1.5 0 0 1 3 0 V11 M12 10 V9 a1.5 1.5 0 0 1 3 0 V11 M15 10.5 a1.5 1.5 0 0 1 3 0 V15 a6 6 0 0 1 -6 6 h-1 a6 6 0 0 1 -5 -2.7 L4 15.5 a1.5 1.5 0 0 1 2.4 -1.8 L9 16 V11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Page frame: header, main with the thread, footer and the page behaviour. */
export function PlaybookShell({ base, lang, paths, children }: { base: Content; lang: Lang; paths: { en: string; fr: string }; children: ReactNode }) {
  const { t, links } = base;
  return (
    <>
      {/* Mark JavaScript as on before the page paints, so the stepper never flashes all of its steps. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} current={links.playbooks} paths={paths} />
      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />
        {children}
      </main>
      <Footer t={t} links={links} />
      <PageInteractions lang={lang} />
      <PlaybookFx />
    </>
  );
}

/** Top of page: title, subtitle, intro, buttons, the page's own visual and the index row. */
export function PlaybookHero({ w, title, pdf, hub, visual, index }: { w: W; title: string[]; pdf: string; hub: string; visual: ReactNode; index: [string, string, string][] }) {
  return (
    <section className="mh pbh" id="top" aria-labelledby="p-title">
      <div className="wrap mh-grid">
        <div className="mh-main">
          <p className="kicker" data-anchor>{w.kick}</p>
          <h1 id="p-title">{title.map((l) => <span key={l} className="tl">{l}</span>)}</h1>
          <p className="subtitle">{w.sub}</p>
          <p className="mh-lead">{w.lead}</p>
          <div className="cta-row">
            <a className="btn" href={pdf}><span>{w.pdf}</span><Download /></a>
            <a className="link-arrow" href={hub}><span>{w.all}</span><ArrowRight /></a>
          </div>
        </div>
        {visual}
        <nav className="mh-index pb-idx" aria-label={w.a_idx}>
          {index.map(([href, k, ks]) => (
            <a key={href} href={`#${href}`}><strong>{w[k]}</strong><ArrowDown /><span className="sub">{w[ks]}</span></a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/** Section heading: title on the left; subtitle, instruction and an optional control on the right. */
export function Head({ w, k, a, b, sub, id, hint, children }: { w: W; k: string; a: string; b: string; sub: string; id: string; hint?: string; children?: ReactNode }) {
  return (
    <div className="sec-head ch hd" data-reveal>
      <div className="lead-l">
        <p className="kicker" data-anchor>{w[k]}</p>
        <h2 className="display" id={id}><span className="tl">{w[a]}</span><span className="tl">{w[b]}</span></h2>
      </div>
      <div className="hd-r">
        <p className="subtitle">{w[sub]}</p>
        {hint ? <p className="hint"><Hand /><span>{w[hint]}</span></p> : null}
        {children}
      </div>
    </div>
  );
}

/** The non-negotiable: statement plus an email that flips between the wrong and the right approach. */
export function MailFlip({ w }: { w: W }) {
  return (
    <div className="nn" data-reveal>
      <div className="nn-c">
        <p className="nn-k">{w.nn_k}</p>
        <h3 className="nn-t">{w.nn_t}</h3>
        <p className="nn-p">{w.nn_p}</p>
      </div>
      <div className="mail" id="mail">
        <div className="seg" role="group" aria-label={w.msg_a}>
          <button type="button" className="seg-b" data-v="bad" aria-pressed="true"><span>{w.msg_bad}</span></button>
          <button type="button" className="seg-b" data-v="good" aria-pressed="false"><span>{w.msg_good}</span></button>
        </div>
        <div className="mail-c">
          <p className="mail-r"><span>{w.msg_to}</span><b>Alex</b></p>
          <p className="mail-r"><span>{w.msg_sub}</span><b className="bad">{w.bad_s}</b><b className="good">{w.good_s}</b></p>
          <p className="mail-b"><span className="bad">{w.bad_b}</span><span className="good">{w.good_b}</span></p>
          <p className="mail-t"><span className="bad">{w.bad_t}</span><span className="good">{w.good_t}</span></p>
        </div>
      </div>
    </div>
  );
}

/** The model: phases and steps, one step shown at a time. */
export function Stepper({ w, phases }: { w: W; phases: Phases }) {
  const sk = (n: number, f: string) => w[`s${n}_${f}`];
  return (
    <section className="sec model" id="model" aria-labelledby="m-title">
      <div className="wrap">
        <Head w={w} k="m_k" a="m_a" b="m_b" sub="m_sub" id="m-title" hint="hint_model" />
        <div className="stp" id="stp" data-reveal>
          <div className="trk-w">
            <span className="trk-bar" aria-hidden="true"><span /></span>
            <ol className="trk" role="tablist" aria-label={w.a_track} style={{ gridTemplateColumns: phases.map(([, s]) => `${s.length}fr`).join(" ") }}>
              {phases.map(([p, steps]) => (
                <li key={p} className="tg" role="presentation">
                  <span className="tg-n">{w[p]}</span>
                  <ol role="presentation">
                    {steps.map((n) => (
                      <li key={n} role="presentation">
                        <button type="button" role="tab" className="nd" id={`tab-s${n}`} aria-controls={`pn-s${n}`} aria-selected={n === 1} tabIndex={n === 1 ? 0 : -1}>
                          <i aria-hidden="true" /><span className="tip">{sk(n, "g")}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
          <div className="pns">
            {phases.flatMap(([p, steps]) => steps.map((n) => (
              <div key={n} className="pn" role="tabpanel" id={`pn-s${n}`} aria-labelledby={`tab-s${n}`} hidden={n !== 1}>
                <div className="pn-m">
                  <p className="pn-p">{w[p]}</p>
                  <h3 className="pn-t">{sk(n, "t")}</h3>
                  <p className="pn-d">{sk(n, "d")}</p>
                </div>
                <div className="pn-o"><p className="pn-ok">{w.l_out}</p><p className="pn-ov">{sk(n, "o")}</p></div>
                <dl className="ipo">
                  <div><dt>{w.l_in}</dt><dd>{sk(n, "i")}</dd></div>
                  <div><dt>{w.l_pr}</dt><dd>{sk(n, "p")}</dd></div>
                  <div><dt>{w.l_own}</dt><dd>{sk(n, "r")}</dd></div>
                </dl>
              </div>
            )))}
          </div>
          <div className="stp-c">
            <button type="button" className="sb prev" aria-label={w.prev}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M19 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="sb next"><span>{w.next}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "When I would use this play": four switches and a verdict (light section). */
export function FitCheck({ w }: { w: W }) {
  return (
    <section className="sec think fit" id="fit" aria-labelledby="u-title">
      <div className="wrap">
        <h2 className="display think-title" id="u-title" data-reveal><span className="tl">{w.u_a}</span><em className="tl">{w.u_b}</em></h2>
        <p className="think-sub" data-reveal>{w.u_sub}</p>
        <div className="chk" id="chk" data-reveal>
          <ul className="chk-q">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>
                <button type="button" className="q" role="switch" aria-checked="false" data-q={n}>
                  <span className="sw-k2" aria-hidden="true"><i /></span><span>{w[`u_q${n}`]}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="chk-r" aria-live="polite">
            <p className="chk-s">
              <span data-st="start">{w.u_start}</span>
              <span data-st="ok" hidden>{w.u_ok}</span>
              <span data-st="mid" hidden>{w.u_mid}</span>
              <span data-st="low" hidden>{w.u_low}</span>
            </p>
            <ul className="chk-m">
              {[1, 2, 3, 4].map((n) => <li key={n} data-m={n} hidden>{w[`u_m${n}`]}</li>)}
            </ul>
            <span className="chk-g" aria-hidden="true"><i /><i /><i /><i /></span>
            <p className="chk-n">{w.u_nd}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Measurement: four questions, split between two groups. */
export function Measure({ w }: { w: W }) {
  return (
    <section className="sec meas" id="measure" aria-labelledby="r-title">
      <div className="wrap">
        <Head w={w} k="r_k" a="r_a" b="r_b" sub="r_sub" id="r-title" />
        <div className="ms" data-reveal>
          <p className="ms-g a"><span>{w.r_lead}</span></p>
          <p className="ms-g b"><span>{w.r_com}</span></p>
          <ol className="ms-l">
            {[1, 2, 3, 4].map((n) => <li key={n}><b>{w[`r${n}`]}</b><span>{w[`r${n}s`]}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Closing: the page's last line, LinkedIn and the PDF, then the way back to the library and on to the next playbook. */
export function Closing({ w, base, pdf, hub, next }: { w: W; base: Content; pdf: string; hub: string; next: { title: string; url: string } }) {
  const { t, links } = base;
  return (
    <section className="connect" id="connect" aria-labelledby="c-title">
      <div className="wrap connect-in" data-reveal>
        <span className="end" id="thread-end" aria-hidden="true" />
        <h2 className="display" id="c-title"><span className="tl">{w.c_a}</span> <em className="tl">{w.c_b}</em></h2>
        <p className="sub">{w.c_q}</p>
        <div className="cta-row">
          <a className="btn" href={links.linkedin} target="_blank" rel="noopener"><span>{t.cta_connect}</span><ArrowUpRight /></a>
          <a className="link-arrow" href={pdf}><span>{w.c_pdf}</span><ArrowDown /></a>
        </div>
        <nav className="np" aria-label={w.np_next}>
          <a href={hub}><span className="np-k">{w.np_all}</span><b>GTM Playbooks</b></a>
          <a href={next.url} className="nx"><span className="np-k">{w.np_next}</span><b>{next.title}</b></a>
        </nav>
      </div>
    </section>
  );
}
