import { useEffect, useId, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { EASE } from "../lib/motion";
import { Icon } from "./Icon";

/* Parse "*word*" markup into words with an italic flag (can span several words). */
function parseWords(text) {
  let on = false;
  return text.split(" ").map((raw) => {
    let w = raw;
    if (w.startsWith("*")) { on = true; w = w.slice(1); }
    const italic = on;
    if (w.endsWith("*")) { on = false; w = w.slice(0, -1); }
    return { w, italic };
  });
}

const inViewProps = (onMount) =>
  onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-8% 0px" } };

/* Fade + rise + un-blur. */
export function Reveal({ children, className = "", delay = 0, y = 36, onMount = false, as = "div" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hide"
      {...inViewProps(onMount)}
      variants={{
        hide: { opacity: 0, y, filter: "blur(10px)" },
        // filter is cleared afterwards so children can still use backdrop-blur
        show: { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" }, transition: { duration: 1.1, ease: EASE, delay } },
      }}
    >
      {children}
    </M>
  );
}

/* Masked word-by-word headline reveal. */
export function SplitWords({ text, className = "", delay = 0, stagger = 0.07, onMount = false, italicClass = "italic text-tulip" }) {
  const words = parseWords(text);
  return (
    <motion.span
      className={className}
      initial="hide"
      {...inViewProps(onMount)}
      variants={{ hide: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ w, italic }, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
            <motion.span
              className={`inline-block will-change-transform ${italic ? italicClass : ""}`}
              variants={{
                hide: { y: "115%", rotate: 5 },
                show: { y: "0%", rotate: 0, transition: { duration: 1.15, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

/* Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = parseWords(text);
  return (
    <p ref={ref} className={className}>
      {words.map(({ w, italic }, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} italic={italic}>
          {w}
        </ScrollWord>
      ))}
    </p>
  );
}

function ScrollWord({ children, progress, range, italic }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={italic ? "italic text-tulip" : ""}>
        {children}
      </motion.span>{" "}
    </>
  );
}

export function CountUp({ to, from = 0, duration = 2.2, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, { duration, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, from, to, duration]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/* A dashed seam that sews itself across the section when it scrolls into view. */
export function StitchLine({ className = "", d = "M0 60 C 200 10, 400 110, 600 60 S 1000 10, 1200 60", strokeClass = "" }) {
  const id = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          <motion.path
            d={d}
            fill="none"
            stroke="#fff"
            strokeWidth="12"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 2.2, ease: EASE }}
          />
        </mask>
      </defs>
      <path d={d} className={`stitch ${strokeClass}`} mask={`url(#${id})`} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* Gently pulls its child toward the cursor. */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/* 3D tilt + cursor spotlight. */
export function TiltCard({ children, className = "", max = 8 }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`spot ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Pill button: magnetic, fill grows from the cursor, label rolls, arrow turns. */
export function Button({ href, onClick, type, children, variant = "tulip", icon = "arrow", external = false, className = "", wrapClassName = "", ...rest }) {
  const setPos = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const inner = (
    <>
      <span className="roll" data-text={children}>
        <span>{children}</span>
      </span>
      {icon && (
        <span className="btn-icon">
          <Icon name={icon} className="h-4 w-4" strokeWidth={2} />
        </span>
      )}
    </>
  );
  const shared = { className: `btn btn-${variant} ${className}`, onPointerEnter: setPos, onPointerLeave: setPos, ...rest };
  return (
    <Magnetic className={wrapClassName}>
      {href ? (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...shared}>
          {inner}
        </a>
      ) : (
        <button type={type ?? "button"} onClick={onClick} {...shared}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

export function Marquee({ items, className = "", reverse = false, itemClassName = "", separator = "✶" }) {
  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={itemClassName}>{t}</span>
          <span className="mx-6 text-[0.6em] sm:mx-10" aria-hidden="true">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
