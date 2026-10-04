import { PAGE_DELAY, WRAP } from "../lib/motion";
import { Reveal, SplitWords, StitchLine } from "./anim";

export function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-36 sm:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob -left-[10%] -top-[20%] h-[40vw] w-[40vw] bg-tulip/20" />
        <div className="blob -right-[10%] top-[10%] h-[30vw] w-[30vw] bg-moss/15" style={{ animationDelay: "-8s" }} />
      </div>
      <div className={`${WRAP} relative`}>
        <Reveal onMount delay={PAGE_DELAY - 0.1}>
          <p className="eyebrow flex items-center gap-3 text-tulip">
            <span className="h-px w-10 bg-tulip" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="display mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98]">
          <SplitWords text={title} onMount delay={PAGE_DELAY} />
        </h1>
        {lead && (
          <Reveal onMount delay={PAGE_DELAY + 0.35}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-moss/70 sm:text-xl">{lead}</p>
          </Reveal>
        )}
        {children}
      </div>
      <StitchLine className="mt-14 h-16 w-full sm:h-24" />
    </section>
  );
}
