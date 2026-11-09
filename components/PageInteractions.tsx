"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import { initDeck, initExploded, initHand, initSignals } from "@/lib/heroFx";

// Inner-page behaviour (Methodology, Experience): section reveal, one-time scroll moments,
// the blue thread on desktop and the CV placeholder note. Elements a page lacks are skipped. Renders nothing.
export default function PageInteractions({ lang }: { lang: Lang }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T & Element>(sel) as T | null;

    /* Reveal */
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* One-time moments */
    const once = (el: Element | null, fn: () => void, margin = "0px 0px -20% 0px") => {
      if (!el) return;
      const o = new IntersectionObserver((es) => { if (es[0].isIntersecting) { fn(); o.disconnect(); } }, { rootMargin: margin });
      o.observe(el);
      cleanups.push(() => o.disconnect());
    };
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    cleanups.push(() => timers.forEach(clearTimeout));

    initSignals(reduce, once, cleanups);
    initDeck(reduce, once, later, cleanups);
    initExploded(reduce, once, cleanups);
    initHand(reduce, cleanups);
    const map = $("#map");
    once(map, () => map?.classList.add("drawn"));
    ["#ba", "#envs", "#funnel", "#build", "#sys", "#trail"].forEach((sel) => {
      const el = $(sel);
      once(el, () => el?.classList.add("in"));
    });

    /* Table: bars fill and scores count up */
    const panel = $("#panel");
    const cells = Array.from(document.querySelectorAll<HTMLElement>("#tbody .sc"));
    const fmt = (v: number) => (lang === "fr" ? v.toLocaleString("fr-FR").replace(/\s/g, " ") : v.toLocaleString("en-US"));
    if (!reduce) cells.forEach((c) => (c.textContent = fmt(0)));
    once(panel, () => {
      panel?.classList.add("in", "run");
      if (reduce) return;
      later(() => {
        const t0 = performance.now(), dur = 1400;
        const tick = (now: number) => {
          const f = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - f, 3);
          cells.forEach((c) => (c.textContent = fmt(Math.round(Number(c.dataset.v) * e))));
          if (f < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, 250);
    });

    /* Sequence builds step by step */
    const seq = $("#seq");
    once(seq, () => {
      seq?.querySelectorAll<HTMLElement>(".qs, .wire, .split").forEach((it, i) => (it.style.transitionDelay = reduce ? "0ms" : `${i * 160}ms`));
      seq?.classList.add("run");
    }, "0px 0px -25% 0px");

    /* Loop track */
    const track = $("#rtrack");
    const steps = Array.from(document.querySelectorAll("#steps li"));
    once(track, () => {
      track?.classList.add("lit");
      const gap = reduce ? 0 : 420;
      steps.forEach((s, i) => later(() => s.classList.add("on"), 150 + i * gap));
      later(() => track?.classList.add("back"), 150 + 4 * gap);
    }, "0px 0px -25% 0px");

    /* CV placeholder */
    const onCv = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      if (a.getAttribute("href") !== "#cv") return;
      e.preventDefault();
      const note = a.parentElement?.querySelector<HTMLElement>(".cv-note");
      if (note) note.hidden = false;
    };
    const cvLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-cv]"));
    cvLinks.forEach((a) => a.addEventListener("click", onCv));
    cleanups.push(() => cvLinks.forEach((a) => a.removeEventListener("click", onCv)));

    /* The blue thread (desktop only) */
    const NS = "http://www.w3.org/2000/svg";
    const svg = $("#thread") as unknown as SVGSVGElement | null;
    const mainEl = $("#main");
    type Seg = { y1: number; y2: number; el: SVGPathElement };
    let segs: Seg[] = [];
    const topIn = (el: HTMLElement | null) => { let y = 0; while (el && el !== mainEl) { y += el.offsetTop; el = el.offsetParent as HTMLElement | null; } return y; };
    const seg = (x1: number, y1: number, x2: number, y2: number) => {
      const d = `M${x1} ${y1} L${x2} ${y2}`;
      const b = document.createElementNS(NS, "path"); b.setAttribute("class", "b"); b.setAttribute("d", d);
      const l = document.createElementNS(NS, "path"); l.setAttribute("class", "l"); l.setAttribute("pathLength", "1"); l.setAttribute("d", d);
      svg!.appendChild(b); svg!.appendChild(l); segs.push({ y1, y2, el: l });
    };
    const dot = (x: number, y: number, r: number) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", String(x)); c.setAttribute("cy", String(y)); c.setAttribute("r", String(r)); c.setAttribute("class", "tip");
      svg!.appendChild(c);
    };
    const build = () => {
      if (!svg || !mainEl) return;
      svg.innerHTML = ""; segs = [];
      if (window.innerWidth <= 1100) return;
      const mr = mainEl.getBoundingClientRect();
      svg.setAttribute("height", String(mainEl.offsetHeight));
      svg.setAttribute("viewBox", `0 0 ${mainEl.offsetWidth} ${mainEl.offsetHeight}`);
      const w = $(".mh .wrap");
      if (!w) return;
      const wr = w.getBoundingClientRect(), pad = parseFloat(getComputedStyle(w).paddingLeft);
      const spine = Math.max(wr.left - mr.left + pad - 40, 14);
      const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-anchor]"));
      if (!anchors.length) return;
      let prevY = topIn(anchors[0]) + 9; dot(spine, prevY, 5);
      anchors.slice(1).forEach((a) => { const y = topIn(a) + 9; seg(spine, prevY, spine, y); dot(spine, y, 4); prevY = y; });
      const end = $("#thread-end");
      if (!end) return;
      const ex = end.getBoundingClientRect().left - mr.left + 8, ey = topIn(end) + 8, jY = ey - 110;
      seg(spine, prevY, spine, jY); seg(spine, jY, ex, jY); seg(ex, jY, ex, ey - 8);
    };
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const onScroll = () => {
      if (!mainEl) return;
      const vh = window.innerHeight, th = -mainEl.getBoundingClientRect().top + vh * 0.72;
      segs.forEach((s) => {
        const f = reduce ? 1 : s.y1 === s.y2 ? clamp((th - s.y1) / (vh * 0.3)) : clamp((th - s.y1) / (s.y2 - s.y1));
        s.el.style.strokeDashoffset = (1 - f).toFixed(4);
      });
    };
    let ticking = false;
    const onScrollRaf = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } };
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { build(); onScroll(); }, 120); };
    const refresh = () => { build(); onScroll(); };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", refresh);
    // Redraw the thread whenever the page height changes (a step opens, a section grows).
    let lastH = mainEl?.offsetHeight ?? 0;
    const ro = typeof ResizeObserver !== "undefined" && mainEl
      ? new ResizeObserver(() => { if (mainEl.offsetHeight !== lastH) { lastH = mainEl.offsetHeight; onResize(); } })
      : null;
    if (ro && mainEl) ro.observe(mainEl);
    cleanups.push(() => ro?.disconnect());
    refresh();
    document.fonts?.ready.then(refresh);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", refresh);
    });

    return () => cleanups.forEach((c) => c());
  }, [lang]);

  return null;
}
