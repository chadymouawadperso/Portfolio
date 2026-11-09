import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbWv } from "@/lib/content";
import type { PbWvDict, PbWvKey } from "@/lib/pb-wv-copy";
import Header from "./Header";
import Footer from "./Footer";
import PageInteractions from "./PageInteractions";
import PlaybookFx from "./PlaybookFx";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

const SLUG = "/gtm-playbooks/high-intent-website-visitor-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: [PbWvKey, number[]][] = [["p1", [1, 2, 3, 4]], ["p2", [5, 6]], ["p3", [7, 8, 9, 10]], ["p4", [11, 12]]];
// Illustrative simulator rows: account letter, pages viewed, outcome, outcome class.
const SIM: [string, PbWvKey[], PbWvKey, "x" | "s" | "a" | "n"][] = [
  ["A", ["v_car"], "o_excl", "x"], ["B", ["v_price"], "o_comp", "x"], ["C", ["v_price", "v_comp"], "o_opp", "s"], ["D", ["v_case"], "o_cust", "a"],
  ["E", ["v_blog"], "o_nur", "n"], ["F", ["v_price", "v_sec"], "o_new", "s"], ["G", ["v_prod"], "o_dup", "x"], ["H", ["v_comp", "v_case"], "o_own", "s"],
];
// Hero visual: page, page value (%), cumulative intent score (%), excluded.
const TRAIL: [PbWvKey, number, number, boolean][] = [["v_blog", 16, 0, true], ["v_car", 10, 0, true], ["v_case", 50, 22, false], ["v_price", 95, 55, false], ["v_comp", 72, 80, false], ["v_sec", 55, 94, false]];
const TRAIL_PATH = "M" + TRAIL.map(([, , s], i) => `${(i + 0.5) * 100} ${100 - s}`).join(" L");

const sk = (n: number, f: "g" | "t" | "d" | "i" | "p" | "o" | "r") => `s${n}_${f}` as PbWvKey;

