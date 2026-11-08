"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

// Page-wide behaviour: section reveal, the continuous blue thread, the pipeline counter,
// the portrait parallax and the CV placeholder note. Renders nothing itself.
export default function Interactions({ lang, stat = 55 }: { lang: Lang; stat?: number }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    /* Reveal */
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* CV placeholder */
    const onCv = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      if (a.getAttribute("href") !== "#cv") return;
      e.preventDefault();
      const row = a.closest(".cta-row");
      const note = (row ? row.nextElementSibling : a.parentElement?.querySelector(".cv-note")) as HTMLElement | null;
      if (note) note.hidden = false;
    };
    const cvLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-cv]"));
    cvLinks.forEach((a) => a.addEventListener("click", onCv));
    cleanups.push(() => cvLinks.forEach((a) => a.removeEventListener("click", onCv)));

    /* Portrait parallax inside its circular frame */
    const orb = document.getElementById("orb");
    const orbImg = orb?.querySelector("img") as HTMLElement | null;
    if (orb && orbImg && !reduce) {
      const onMove = (e: PointerEvent) => {
        const r = orb.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        orbImg.style.setProperty("--px", (-dx * 16).toFixed(2) + "px");
        orbImg.style.setProperty("--py", (-dy * 12).toFixed(2) + "px");
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onMove));
    }

    /* Pipeline counter */
    const statEl = document.getElementById("stat");
    const fmt = (n: number) => (lang === "fr" ? "+" + n + " M$" : "$" + n + "M+");
    let statDone = false;
    const countUp = () => {
      if (statDone || !statEl) return;
      statDone = true;
      if (reduce) return;
      let t0 = 0;
      const step = (t: number) => {
        if (!t0) t0 = t;
        const k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
        statEl.textContent = fmt(Math.round(stat * e));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    /* The thread: one continuous line through the page (large screens) */
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("thread") as unknown as SVGSVGElement | null;
    const mainEl = document.getElementById("main") as HTMLElement;
    type Seg = { x1: number; y1: number; x2: number; y2: number; el: SVGPathElement; track?: { el: Element; x: number }[] };
    let segs: Seg[] = [];
    const topIn = (el: HTMLElement | null) => {
      let y = 0;
      while (el && el !== mainEl) { y += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
      return y;
    };
    const seg = (x1: number, y1: number, x2: number, y2: number, track?: Seg["track"]) => {
      if (!svg) return;
      const d = `M${x1} ${y1} L${x2} ${y2}`;
      const b = document.createElementNS(NS, "path"); b.setAttribute("class", "b"); b.setAttribute("d", d);
      const l = document.createElementNS(NS, "path"); l.setAttribute("class", "l"); l.setAttribute("pathLength", "1"); l.setAttribute("d", d);
      svg.appendChild(b); svg.appendChild(l);
      segs.push({ x1, y1, x2, y2, el: l, track });
    };
    const buildThread = () => {
      if (!svg) return;
      svg.innerHTML = ""; segs = [];
      if (window.innerWidth <= 1100) return;
      const mr = mainEl.getBoundingClientRect();
      svg.setAttribute("height", String(mainEl.offsetHeight));
      svg.setAttribute("viewBox", `0 0 ${mainEl.offsetWidth} ${mainEl.offsetHeight}`);
      const wrapEl = document.querySelector("#system .wrap") as HTMLElement;
      const wrap = wrapEl.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(wrapEl).paddingLeft);
      const left = wrap.left - mr.left + pad, right = wrap.right - mr.left - pad;
      const spine = Math.max(left - 40, 14);
      const startY = topIn(document.querySelector(".hero-copy")) + 8;
      let prevY = startY;
      document.querySelectorAll<HTMLElement>("[data-track]").forEach((t) => {
        const y = topIn(t) + 0.75;
        seg(spine, prevY, spine, y);
        const dots = Array.from(t.querySelectorAll(".dot")).map((d) => ({ el: d.parentElement as Element, x: d.getBoundingClientRect().left - mr.left + 9 }));
        seg(spine, y, right, y, dots);
        prevY = y;
      });
      const endEl = document.getElementById("thread-end") as HTMLElement;
      const ex = endEl.getBoundingClientRect().left - mr.left + 8, ey = topIn(endEl) + 8;
      const jY = ey - 120;
      seg(spine, prevY, spine, jY);
      seg(spine, jY, ex, jY);
      seg(ex, jY, ex, ey - 8);
      const tip = document.createElementNS(NS, "circle");
      tip.setAttribute("cx", String(spine)); tip.setAttribute("cy", String(startY)); tip.setAttribute("r", "5"); tip.setAttribute("class", "tip");
      svg.appendChild(tip);
    };
    const litBySection = () => {
      const vh = window.innerHeight;
      document.querySelectorAll("[data-track] .dot").forEach((d) => {
        d.parentElement?.classList.toggle("lit", reduce || d.getBoundingClientRect().top < vh * 0.78);
      });
    };
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const onScroll = () => {
      const vh = window.innerHeight;
      const th = -mainEl.getBoundingClientRect().top + vh * 0.74;
      if (segs.length) {
        segs.forEach((s) => {
          const f = reduce ? 1 : s.y1 === s.y2 ? clamp((th - s.y1) / (vh * 0.32)) : clamp((th - s.y1) / (s.y2 - s.y1));
          s.el.style.strokeDashoffset = (1 - f).toFixed(4);
          if (s.track) {
            const xNow = s.x1 + (s.x2 - s.x1) * f;
            s.track.forEach((d) => d.el.classList.toggle("lit", f > 0 && xNow >= d.x - 2));
          }
        });
      } else litBySection();
      const exp = document.getElementById("experience");
      if (exp && exp.getBoundingClientRect().top < vh * 0.7) countUp();
    };
    let ticking = false;
    const onScrollRaf = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } };
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { buildThread(); onScroll(); }, 120); };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    document.fonts?.ready.then(onResize);
    buildThread(); onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    });

    return () => cleanups.forEach((c) => c());
  }, [lang, stat]);

  return null;
}
