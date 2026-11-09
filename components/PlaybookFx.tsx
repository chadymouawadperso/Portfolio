"use client";

import { useEffect } from "react";

// Playbook page interactions: the "with / without the engine" simulator, the email flip,
// the 12-step stepper and the fit self-check. Elements a page lacks are skipped. Renders nothing.
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
