import { useEffect, useRef } from "react";

/*
  A real-feeling thread hangs from the cursor: a verlet rope with gravity
  that swings as you move, drawn as a running stitch. Mouse + motion-OK only.
*/
export function ThreadCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const color = getComputedStyle(document.documentElement).getPropertyValue("--color-tulip").trim() || "#C92463";
    const N = 24, SEG = 8, GRAVITY = 0.42, FRICTION = 0.965, ITER = 8;

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: 0, y: 0, active: false };
    const pts = Array.from({ length: N }, () => ({ x: 0, y: 0, px: 0, py: 0 }));

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX + 1;
      mouse.y = e.clientY + 1;
      if (!mouse.active) {
        mouse.active = true;
        pts.forEach((p, i) => { p.x = p.px = mouse.x; p.y = p.py = mouse.y + i * SEG; });
      }
    };
    const onLeave = () => { mouse.active = false; };

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      if (mouse.active) {
        pts[0].x = mouse.x;
        pts[0].y = mouse.y;
        for (let i = 1; i < N; i++) {
          const p = pts[i];
          const vx = (p.x - p.px) * FRICTION;
          const vy = (p.y - p.py) * FRICTION;
          p.px = p.x; p.py = p.y;
          p.x += vx; p.y += vy + GRAVITY;
        }
        for (let k = 0; k < ITER; k++) {
          for (let i = 1; i < N; i++) {
            const a = pts[i - 1], b = pts[i];
            const dx = b.x - a.x, dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 0.0001;
            const diff = (d - SEG) / d;
            if (i === 1) { b.x -= dx * diff; b.y -= dy * diff; }
            else {
              a.x += dx * diff * 0.5; a.y += dy * diff * 0.5;
              b.x -= dx * diff * 0.5; b.y -= dy * diff * 0.5;
            }
          }
        }
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < N - 1; i++) {
          const mx = (pts[i].x + pts[i + 1].x) / 2;
          const my = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
        }
        ctx.lineTo(pts[N - 1].x, pts[N - 1].y);
        ctx.setLineDash([6, 5]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.setLineDash([]);
        const end = pts[N - 1];
        ctx.beginPath();
        ctx.arc(end.x, end.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />;
}
