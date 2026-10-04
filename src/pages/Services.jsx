import { motion } from "motion/react";
import { MY_SERVICES, SITE } from "../data/site";
import { EASE, PAGE_DELAY, WRAP } from "../lib/motion";
import { Button, Reveal, SplitWords } from "../components/anim";
import { FlowerHero } from "../components/FlowerHero";
import { Icon } from "../components/Icon";

export default function Services() {
  return (
    <>
      <Hero />
      <Estimate />
      <List />
      <SpecialtyCall />
    </>
  );
}

function Hero() {
  return (
    <FlowerHero eyebrow="Services" title="My *Services*" image="/images/daisy.gif" alt="A pink gerbera daisy" width="239" height="472">
      <Reveal onMount delay={PAGE_DELAY + 0.35}>
        <p className="display mt-8 text-[clamp(1.6rem,3vw,2.4rem)] italic leading-tight text-moss/70">
          Prices will vary depending on item.
        </p>
      </Reveal>
      <Reveal onMount delay={PAGE_DELAY + 0.5} className="mt-9 flex flex-wrap gap-3">
        <Button href={SITE.phones[0].href} icon="phone">{`Free estimate · ${SITE.phones[0].label}`}</Button>
      </Reveal>
    </FlowerHero>
  );
}

/* ------------------------------------------------------- free estimate */
function Estimate() {
  return (
    <section className={`${WRAP} py-16 sm:py-20`}>
      <Reveal>
        <a
          href={SITE.phones[0].href}
          className="group relative block overflow-hidden rounded-[2.5rem] bg-moss px-8 py-14 text-linen sm:px-14 sm:py-20"
        >
          <div aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-tulip transition-transform duration-700 ease-silk group-hover:scale-y-100" />
          <div aria-hidden="true" className="blob -right-[10%] -top-[40%] h-[28rem] w-[28rem] bg-tulip/30" />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-linen/75 sm:text-xl">
                Please call or bring your items to the shop for a
              </p>
              <p className="display mt-3 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9]">
                FREE <span className="italic text-blush transition-colors duration-500 group-hover:text-linen">ESTIMATE</span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-linen/20 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <span className="display text-[clamp(2rem,4vw,3.2rem)] leading-none">{SITE.phones[0].label}</span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-linen text-moss transition-transform duration-700 ease-silk group-hover:-rotate-45">
                <Icon name="phone" />
              </span>
            </div>
          </div>
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------- the list */
function List() {
  return (
    <section className={`${WRAP} py-16 sm:py-24`}>
      <h2 className="display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1]">
        <SplitWords text="I specialize in *these services:*" />
      </h2>
      <ul className="mt-12">
        {MY_SERVICES.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
            className="group relative overflow-hidden border-t border-moss/15 last:border-b"
          >
            <div aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-moss transition-transform duration-700 ease-silk group-hover:scale-y-100" />
            <div className="relative flex items-center gap-5 px-1 py-7 transition-colors duration-500 group-hover:text-linen sm:gap-8 sm:px-6 sm:py-9">
              <span className="display w-10 shrink-0 text-lg text-tulip transition-colors group-hover:text-blush">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display flex-1 text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.05] transition-transform duration-700 ease-silk group-hover:translate-x-3">
                {s.title}
              </h3>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-moss/15 transition-all duration-700 ease-silk group-hover:rotate-12 group-hover:border-blush group-hover:bg-blush group-hover:text-moss sm:h-16 sm:w-16">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------ specialty items */
function SpecialtyCall() {
  return (
    <section className={`${WRAP} py-24 text-center sm:py-32`}>
      <Reveal>
        <p className="eyebrow text-tulip">For specialty items</p>
      </Reveal>
      <h2 className="display mx-auto mt-6 max-w-4xl text-[clamp(3rem,8vw,6.5rem)] leading-[0.92]">
        <SplitWords text="PLEASE CALL —" />
        <br />
        <SplitWords text="*I'll do my best to assist you!*" delay={0.2} />
      </h2>
      <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
        <Button href={SITE.phones[0].href} icon="phone">{SITE.phones[0].label}</Button>
        <Button href={SITE.phones[1].href} variant="ghost" icon="phone">{SITE.phones[1].label}</Button>
      </Reveal>
    </section>
  );
}
