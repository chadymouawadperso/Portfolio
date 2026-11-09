import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbCt } from "@/lib/content";
import type { PbCtKey } from "@/lib/pb-ct-copy";
import { Closing, FitCheck, Head, MailFlip, Measure, PlaybookHero, PlaybookShell, Stepper, type Phases } from "./PlaybookParts";

const SLUG = "/gtm-playbooks/competitor-takeout-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: Phases = [["p1", [1, 2, 3]], ["p2", [4, 5, 6, 7]], ["p3", [8, 9, 10]], ["p4", [11, 12]]];

// Hero: starting positions of the accounts (side, angle, orbit radius). L = competitor, R = you.
const DOTS: [string, number, number][] = [
  ["L", -0.042, 80.9], ["L", 0.177, 62.7], ["L", 0.465, 77.4], ["L", 0.841, 61.4], ["L", 1.155, 67.3], ["L", 1.338, 83.3],
  ["L", 1.734, 64.8], ["L", 1.974, 77.5], ["L", 2.371, 99.2], ["L", 2.58, 100.6], ["L", 2.9, 64.8], ["L", 3.175, 96.0],
  ["L", 3.478, 65.2], ["L", 3.712, 120.8], ["L", 3.99, 116.6], ["L", 4.224, 84.0], ["L", 4.508, 100.3], ["L", 4.945, 115.9],
  ["L", 5.256, 64.1], ["L", 5.346, 96.5], ["L", 5.709, 68.6], ["L", 5.896, 98.4], ["R", 0.6, 74], ["R", 2.694, 74], ["R", 4.789, 74],
];
const pos = (s: string, a: number, r: number) => [(s === "L" ? 150 : 360) + r * Math.cos(a), 210 + r * 0.86 * Math.sin(a)];

// The problem: what each source of evidence can and cannot tell you.
const ICONS: Record<string, string> = {
  "1": "M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13z M15.3 15.3 L20 20",
  "2": "M4 20 V8 l6-3 v15 M10 20 V5 M10 9 h10 v11 M14 13 h2 M14 16 h2 M3 20 h18",
  "3": "M12 11a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7z M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5",
};

export default async function PlaybookCompetitorTakeout({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbCt(lang);
  const k = (key: string) => w[key as PbCtKey];

  const visual = (
    <figure className="mh-vis tko" id="tko" aria-hidden="true">
      <svg className="tko-s" viewBox="0 64 510 304" role="presentation">
        <defs>
          <radialGradient id="tkoYou" cx="50%" cy="40%" r="60%"><stop offset="0" stopColor="#8DB0C4" stopOpacity=".55" /><stop offset="1" stopColor="#497287" stopOpacity=".15" /></radialGradient>
          <radialGradient id="tkoGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#8DB0C4" stopOpacity=".22" /><stop offset="1" stopColor="#8DB0C4" stopOpacity="0" /></radialGradient>
        </defs>
        <g className="orb">
          <ellipse cx="150" cy="210" rx="64" ry="55" /><ellipse cx="150" cy="210" rx="100" ry="86" /><ellipse cx="150" cy="210" rx="128" ry="110" />
          <ellipse className="mine" cx="360" cy="210" rx="66" ry="57" /><ellipse className="mine" cx="360" cy="210" rx="88" ry="76" />
        </g>
        <circle className="glow" cx="360" cy="210" r="96" fill="url(#tkoGlow)" />
        <g className="arcs" />
        <g className="dts">
          {DOTS.map(([s, a, r], i) => {
            const [x, y] = pos(s, a, r);
            return <circle key={i} className={s === "R" ? "dt won" : "dt"} cx={x.toFixed(1)} cy={y.toFixed(1)} r="4.5" data-s={s} data-a={a} data-r={r} />;
          })}
        </g>
        <circle className="nd-c" cx="150" cy="210" r="30" />
        <circle className="nd-y" cx="360" cy="210" r="30" fill="url(#tkoYou)" />
        <circle className="nd-yc" cx="360" cy="210" r="6" />
        <text className="lb" x="150" y="350" textAnchor="middle">{w.v_comp}</text>
        <text className="lb y" x="360" y="350" textAnchor="middle">{w.v_you}</text>
      </svg>
      <p className="tko-k"><span className="k-s">{w.v_sig}</span><span className="k-w">{w.v_won}</span></p>
    </figure>
  );

  const cell = (c: string) => (
    <button type="button" className={`gc g-${c}`} data-c={c} aria-pressed={c === "hh"}>
      <b>{k(`c_${c}`)}</b><span>{k(`c_${c}s`)}</span>
    </button>
  );

  return (
    <PlaybookShell base={base} lang={lang} paths={PATHS}>
      <PlaybookHero w={w} title={["The Competitor", "Takeout Engine"]} pdf={pdf} hub={hub} visual={visual}
        index={[["why", "i1", "i1s"], ["model", "i2", "i2s"], ["grid", "i3", "i3s"], ["fit", "i4", "i4s"]]} />

      {/* The problem: three sources of evidence, and the non-negotiable */}
      <section className="sec why" id="why" aria-labelledby="w-title">
        <div className="wrap">
          <Head w={w} k="w_k" a="w_a" b="w_b" sub="w_sub" id="w-title" />
          <div className="ev" id="ev" data-reveal>
            <ol className="ev-l">
              {["1", "2", "3"].map((n) => (
                <li key={n} className="evc" style={{ "--i": n } as CSSProperties}>
                  <span className="ev-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[n]} /></svg>
                  </span>
                  <h3 className="ev-n">{k(`e${n}`)}</h3>
                  <dl className="ev-d">
                    <div className="y"><dt>{w.e_tell}</dt><dd>{k(`e${n}t`)}</dd></div>
                    <div className="n"><dt>{w.e_not}</dt><dd>{k(`e${n}n`)}</dd></div>
                  </dl>
                  <p className="ev-s"><span>{w.e_src}</span><span>{k(`e${n}s`)}</span></p>
                </li>
              ))}
            </ol>
            <div className="ev-j" aria-hidden="true"><i /><i /><i /><span /></div>
            <div className="ev-o"><p className="ev-ok">{w.e_outk}</p><p className="ev-ov">{w.e_out}</p></div>
          </div>
          <MailFlip w={w} />
        </div>
      </section>

      <Stepper w={w} phases={PHASES} />

      {/* Priority: fit x intent */}
      <section className="sec gridsec" id="grid" aria-labelledby="t-title">
        <div className="wrap">
          <Head w={w} k="t_k" a="t_a" b="t_b" sub="t_sub" id="t-title" hint="hint_grid" />
          <div className="gw" id="gw" data-reveal>
            <div className="g-ctl">
              {([["g_fit", "f"], ["g_int", "i"]] as const).map(([label, ax]) => (
                <div key={ax} className="gt">
                  <span className="gt-k">{w[label]}</span>
                  <div className="seg" role="group" aria-label={w[label]}>
                    <button type="button" className="seg-b" data-ax={ax} data-v="h" aria-pressed="true"><span>{w.g_hi}</span></button>
                    <button type="button" className="seg-b" data-ax={ax} data-v="l" aria-pressed="false"><span>{w.g_lo}</span></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="g-m" role="group" aria-label={w.g_m}>
              <span /><span className="g-ch">{w.g_lf}</span><span className="g-ch">{w.g_hf}</span>
              <span className="g-rh">{w.g_hi2}</span>{cell("lh")}{cell("hh")}
              <span className="g-rh">{w.g_li}</span>{cell("ll")}{cell("hl")}
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
