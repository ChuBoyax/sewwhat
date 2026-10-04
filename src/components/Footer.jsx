import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HOURS, NAV, SITE } from "../data/site";
import { EASE, WRAP } from "../lib/motion";
import { smoothScrollToTop } from "../lib/lenis";
import { Link } from "../lib/router";
import { Button, Magnetic, SplitWords, StitchLine } from "./anim";
import { Logo } from "./Header";
import { Icon } from "./Icon";
import { StatusPill } from "./StatusPill";

const CREDIT = { label: "CreativeDevLabs", href: "https://creativedevlabs.com/" };
const WORDMARK = "Sew What";

/* Live shop time in Snohomish (Pacific). */
function useShopClock() {
  const fmt = () => {
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit", second: "2-digit" }).format(new Date());
    } catch {
      return "";
    }
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Footer() {
  const ref = useRef(null);
  const time = useShopClock();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0.4, 1], ["35%", "0%"]);

  return (
    <footer ref={ref} className="relative mt-8 overflow-hidden rounded-t-[2.5rem] bg-moss text-linen sm:rounded-t-[4rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob -left-[15%] -top-[20%] h-[38vw] w-[38vw] bg-tulip/25" />
        <div className="blob -right-[10%] top-[30%] h-[30vw] w-[30vw] bg-blush/10" style={{ animationDelay: "-9s" }} />
      </div>

      {/* ---------- call to action ---------- */}
      <div className={`${WRAP} relative grid items-end gap-12 pt-20 sm:pt-28 lg:grid-cols-12`}>
        <div className="lg:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-blush">
            <span className="h-px w-10 bg-blush" />
            Estimates are always free
          </p>
          <h2 className="display mt-6 text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.95]">
            <SplitWords text="Bring it in." />
            <br />
            <SplitWords text="*We'll make it fit.*" delay={0.15} italicClass="italic text-blush" />
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={SITE.phones[0].href} icon="phone">{`Call ${SITE.phones[0].label}`}</Button>
            <Button href={`mailto:${SITE.email}`} variant="light" icon="mail">Email Rhonda</Button>
          </div>
        </div>

        <div className="flex justify-start lg:col-span-4 lg:justify-end">
          <Magnetic strength={0.4}>
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid h-40 w-40 place-items-center rounded-full bg-tulip text-linen transition-colors duration-500 hover:bg-linen hover:text-moss sm:h-48 sm:w-48"
              aria-label="Get directions to the shop"
            >
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
                <defs>
                  <path id="footer-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text fill="currentColor" style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.2em" }}>
                  <textPath href="#footer-ring" textLength="486" lengthAdjust="spacing">
                    GET DIRECTIONS · VISIT THE SHOP ·
                  </textPath>
                </text>
              </svg>
              <Icon name="arrowUpRight" className="h-10 w-10 transition-transform duration-700 ease-silk group-hover:rotate-45" strokeWidth={1.6} />
            </a>
          </Magnetic>
        </div>
      </div>

      <StitchLine className="mt-16 h-14 w-full sm:h-20" strokeClass="stroke-blush" d="M0 60 C 300 20, 500 100, 800 60 S 1100 30, 1200 60" />

      {/* ---------- info grid ---------- */}
      <div className={`${WRAP} relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12`}>
        <div className="space-y-5 lg:col-span-4">
          <Logo light />
          <p className="max-w-xs leading-relaxed text-linen/65">
            Alterations and fittings by {SITE.owner}, {SITE.role}. Serving Snohomish &amp; the surrounding areas since {SITE.since}.
          </p>
          <StatusPill dark />
        </div>

        <FooterCol title="Menu" className="lg:col-span-2">
          <ul className="space-y-2.5">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="group inline-flex items-center gap-2 font-medium text-linen/75 transition hover:text-linen">
                  <span className="h-px w-0 bg-blush transition-all duration-500 ease-silk group-hover:w-5" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterCol>

        <FooterCol title="Visit & call" className="lg:col-span-3">
          <p className="leading-relaxed text-linen/75">{SITE.address[0]}<br />{SITE.address[1]}</p>
          <div className="mt-4 space-y-1">
            {SITE.phones.map((p) => (
              <a key={p.href} href={p.href} className="display block text-2xl transition-colors hover:text-blush">{p.label}</a>
            ))}
          </div>
          <a href={`mailto:${SITE.email}`} className="mt-3 block break-all text-linen/75 underline decoration-linen/25 underline-offset-4 transition hover:text-linen hover:decoration-blush">
            {SITE.email}
          </a>
        </FooterCol>

        <FooterCol title="Office hours" className="lg:col-span-3">
          <ul className="space-y-2">
            {HOURS.map((h) => (
              <li key={h.day} className="flex flex-col">
                <span className="text-sm text-linen/55">{h.day}</span>
                <span className="font-semibold">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-linen/15 px-3 py-1.5 text-sm text-linen/70">
            <Icon name="clock" className="h-4 w-4 text-blush" />
            Snohomish time <span className="font-bold tabular-nums text-linen">{time}</span>
          </p>
        </FooterCol>
      </div>

      {/* ---------- giant interactive wordmark ---------- */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <motion.p
          style={{ y: wordY }}
          className="display flex justify-center whitespace-nowrap text-[19vw] leading-[0.8]"
          initial="hide"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {WORDMARK.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block text-linen/[0.09] transition-all duration-500 ease-silk hover:-translate-y-[6%] hover:italic hover:text-blush"
              variants={{ hide: { y: "60%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 1.2, ease: EASE } } }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.p>
      </div>

      {/* ---------- bottom bar ---------- */}
      <div className="relative border-t border-linen/10">
        <div className={`${WRAP} flex flex-col gap-5 py-6 text-sm text-linen/55 md:flex-row md:items-center md:justify-between`}>
          <p>© {new Date().getFullYear()} {SITE.name} · Snohomish, WA</p>

          <a
            href={CREDIT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-linen/15 py-1.5 pl-4 pr-1.5 transition-colors duration-500 hover:border-blush hover:bg-blush hover:text-moss md:self-auto"
          >
            <span>Site created by</span>
            <span className="relative overflow-hidden font-bold text-linen transition-colors group-hover:text-moss">
              <span className="block transition-transform duration-500 ease-silk group-hover:-translate-y-full">{CREDIT.label}</span>
              <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-silk group-hover:translate-y-0">{CREDIT.label}</span>
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-linen/10 transition-transform duration-500 ease-silk group-hover:rotate-45 group-hover:bg-moss group-hover:text-blush">
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </a>

          <button
            type="button"
            onClick={smoothScrollToTop}
            className="group inline-flex items-center gap-2 self-start font-semibold text-linen/70 transition hover:text-linen md:self-auto"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-linen/20 transition-all duration-500 ease-silk group-hover:-translate-y-1 group-hover:border-blush group-hover:bg-blush group-hover:text-moss">
              <Icon name="arrow" className="h-4 w-4 -rotate-90" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-5 text-linen/45">{title}</p>
      {children}
    </div>
  );
}
