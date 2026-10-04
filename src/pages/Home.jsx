import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ALSO, SITE } from "../data/site";
import { CLOSE, CUTOFF, OPEN, READY, useShopStatus } from "../hooks/useShopStatus";
import { EASE, PAGE_DELAY, WRAP } from "../lib/motion";
import { Button, Marquee, Reveal, ScrollWords, SplitWords, TiltCard } from "../components/anim";
import { Daisy, DressForm, RotatingBadge } from "../components/art";
import { Icon } from "../components/Icon";
import { StatusPill } from "../components/StatusPill";

export default function Home() {
  return (
    <>
      <Hero />
      <SameDay />
      <Specialty />
      <Also />
      <Visit />
    </>
  );
}

/* ---------------------------------------------------------------- hero */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const yTulip = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // the tulip leans gently toward the cursor
  const px = useMotionValue(0);
  const lean = useSpring(useTransform(px, [-1, 1], [-6, 6]), { stiffness: 50, damping: 14 });
  useEffect(() => {
    const onMove = (e) => px.set((e.clientX / window.innerWidth) * 2 - 1);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob -left-[12%] -top-[12%] h-[48vw] w-[48vw] bg-tulip/25" />
        <div className="blob -right-[14%] top-[25%] h-[42vw] w-[42vw] bg-moss/20" style={{ animationDelay: "-7s" }} />
      </div>

      <div className={`${WRAP} relative grid items-center gap-4 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12`}>
        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: PAGE_DELAY }}
            className="flex items-center gap-3"
          >
            <Daisy className="h-10 w-10 animate-spin-slow" />
            <span className="display text-3xl italic text-tulip sm:text-4xl">Welcome!</span>
          </motion.p>

          <h1 className="display mt-5 text-[clamp(3rem,8vw,6.75rem)] leading-[0.9]">
            <SplitWords text="Sew What" onMount delay={PAGE_DELAY + 0.1} />
            <br />
            <SplitWords text="*Alterations*" onMount delay={PAGE_DELAY + 0.3} />
          </h1>

          <Reveal onMount delay={PAGE_DELAY + 0.6}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-moss/75 sm:text-xl">
              Alterations and fittings by <span className="font-bold text-moss">{SITE.owner}</span>, {SITE.role}.
              Serving Snohomish &amp; the surrounding areas since {SITE.since}.
            </p>
          </Reveal>

          <Reveal onMount delay={PAGE_DELAY + 0.75} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={SITE.phones[0].href} icon="phone">Call for a free estimate</Button>
            <Button href="#/services" variant="ghost">Explore services</Button>
          </Reveal>

          <Reveal onMount delay={PAGE_DELAY + 0.9} className="mt-8">
            <StatusPill />
          </Reveal>
        </motion.div>

        <motion.div style={{ y: yTulip }} className="relative flex justify-center lg:col-span-5">
          <div aria-hidden="true" className="absolute left-1/2 top-[10%] h-72 w-72 -translate-x-1/3 rounded-full bg-tulip/20 blur-3xl" />
          {/* the stem's base sits near the bottom-left of tulip.gif, so it sways from there */}
          <motion.div style={{ rotate: lean, transformOrigin: "15% 100%" }} className="relative">
            <motion.div style={{ transformOrigin: "15% 100%" }} animate={{ rotate: [-1.8, 1.8, -1.8] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
              <motion.img
                src="/images/tulip.gif"
                alt="A pink tulip"
                width="247"
                height="482"
                className="h-[56svh] max-h-[600px] min-h-[380px] w-auto drop-shadow-[0_30px_40px_rgba(201,36,99,.2)]"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", y: 60, scale: 0.92 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0, scale: 1 }}
                transition={{ duration: 1.8, ease: EASE, delay: PAGE_DELAY }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: PAGE_DELAY + 1.4 }}
            className="absolute right-0 top-4 sm:right-6 lg:-right-2"
          >
            <RotatingBadge className="h-28 w-28 sm:h-36 sm:w-36" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-10 -rotate-2 bg-tulip py-3 text-linen shadow-[0_20px_50px_-20px_rgba(201,36,99,.6)] sm:mt-4">
        <div aria-hidden="true" className="tape-ticks absolute inset-x-0 top-0 h-3.5 text-linen/40" />
        <Marquee
          className="pt-3"
          itemClassName="display text-2xl italic sm:text-3xl"
          items={["Same day jean hems", "Bridesmaid & prom dresses", "Free estimates", `Since ${SITE.since}`, "Snohomish, WA"]}
        />
      </div>
    </section>
  );
}

