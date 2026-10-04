import { useId } from "react";
import { motion } from "motion/react";
import { EASE } from "../lib/motion";

export function Daisy({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={i} cx="20" cy="9.5" rx="3.4" ry="8" transform={`rotate(${i * 36} 20 20)`} fill="#fff" stroke="var(--color-tulip)" strokeWidth="1.1" />
      ))}
      <circle cx="20" cy="20" r="5" fill="var(--color-tulip)" />
    </svg>
  );
}

export function LogoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="var(--color-moss)" />
      <path d="M20 33V21" stroke="var(--color-linen)" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 23c-5 0-7.5-4.5-6-11 3.5 1.5 6 5 6 11z" fill="var(--color-blush)" />
      <path d="M20 23c5 0 7.5-4.5 6-11-3.5 1.5-6 5-6 11z" fill="var(--color-blush)" />
      <path d="M20 22c-3.5-1.5-4.5-7 0-12.5 4.5 5.5 3.5 11 0 12.5z" fill="var(--color-tulip)" />
    </svg>
  );
}

/* Circular text badge that slowly turns. */
export function RotatingBadge({ className = "", text = "Sew What · Alterations · Since 1996 · " }) {
  const id = "c" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="99" fill="var(--color-moss)" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="var(--color-linen)" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 5" />
        <text fill="var(--color-linen)" style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.2em" }}>
          <textPath href={`#${id}`} textLength="460" lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Daisy className="h-[34%] w-[34%]" />
      </div>
    </div>
  );
}

/* Dress form that sews itself together on scroll. */
export function DressForm({ className = "" }) {
  const view = { initial: "hide", whileInView: "show", viewport: { once: true, margin: "-15% 0px" } };
  const draw = (delay, duration = 1.8) => ({
    hide: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.01, delay } } },
  });
  const fadeIn = (delay) => ({ hide: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, delay } } });
  return (
    <motion.svg viewBox="0 0 220 320" className={className} role="img" aria-label="A dress on a dress form being sewn" {...view}>
      <motion.path d="M110 290v18M78 308h64" stroke="var(--color-moss)" strokeWidth="4" strokeLinecap="round" fill="none" variants={draw(0, 0.8)} />
      <motion.path
        d="M88 40c4-10 40-10 44 0l-2 22c10 6 14 18 12 30l-10 4c6 40 34 100 46 180H42c12-80 40-140 46-180l-10-4c-2-12 2-24 12-30z"
        fill="var(--color-tulip)"
        stroke="var(--color-moss)"
        strokeWidth="2"
        strokeLinejoin="round"
        variants={{
          hide: { pathLength: 0, fillOpacity: 0 },
          show: { pathLength: 1, fillOpacity: 1, transition: { pathLength: { duration: 2.2, ease: EASE, delay: 0.3 }, fillOpacity: { duration: 1, delay: 1.6 } } },
        }}
      />
      <motion.g variants={fadeIn(2.2)} fill="none" stroke="var(--color-linen)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 6">
        <path d="M90 96c14 6 26 6 40 0" />
        <path d="M56 240c36 10 72 10 108 0" />
        <path d="M110 100v160" strokeOpacity="0.5" />
      </motion.g>
      <motion.circle cx="110" cy="30" r="9" fill="var(--color-moss)" variants={fadeIn(0.2)} />
      {/* measuring tape around the waist */}
      <motion.path d="M70 128c26 12 54 12 80 0" fill="none" stroke="var(--color-blush)" strokeWidth="7" strokeLinecap="round" variants={draw(2.4, 1)} />
      <motion.path d="M150 128c12 8 18 26 14 44" fill="none" stroke="var(--color-blush)" strokeWidth="7" strokeLinecap="round" variants={draw(3.2, 0.6)} />
      {/* needle + thread */}
      <motion.g variants={fadeIn(2.6)}>
        <path d="M170 70l30-30" stroke="var(--color-moss)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="200" cy="40" r="4" fill="none" stroke="var(--color-moss)" strokeWidth="2" />
        <path d="M197 44c-20 14-50 2-60 34" fill="none" stroke="var(--color-tulip)" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}
