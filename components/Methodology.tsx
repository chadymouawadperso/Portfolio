import type React from "react";
import type { Lang } from "@/lib/i18n";
import { getMethodology } from "@/lib/content";
import Header from "./Header";
import StructuredData from "./StructuredData";
import Footer from "./Footer";
import PageInteractions from "./PageInteractions";
import { ArrowRight, ArrowUpRight, ArrowDown } from "./Icons";

const PATHS = { en: "/methodology", fr: "/fr/methodology" };

/* Channel map geometry (viewBox 0 10 600 580) */
const CX = 300, CY = 312, R = 196;
type Ch = { k: "m_meta" | "m_rd" | "m_yt" | "m_ctv" | "m_se" | "m_li"; n: string; a: number; img?: "meta" | "linkedin" | "google" };
const CHANNELS = ([
  { k: "m_meta", n: "Meta", a: -90, img: "meta" },
  { k: "m_rd", n: "Reddit", a: -30 },
  { k: "m_yt", n: "YouTube", a: 30 },
  { k: "m_ctv", n: "CTV", a: 90 },
  { k: "m_se", n: "Google Search", a: 150, img: "google" },
  { k: "m_li", n: "LinkedIn", a: 210, img: "linkedin" },
] as Ch[]).map((c) => ({ ...c, x: CX + Math.cos((c.a * Math.PI) / 180) * R, y: CY + Math.sin((c.a * Math.PI) / 180) * R }));

/* Engagement table rows: score, swatch, blurred-name width, status. Illustrative, names hidden. */
const ROWS: [number, string, number, "hot" | "cold" | "ice"][] = [
  [191071, "#3B5B8C", 99, "hot"], [35399, "#2F4E7A", 77, "hot"], [23563, "#5C6066", 90, "hot"],
  [3940, "#4A4E54", 74, "cold"], [2615, "#B23E57", 96, "cold"], [480, "#6A6E74", 61, "ice"], [96, "#4A7FC1", 93, "ice"],
];

/* Before / after diagram positions (viewBox 0 0 420 300) */
const SCATTER = [[86, 62], [300, 48], [190, 150], [70, 240], [330, 226]];
const STUBS = ["M122 84 L134 97", "M268 68 L256 83", "M98 220 L110 207", "M300 206 L287 194"];
const HUB = { x: 210, y: 150 };
const RING = [0, 1, 2, 3, 4].map((i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return [HUB.x + Math.cos(a) * 162, HUB.y + Math.sin(a) * 112];
});

const f1 = (n: number) => n.toFixed(1);