/* --------------------------------------------------- same-day jean hems */
function SameDay() {
  const status = useShopStatus();
  return (
    <section className="relative mt-24 overflow-hidden bg-moss text-linen sm:mt-32">
      <div aria-hidden="true" className="blob -right-[10%] -top-[30%] h-[40vw] w-[40vw] bg-tulip/25" />
      <div className={`${WRAP} relative grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-blush">Same day service on jean hems</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(3.2rem,8vw,7rem)] leading-[0.9]">
            <SplitWords text="In by 11AM." />
            <br />
            <SplitWords text="*Out by 5PM.*" delay={0.2} italicClass="italic text-blush" />
          </h2>
        </div>
        <div className="lg:col-span-6">
          <Reveal delay={0.2}>
            <DayTimeline status={status} />
          </Reveal>
          {status && (
            <Reveal delay={0.35}>
              <p className={`mt-8 rounded-2xl px-5 py-4 text-lg ${status.urgent ? "bg-tulip font-semibold" : "border border-linen/15 text-linen/80"}`}>
                {status.hem}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function DayTimeline({ status }) {
  const pct = (m) => ((m - OPEN) / (CLOSE - OPEN)) * 100;
  const now = status?.weekday && status.mins >= OPEN && status.mins <= CLOSE ? pct(status.mins) : null;
  const grow = (delay, duration = 0.8) => ({
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true },
    transition: { duration, ease: EASE, delay },
  });
  return (
    <div>
      <div className="mb-3 flex justify-between text-sm font-semibold text-linen/60">
        <span>10 AM</span>
        <span>6 PM</span>
      </div>
      <div className="relative">
        <div className="relative h-16 overflow-hidden rounded-2xl border border-linen/15 bg-linen/5">
          <motion.div className="absolute inset-y-0 left-0 origin-left bg-tulip" style={{ width: `${pct(CUTOFF)}%` }} {...grow(0.3)} />
          <motion.div className="stitch-run absolute inset-y-0 origin-left" style={{ left: `${pct(CUTOFF)}%`, width: `${pct(READY) - pct(CUTOFF)}%` }} {...grow(0.9, 1.6)} />
          <motion.div className="absolute inset-y-0 right-0 origin-left bg-linen" style={{ width: `${100 - pct(READY)}%` }} {...grow(2.3)} />
        </div>
        {now !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.8 }}
            className="absolute -bottom-2 -top-2 w-0.5 -translate-x-1/2 rounded bg-blush"
            style={{ left: `${now}%` }}
          >
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blush px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-moss">
              Now
            </span>
          </motion.div>
        )}
      </div>
      <ul className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-tulip" />Drop off by 11</li>
        <li className="flex items-center gap-2"><span className="h-0.5 w-4 border-t-2 border-dashed border-linen/70" />We sew</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-linen" />Pick up at 5</li>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------ specialty */
function Specialty() {
  return (
    <section className={`${WRAP} grid items-center gap-16 py-28 sm:py-40 lg:grid-cols-12`}>
      <div className="lg:col-span-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-tulip">
            <span className="h-px w-10 bg-tulip" />
            Our specialty
          </p>
        </Reveal>
        <ScrollWords
          className="display mt-8 text-[clamp(2rem,4.6vw,4.1rem)] leading-[1.08]"
          text="Specializing in *bridesmaid and prom dress* alterations. Bring me that dress for your special occasion or school dance and I will give it that *special fit.*"
        />
        <Reveal className="mt-10">
          <Button href={SITE.phones[0].href} variant="moss" icon="phone">Book a fitting</Button>
        </Reveal>
      </div>
      <div className="relative lg:col-span-4">
        <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-tulip/10 blur-2xl" />
        <DressForm className="relative mx-auto h-[420px] w-auto" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- also */
function Also() {
  return (
    <section className="relative overflow-hidden pb-28 sm:pb-36">
      <div className={WRAP}>
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-tulip">
            <span className="h-px w-10 bg-tulip" />
            Also
          </p>
        </Reveal>
        <h2 className="display mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.98]">
          <SplitWords text="Drapes, pillows, repairs and *the little things.*" />
        </h2>
      </div>

      <div className="relative my-16 sm:my-20" aria-hidden="true">
        <div className="-rotate-2 bg-moss py-5 text-linen">
          <Marquee items={ALSO.map((a) => a.title)} itemClassName="display text-4xl sm:text-6xl" />
        </div>
        <div className="-mt-4 rotate-1 border-y border-moss/15 bg-linen/90 py-4 text-tulip backdrop-blur">
          <Marquee items={ALSO.map((a) => a.title)} reverse itemClassName="display text-4xl italic sm:text-6xl" />
        </div>
      </div>

      <div className={`${WRAP} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
        {ALSO.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <TiltCard className="group h-full rounded-[2rem] border border-moss/10 bg-white/55 p-7 backdrop-blur">
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-moss text-linen transition-transform duration-700 ease-silk group-hover:-rotate-12 group-hover:bg-tulip">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span className="display text-lg text-moss/30">0{i + 1}</span>
              </div>
              <h3 className="display mt-10 text-3xl leading-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-moss/70">{s.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Button href="#/services" variant="ghost">See every service</Button>
      </Reveal>
    </section>
  );
}

/* ---------------------------------------------------------------- visit */
function Visit() {
  return (
    <section className={`${WRAP} pb-28 sm:pb-36`}>
      <Reveal>
        <div className="relative grid gap-12 overflow-hidden rounded-[2.5rem] border border-moss/10 bg-white/55 p-8 backdrop-blur sm:p-14 lg:grid-cols-2">
          <div aria-hidden="true" className="blob -bottom-1/2 -left-1/4 h-[30rem] w-[30rem] bg-tulip/15" />
          <div className="relative">
            <p className="eyebrow flex items-center gap-2 text-tulip"><Icon name="pin" className="h-4 w-4" /> Visit the shop</p>
            <p className="display mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1]">
              {SITE.address[0]}
              <br />
              <span className="italic text-moss/60">{SITE.address[1]}</span>
            </p>
            <div className="mt-9">
              <Button href={SITE.mapUrl} external variant="moss" icon="arrowUpRight">Get directions</Button>
            </div>
          </div>
          <div className="relative flex flex-col justify-center gap-2">
            <p className="eyebrow text-moss/50">Call for a free estimate</p>
            {SITE.phones.map((p, i) => (
              <a key={p.href} href={p.href} className="group flex items-center justify-between gap-4 border-b border-moss/15 py-4">
                <span className={`display text-[clamp(2rem,4vw,3.2rem)] leading-none transition-colors duration-500 group-hover:text-tulip ${i ? "text-moss/60" : ""}`}>
                  {p.label}
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-moss/15 transition-all duration-500 ease-silk group-hover:-rotate-45 group-hover:border-tulip group-hover:bg-tulip group-hover:text-linen">
                  <Icon name="arrow" />
                </span>
              </a>
            ))}
            <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-2 break-all font-semibold text-tulip hover:underline">
              <Icon name="mail" className="h-5 w-5 shrink-0" /> {SITE.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
