import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { NAV, SITE } from "../data/site";
import { EASE, EASE_CURTAIN } from "../lib/motion";
import { lockScroll } from "../lib/lenis";
import { Link } from "../lib/router";
import { LogoMark } from "./art";
import { Icon } from "./Icon";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="stitch-bar fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" />;
}

export function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Sew What Alterations, home">
      <LogoMark className="h-10 w-10 transition-transform duration-700 ease-silk group-hover:rotate-[20deg]" />
      <span className="leading-none">
        <span className={`display block text-[1.45rem] ${light ? "text-linen" : "text-moss"}`}>Sew What</span>
        <span className={`eyebrow mt-0.5 block !text-[0.6rem] ${light ? "text-linen/60" : "text-moss/60"}`}>Alterations</span>
      </span>
    </Link>
  );
}

export function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 24);
  });

  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-all duration-500 sm:pl-4 ${
            scrolled || open ? "border border-moss/10 bg-linen/75 shadow-[0_10px_40px_-15px_rgba(20,43,27,.25)] backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-moss/10 bg-white/50 p-1 backdrop-blur">
              {NAV.map((n) => {
                const active = route === n.to;
                return (
                  <li key={n.to} className="relative">
                    {active && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-moss" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <Link
                      to={n.to}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${active ? "text-linen" : "text-moss/70 hover:text-moss"}`}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${SITE.email}`}
              className="group hidden items-center gap-2 rounded-full bg-tulip py-2 pl-2 pr-4 text-sm font-semibold text-linen transition hover:bg-moss lg:inline-flex"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-linen text-tulip transition-transform duration-500 ease-silk group-hover:rotate-[-12deg] group-hover:scale-110">
                <Icon name="mail" className="h-4 w-4" strokeWidth={2} />
              </span>
              {SITE.email}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-12 w-12 place-items-center rounded-full bg-moss text-linen lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <motion.span aria-hidden="true" className="absolute h-[2px] w-5 rounded bg-current" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: 0.5, ease: EASE }} />
              <motion.span aria-hidden="true" className="absolute h-[2px] w-5 rounded bg-current" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: 0.5, ease: EASE }} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-moss px-6 pb-8 pt-28 text-linen lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3.25rem) 2.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3.25rem) 2.75rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3.25rem) 2.75rem)" }}
            transition={{ duration: 0.85, ease: EASE_CURTAIN }}
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-1">
                {NAV.map((n, i) => {
                  const active = route === n.to;
                  return (
                    <li key={n.to} className="overflow-hidden">
                      <motion.div initial={{ y: "110%" }} animate={{ y: "0%" }} exit={{ y: "110%" }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}>
                        <Link to={n.to} aria-current={active ? "page" : undefined} className="flex items-baseline gap-4 py-1.5">
                          <span className="text-xs font-bold text-linen/40">0{i + 1}</span>
                          <span className={`display text-5xl sm:text-6xl ${active ? "italic text-blush" : ""}`}>{n.label}</span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="space-y-3 border-t border-linen/15 pt-6">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all font-semibold">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-blush" /> {SITE.email}
              </a>
              <a href={SITE.phones[0].href} className="flex items-center gap-3 font-semibold">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-blush" /> {SITE.phones[0].label}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
