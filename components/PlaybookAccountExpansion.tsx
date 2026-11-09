import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbAm } from "@/lib/content";
import type { PbAmKey } from "@/lib/pb-am-copy";
import { Closing, FitCheck, Head, Measure, PlaybookHero, PlaybookShell, Stepper, type Phases } from "./PlaybookParts";

const SLUG = "/gtm-playbooks/account-manager-expansion-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: Phases = [["p1", [1, 2, 3]], ["p2", [4, 5, 6]], ["p3", [7, 8, 9]], ["p4", [10]]];

// Hero geometry: the Account Manager on the left, the customer account on the right with eight contact slots around it.
// Slot 0 (nearest the AM) is the one contact the AM already knows.
const AMX = 92, AMY = 214, AX = 350, AY = 214, RR = 96;
const SLOTS = Array.from({ length: 8 }, (_, i) => {
  const a = Math.PI + Math.PI / 8 + (i / 8) * Math.PI * 2;
  const x = AX + RR * Math.cos(a), y = AY + RR * 0.92 * Math.sin(a);
  const cx = (AMX + 26 + x) / 2, cy = AMY + (y - AMY) * (x > AX ? 2.4 : 1.6);
  return { x: x.toFixed(1), y: y.toFixed(1), d: `M${AMX + 26} ${AMY} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}` };
});

const TIERS: [string, number][] = [["a", 3], ["b", 2], ["c", 1]];

export default async function PlaybookAccountExpansion({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbAm(lang);
  const k = (key: string) => w[key as PbAmKey];

  const visual = (
    <figure className="mh-vis amx" id="amx" aria-hidden="true">
      <svg className="amx-s" viewBox="0 64 510 304" role="presentation">
        <defs>
          <radialGradient id="amxGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#8DB0C4" stopOpacity=".18" /><stop offset="1" stopColor="#8DB0C4" stopOpacity="0" /></radialGradient>
        </defs>
        <circle className="glow" cx={AX} cy={AY} r="128" fill="url(#amxGlow)" />
        <ellipse className="orb" cx={AX} cy={AY} rx={RR} ry={(RR * 0.92).toFixed(1)} />
        <g className="css">
          {SLOTS.map((s, i) => (
            <g key={i} className={i === 0 ? "cs k" : "cs"}>
              <line className="sp" x1={AX} y1={AY} x2={s.x} y2={s.y} />
              <path className="ln" pathLength={1} d={s.d} />
              <circle className="ct" cx={s.x} cy={s.y} r="9" />
            </g>
          ))}
        </g>
        <circle className="core" cx={AX} cy={AY} r="30" />
        <circle className="am" cx={AMX} cy={AMY} r="26" />
        <circle className="amc" cx={AMX} cy={AMY} r="6" />
        <text className="lb y" x={AMX} y="356" textAnchor="middle">{w.v_am}</text>
        <text className="lb" x={AX} y="356" textAnchor="middle">{w.v_acc}</text>
      </svg>
      <p className="amx-k"><span className="k-m">{w.v_map}</span><span className="k-k">{w.v_know}</span></p>
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

  const col = (c: "am" | "ge", n: number) => (
    <div className={`own-c ${c}`}>
      <p className="own-h">{k(`o_${c}`)}</p>
      <ul>
        {Array.from({ length: n }, (_, i) => i + 1).map((i) => (
          <li key={i} style={{ "--i": i } as CSSProperties}><span>{k(`o_${c}${i}`)}</span></li>
        ))}
      </ul>
    </div>
  );

  return (
    <PlaybookShell base={base} lang={lang} paths={PATHS}>
      <PlaybookHero w={w} title={["The Account", "Manager", "Expansion Engine"]} pdf={pdf} hub={hub} visual={visual}
        index={[["why", "i1", "i1s"], ["model", "i2", "i2s"], ["tiers", "i3", "i3s"], ["fit", "i4", "i4s"]]} />

      {/* The problem: today's flow vs the engine, and who owns what */}
      <section className="sec why" id="why" aria-labelledby="w-title">
        <div className="wrap">
          <Head w={w} k="w_k" a="w_a" b="w_b" sub="w_sub" id="w-title" />
          <div className="flw" id="flw" data-reveal>
            {flow("a", 3, "x")}
            {flow("b", 5, "pp")}
          </div>
          <div className="nn" data-reveal>
            <div className="nn-c">
              <p className="nn-k">{w.nn_k}</p>
              <h3 className="nn-t">{w.nn_t}</h3>
              <p className="nn-p">{w.nn_p}</p>
            </div>
            <div className="own" id="own">{col("am", 4)}{col("ge", 6)}</div>
          </div>
        </div>
      </section>

      <Stepper w={w} phases={PHASES} />

      {/* Contact tiers: same account, three conversations */}
      <section className="sec trsec" id="tiers" aria-labelledby="t-title">
        <div className="wrap">
          <Head w={w} k="t_k" a="t_a" b="t_b" sub="t_sub" id="t-title" hint="hint_tier" />
          <div className="tr" id="tr" data-reveal>
            <div className="seg" role="group" aria-label={w.a_tier}>
              {TIERS.map(([x]) => (
                <button key={x} type="button" className="seg-b" data-v={x} aria-pressed={x === "a"}><span>{k(`t${x}`)}</span></button>
              ))}
            </div>
            <div className="tr-ps">
              {TIERS.map(([x, lv]) => (
                <div key={x} className="tr-p" data-t={x} hidden={x !== "a"}>
                  <dl className="tr-d">
                    <div><dt>{w.l_who}</dt><dd>{k(`t${x}_w`)}</dd></div>
                    <div><dt>{w.l_msg}</dt><dd>{k(`t${x}_m`)}</dd></div>
                    <div><dt>{w.l_cnt}</dt><dd>{k(`t${x}_c`)}</dd></div>
                    <div><dt>{w.l_int}</dt><dd><span className="tr-m" aria-hidden="true">{[0, 1, 2].map((j) => <i key={j} className={j < lv ? "on" : undefined} />)}</span></dd></div>
                  </dl>
                  <div className="tr-x">
                    <p className="tr-xk">{w.l_ex}</p>
                    <div className="tr-mail">
                      <p className="mail-r"><span>{w.msg_sub_l}</span><b>{k(`t${x}_s`)}</b></p>
                      <p className="tr-b">{k(`t${x}_b`)}</p>
                      <p className="tr-n">{w.ex_n}</p>
                    </div>
                  </div>
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
