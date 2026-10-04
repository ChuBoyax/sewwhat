import { motion } from "motion/react";
import { SITE } from "../data/site";
import { EASE, WRAP } from "../lib/motion";
import { Button, CountUp, Reveal, ScrollWords, SplitWords } from "../components/anim";
import { Daisy, RotatingBadge } from "../components/art";
import { PageHero } from "../components/PageHero";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="There's a solution to virtually any *sewing dilemma.*"
        lead={`Sew What is privately owned and operated by ${SITE.owner}, and located in beautiful Snohomish, Washington, since ${SITE.since}.`}
      />

      <section className={`${WRAP} grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-tulip/15" />
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                initial={{ rotate: -90 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: EASE }}
              >
                <motion.circle
                  cx="100" cy="100" r="92" fill="none" stroke="var(--color-tulip)" strokeWidth="1.2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, ease: EASE }}
                />
              </motion.svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="eyebrow text-moss/60">Since</p>
                <p className="display text-[clamp(5rem,12vw,8.5rem)] leading-none">
                  <CountUp from={1900} to={SITE.since} />
                </p>
                <p className="mt-2 font-medium text-moss/60">Snohomish, Washington</p>
              </div>
              <RotatingBadge className="absolute -bottom-2 -right-2 h-28 w-28 sm:h-32 sm:w-32" text="Rhonda Foltz · Snohomish · Since 1996 · " />
            </div>
          </Reveal>
        </div>

        <div className="space-y-8 lg:col-span-7">
          <ScrollWords
            className="display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.15]"
            text="I've done everything from re-attaching a button to recovering sofa pillows... *prom dress alterations to Halloween costumes* and everything in between!"
          />
          <Reveal>
            <p className="text-lg leading-relaxed text-moss/75 sm:text-xl">
              It's my pleasure to serve you, so don't delay, call today and I'll have your dress, jeans or other items completed before you know it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display text-3xl italic text-tulip">— Rhonda</p>
          </Reveal>
        </div>
      </section>

      <section className={`${WRAP} pb-28 pt-8 sm:pb-36`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-moss px-8 py-16 text-center text-linen sm:px-14 sm:py-24">
            <div aria-hidden="true" className="blob -left-[15%] -top-[40%] h-[30rem] w-[30rem] bg-tulip/30" />
            <div aria-hidden="true" className="blob -bottom-[40%] -right-[15%] h-[26rem] w-[26rem] bg-tulip/20" style={{ animationDelay: "-9s" }} />
            <div className="relative">
              <Daisy className="mx-auto h-14 w-14 animate-spin-slow" />
              <p className="display mt-6 text-3xl italic text-blush sm:text-4xl">And of course!!</p>
              <h2 className="display mt-3 text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]">
                <SplitWords text="Estimates are *FREE!*" italicClass="italic text-blush" />
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href={SITE.phones[0].href} icon="phone">{SITE.phones[0].label}</Button>
                <Button href="https://www.sewwhat4u.net" external variant="light" icon="arrowUpRight">www.SewWhat4u.net</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
