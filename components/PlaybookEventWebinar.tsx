import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbEv } from "@/lib/content";
import type { PbEvKey } from "@/lib/pb-ev-copy";
import { Closing, FitCheck, Head, Measure, PlaybookHero, PlaybookShell, Stepper, type Phases } from "./PlaybookParts";

const SLUG = "/gtm-playbooks/event-webinar-to-pipeline-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: Phases = [["p1", [1, 2, 3]], ["p2", [4, 5, 6]], ["p3", [7, 8, 9]], ["p4", [10, 11, 12, 13]]];

// Hero: accounts (center x, center y, number of contacts). Accounts with three or more contacts can reach pipeline.
const CLUSTERS: [number, number, number][] = [
  [62, 122, 3], [140, 112, 1], [218, 128, 4], [70, 206, 2], [150, 200, 3], [226, 214, 1], [66, 290, 1], [146, 286, 4], [222, 296, 2],
];
const contact = (x: number, y: number, k: number, j: number) => {
  if (k === 1) return [x, y];
  const a = (j / k) * Math.PI * 2 - Math.PI / 2;
  return [x + 15 * Math.cos(a), y + 15 * Math.sin(a)];
};
const SLOTS = [0, 1, 2, 3, 4];

// Intent builder: signal chips per stage; Registration and Attended start selected.
const SIGNALS: [string, string[]][] = [["i_pre", ["x1", "x2", "x3"]], ["i_live", ["x4", "x5", "x6"]], ["i_post", ["x7", "x8", "x9"]]];
const START = ["x3", "x4"];

// Example attendee list (illustrative names).
const ROWS: [string, string][] = [["A. Martin", "h_r1"], ["J. Lee", "h_r2"], ["S. Roy", "h_r3"]];

export default async function PlaybookEventWebinar({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbEv(lang);
  const k = (key: string) => w[key as PbEvKey];

  const visual = (
    <figure className="mh-vis evt" id="evt" aria-hidden="true">
      <svg className="evt-s" viewBox="0 64 510 304" role="presentation">
        <defs>
          <radialGradient id="evtGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#8DB0C4" stopOpacity=".2" /><stop offset="1" stopColor="#8DB0C4" stopOpacity="0" /></radialGradient>
        </defs>
        <path className="gate" d="M300 92 V338" />
        <circle className="glow" cx="438" cy="222" r="110" fill="url(#evtGlow)" />
        <g className="sls">{SLOTS.map((i) => <rect key={i} className="sl" x="392" y={306 - i * 42} width="92" height="32" rx="9" />)}</g>
        <g className="arcs" />
        <g className="cls">
          {CLUSTERS.map(([x, y, n], ci) => (
            <g key={ci} className="cl" data-x={x} data-y={y} data-k={n}>
              <circle className="ring" cx={x} cy={y} r="27" />
              {Array.from({ length: n }, (_, j) => {
                const [cx, cy] = contact(x, y, n, j);
                return <circle key={j} className="dt" cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="4.5" />;
              })}
            </g>
          ))}
        </g>
        <g className="accs" />
        <text className="lb" x="144" y="356" textAnchor="middle">{w.v_att}</text>
        <text className="lb y" x="438" y="356" textAnchor="middle">{w.v_pipe}</text>
      </svg>
      <p className="evt-k"><span className="k-s">{w.v_sig}</span><span className="k-w">{w.v_acc}</span></p>
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
      <PlaybookHero w={w} title={["The Event &", "Webinar-to-", "Pipeline Engine"]} pdf={pdf} hub={hub} visual={visual}
        index={[["why", "i1", "i1s"], ["model", "i2", "i2s"], ["intent", "i3", "i3s"], ["fit", "i4", "i4s"]]} />

      {/* The problem: today's flow vs the engine, and what sales receives */}
      <section className="sec why" id="why" aria-labelledby="w-title">
        <div className="wrap">
          <Head w={w} k="w_k" a="w_a" b="w_b" sub="w_sub" id="w-title" />
          <div className="flw" id="flw" data-reveal>
            {flow("a", 4, "x")}
            {flow("b", 6, "pp")}
          </div>
          <div className="nn" data-reveal>
            <div className="nn-c">
              <p className="nn-k">{w.nn_k}</p>
              <h3 className="nn-t">{w.nn_t}</h3>
              <p className="nn-p">{w.nn_p}</p>
            </div>
            <div className="hand" id="hand">
              <div className="seg" role="group" aria-label={w.h_a}>
                <button type="button" className="seg-b" data-v="bad" aria-pressed="true"><span>{w.h_bad}</span></button>
                <button type="button" className="seg-b" data-v="good" aria-pressed="false"><span>{w.h_good}</span></button>
              </div>
              <div className="hand-c">
                <div className="bad">
                  <table className="al">
                    <thead><tr><th>{w.h_n}</th><th>{w.h_c}</th><th>{w.h_s}</th></tr></thead>
                    <tbody>{ROWS.map(([name, s]) => <tr key={name}><td>{name}</td><td>[Company]</td><td>{k(s)}</td></tr>)}</tbody>
                  </table>
                  <p className="al-m">{w.h_more}</p>
                </div>
                <div className="good">
                  <p className="bc-h"><b>{w.h_acc}</b><span className="bc-b">{w.h_badge}</span></p>
                  <dl className="bc">
                    {[1, 2, 3, 4].map((i) => <div key={i}><dt>{k(`h_k${i}`)}</dt><dd>{k(`h_v${i}`)}</dd></div>)}
                  </dl>
                </div>
                <p className="mail-t"><span className="bad">{w.h_bt}</span><span className="good">{w.h_gt}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stepper w={w} phases={PHASES} />

      {/* Intent: score the account, not the attendee */}
      <section className="sec intsec" id="intent" aria-labelledby="t-title">
        <div className="wrap">
          <Head w={w} k="t_k" a="t_a" b="t_b" sub="t_sub" id="t-title" hint="hint_int" />
          <div className="ib" id="ib" data-reveal role="group" aria-label={w.a_int}>
            <div className="ib-c">
              {SIGNALS.map(([g, xs]) => (
                <div key={g} className="ib-g">
                  <p className="ib-k">{k(g)}</p>
                  <div className="ib-x">
                    {xs.map((x) => (
                      <button key={x} type="button" className="chip" data-x={x} data-g={g} aria-pressed={START.includes(x)}><span>{k(x)}</span></button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="ib-g">
                <p className="ib-k">{w.i_who}</p>
                <div className="seg" role="group" aria-label={w.i_who}>
                  <button type="button" className="seg-b" data-v="one" aria-pressed="true"><span>{w.i_one}</span></button>
                  <button type="button" className="seg-b" data-v="many" aria-pressed="false"><span>{w.i_many}</span></button>
                </div>
              </div>
            </div>
            <div className="ib-o" data-l="2">
              <p className="ib-k">{w.i_out}</p>
              <span className="ib-m" aria-hidden="true"><i /><i /><i /></span>
              <div className="ib-vs" aria-live="polite">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="ib-v" data-o={i} hidden={i !== 2}><b>{k(`o${i}`)}</b><span>{k(`o${i}s`)}</span></div>
                ))}
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
