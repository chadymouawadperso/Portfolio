/* eslint-disable @typescript-eslint/no-explicit-any */
// Hero visuals of the inner pages. Each plays once, then follows the mouse. Elements a page lacks are skipped.
type Once = (el: Element | null, fn: () => void, margin?: string) => void;
type Later = (fn: () => void, ms: number) => void;

export function initDeck(reduce: boolean, once: Once, later: Later, cleanups: (() => void)[]) {
    const deck = document.getElementById('deck'), inner = document.getElementById('deck-in'); if (!deck || !inner) return;
    once(deck, function(){ later(function(){ deck.classList.add('in'); }, reduce ? 0 : 250); }, '0px');
    if (reduce || !window.matchMedia('(hover:hover)').matches) return;
    const hero = deck.closest('section')!;
    const onMove = function(e: PointerEvent){
      const b = deck.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (b.left + b.width / 2)) / (b.width * .9)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (b.top + b.height / 2)) / (b.height * .9)));
      inner.style.transform = 'rotateY(' + (nx * 9).toFixed(2) + 'deg) rotateX(' + (-ny * 7).toFixed(2) + 'deg)';
    };
    const onLeave = function(){ inner.style.transform = ''; };
    hero.addEventListener('pointermove', onMove); hero.addEventListener('pointerleave', onLeave);
    cleanups.push(() => { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); });
  }

export function initExploded(reduce: boolean, once: Once, cleanups: (() => void)[]) {
  const sv = document.getElementById("xv");
  if (!sv) return;
  const pls = Array.prototype.slice.call(sv.querySelectorAll(".pl")) as SVGElement[];
  const CY = 268, G0 = 50, G1 = 72, DUR = 700, STAG = 160;
  let g = G0, gt = G0, start: number | null = null, raf = 0;
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  function draw(now: number) {
    const t = start === null ? 0 : now - start;
    let busy = false;
    pls.forEach((p, i) => {
      const k = start === null ? 0 : Math.min(Math.max((t - i * STAG) / DUR, 0), 1);
      if (k < 1) busy = true;
      const y = CY + (1.5 - i) * g - (1 - ease(k)) * 60;
      p.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
      p.style.opacity = ease(k).toFixed(3);
    });
    return busy;
  }
  function loop(now: number) {
    g += (gt - g) * 0.12;
    const busy = draw(now) || Math.abs(gt - g) > 0.1;
    raf = busy ? requestAnimationFrame(loop) : 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  cleanups.push(() => { if (raf) cancelAnimationFrame(raf); });
  if (reduce) { start = -1e6; draw(0); return; }
  draw(0);
  once(sv, () => { start = performance.now(); kick(); }, "0px");
  if (window.matchMedia("(hover:hover)").matches) {
    const onEnter = () => { gt = G1; kick(); };
    const onLeave = () => { gt = G0; kick(); };
    sv.addEventListener("pointerenter", onEnter);
    sv.addEventListener("pointerleave", onLeave);
    cleanups.push(() => { sv.removeEventListener("pointerenter", onEnter); sv.removeEventListener("pointerleave", onLeave); });
  }
}

/** GTM Playbooks hero: the cards take turns lifting until the visitor hovers the hand. */
export function initHand(reduce: boolean, cleanups: (() => void)[]) {
  const box = document.getElementById("h5");
  if (!box || reduce) return;
  const cards = Array.from(box.querySelectorAll<HTMLElement>(".pc"));
  let i = 0, hover = false;
  const clear = () => cards.forEach((c) => c.classList.remove("up"));
  const enter = () => { hover = true; clear(); };
  const leave = () => { hover = false; };
  box.addEventListener("mouseenter", enter);
  box.addEventListener("mouseleave", leave);
  const t = window.setInterval(() => {
    if (hover || !cards.length) return;
    clear(); cards[i % cards.length].classList.add("up"); i++;
  }, 1400);
  cleanups.push(() => { clearInterval(t); box.removeEventListener("mouseenter", enter); box.removeEventListener("mouseleave", leave); });
}
