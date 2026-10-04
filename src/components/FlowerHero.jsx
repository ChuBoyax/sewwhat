import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { EASE, PAGE_DELAY, WRAP } from "../lib/motion";
import { Reveal, SplitWords, StitchLine } from "./anim";

const PETALS = [
  { left: "18%", delay: 0, dur: 9, size: 14, drift: 40 },
  { left: "70%", delay: 2.5, dur: 11, size: 10, drift: -30 },
  { left: "40%", delay: 5, dur: 10, size: 12, drift: 50 },
  { left: "85%", delay: 7, dur: 12, size: 9, drift: -45 },
  { left: "8%", delay: 8.5, dur: 10, size: 11, drift: 35 },
];

/*
  Page hero with one of the original site's flowers: it grows in from the stem,
  sways, leans toward the cursor and drops the odd petal.
*/
export function FlowerHero({ eyebrow, title, image, alt, width, height, petalClass = "bg-tulip/70", children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yFlower = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const px = useMotionValue(0);
  const lean = useSpring(useTransform(px, [-1, 1], [-5, 5]), { stiffness: 50, damping: 14 });
  useEffect(() => {
    const onMove = (e) => px.set((e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob -left-[10%] -top-[20%] h-[40vw] w-[40vw] bg-tulip/20" />
        <div className="blob -right-[10%] top-[15%] h-[34vw] w-[34vw] bg-moss/15" style={{ animationDelay: "-8s" }} />
      </div>

      <div className={`${WRAP} relative grid items-center gap-6 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-12`}>
        <motion.div style={{ y: yText }} className="relative z-10 lg:col-span-7">
          <Reveal onMount delay={PAGE_DELAY - 0.1}>
            <p className="eyebrow flex items-center gap-3 text-tulip">
              <span className="h-px w-10 bg-tulip" />
              {eyebrow}
            </p>
          </Reveal>
          <h1 className="display mt-6 text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98]">
            <SplitWords text={title} onMount delay={PAGE_DELAY} />
          </h1>
          {children}
        </motion.div>

        <motion.div style={{ y: yFlower }} className="relative flex justify-center lg:col-span-5">
          <div aria-hidden="true" className="absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-tulip/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {PETALS.map((p, i) => (
              <motion.span
                key={i}
                className={`absolute top-0 block rounded-[60%_0_60%_0] ${petalClass}`}
                style={{ left: p.left, width: p.size, height: p.size * 1.6 }}
                initial={{ opacity: 0 }}
                animate={{ y: ["0vh", "70vh"], x: [0, p.drift, 0], rotate: [0, 240], opacity: [0, 1, 1, 0] }}
                transition={{ duration: p.dur, delay: PAGE_DELAY + 1.5 + p.delay, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>
          <motion.div style={{ rotate: lean, transformOrigin: "50% 100%" }} className="relative">
            <motion.div style={{ transformOrigin: "50% 100%" }} animate={{ rotate: [-1.8, 1.8, -1.8] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
              <motion.img
                src={image}
                alt={alt}
                width={width}
                height={height}
                className="h-[58svh] max-h-[600px] min-h-[380px] w-auto drop-shadow-[0_30px_40px_rgba(201,36,99,.2)]"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", y: 60, scale: 0.92 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0, scale: 1 }}
                transition={{ duration: 1.8, ease: EASE, delay: PAGE_DELAY }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <StitchLine className="mt-10 h-16 w-full sm:h-24" />
    </section>
  );
}
