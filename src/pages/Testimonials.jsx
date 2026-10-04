import { motion } from "motion/react";
import { SITE } from "../data/site";
import { EASE, PAGE_DELAY, WRAP } from "../lib/motion";
import { Button, CountUp, Reveal, ScrollWords, SplitWords } from "../components/anim";
import { Daisy } from "../components/art";
import { FlowerHero } from "../components/FlowerHero";

export default function Testimonials() {
  const years = new Date().getFullYear() - SITE.since;
  return (
    <>
      <FlowerHero
        eyebrow="Testimonials"
        title="References *upon request.*"
        image="/images/lily.gif"
        alt="A pale pink lily"
        width="256"
        height="457"
        petalClass="bg-blush/80"
      >
        <Reveal onMount delay={PAGE_DELAY + 0.35}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-moss/75 sm:text-xl">
            Serving clients in Snohomish and the surrounding areas since {SITE.since}.
          </p>
        </Reveal>
      </FlowerHero>

      <section className={`${WRAP} grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div className="absolute inset-0 rounded-full bg-moss" />
              <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <motion.circle
                  cx="100" cy="100" r="86" fill="none" stroke="var(--color-blush)" strokeWidth="1.5" strokeDasharray="5 6"
                  initial={{ rotate: -90, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 2, ease: EASE }} style={{ transformOrigin: "100px 100px" }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-linen">
                <p className="display text-[clamp(5rem,12vw,8rem)] leading-none text-blush">
                  <CountUp to={years} />+
                </p>
                <p className="eyebrow mt-3 text-linen/70">Years of happy clients</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ScrollWords
            className="display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.08]"
            text="I'll be happy to provide *references upon request.*"
          />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button href={SITE.phones[0].href} icon="phone">{SITE.phones[0].label}</Button>
            <Button href={`mailto:${SITE.email}?subject=${encodeURIComponent("Reference request")}`} variant="ghost" icon="mail">Request references</Button>
          </Reveal>
        </div>
      </section>

      <section className={`${WRAP} pb-28 sm:pb-36`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-tulip px-8 py-16 text-center text-linen sm:py-20">
            <div aria-hidden="true" className="blob -left-[15%] -top-[50%] h-[28rem] w-[28rem] bg-moss/30" />
            <div className="relative">
              <Daisy className="mx-auto h-12 w-12 animate-spin-slow" />
              <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[1]">
                <SplitWords text="Snohomish & the *surrounding areas*" italicClass="italic text-moss" />
              </h2>
              <p className="eyebrow mt-6 text-linen/80">Since {SITE.since}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
