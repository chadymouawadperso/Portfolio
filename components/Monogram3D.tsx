"use client";

import { useEffect, useRef, useState } from "react";

// The 3D CM monogram in the hero. Loads after the page has displayed; the flat logo shows until then
// and stays if 3D is unavailable.
export default function Monogram3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      stage.appendChild(renderer.domElement);
      setReady(true);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 12.5);
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      scene.add(new THREE.HemisphereLight(0xffffff, 0x5a86a0, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(1.5, 6, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x5a86a0, 2.4);
      rim.position.set(-6, -3, 2);
      scene.add(rim);

      const paper = new THREE.MeshStandardMaterial({ color: 0xf7f5f0, roughness: 0.28, metalness: 0.05, emissive: 0x3a3a38, emissiveIntensity: 0.35 });
      const blue = new THREE.MeshStandardMaterial({ color: 0x5a86a0, roughness: 0.22, metalness: 0.35, emissive: 0x5a86a0, emissiveIntensity: 0.75 });
      const R = 0.07;
      const v = (x: number, y: number) => new THREE.Vector3((x - 252) / 100, -(y - 250) / 100, 0);
      const group = new THREE.Group();
      scene.add(group);
      const cyl = new THREE.CylinderGeometry(R, R, 1, 20, 1, true);
      const sph = new THREE.SphereGeometry(R, 20, 14);
      const UP = new THREE.Vector3(0, 1, 0);
      const segment = (a: InstanceType<typeof THREE.Vector3>, b: InstanceType<typeof THREE.Vector3>, mat: InstanceType<typeof THREE.MeshStandardMaterial>) => {
        const m = new THREE.Mesh(cyl, mat);
        const d = new THREE.Vector3().subVectors(b, a);
        m.scale.set(1, d.length(), 1);
        m.position.copy(a).addScaledVector(d, 0.5);
        m.quaternion.setFromUnitVectors(UP, d.normalize());
        group.add(m);
        return m;
      };
      const joint = (p: InstanceType<typeof THREE.Vector3>, mat: InstanceType<typeof THREE.MeshStandardMaterial>) => {
        const s = new THREE.Mesh(sph, mat);
        s.position.copy(p);
        group.add(s);
        return s;
      };
      const poly = (pts: InstanceType<typeof THREE.Vector3>[], mat: InstanceType<typeof THREE.MeshStandardMaterial>) => {
        for (let i = 0; i < pts.length - 1; i++) segment(pts[i], pts[i + 1], mat);
        pts.forEach((p) => joint(p, mat));
      };
      const A: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i <= 48; i++) {
        const t = Math.PI / 2 + (Math.PI * i) / 48;
        A.push(v(150 + 130 * Math.cos(t), 252 - 130 * Math.sin(t)));
      }
      A.push(v(208, 382), v(208, 178), v(440, 500));
      poly(A, paper);
      poly([v(356, 300), v(485, 122), v(485, 382)], paper);
      const diag = segment(v(140, 0), v(415, 382), blue);
      diag.position.z = 0.12;
      joint(v(140, 0), blue).position.z = 0.12;
      joint(v(415, 382), blue).position.z = 0.12;

      const resize = () => {
        const w = stage.clientWidth, h = stage.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = w / h < 1 ? 14 : 12.5;
        camera.updateProjectionMatrix();
        if (reduce) renderer.render(scene, camera);
      };
      window.addEventListener("resize", resize);
      resize();

      let tx = 0, ty = 0, rx = 0, ry = 0, raf = 0, visible = true;
      const onMove = (e: PointerEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0], r = stage.getBoundingClientRect();
        tx = ((t.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((t.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      stage.addEventListener("touchmove", onTouch, { passive: true });
      const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
      io.observe(stage);

      group.rotation.set(-0.1, -0.3, 0);
      if (reduce) renderer.render(scene, camera);
      else {
        const clock = new THREE.Clock();
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!visible) return;
          const t = clock.getElapsedTime();
          rx += (ty * 0.18 - rx) * 0.05;
          ry += (tx * 0.38 - ry) * 0.05;
          group.rotation.x = -0.08 + rx + Math.sin(t * 0.45) * 0.035;
          group.rotation.y = -0.28 + ry + Math.sin(t * 0.3) * 0.1;
          group.position.y = Math.sin(t * 0.7) * 0.04;
          renderer.render(scene, camera);
        };
        loop();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        stage.removeEventListener("touchmove", onTouch);
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) idle(() => void start());
    else setTimeout(() => void start(), 200);

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className={"mono-stage" + (ready ? " webgl" : "")} id="mono-stage" ref={stageRef} aria-hidden="true">
      <svg className="mono-fallback" viewBox="0 0 500 500">
        <path d="M150 122 A130 130 0 0 0 150 382 L208 382 L208 178 L440 500" fill="none" stroke="#F2F0EB" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M356 300 L485 122 L485 382" fill="none" stroke="#F2F0EB" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M140 0 L415 382" fill="none" stroke="#5A86A0" strokeWidth="12" strokeLinecap="round" />
      </svg>
    </div>
  );
}
