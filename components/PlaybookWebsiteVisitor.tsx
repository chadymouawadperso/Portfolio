import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { getPbWv } from "@/lib/content";
import type { PbWvKey } from "@/lib/pb-wv-copy";
import { Closing, FitCheck, Head, MailFlip, Measure, PlaybookHero, PlaybookShell, Stepper, type Phases } from "./PlaybookParts";

const SLUG = "/gtm-playbooks/high-intent-website-visitor-engine";
const PATHS = { en: SLUG, fr: `/fr${SLUG}` };

const PHASES: Phases = [["p1", [1, 2, 3, 4]], ["p2", [5, 6]], ["p3", [7, 8, 9, 10]], ["p4", [11, 12]]];
// Illustrative simulator rows: account letter, pages viewed, outcome, outcome class.
const SIM: [string, PbWvKey[], PbWvKey, "x" | "s" | "a" | "n"][] = [
  ["A", ["v_car"], "o_excl", "x"], ["B", ["v_price"], "o_comp", "x"], ["C", ["v_price", "v_comp"], "o_opp", "s"], ["D", ["v_case"], "o_cust", "a"],
  ["E", ["v_blog"], "o_nur", "n"], ["F", ["v_price", "v_sec"], "o_new", "s"], ["G", ["v_prod"], "o_dup", "x"], ["H", ["v_comp", "v_case"], "o_own", "s"],
];
// Hero visual: page, page value (%), cumulative intent score (%), excluded.
const TRAIL: [PbWvKey, number, number, boolean][] = [["v_blog", 16, 0, true], ["v_car", 10, 0, true], ["v_case", 50, 22, false], ["v_price", 95, 55, false], ["v_comp", 72, 80, false], ["v_sec", 55, 94, false]];
const TRAIL_PATH = "M" + TRAIL.map(([, , s], i) => `${(i + 0.5) * 100} ${100 - s}`).join(" L");


export default async function PlaybookWebsiteVisitor({ lang }: { lang: Lang }) {
  const { base, w, pdf, hub, next } = await getPbWv(lang);

  const visual = (
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
  );

  return (
    <PlaybookShell base={base} lang={lang} paths={PATHS}>
      <PlaybookHero w={w} title={["The High-Intent", "Website Visitor", "Engine"]} pdf={pdf} hub={hub} visual={visual}
        index={[["why", "i1", "i1s"], ["model", "i2", "i2s"], ["fit", "i4", "i4s"], ["measure", "i3", "i3s"]]} />

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
          <MailFlip w={w} />
        </div>
      </section>

      <Stepper w={w} phases={PHASES} />
      <FitCheck w={w} />
      <Measure w={w} />
      <Closing w={w} base={base} pdf={pdf} hub={hub} next={next} />
    </PlaybookShell>
  );
}
