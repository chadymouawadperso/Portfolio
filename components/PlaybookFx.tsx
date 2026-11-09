"use client";

import { useEffect } from "react";

// Playbook page interactions: the simulator, the email flip, the 12-step stepper, the priority grid,
// the animated takeout hero and the fit self-check. Elements a page lacks are skipped. Renders nothing.
export default function PlaybookFx() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    const on = (el: Element, ev: string, fn: (e: Event) => void) => { el.addEventListener(ev, fn); cleanups.push(() => el.removeEventListener(ev, fn)); };

    /* Segmented toggles */
    const seg = (box: Element | null, onSet: (v: string, user: boolean) => void) => {
      if (!box) return () => {};
      const bs = Array.from(box.querySelectorAll<HTMLButtonElement>(".seg-b"));
      const set = (v: string, user: boolean) => {
        bs.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === v)));
        onSet(v, user);
      };
      bs.forEach((b) => on(b, "click", () => set(b.dataset.v || "", true)));
      return set;
    };

    /* Simulator: switches to "with the engine" once, shortly after it comes into view */
    const sim = document.getElementById("sim");
    if (sim) {
      let touched = false;
      const setSim = seg(document.getElementById("sim-seg"), (v, user) => {
        if (user) touched = true;
        const isOn = v === "on";
        sim.classList.toggle("on", isOn);
        sim.querySelectorAll(".off").forEach((x) => x.setAttribute("aria-hidden", String(isOn)));
        sim.querySelectorAll(".on").forEach((x) => x.setAttribute("aria-hidden", String(!isOn)));
      });
      let timer = 0;
      const io = new IntersectionObserver((es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => { if (!touched) setSim("on", false); }, reduce ? 0 : 1600);
      }, { rootMargin: "0px 0px -25% 0px" });
      io.observe(sim);
      cleanups.push(() => { io.disconnect(); clearTimeout(timer); });
    }

    /* Email flip */
    const mail = document.getElementById("mail");
    if (mail) seg(mail, (v) => mail.classList.toggle("good", v === "good"));

    /* Stepper */
    const stp = document.getElementById("stp");
    if (stp) {
      const nds = Array.from(stp.querySelectorAll<HTMLButtonElement>(".nd"));
      const bar = stp.querySelector<HTMLElement>(".trk-bar span");
      const prev = stp.querySelector<HTMLButtonElement>(".sb.prev")!;
      const next = stp.querySelector<HTMLButtonElement>(".sb.next")!;
      let idx = 0, touched = false;
      const go = (i: number, focus = false) => {
        idx = Math.max(0, Math.min(nds.length - 1, i));
        nds.forEach((n, k) => {
          const cur = k === idx;
          n.setAttribute("aria-selected", String(cur));
          n.tabIndex = cur ? 0 : -1;
          n.classList.toggle("done", k < idx);
          n.classList.toggle("nx", !touched && k === idx + 1);
          const pn = document.getElementById(n.getAttribute("aria-controls") || "");
          if (pn) pn.hidden = !cur;
        });
        stp.querySelectorAll(".tg").forEach((g) => g.classList.toggle("cur", !!g.querySelector('[aria-selected="true"]')));
        if (bar) bar.style.width = `${((idx + 1) / nds.length) * 100}%`;
        prev.disabled = idx === 0;
        next.disabled = idx === nds.length - 1;
        if (focus) nds[idx].focus();
      };
      nds.forEach((n, k) => {
        on(n, "click", () => { touched = true; go(k); });
        on(n, "keydown", (e) => {
          const key = (e as KeyboardEvent).key;
          const to = key === "ArrowRight" ? idx + 1 : key === "ArrowLeft" ? idx - 1 : key === "Home" ? 0 : key === "End" ? nds.length - 1 : null;
          if (to === null) return;
          e.preventDefault(); touched = true; go(to, true);
        });
      });
      on(prev, "click", () => { touched = true; go(idx - 1); });
      on(next, "click", () => { touched = true; go(idx + 1); });
      go(0);
    }

    /* Priority grid: fit x intent */
    const gw = document.getElementById("gw");
    if (gw) {
      const st: Record<string, string> = { f: "h", i: "h" };
      const tb = Array.from(gw.querySelectorAll<HTMLButtonElement>(".g-ctl .seg-b"));
      const gc = Array.from(gw.querySelectorAll<HTMLButtonElement>(".gc"));
      const paint = () => {
        tb.forEach((b) => b.setAttribute("aria-pressed", String(st[b.dataset.ax || ""] === b.dataset.v)));
        gc.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.c === st.f + st.i)));
      };
      tb.forEach((b) => on(b, "click", () => { st[b.dataset.ax || ""] = b.dataset.v || ""; paint(); }));
      gc.forEach((c) => on(c, "click", () => { const v = c.dataset.c || "hh"; st.f = v[0]; st.i = v[1]; paint(); }));
      paint();
    }

    /* Hero (Competitor Takeout): accounts drift from the competitor's orbit to yours */
    const tko = document.getElementById("tko");
    if (tko) {
      const NS = "http://www.w3.org/2000/svg";
      const CX: Record<string, number> = { L: 150, R: 360 }, CY = 210;
      const arcs = tko.querySelector(".arcs")!;
      type Dot = { el: SVGCircleElement; s: string; a: number; r: number; sp: number; busy: boolean; travel: ((now: number) => void) | null };
      const dots: Dot[] = Array.from(tko.querySelectorAll<SVGCircleElement>(".dt")).map((el, i) => ({
        el, s: el.dataset.s || "L", a: Number(el.dataset.a), r: Number(el.dataset.r), sp: 0.00008 + (i % 5) * 0.000018, busy: false, travel: null,
      }));
      const won = dots.filter((d) => d.s === "R");
      const xy = (d: { s: string; a: number; r: number }) => [CX[d.s] + d.r * Math.cos(d.a), CY + d.r * 0.86 * Math.sin(d.a)];
      const place = (d: Dot, p: number[]) => { d.el.setAttribute("cx", p[0].toFixed(1)); d.el.setAttribute("cy", p[1].toFixed(1)); };
      if (reduce) {
        dots[3]?.el.classList.add("sig");
        dots[11]?.el.classList.add("sig");
      } else {
        const timers: number[] = [];
        const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
        cleanups.push(() => timers.forEach(clearTimeout));
        let n = 0;
        const travel = (d: Dot) => {
          const p0 = xy(d), a2 = Math.random() * Math.PI * 2, r2 = [56, 70, 84][Math.floor(Math.random() * 3)];
          const p2 = xy({ s: "R", a: a2, r: r2 }), up = Math.random() < 0.5 ? -1 : 1;
          const c = [255, CY + up * (130 + Math.random() * 40)];
          const path = document.createElementNS(NS, "path");
          path.setAttribute("d", `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} Q${c[0]} ${c[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
          path.setAttribute("fill", "none"); path.setAttribute("stroke", "#8DB0C4"); path.setAttribute("stroke-width", "1.4"); path.setAttribute("stroke-dasharray", "3 4");
          path.style.opacity = ".75"; path.style.transition = "opacity .8s ease";
          arcs.appendChild(path);
          const t0 = performance.now(), dur = 1500;
          d.travel = (now) => {
            const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, u = 1 - e;
            place(d, [u * u * p0[0] + 2 * u * e * c[0] + e * e * p2[0], u * u * p0[1] + 2 * u * e * c[1] + e * e * p2[1]]);
            if (k < 1) return;
            d.travel = null; d.s = "R"; d.a = a2; d.r = r2; d.busy = false;
            d.el.classList.remove("sig"); d.el.classList.add("won");
            won.push(d); path.style.opacity = "0"; later(() => path.remove(), 900);
            if (won.length > 8) {
              const o = won.shift()!;
              o.busy = true; o.el.classList.add("gone");
              later(() => {
                o.s = "L"; o.a = Math.random() * Math.PI * 2; o.r = [64, 82, 100, 118][Math.floor(Math.random() * 4)];
                o.el.classList.remove("won"); place(o, xy(o));
                later(() => { o.el.classList.remove("gone"); o.busy = false; }, 60);
              }, 700);
            }
          };
        };
        const signal = () => {
          const pool = dots.filter((d) => d.s === "L" && !d.busy);
          if (!pool.length) return;
          const d = pool[Math.floor(Math.random() * pool.length)];
          d.busy = true; n++;
          d.el.classList.add("sig");
          later(() => {
            if (n % 5 === 1 || n % 5 === 3) { travel(d); return; }
            d.el.classList.remove("sig"); d.el.classList.add("dim");
            later(() => { d.el.classList.remove("dim"); d.busy = false; }, 1800);
          }, 1000);
        };
        let last = 0, acc = 0, raf = 0, running = false;
        const frame = (now: number) => {
          const dt = last ? Math.min(64, now - last) : 16;
          last = now; acc += dt;
          dots.forEach((d) => {
            if (d.travel) d.travel(now);
            else { d.a += d.sp * dt * (d.s === "L" ? 1 : 1.4); place(d, xy(d)); }
          });
          if (acc > 1500) { acc = 0; signal(); }
          raf = requestAnimationFrame(frame);
        };
        const start = () => { if (!running && !document.hidden) { running = true; last = 0; raf = requestAnimationFrame(frame); } };
        const stop = () => { running = false; cancelAnimationFrame(raf); };
        const vis = new IntersectionObserver((es) => (es[0].isIntersecting ? start() : stop()));
        vis.observe(tko);
        const onVis = () => (document.hidden ? stop() : start());
        document.addEventListener("visibilitychange", onVis);
        cleanups.push(() => { stop(); vis.disconnect(); document.removeEventListener("visibilitychange", onVis); });
      }
    }

    /* Fit self-check */
    const chk = document.getElementById("chk");
    if (chk) {
      const qs = Array.from(chk.querySelectorAll<HTMLButtonElement>(".q"));
      const gs = Array.from(chk.querySelectorAll(".chk-g i"));
      const upd = () => {
        const any = qs.some((q) => q.hasAttribute("data-t"));
        let n = 0;
        qs.forEach((q) => {
          const yes = q.getAttribute("aria-checked") === "true";
          if (yes) n++;
          const m = chk.querySelector<HTMLElement>(`[data-m="${q.dataset.q}"]`);
          if (m) m.hidden = !any || yes;
        });
        gs.forEach((g, i) => g.classList.toggle("on", i < n));
        const st = !any ? "start" : n === 4 ? "ok" : n === 3 ? "mid" : "low";
        chk.querySelectorAll<HTMLElement>("[data-st]").forEach((s) => (s.hidden = s.dataset.st !== st));
      };
      qs.forEach((q) => on(q, "click", () => {
        q.setAttribute("data-t", "");
        q.setAttribute("aria-checked", String(q.getAttribute("aria-checked") !== "true"));
        upd();
      }));
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
