import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbFa } from "@/lib/content";
import type { PbFaKey } from "@/lib/pb-fa-copy";
import { Closing, FitCheck, Head, Measure, PlaybookHero, PlaybookShell, Stepper, type Phases } from "./PlaybookParts";

const SLUG = "/gtm-playbooks/full-funnel-b2b-advertising-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: Phases = [["p1", [1, 2, 3]], ["p2", [4, 5, 6]], ["p3", [7, 8, 9, 10]], ["p4", [11, 12]]];

// Hero geometry: the whole target market on the left (reach), the accounts that engage in the middle, sales on the right.
const REACH = [
  [52, 104], [96, 92], [140, 112], [70, 146], [118, 158], [44, 196], [92, 204], [138, 214],
  [62, 250], [112, 262], [150, 290], [46, 300], [88, 318], [128, 336], [60, 350],
];
const ENGAGE = [[276, 128], [300, 176], [270, 222], [304, 266], [278, 312]];
const SX = 438, SY = 222;
// Which reach dots feed which engaged account, and which engaged accounts reach sales.
const R2E: [number, number][] = [[1, 0], [4, 1], [7, 2], [9, 3], [12, 4], [3, 1]];
const E2S = [1, 2, 3];
const curve = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`;

const STAGES = ["a", "b", "c"] as const;
const ROWS = [["l_who", "w"], ["l_ch", "c"], ["l_msg", "m"], ["l_judge", "j"], ["l_next", "h"]] as const;

export default async function PlaybookFullFunnelAds({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbFa(lang);
  const k = (key: string) => w[key as PbFaKey];

  const visual = (
    <figure className="mh-vis fax" id="fax" aria-hidden="true">
      <svg className="fax-s" viewBox="0 70 510 330" role="presentation">
        <defs>
          <radialGradient id="faxGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#4FD1A5" stopOpacity=".22" /><stop offset="1" stopColor="#4FD1A5" stopOpacity="0" /></radialGradient>
        </defs>
        <rect className="band a" x="24" y="82" width="148" height="290" rx="20" />
        <rect className="band b" x="240" y="106" width="96" height="232" rx="20" />
        <g className="lns">
          {R2E.map(([r, e], i) => (
            <path key={`r${i}`} id={`fax-r${i}`} className="ln" d={curve(REACH[r][0], REACH[r][1], ENGAGE[e][0], ENGAGE[e][1])} />
          ))}
          {E2S.map((e, i) => (
            <path key={`e${i}`} id={`fax-e${i}`} className="ln s" d={curve(ENGAGE[e][0], ENGAGE[e][1], SX - 30, SY)} />
          ))}
        </g>
        <g className="pulses">
          {R2E.map((_, i) => (
            <circle key={`pr${i}`} className="pl" r="3.5">
              <animateMotion dur="3.6s" begin={`${(i * 0.6).toFixed(1)}s`} repeatCount="indefinite"><mpath href={`#fax-r${i}`} /></animateMotion>
            </circle>
          ))}
          {E2S.map((_, i) => (
            <circle key={`pe${i}`} className="pl s" r="4">
              <animateMotion dur="3.6s" begin={`${(1.8 + i * 1.2).toFixed(1)}s`} repeatCount="indefinite"><mpath href={`#fax-e${i}`} /></animateMotion>
            </circle>
          ))}
        </g>
        {REACH.map(([x, y], i) => <circle key={`d${i}`} className="dr" cx={x} cy={y} r="6" style={{ "--i": i } as CSSProperties} />)}
        {ENGAGE.map(([x, y], i) => <circle key={`g${i}`} className="dg" cx={x} cy={y} r="8" style={{ "--i": i } as CSSProperties} />)}
        <circle className="glow" cx={SX} cy={SY} r="70" fill="url(#faxGlow)" />
        <circle className="core" cx={SX} cy={SY} r="30" />
        <circle className="corec" cx={SX} cy={SY} r="7" />
        <text className="lb" x="98" y="396" textAnchor="middle">{w.v_reach}</text>
        <text className="lb" x="288" y="396" textAnchor="middle">{w.v_eng}</text>
        <text className="lb y" x={SX} y="396" textAnchor="middle">{w.v_conv}</text>
      </svg>
      <p className="fax-k">{w.v_note}</p>
    </figure>
  );

  return (
    <PlaybookShell base={base} lang={lang} paths={PATHS}>
      <PlaybookHero w={w} title={w.h1l.split("|")} pdf={pdf} hub={hub} visual={visual}
        index={[["why", "i1", "i1s"], ["model", "i2", "i2s"], ["tiers", "i3", "i3s"], ["fit", "i4", "i4s"]]} />

      {/* The problem: the same budget read two ways */}
      <section className="sec why" id="why" aria-labelledby="w-title">
        <div className="wrap">
          <Head w={w} k="w_k" a="w_a" b="w_b" sub="w_sub" id="w-title" />
          <div className="nn" data-reveal>
            <div className="nn-c">
              <p className="nn-k">{w.nn_k}</p>
              <h3 className="nn-t">{w.nn_t}</h3>
              <p className="nn-p">{w.nn_p}</p>
            </div>
            <div className="rpt" id="hand">
              <div className="seg" role="group" aria-label={w.h_a}>
                <button type="button" className="seg-b" data-v="bad" aria-pressed="true"><span>{w.h_bad}</span></button>
                <button type="button" className="seg-b" data-v="good" aria-pressed="false"><span>{w.h_good}</span></button>
              </div>
              <div className="rpt-c">
                <p className="rpt-x">{w.h_ex}</p>
                <dl className="rpt-l bad">
                  {[1, 2, 3, 4].map((n) => <div key={n}><dt>{k(`h_k${n}`)}</dt><dd>{k(`h_v${n}`)}</dd></div>)}
                </dl>
                <dl className="rpt-l good">
                  {[1, 2, 3, 4].map((n) => <div key={n}><dt>{k(`h_g${n}`)}</dt><dd>{k(`h_gv${n}`)}</dd></div>)}
                </dl>
                <p className="rpt-t"><span className="bad">{w.h_bt}</span><span className="good">{w.h_gt}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stepper w={w} phases={PHASES} />

      {/* Channel roles: one target market, three stages */}
      <section className="sec trsec" id="tiers" aria-labelledby="t-title">
        <div className="wrap">
          <Head w={w} k="t_k" a="t_a" b="t_b" sub="t_sub" id="t-title" hint="hint_role" />
          <div className="tr" id="tr" data-reveal>
            <div className="seg" role="group" aria-label={w.a_role}>
              {STAGES.map((x) => (
                <button key={x} type="button" className="seg-b" data-v={x} aria-pressed={x === "a"}><span>{k(`t${x}`)}</span></button>
              ))}
            </div>
            <div className="tr-ps">
              {STAGES.map((x, si) => (
                <div key={x} className="tr-p" data-t={x} hidden={x !== "a"}>
                  <p className="tr-st" aria-hidden="true">{STAGES.map((y, j) => <i key={y} className={j <= si ? "on" : undefined} />)}<span>{k(`t${x}`)}</span></p>
                  <dl className="tr-d">
                    {ROWS.map(([l, f]) => <div key={f}><dt>{k(l)}</dt><dd>{k(`t${x}_${f}`)}</dd></div>)}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FitCheck w={w} />
      <Measure w={w} />
      <Closing w={w} base={base} pdf={pdf} hub={hub} next={next} />
    </PlaybookShell>
  );
}