export default async function Methodology({ lang }: { lang: Lang }) {
  const { base, m, images } = await getMethodology(lang);
  const { t, links } = base;
  const fmt = (v: number) => (lang === "fr" ? v.toLocaleString("fr-FR").replace(/\s/g, " ") : v.toLocaleString("en-US"));
  const MAX = ROWS[0][0];
  const chips = [m.ba_c1, m.ba_c2, m.ba_c3, m.ba_c4, m.ba_c5];
  const Chip = ({ x, y, label }: { x: number; y: number; label: string }) => (
    <g className="chip">
      <rect x={x - 52} y={y - 18} width={104} height={36} rx={18} />
      <text x={x} y={y + 5}>{label}</text>
    </g>
  );

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} current={links.methodology} paths={PATHS} />
      <StructuredData t={t} lang={lang} en={PATHS.en} />

      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />

        {/* Top of page */}
        <section className="mh" id="top" aria-labelledby="m-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker" data-anchor>{m.eyebrow}</p>
              <h1 id="m-title">
                <span className="tl">{m.h1a}</span>
                <span className="tl">{m.h1b}</span>
                {m.h1c ? <span className="tl">{m.h1c}</span> : null}
              </h1>
              <p className="mh-lead">{m.lead}</p>
              <div className="cta-row">
                <a className="btn" href={links.linkedin}><span>{t.cta_connect}</span><ArrowUpRight /></a>
                <a className="link-arrow" href={links.experience}><span>{m.cta_exp}</span><ArrowRight /></a>
              </div>
            </div>
            {/* Hero: Exposure, Signals and Activation as a three-card deck; hover fans it out */}
            <figure className="mh-vis d3" aria-hidden="true">
              <div className="d3-in">
                <div className="c3 c-ex">
                  <p className="ch"><b>{m.st1}</b><span>{m.st1s}</span></p>
                  <div className="ads">{[1, 2, 3, 4].map((i) => <i key={i} className={`ad a${i}`}><em /><s /><s /></i>)}</div>
                  <p className="cf"><span style={{ "--c": "var(--sky)" } as React.CSSProperties}>LinkedIn</span><span style={{ "--c": "var(--amber)" } as React.CSSProperties}>Google</span><span style={{ "--c": "var(--pink)" } as React.CSSProperties}>Meta</span></p>
                </div>
                <div className="c3 c-sg">
                  <p className="ch"><b>{m.st2}</b><span>{m.st2s}</span></p>
                  <ul className="sc">
                    {([["A", "92%", "hot", m.tb_hot], ["B", "74%", "hot", m.tb_hot], ["C", "38%", "cold", m.tb_cold], ["D", "14%", "ice", m.tb_ice]] as const).map(([x, w, k, lab]) => (
                      <li key={x} className={k}><span>{m.hv_acc.replace("{x}", x)}</span><em>{lab}</em><i><u style={{ "--w": w } as React.CSSProperties} /></i></li>
                    ))}
                  </ul>
                </div>
                <div className="c3 c-ac">
                  <p className="ch"><b>{m.st3}</b><span>{m.st3s}</span></p>
                  <ol className="seq">{[m.hv_q1, m.hv_q2, m.hv_q3, m.hv_q4].map((q, i) => <li key={i} style={{ "--d": i } as React.CSSProperties}><i>✓</i>{q}</li>)}</ol>
                  <p className="won">{m.hv_won}</p>
                </div>
              </div>
            </figure>
            <nav className="mh-index" aria-label={m.a_stages}>
              <a href="#exposure"><strong>{m.st1}</strong><ArrowDown /><span className="sub">{m.st1s}</span></a>
              <a href="#signals"><strong>{m.st2}</strong><ArrowDown /><span className="sub">{m.st2s}</span></a>
              <a href="#activation"><strong>{m.st3}</strong><ArrowDown /><span className="sub">{m.st3s}</span></a>
            </nav>
          </div>
        </section>

        {/* Tools vs systems */}
        <section className="sec think" aria-labelledby="p-title">
          <div className="wrap">
            <h2 className="display think-title" id="p-title" data-reveal>
              <span className="tl">{m.p_a}</span><em className="tl">{m.p_b}</em>
            </h2>
            <p className="subtitle" data-reveal>{m.p_1a}</p>
            <p className="think-sub" data-reveal>{m.p_1b}</p>
            <figure className="ba" id="ba" data-reveal>
              <div className="ba-panel">
                <svg viewBox="0 0 420 300" className="ba-svg" aria-hidden="true">
                  {STUBS.map((d) => <path key={d} className="gap" d={d} />)}
                  {SCATTER.map(([x, y], i) => <Chip key={i} x={x} y={y} label={chips[i]} />)}
                </svg>
                <figcaption><b>{m.ba_a}</b><span>{m.ba_a2}</span></figcaption>
              </div>
              <div className="ba-arrow" aria-hidden="true">
                <svg viewBox="0 0 48 24" width="48" height="24"><path d="M2 12 H44 M36 4 L44 12 L36 20" fill="none" stroke="#497287" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="ba-panel">
                <svg viewBox="0 0 420 300" className="ba-svg" aria-hidden="true">
                  {RING.map(([x, y], i) => (
                    <path key={i} className="lnk" pathLength={1} d={`M${f1(x)} ${f1(y)} L${HUB.x} ${HUB.y}`} style={{ transitionDelay: `${300 + i * 120}ms` }} />
                  ))}
                  <circle cx={HUB.x} cy={HUB.y} r={52} fill="none" stroke="rgba(73,114,135,.28)" strokeWidth={1} />
                  <circle className="acc" cx={HUB.x} cy={HUB.y} r={42} />
                  <text className="acc-t" x={HUB.x} y={HUB.y + 5}>{m.ba_acc}</text>
                  {RING.map(([x, y], i) => <Chip key={i} x={x} y={y} label={chips[i]} />)}
                </svg>
                <figcaption><b>{m.ba_b}</b><span>{m.ba_b2}</span></figcaption>
              </div>
            </figure>
          </div>
        </section>

        {/* Exposure */}
        <section className="sec" id="exposure" aria-labelledby="c1-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>{m.st1}</p>
                <h2 className="display" id="c1-title"><span className="tl">{m.c1_a}</span><span className="tl">{m.c1_b}</span></h2>
                {m.c1_sub ? <p className="subtitle">{m.c1_sub}</p> : null}
              </div>
            </div>
            <div className="expo">
              <div className="map-wrap" data-reveal>
                <svg className="map" id="map" viewBox="0 10 600 580" role="img" aria-labelledby="map-t">
                  <title id="map-t">{m.map_t}</title>
                  <defs>
                    <radialGradient id="coreG" cx="50%" cy="38%" r="62%">
                      <stop offset="0%" stopColor="#6F9CB4" />
                      <stop offset="100%" stopColor="#3A6074" />
                    </radialGradient>
                    {CHANNELS.map((c, i) => c.img ? <clipPath key={i} id={`cp${i}`}><circle cx={c.x} cy={c.y} r={58} /></clipPath> : null)}
                  </defs>
                  <circle className="ring" cx={CX} cy={CY} r={R} />
                  {CHANNELS.map((c, i) => <path key={`b${i}`} className="sp-b" d={`M${f1(c.x)} ${f1(c.y)} L${CX} ${CY}`} />)}
                  {CHANNELS.map((c, i) => (
                    <path key={`l${i}`} className="sp-l" pathLength={1} d={`M${f1(c.x)} ${f1(c.y)} L${CX} ${CY}`} style={{ transitionDelay: `${i * 120}ms` }} />
                  ))}
                  <circle cx={CX} cy={CY} r={94} fill="none" stroke="rgba(90,134,160,.22)" strokeWidth={1} />
                  <circle cx={CX} cy={CY} r={76} fill="url(#coreG)" />
                  <text className="core-t" x={CX} y={CY - 2}>{m.m_core1}</text>
                  <text className="core-t" x={CX} y={CY + 20}>{m.m_core2}</text>
                  {CHANNELS.map((c, i) => {
                    const above = c.a === -90 || c.a === -30 || c.a === 210;
                    if (c.img) {
                      const r = 58, s = r * 2 * 1.27;
                      return (
                        <g key={`n${i}`} className="node img">
                          <circle className="bg" cx={c.x} cy={c.y} r={r} />
                          <image href={images[c.img]} x={c.x - s / 2} y={c.y - s / 2} width={s} height={s} clipPath={`url(#cp${i})`} preserveAspectRatio="xMidYMid slice" />
                          <circle className="ring2" cx={c.x} cy={c.y} r={r + 6} />
                          <text className="nm" x={c.x} y={above ? c.y - r - 34 : c.y + r + 30}>{c.n}</text>
                          <text className="rl" x={c.x} y={above ? c.y - r - 15 : c.y + r + 49}>{m[c.k]}</text>
                        </g>
                      );
                    }
                    return (
                      <g key={`n${i}`} className="node">
                        <circle cx={c.x} cy={c.y} r={42} />
                        <text className="nm" x={c.x} y={c.y + 6}>{c.n}</text>
                        <text className="rl" x={c.x} y={above ? c.y - 56 : c.y + 66}>{m[c.k]}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="copy" data-reveal>
                <p className="lead">{m.c1_p1}</p>
                <p>{m.c1_p2}</p>
                <p className="strong">{m.c1_key}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signals */}
        <section className="sec" id="signals" aria-labelledby="c2-title" data-tight>
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>{m.st2}</p>
                <h2 className="display" id="c2-title"><span className="tl">{m.c2_a}</span><span className="tl">{m.c2_b}</span></h2>
                {m.c2_sub ? <p className="subtitle">{m.c2_sub}</p> : null}
              </div>
            </div>
            <div className="sig">
              <div className="copy" data-reveal>
                <p className="lead">{m.c2_p1}</p>
                <ol className="chain">
                  <li><i /><span>{m.s_1}</span></li>
                  <li><i /><span>{m.s_2}</span></li>
                  <li><i /><span>{m.s_3}</span></li>
                </ol>
                <p>{m.c2_p2}</p>
                <p className="strong">{m.c2_key}</p>
              </div>
              <div className="panel" id="panel" data-reveal>
                <div className="panel-top"><strong>{m.tb_title}</strong><span className="tag">Factors.ai</span></div>
                <table className="tbl">
                  <thead>
                    <tr><th scope="col">{m.tb_acc}</th><th scope="col">{m.tb_sc}</th><th scope="col">{m.tb_tr}</th><th scope="col">{m.tb_st}</th></tr>
                  </thead>
                  <tbody id="tbody">
                    {ROWS.map(([v, color, w, st], i) => (
                      <tr key={i} className={i > 0 && ROWS[i - 1][3] !== st ? "cut" : undefined} style={{ transitionDelay: `${i * 60}ms` }}>
                        <td><span className="acc"><span className="lg" style={{ background: color }} /><span className="dm" style={{ width: w }} /></span></td>
                        <td className="sc" data-v={v}>{fmt(v)}</td>
                        <td><span className="meter"><b style={{ ["--w" as string]: `${Math.max(3, Math.round(Math.sqrt(v / MAX) * 100))}%` }} /></span></td>
                        <td><span className={`st ${st}`}>{st === "hot" ? m.tb_hot : st === "cold" ? m.tb_cold : m.tb_ice}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="panel-foot"><span>{m.tb_foot}</span><span>{m.tb_foot2}</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Activation */}
        <section className="sec" id="activation" aria-labelledby="c3-title" data-tight>
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>{m.st3}</p>
                <h2 className="display" id="c3-title"><span className="tl">{m.c3_a}</span><span className="tl">{m.c3_b}</span></h2>
              </div>
            </div>
            <div className="act">
              <div className="seq-wrap" data-reveal>
                <div className="seq" id="seq">
                  <div className="qs"><span className="ic"><IcoMail /></span><span className="tx"><strong>{m.q1}</strong><span>{m.q1s}</span></span><span className="ch">{m.q_now}</span></div>
                  <div className="wire"><em>{m.w1}</em></div>
                  <div className="qs"><span className="mk" aria-hidden="true">A</span><span className="ic"><IcoEye /></span><span className="tx"><strong>{m.q2}</strong><span>{m.q2s}</span></span><span className="ch">LinkedIn</span></div>
                  <div className="wire"><em>{m.w1}</em></div>
                  <div className="qs"><span className="ic"><IcoInvite /></span><span className="tx"><strong>{m.q3}</strong><span>{m.q3s}</span></span><span className="ch">LinkedIn</span></div>
                  <div className="wire" />
                  <div className="qs cond"><span className="mk" aria-hidden="true">B</span><span className="ic"><IcoSplit /></span><span className="tx"><strong>{m.q4}</strong><span>{m.q4s}</span></span></div>
                  <div className="split" aria-hidden="true">
                    <svg viewBox="0 0 100 56" preserveAspectRatio="none">
                      <path d="M50 0 V18 Q50 26 42 26 H33 Q25 26 25 34 V56" vectorEffect="non-scaling-stroke" />
                      <path d="M50 0 V18 Q50 26 58 26 H67 Q75 26 75 34 V56" vectorEffect="non-scaling-stroke" />
                      <path className="l" pathLength={1} d="M50 0 V18 Q50 26 42 26 H33 Q25 26 25 34 V56" vectorEffect="non-scaling-stroke" />
                      <path className="l" pathLength={1} d="M50 0 V18 Q50 26 58 26 H67 Q75 26 75 34 V56" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="yn y">{m.yes}</span><span className="yn n">{m.no}</span>
                  </div>
                  <div className="branches">
                    <span className="mk mk-br" aria-hidden="true">C</span>
                    <div className="qs"><span className="ic"><IcoChat /></span><span className="tx"><strong>{m.q5}</strong><span>{m.q5s}</span></span><span className="ch">{m.w1}</span></div>
                    <div className="qs"><span className="ic"><IcoMail /></span><span className="tx"><strong>{m.q6}</strong><span>{m.q6s}</span></span><span className="ch">{m.w2}</span></div>
                  </div>
                </div>
              </div>
              <div className="copy act-copy" data-reveal>
                <p className="lead">{m.c3_p1}</p>
                <p>{m.c3_p2}</p>
                <p className="strong">{m.c3_key}</p>
                <ul className="notes">
                  {([["A", m.n1, m.n1d], ["B", m.n2, m.n2d], ["C", m.n3, m.n3d]] as const).map(([k, h, d]) => (
                    <li key={k}><span className="mk">{k}</span><div><b>{h}</b><span>{d}</span></div></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="runs" id="runs">
              <div className="sec-head" data-reveal>
                <div className="lead-l">
                  <h3 className="display runs-title"><span className="tl">{m.r_a}</span><em className="tl">{m.r_b}</em></h3>
                </div>
              </div>
              <div className="rtrack" id="rtrack">
                <span className="rbase" aria-hidden="true"><i /></span>
                <ol className="rsteps" id="steps">
                  {([[m.l1_t, m.l1_d], [m.l2_t, m.l2_d], [m.l3_t, m.l3_d], [m.l4_t, m.l4_d]] as const).map(([h, d]) => (
                    <li key={h}><span className="rdot" aria-hidden="true" /><h4>{h}</h4><p>{d}</p></li>
                  ))}
                </ol>
                <div className="rback" aria-hidden="true">
                  <svg viewBox="0 0 1000 60" preserveAspectRatio="none">
                    <path d="M994 0 V22 Q994 44 972 44 H28 Q6 44 6 22 V8" fill="none" stroke="#5A86A0" strokeWidth="1.6" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="rhead" />
                  <em>{m.w_ctr}</em>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="connect" id="connect" aria-labelledby="r-title">
          <div className="wrap connect-in" data-reveal>
            <span className="end" id="thread-end" aria-hidden="true" />
            <h2 className="display" id="r-title"><span className="tl">{m.r_t1}</span> <span className="tl">{m.r_t2}</span></h2>
            <p className="sub"><span>{m.r_q1}</span> <em>{m.r_q2}</em></p>
            <div className="cta-row">
              <a className="btn" href={links.linkedin}><span>{m.r_btn}</span><ArrowUpRight /></a>
              <a className="link-arrow" href={links.playbooks}><span>{m.r_pb}</span><ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} links={links} />
      <PageInteractions lang={lang} />
    </>
  );
}

const S = { fill: "none", stroke: "#8DB0C4", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function IcoMail() { return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 6h18v12H3z M3 7l9 6 9-6" {...S} /></svg>; }
function IcoEye() { return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" {...S} /><circle cx="12" cy="12" r="3" {...S} /></svg>; }
function IcoInvite() { return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="9" cy="8" r="4" {...S} /><path d="M2 20c1-4 4-6 7-6s6 2 7 6 M19 8v6 M16 11h6" {...S} /></svg>; }
function IcoSplit() { return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v7 M12 10 L6 16 V21 M12 10 L18 16 V21" {...S} /></svg>; }
function IcoChat() { return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" {...S} /></svg>; }
