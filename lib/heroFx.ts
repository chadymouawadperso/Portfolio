/* eslint-disable @typescript-eslint/no-explicit-any */
// Hero visuals of the inner pages. Each plays once, then follows the mouse. Elements a page lacks are skipped.
type Once = (el: Element | null, fn: () => void, margin?: string) => void;
type Later = (fn: () => void, ms: number) => void;

export function initSignals(reduce: boolean, once: Once, cleanups: (() => void)[]) {
    const sv = document.getElementById('sig') as unknown as SVGSVGElement | null; if (!sv) return;
    let NS = 'http://www.w3.org/2000/svg', C = 260, RO = 232, RM = 150, RC = 58;
    const gR = sv.querySelector('.rings')!, gL = sv.querySelector('.lines')!, gD = sv.querySelector('.dots')!, pulse = sv.querySelector('.pulse')!, core = sv.querySelector('.core')!;
    let seed = 11; function rnd(){ seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function el(t: string, a: Record<string, string | number>, p: Element){ let e = document.createElementNS(NS, t); for (let k in a) e.setAttribute(k, String(a[k])); p.appendChild(e); return e; }
    const dots: any[] = []; let i: number; const n = 52;
    for (i = 0; i < n; i++){
      let a = (i / n) * Math.PI * 2 + (rnd() - .5) * .09, r = 176 + rnd() * 70;
      if (Math.abs(((a * 180 / Math.PI) + 450) % 360 - 180) < 14 && r > 214) r = 186 + rnd() * 20; // keep the top label clear
      dots.push({a:a, r:r, r0:r, s:3, l:0, el:el('circle', {r:3, fill:'#4A4E52'}, gD), ln:null});
    }
    /* seven accounts show signals; three of them go all the way to activation */
    let pick = [3, 10, 17, 25, 32, 36, 47], deep = [10, 32, 47]; const ev: any[] = [];
    pick.forEach(function(ix: number, k: number){
      let d = dots[ix], t0 = 300 + k * 300, isDeep = deep.indexOf(ix) > -1;
      d.halo = el('circle', {r:12, fill:'rgba(141,176,196,.16)', opacity:0}, gD); gD.appendChild(d.el);
      ev.push({d:d, t0:t0, t1:t0 + 850, from:d.r0, to:RM, deep:isDeep});
      if (isDeep) ev.push({d:d, t0:t0 + 1700, t1:t0 + 2500, from:RM, to:12 + k * 3, deep:true, last:true});
    });
    let end = Math.max.apply(null, ev.map(function(e: any){ return e.t1; })) + 600;
    function ease(t: number){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    let px = 0, py = 0, tx = 0, ty = 0, mx = -999, my = -999, start: number | null = null, done = false, raf = 0, pulses: number[] = [];
    function pos(d: any){ let k = d.r / RO; return [C + Math.cos(d.a) * d.r + px * k, C + Math.sin(d.a) * d.r + py * k]; }
    function lerpC(a: number[], b: number[], t: number){ const o: number[] = []; let j; for (j = 0; j < 3; j++) o.push(Math.round(a[j] + (b[j] - a[j]) * t)); return 'rgb(' + o.join(',') + ')'; }
    let GREY = [74,78,82], NEAR = [125,130,135], BLUE = [141,176,196];
    function draw(now: number){
      let t = start === null ? 0 : now - start;
      ev.forEach(function(e: any){
        let p = Math.min(Math.max((t - e.t0) / (e.t1 - e.t0), 0), 1), d = e.d;
        if (t >= e.t0 && !e.last){ d.l = Math.min((t - e.t0) / 300, 1); }
        if (t >= e.t0){ d.r = e.from + (e.to - e.from) * ease(p); }
        if (e.last && p >= 1 && !e.fired){ e.fired = true; pulses.push(now); }
        if (!e.last && p >= 1 && !d.ln){ d.ln = el('line', {class:'ln'}, gL); }
      });
      dots.forEach(function(d: any){
        let q = pos(d); d.el.setAttribute('cx', q[0].toFixed(1)); d.el.setAttribute('cy', q[1].toFixed(1));
        let near = 0; if (!d.l){ let dx = q[0] - mx, dy = q[1] - my; near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 80); }
        d.el.setAttribute('r', (3 + d.l * 1.6 + near * .8).toFixed(2));
        d.el.setAttribute('fill', d.l ? lerpC(GREY, BLUE, d.l) : lerpC(GREY, NEAR, near));
        if (d.halo){ d.halo.setAttribute('cx', q[0].toFixed(1)); d.halo.setAttribute('cy', q[1].toFixed(1)); d.halo.setAttribute('opacity', (d.l * (d.r < RC ? .4 : 1)).toFixed(2)); }
        if (d.ln){ let c = [C + px * RC / RO, C + py * RC / RO], vx = q[0] - c[0], vy = q[1] - c[1], L = Math.sqrt(vx * vx + vy * vy) || 1;
          d.ln.setAttribute('x1', q[0].toFixed(1)); d.ln.setAttribute('y1', q[1].toFixed(1));
          d.ln.setAttribute('x2', (c[0] + vx / L * RC).toFixed(1)); d.ln.setAttribute('y2', (c[1] + vy / L * RC).toFixed(1));
          d.ln.style.display = d.r < RC + 4 ? 'none' : ''; }
      });
      gR.querySelectorAll('[data-k]').forEach(function(g: Element){ const k = +(g.getAttribute("data-k") ?? 0); g.setAttribute('transform', 'translate(' + (px * k).toFixed(2) + ' ' + (py * k).toFixed(2) + ')'); });
      pulses = pulses.filter(function(p0: number){ return now - p0 < 1200; });
      if (pulses.length){ let u = (now - pulses[pulses.length - 1]) / 1200; pulse.setAttribute('r', (RC + u * 34).toFixed(1)); pulse.setAttribute('opacity', (1 - u).toFixed(2)); }
      else pulse.setAttribute('opacity', '0');
      core.setAttribute('r', (5 + Math.min(ev.filter(function(e: any){ return e.fired; }).length, 3) * 1.4).toFixed(1));
      if (start !== null && t > end) done = true;
    }
    function loop(now: number){
      px += (tx - px) * .08; py += (ty - py) * .08;
      draw(now);
      let settled = Math.abs(tx - px) < .05 && Math.abs(ty - py) < .05;
      raf = (done && settled && !pulses.length) ? 0 : requestAnimationFrame(loop);
    }
    function kick(){ if (!raf) raf = requestAnimationFrame(loop); }
    cleanups.push(() => { if (raf) cancelAnimationFrame(raf); });
    if (reduce){ start = -1e6; draw(0); pulse.setAttribute('opacity', '0'); return; }
    draw(0);
    once(sv, function(){ start = performance.now(); kick(); }, '0px');
    if (window.matchMedia('(hover:hover)').matches){
      const hero = sv.closest('section')!;
      const onMove = function(e: PointerEvent){
        let b = sv.getBoundingClientRect(), s = 520 / b.width;
        mx = (e.clientX - b.left) * s; my = (e.clientY - b.top) * s;
        tx = Math.max(-1, Math.min(1, (mx - C) / 400)) * 16; ty = Math.max(-1, Math.min(1, (my - C) / 400)) * 16; kick();
      };
      const onLeave = function(){ tx = ty = 0; mx = my = -999; kick(); };
      hero.addEventListener('pointermove', onMove); hero.addEventListener('pointerleave', onLeave);
      cleanups.push(() => { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); });
    }
  }

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
