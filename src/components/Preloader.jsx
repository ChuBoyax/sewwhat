import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { EASE, EASE_CURTAIN } from "../lib/motion";
import { LogoMark } from "./art";

const pageReady = () =>
  Promise.race([
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]),
    new Promise((r) => setTimeout(r, 4000)),
  ]);

/*
  First-visit loader: a needle sews a seam across the screen while the count
  climbs, then the "fabric" parts along that seam to reveal the site.
*/
export function Preloader({ onDone }) {
  const p = useMotionValue(0);
  const count = useTransform(p, (v) => String(Math.round(v)).padStart(3, "0"));
  const seam = useTransform(p, (v) => v / 100);
  const needleLeft = useTransform(p, (v) => `${v}%`);

  useEffect(() => {
    let cancelled = false;
    document.documentElement.style.overflow = "hidden";
    (async () => {
      await animate(p, 82, { duration: 1.5, ease: [0.65, 0, 0.35, 1] });
      await pageReady();
      await animate(p, 100, { duration: 0.5, ease: EASE });
      await new Promise((r) => setTimeout(r, 250));
      if (!cancelled) onDone();
    })();
    return () => {
      cancelled = true;
      document.documentElement.style.overflow = "";
    };
  }, [p, onDone]);

  const part = (dir) => ({ y: dir, transition: { duration: 1.1, ease: EASE_CURTAIN, delay: 0.15 } });

  return (
    <motion.div className="fixed inset-0 z-[100]" exit={{ pointerEvents: "none" }} role="status" aria-label="Loading Sew What Alterations">
      {/* top half */}
      <motion.div className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center bg-linen pb-10 sm:pb-12" exit={part("-100%")}>
        <div className="overflow-hidden pb-2">
          <motion.div initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.1 }} className="flex items-center gap-4">
            <LogoMark className="h-12 w-12 sm:h-14 sm:w-14" />
            <span className="display text-5xl leading-none sm:text-7xl">
              Sew <span className="italic text-tulip">What</span>
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* bottom half */}
      <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-linen" exit={part("100%")}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mx-auto flex w-[min(36rem,calc(100%-3rem))] items-start justify-between pt-7"
        >
          <p className="eyebrow text-moss/55">Alterations · Since 1996</p>
          <p className="display text-2xl tabular-nums text-tulip">
            <motion.span>{count}</motion.span>
            <span className="text-moss/40">%</span>
          </p>
        </motion.div>
      </motion.div>

      {/* the seam */}
      <motion.div
        className="absolute inset-x-0 top-1/2 mx-auto h-0 w-[min(36rem,calc(100%-3rem))]"
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div className="absolute inset-x-0 top-0 h-px -translate-y-1/2 bg-moss/10" />
        <motion.div style={{ scaleX: seam }} className="stitch-bar absolute inset-x-0 top-0 h-[2px] origin-left -translate-y-1/2" />
        <motion.div style={{ left: needleLeft }} className="absolute bottom-0 h-12 w-3 -translate-x-1/2">
          <motion.svg
            viewBox="0 0 12 48"
            className="h-full w-full"
            aria-hidden="true"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 0.38, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 4 L6 46" stroke="var(--color-moss)" strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="6" cy="8" rx="1.4" ry="3" fill="var(--color-linen)" />
            <path d="M6 8 C 2 14, 1 20, -14 26" fill="none" stroke="var(--color-tulip)" strokeWidth="1.4" strokeDasharray="3 3" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
