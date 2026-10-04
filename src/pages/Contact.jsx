import { HOURS, SITE } from "../data/site";
import { useShopStatus } from "../hooks/useShopStatus";
import { PAGE_DELAY, WRAP } from "../lib/motion";
import { Button, Reveal, TiltCard } from "../components/anim";
import { FlowerHero } from "../components/FlowerHero";
import { Icon } from "../components/Icon";
import { StatusPill } from "../components/StatusPill";

const WEBSITE = { label: "www.SewWhat4u.net", href: "https://www.sewwhat4u.net" };

export default function Contact() {
  return (
    <>
      <FlowerHero
        eyebrow="Contact us"
        title="Contact *Rhonda*"
        image="/images/tulip_purple.gif"
        alt="A purple tulip"
        width="160"
        height="456"
        petalClass="bg-tulip/45"
      >
        <Reveal onMount delay={PAGE_DELAY + 0.35} className="mt-8">
          <StatusPill />
        </Reveal>
        <Reveal onMount delay={PAGE_DELAY + 0.5} className="mt-8 flex flex-wrap gap-3">
          <Button href={SITE.phones[0].href} icon="phone">{SITE.phones[0].label}</Button>
          <Button href={SITE.mapUrl} external variant="ghost" icon="arrowUpRight">Get directions</Button>
        </Reveal>
      </FlowerHero>

      <section className={`${WRAP} grid gap-6 pb-28 pt-10 sm:pb-36 lg:grid-cols-12`}>
        <div className="grid gap-4 lg:col-span-5">
          <Reveal>
            <TiltCard max={5} className="rounded-[2rem] bg-moss p-8 text-linen sm:p-10">
              <div aria-hidden="true" className="blob -right-1/3 -top-1/2 h-72 w-72 bg-tulip/30" />
              <p className="eyebrow relative text-blush">Sew What Alterations</p>
              <p className="display relative mt-5 text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.1]">
                {SITE.address[0]}
                <br />
                <span className="italic text-linen/70">Snohomish, WA. 98290</span>
              </p>
              <div className="relative mt-8 space-y-3 border-t border-linen/15 pt-6">
                <a href={SITE.phones[0].href} className="group flex items-center justify-between gap-4">
                  <span className="display text-3xl transition-colors group-hover:text-blush">{SITE.phones[0].label}</span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linen text-moss transition-transform duration-700 ease-silk group-hover:-rotate-45">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                </a>
                <a href={WEBSITE.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-linen/85 hover:text-blush">
                  {WEBSITE.label} <Icon name="arrowUpRight" className="h-4 w-4" />
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 break-all font-bold text-linen/85 hover:text-blush">
                  <Icon name="mail" className="h-4 w-4 shrink-0" /> {SITE.email}
                </a>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard max={5} className="rounded-[2rem] border border-moss/10 bg-white/55 p-8 sm:p-10">
              <p className="eyebrow flex items-center gap-2 text-tulip">
                <Icon name="clock" className="h-4 w-4" /> Office Hours
              </p>
              <OfficeHours />
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="relative h-full min-h-[460px] overflow-hidden rounded-[2.5rem] border border-moss/10">
            <iframe
              title={`Map to ${SITE.name}, ${SITE.address.join(", ")}`}
              src={SITE.mapEmbed}
              className="absolute inset-0 h-full w-full grayscale-[55%] sepia-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl bg-moss px-5 py-4 text-linen shadow-xl sm:right-auto"
            >
              <span>
                <span className="display block text-xl">Sew What Alterations</span>
                <span className="block text-sm text-linen/70">{SITE.address.join(", ")}</span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-tulip transition-transform duration-700 ease-silk group-hover:-rotate-45">
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function OfficeHours() {
  const status = useShopStatus();
  return (
    <ul className="mt-6 space-y-2">
      {HOURS.map((h) => {
        const today = status && h.days.includes(status.day);
        return (
          <li
            key={h.day}
            className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-2xl px-4 py-3 transition-colors ${today ? "bg-tulip text-linen" : "bg-moss/[0.04]"}`}
          >
            <span className="font-semibold">
              {h.day}
              {today && <span className="ml-2 rounded-full bg-linen/20 px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider">Today</span>}
            </span>
            <span className="font-bold">{h.time}</span>
          </li>
        );
      })}
    </ul>
  );
}
