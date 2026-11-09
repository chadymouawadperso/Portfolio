import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbDr } from "@/lib/content";
import type { PbDrKey } from "@/lib/pb-dr-copy";
import { Closing, FitCheck, Head, MailFlip, Measure, PlaybookHero, PlaybookShell, Stepper, type Phases } from "./PlaybookParts";

const SLUG = "/gtm-playbooks/dormant-customer-reactivation-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: Phases = [["p1", [1, 2, 3]], ["p2", [4, 5, 6]], ["p3", [7, 8, 9, 10]], ["p4", [11, 12, 13]]];

// Hero: a 4 × 4 grid of dormant accounts (fixed positions from the approved draft) and the Account Manager on the right.
const DOTS: [number, number][] = [
  [55.2, 113.0], [120.8, 111.5], [172.1, 113.4], [225.0, 112.2], [58.1, 174.7], [107.5, 166.9], [165.5, 175.0], [233.1, 162.7], [63.7, 235.4], [116.5, 229.8], [166.5, 220.2], [230.5, 221.0], [51.0, 281.9], [106.5, 285.4], [171.0, 291.5], [230.3, 288.2],
];
const AMX = 432, AMY = 214;

// Reply router: each reply and where it goes.
const REPLIES: [string, string[]][] = [["y1", ["d1"]], ["y2", ["d3"]], ["y3", ["d4"]], ["y4", ["d1", "d2"]], ["y5", ["d5"]]];
const DESTS = ["d1", "d2", "d3", "d4", "d5"];

export default async function PlaybookDormantReactivation({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbDr(lang);
  const k = (key: string) => w[key as PbDrKey];

  const visual = (
    <figure className="mh-vis drx" id="drx" aria-hidden="true">
      <svg className="drx-s" viewBox="0 64 510 304" role="presentation">
        <defs>
          <linearGradient id="drxScan" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#8DB0C4" stopOpacity="0" /><stop offset=".5" stopColor="#8DB0C4" stopOpacity=".16" /><stop offset="1" stopColor="#8DB0C4" stopOpacity="0" /></linearGradient>
          <radialGradient id="drxGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#8DB0C4" stopOpacity=".2" /><stop offset="1" stopColor="#8DB0C4" stopOpacity="0" /></radialGradient>
          <clipPath id="drxClip"><rect x="20" y="80" width="250" height="250" rx="16" /></clipPath>
        </defs>
        <g clipPath="url(#drxClip)"><rect className="scan" x="-60" y="80" width="70" height="250" fill="url(#drxScan)" /></g>
        <circle className="glow" cx={AMX} cy={AMY} r="96" fill="url(#drxGlow)" />
        <g className="lns" />
        <g className="dds">{DOTS.map(([x, y], i) => <circle key={i} className="dd" cx={x} cy={y} r="7" />)}</g>
        <circle className="am" cx={AMX} cy={AMY} r="28" />
        <circle className="amc" cx={AMX} cy={AMY} r="6" />
        <text className="lb" x="143" y="356" textAnchor="middle">{w.v_dor}</text>
        <text className="lb y" x={AMX} y="356" textAnchor="middle">{w.v_am}</text>
      </svg>
      <p className="drx-k"><span className="k-e">{w.v_eng}</span><span className="k-b">{w.v_back}</span></p>
    </figure>
  );

  const flow = (row: "a" | "b", n: number, last: string) => (
    <div className={`fl ${row}`}>
      <p className="fl-h"><b>{k(`f_${row}`)}</b><span>{k(`f_${row}s`)}</span></p>
      <ol className="fl-r">
        {Array.from({ length: n }, (_, i) => i + 1).map((i) => (
          <li key={i} className={i === n ? last : undefined} style={{ "--i": i } as CSSProperties}><span>{k(`f_${row}${i}`)}</span></li>
        ))}
      </ol>
    </div>
  );

  return (
    <PlaybookShell base={base} lang={lang} paths={PATHS}>
      <PlaybookHero w={w} title={["The Dormant", "Customer", "Reactivation Engine"]} pdf={pdf} hub={hub} visual={visual}
        index={[["why", "i1", "i1s"], ["model", "i2", "i2s"], ["replies", "i3", "i3s"], ["fit", "i4", "i4s"]]} />

      {/* The problem: today's flow vs the engine, and automated vs contextual email */}
      <section className="sec why" id="why" aria-labelledby="w-title">
        <div className="wrap">
          <Head w={w} k="w_k" a="w_a" b="w_b" sub="w_sub" id="w-title" />
          <div className="flw" id="flw" data-reveal>
            {flow("a", 3, "x")}
            {flow("b", 5, "pp")}
          </div>
          <MailFlip w={w} />
        </div>
      </section>

      <Stepper w={w} phases={PHASES} />

      {/* Replies: every reply has a next owner */}
      <section className="sec rpsec" id="replies" aria-labelledby="t-title">
        <div className="wrap">
          <Head w={w} k="t_k" a="t_a" b="t_b" sub="t_sub" id="t-title" hint="hint_rep" />
          <div className="rp" id="rp" data-reveal>
            <div className="rp-y">
              <p className="rp-k">{w.y_k}</p>
              <ul className="rp-l" aria-label={w.a_rep}>
                {REPLIES.map(([y, ds]) => (
                  <li key={y}><button type="button" className="ry" data-y={y} data-d={ds.join(" ")} aria-pressed={y === "y1"}><span>{k(y)}</span></button></li>
                ))}
              </ul>
            </div>
            <span className="rp-a" aria-hidden="true" />
            <div className="rp-d">
              <p className="rp-k">{w.d_k}</p>
              <ul className="rp-dl">{DESTS.map((d) => <li key={d} className={d === "d1" ? "rd on" : "rd"} data-d={d}><span>{k(d)}</span></li>)}</ul>
              <div className="rp-n" aria-live="polite">
                {REPLIES.map(([y]) => <p key={y} className="rn" data-n={y} hidden={y !== "y1"}>{k(`n${y.slice(1)}`)}</p>)}
              </div>
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