function Download() {
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

function Head({ w, k, a, b, sub, id, hint, children }: { w: PbWvDict; k: PbWvKey; a: PbWvKey; b: PbWvKey; sub: PbWvKey; id: string; hint?: PbWvKey; children?: React.ReactNode }) {
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

export default async function PlaybookWebsiteVisitor({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbWv(lang);
  const { t, links } = base;

  return (
    <>
      {/* Mark JavaScript as on before the page paints, so the stepper never flashes all 12 steps. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} current={links.playbooks} paths={PATHS} />

      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />

        {/* Top of page */}
        <section className="mh pbh" id="top" aria-labelledby="p-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker" data-anchor>{w.kick}</p>
              <h1 id="p-title"><span className="tl">The High-Intent</span><span className="tl">Website Visitor</span><span className="tl">Engine</span></h1>
              <p className="subtitle">{w.sub}</p>
              <p className="mh-lead">{w.lead}</p>
              <div className="cta-row">
                <a className="btn" href={pdf}><span>{w.pdf}</span><Download /></a>
                <a className="link-arrow" href={hub}><span>{w.all}</span><ArrowRight /></a>
              </div>
            </div>
            <figure className="mh-vis trail" id="trail" aria-hidden="true">
              <div className="tr-h">
                <span className="tr-acc"><i /><b>{w.v_acc}</b></span>
                <span className="tr-tags"><em>{w.v_fit}</em><em>{w.v_st}</em></span>
              </div>
              <div className="tr-lg"><span className="lg-b">{w.v_val}</span><span className="lg-l">{w.v_score}</span><span className="lg-t">{w.v_thr}</span></div>
              <div className="tr-c">
                <ol className="tr-cols">
                  {TRAIL.map(([k, h, , x], i) => (
                    <li key={k} className={x ? "tc x" : "tc"} style={{ "--h": `${h}%`, "--i": i } as CSSProperties}>
                      <span className="tb" />
                      <span className="tl2"><span>{w[k]}</span>{x ? <em>{w.v_x}</em> : null}</span>
                    </li>
                  ))}
                </ol>
                <div className="tr-thr" />
                <svg className="tr-line" viewBox="0 0 600 100" preserveAspectRatio="none"><path d={TRAIL_PATH} vectorEffect="non-scaling-stroke" /></svg>
                {TRAIL.map(([k, , s, x], i) => (x ? null : (
                  <span key={k} className={i === 4 ? "td hot" : "td"} style={{ left: `${((i + 0.5) / 6) * 100}%`, bottom: `${s}%`, "--i": i } as CSSProperties} />
                )))}
              </div>
              <div className="tr-f"><span>{w.v_next}</span><b>{w.v_act}</b></div>
            </figure>
            <nav className="mh-index pb-idx" aria-label={w.a_idx}>
              <a href="#why"><strong>{w.i1}</strong><ArrowDown /><span className="sub">{w.i1s}</span></a>
              <a href="#model"><strong>{w.i2}</strong><ArrowDown /><span className="sub">{w.i2s}</span></a>
              <a href="#fit"><strong>{w.i4}</strong><ArrowDown /><span className="sub">{w.i4s}</span></a>
              <a href="#measure"><strong>{w.i3}</strong><ArrowDown /><span className="sub">{w.i3s}</span></a>
            </nav>
          </div>
        </section>

        {/* The problem: simulator and the non-negotiable */}
        <section className="sec why" id="why" aria-labelledby="w-title">
          <div className="wrap">
            <Head w={w} k="w_k" a="w_a" b="w_b" sub="w_sub" id="w-title" hint="hint_sim">
              <div className="seg" id="sim-seg" role="group" aria-label={w.sim_a}>
                <button type="button" className="seg-b" data-v="off" aria-pressed="true"><span>{w.sim_off}</span></button>
                <button type="button" className="seg-b" data-v="on" aria-pressed="false"><span>{w.sim_on}</span></button>
              </div>
            </Head>
            <div className="sim" id="sim" data-reveal>
              <div className="sim-top"><p className="ex">{w.sim_ex}</p></div>
              <div className="sim-h" aria-hidden="true"><span>{w.h_acc}</span><span>{w.h_pg}</span><span>{w.h_out}</span></div>
              <ul className="sim-l">
                {SIM.map(([a, pages, o, c], i) => (
                  <li key={a} className={`sr c-${c}`} style={{ "--d": i } as CSSProperties}>
                    <span className="sr-a"><i aria-hidden="true" /><span>{w.acc} {a}</span></span>
                    <span className="sr-p">{pages.map((p) => <span key={p}>{w[p]}</span>)}</span>
                    <span className="sr-o"><em className="off">{w.o_alert}</em><em className="on" aria-hidden="true">{w[o]}</em></span>
                  </li>
                ))}
              </ul>
              <p className="sim-sum" aria-live="polite">
                <span className="off">{w.sum_off}</span>
                <span className="on" aria-hidden="true"><b>{w.sum_k}</b> <span>{w.sum_on}</span></span>
              </p>
            </div>

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
          </div>
        </section>

        {/* The model: 12 steps, one at a time */}
        <section className="sec model" id="model" aria-labelledby="m-title">
          <div className="wrap">
            <Head w={w} k="m_k" a="m_a" b="m_b" sub="m_sub" id="m-title" hint="hint_model" />
            <div className="stp" id="stp" data-reveal>
              <div className="trk-w">
                <span className="trk-bar" aria-hidden="true"><span /></span>
                <ol className="trk" role="tablist" aria-label={w.a_track}>
                  {PHASES.map(([p, steps]) => (
                    <li key={p} className="tg" role="presentation">
                      <span className="tg-n">{w[p]}</span>
                      <ol role="presentation">
                        {steps.map((n) => (
                          <li key={n} role="presentation">
                            <button type="button" role="tab" className="nd" id={`tab-s${n}`} aria-controls={`pn-s${n}`} aria-selected={n === 1} tabIndex={n === 1 ? 0 : -1}>
                              <i aria-hidden="true" /><span className="tip">{w[sk(n, "g")]}</span>
                            </button>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="pns">
                {PHASES.flatMap(([p, steps]) => steps.map((n) => (
                  <div key={n} className="pn" role="tabpanel" id={`pn-s${n}`} aria-labelledby={`tab-s${n}`} hidden={n !== 1}>
                    <div className="pn-m">
                      <p className="pn-p">{w[p]}</p>
                      <h3 className="pn-t">{w[sk(n, "t")]}</h3>
                      <p className="pn-d">{w[sk(n, "d")]}</p>
                    </div>
                    <div className="pn-o"><p className="pn-ok">{w.l_out}</p><p className="pn-ov">{w[sk(n, "o")]}</p></div>
                    <dl className="ipo">
                      <div><dt>{w.l_in}</dt><dd>{w[sk(n, "i")]}</dd></div>
                      <div><dt>{w.l_pr}</dt><dd>{w[sk(n, "p")]}</dd></div>
                      <div><dt>{w.l_own}</dt><dd>{w[sk(n, "r")]}</dd></div>
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

        {/* Is it for you? (light) */}
        <section className="sec think fit" id="fit" aria-labelledby="u-title">
          <div className="wrap">
            <h2 className="display think-title" id="u-title" data-reveal><span className="tl">{w.u_a}</span><em className="tl">{w.u_b}</em></h2>
            <p className="think-sub" data-reveal>{w.u_sub}</p>
            <div className="chk" id="chk" data-reveal>
              <ul className="chk-q">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n}>
                    <button type="button" className="q" role="switch" aria-checked="false" data-q={n}>
                      <span className="sw-k2" aria-hidden="true"><i /></span><span>{w[`u_q${n}` as PbWvKey]}</span>
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
                  {[1, 2, 3, 4].map((n) => <li key={n} data-m={n} hidden>{w[`u_m${n}` as PbWvKey]}</li>)}
                </ul>
                <span className="chk-g" aria-hidden="true"><i /><i /><i /><i /></span>
                <p className="chk-n">{w.u_nd}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Measurement */}
        <section className="sec meas" id="measure" aria-labelledby="r-title">
          <div className="wrap">
            <Head w={w} k="r_k" a="r_a" b="r_b" sub="r_sub" id="r-title" />
            <div className="ms" data-reveal>
              <p className="ms-g a"><span>{w.r_lead}</span></p>
              <p className="ms-g b"><span>{w.r_com}</span></p>
              <ol className="ms-l">
                {[1, 2, 3, 4].map((n) => <li key={n}><b>{w[`r${n}` as PbWvKey]}</b><span>{w[`r${n}s` as PbWvKey]}</span></li>)}
              </ol>
            </div>
          </div>
        </section>

        {/* Closing */}
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
      </main>

      <Footer t={t} links={links} />
      <PageInteractions lang={lang} />
      <PlaybookFx />
    </>
  );
}
