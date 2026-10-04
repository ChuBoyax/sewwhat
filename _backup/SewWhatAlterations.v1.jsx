import { useState, useEffect } from "react";

/*
  Sew What Alterations — modern redesign
  Stack: React + Tailwind CSS (static, no backend)
  Palette (3 colours, from the original site's greens and purple flowers):
    Plum #3B2340 · Leaf #8DAE2A · Celery #F3F7E4
*/

const PHONE_MAIN = "360-563-0350";
const PHONE_MAIN_HREF = "tel:+13605630350";
const PHONE_ALT = "425-312-9663";
const PHONE_ALT_HREF = "tel:+14253129663";
const EMAIL = "Harmonyranch@gmail.com";
const ADDRESS = ["7916 Riverview Road", "Snohomish, WA 98290"];
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=7916+Riverview+Road+Snohomish+WA+98290";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#same-day", label: "Same-day hems" },
  { href: "#about", label: "About Rhonda" },
  { href: "#visit", label: "Visit" },
];

const SERVICES = [
  { title: "Jeans & slacks hemmed", text: "Quick, clean hems that keep the original look. Same-day service on jeans.", tag: "Same day" },
  { title: "Alterations of all kinds", text: "Taking in, letting out, tapering and adjusting, so your clothes fit the way they should." },
  { title: "Drapery alterations", text: "Drapes hemmed, shortened and repaired to hang just right in your space." },
  { title: "Custom pillows & cushions", text: "New pillows, recovered sofa cushions and table runners made to your measurements." },
  { title: "Patches, badges & buttons", text: "Uniform patches and badges applied, buttons reattached, decorative elements sewn on." },
  { title: "Repairs & costumes", text: "Rips, seams and zippers, plus Halloween costumes and everything in between." },
];

const AREAS = ["Snohomish", "Lake Stevens", "Monroe", "Marysville", "Everett", "Woodinville"];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.sw { --plum:#3B2340; --leaf:#8DAE2A; --celery:#F3F7E4;
  --plum-muted: color-mix(in oklab, var(--plum) 70%, var(--celery));
  --line: color-mix(in oklab, var(--plum) 13%, var(--celery));
  --card: color-mix(in oklab, var(--celery) 45%, #fff);
  --leaf-soft: color-mix(in oklab, var(--leaf) 22%, var(--celery));
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: var(--celery); color: var(--plum); -webkit-font-smoothing: antialiased; }
.sw *, .sw *::before, .sw *::after { box-sizing: border-box; }
.sw .serif { font-family: 'Instrument Serif', 'Times New Roman', Georgia, serif; font-weight: 400; letter-spacing: -0.015em; }
.sw .bg-plum { background: var(--plum); } .sw .bg-leaf { background: var(--leaf); }
.sw .bg-card { background: var(--card); } .sw .bg-leaf-soft { background: var(--leaf-soft); }
.sw .text-plum { color: var(--plum); } .sw .text-leaf { color: var(--leaf); }
.sw .text-muted { color: var(--plum-muted); }
.sw .text-on-plum { color: var(--celery); }
.sw .text-on-plum-muted { color: color-mix(in oklab, var(--celery) 70%, var(--plum)); }
.sw .border-soft { border-color: var(--line); }
.sw .border-on-plum { border-color: color-mix(in oklab, var(--celery) 16%, transparent); }
.sw .header { background: color-mix(in oklab, var(--celery) 86%, transparent);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
.sw .hero-title { font-size: clamp(3.2rem, 9vw, 7.4rem); line-height: .92; }
.sw .section-title { font-size: clamp(2.4rem, 5.4vw, 4.2rem); line-height: 1; }
.sw .btn { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; border-radius:999px;
  padding:.9rem 1.5rem; font-weight:600; transition: transform .15s ease, filter .15s ease, background .15s; }
.sw .btn:hover { transform: translateY(-1px); }
.sw .btn-plum { background: var(--plum); color: var(--celery); }
.sw .btn-leaf { background: var(--leaf); color: var(--plum); }
.sw .btn-leaf:hover, .sw .btn-plum:hover { filter: brightness(1.08); }
.sw .btn-outline { border: 1.5px solid var(--plum); color: var(--plum); }
.sw .btn-outline:hover { background: color-mix(in oklab, var(--plum) 6%, transparent); }
.sw a:focus-visible, .sw button:focus-visible { outline: 3px solid var(--leaf); outline-offset: 3px; border-radius: 10px; }

/* stitched seam: the site's signature line */
.sw .stitch { stroke: var(--leaf); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 10 9; fill: none; }
.sw .stitch-plum { stroke: var(--plum); }
.sw .stitch-border { border: 2px dashed color-mix(in oklab, var(--leaf) 80%, transparent); }
.sw .service:hover .stitch-corner { opacity: 1; }
.sw .stitch-corner { opacity: .35; transition: opacity .25s; }

/* measuring tape */
.sw .tape { background: var(--leaf); color: var(--plum); }
.sw .tape-ticks { background-image:
    repeating-linear-gradient(90deg, var(--plum) 0 1.5px, transparent 1.5px 48px),
    repeating-linear-gradient(90deg, var(--plum) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, var(--plum) 0 1px, transparent 1px 12px);
  background-size: 100% 22px, 100% 14px, 100% 8px; background-repeat: repeat-x; background-position: 0 0, 0 0, 0 0; }

@media (prefers-reduced-motion: no-preference) {
  .sw .sew-in { stroke-dasharray: 10 9; animation: sew 1.6s ease-out both; }
  @keyframes sew { from { stroke-dashoffset: 600; opacity: 0; } 20% { opacity: 1; } to { stroke-dashoffset: 0; opacity: 1; } }
  .sw .tape-slide { animation: slide 1s cubic-bezier(.2,.8,.2,1) .2s both; }
  @keyframes slide { from { transform: translateX(-6%) rotate(-3deg); opacity: 0; } to { transform: rotate(-3deg); opacity: 1; } }
  .sw .pulse { animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: .35; } }
}
.sw .tape-rot { transform: rotate(-3deg); }
@media (prefers-reduced-motion: reduce) { .sw .btn, .sw .stitch-corner { transition: none; } }
`;

/* ---------- Pacific-time shop status + same-day hem cutoff ---------- */
function getShopStatus() {
  let day, mins;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    mins = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  } catch (e) {
    return null;
  }
  const weekday = day >= 1 && day <= 5;
  const OPEN = 600, CUTOFF = 660, CLOSE = 1080;
  const fmtLeft = (m) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`);
  const nextWorkday = day === 5 || day === 6 || day === 0 ? "Monday" : "tomorrow";

  if (day === 6) return { open: false, label: "Saturday · by appointment", hem: "Call ahead to book a Saturday visit." };
  if (day === 0) return { open: false, label: "Closed today · opens Monday 10 AM", hem: "Drop jeans off Monday by 11 AM, pick up at 5 PM." };
  if (weekday && mins < OPEN) return { open: false, label: "Opens today at 10 AM", hem: "Same-day hems: in by 11 AM, ready by 5 PM today." };
  if (weekday && mins < CUTOFF) return { open: true, label: "Open now · until 6 PM", hem: `Drop off in the next ${fmtLeft(CUTOFF - mins)} and your jeans are ready by 5 PM today.`, urgent: true };
  if (weekday && mins < CLOSE) return { open: true, label: "Open now · until 6 PM", hem: `Today's 11 AM cutoff has passed. Drop off ${nextWorkday} by 11 AM for same-day hems.` };
  return { open: false, label: `Closed · opens ${nextWorkday} at 10 AM`, hem: `Drop off ${nextWorkday} by 11 AM, pick up at 5 PM.` };
}

function useShopStatus() {
  const [status, setStatus] = useState(() => getShopStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getShopStatus()), 30000);
    return () => clearInterval(id);
  }, []);
  return status;
}

function NeedleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 26L25 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="25.5" cy="6.5" rx="2.6" ry="1.3" transform="rotate(-45 25.5 6.5)" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M24 9c-6 3-12 1-16 8" fill="none" stroke="var(--leaf)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

function Tape({ label = "Since 1996 · Snohomish, WA" }) {
  return (
    <div className="tape tape-ticks relative overflow-hidden rounded-xl py-4 shadow-lg">
      <div className="flex items-end justify-between px-3 pt-5 text-xs font-bold">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className="hidden first:inline sm:inline">{i + 1}</span>
        ))}
      </div>
      <p className="mt-1 text-center text-sm font-semibold uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function SewWhatAlterations() {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = useShopStatus();

  return (
    <div className="sw min-h-screen">
      <style>{CSS}</style>

      {/* ============ HEADER ============ */}
      <header className="header sticky top-0 z-50 border-b border-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Sew What Alterations home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-plum text-on-plum">
              <NeedleIcon className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <span className="serif block text-2xl">Sew What</span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-muted">Alterations</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-muted hover:text-plum">{n.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={PHONE_MAIN_HREF} className="btn btn-plum hidden text-sm sm:inline-flex">Free estimate · {PHONE_MAIN}</a>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="sw-mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d={menuOpen ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 14h14"} />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="sw-mobile-nav" className="border-t border-soft px-5 pb-5 pt-2 lg:hidden" aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block border-b border-soft py-3.5 font-medium">{n.label}</a>
            ))}
            <a href={PHONE_MAIN_HREF} className="btn btn-plum mt-4 w-full">Call for a free estimate</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden">
          <svg className="pointer-events-none absolute -right-20 top-10 hidden h-96 w-96 lg:block" viewBox="0 0 400 400" aria-hidden="true">
            <path className="stitch sew-in" d="M20 380C60 240 140 300 200 200S330 120 380 20" />
          </svg>

          <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:pb-24 lg:pt-20">
            {status && (
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-soft bg-card px-4 py-2 text-sm font-medium">
                <span className={`h-2 w-2 rounded-full ${status.open ? "bg-leaf pulse" : "bg-plum"}`} aria-hidden="true" />
                {status.label}
              </p>
            )}

            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h1 className="serif hero-title">
                  Made to fit <em className="text-leaf">you</em>, not the hanger.
                </h1>
              </div>
              <div className="lg:col-span-4">
                <p className="text-lg leading-relaxed text-muted">
                  Alterations and fittings by Rhonda Foltz. Prom and bridesmaid dresses, same-day jean hems, drapes, pillows and repairs, right here in Snohomish since 1996.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={PHONE_MAIN_HREF} className="btn btn-plum">Get a free estimate</a>
                  <a href="#services" className="btn btn-outline">See services</a>
                </div>
              </div>
            </div>

            <div className="tape-slide tape-rot mt-14 lg:mt-20">
              <Tape />
            </div>
          </div>
        </section>

        {/* ============ SAME-DAY HEMS ============ */}
        <section id="same-day" className="bg-plum text-on-plum">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-20">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-leaf">Same-day jean hems</p>
              <h2 className="serif section-title mt-3">In by 11. Out by 5.</h2>
            </div>
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex-1 rounded-2xl border border-on-plum p-5 text-center">
                  <p className="text-sm text-on-plum-muted">Drop off by</p>
                  <p className="serif mt-1 text-5xl">11 AM</p>
                </div>
                <svg className="h-6 w-16 shrink-0 sm:w-24" viewBox="0 0 100 24" aria-hidden="true">
                  <path className="stitch" d="M2 12h90" /><path d="M86 5l9 7-9 7" fill="none" stroke="var(--leaf)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex-1 rounded-2xl bg-leaf p-5 text-center text-plum">
                  <p className="text-sm font-medium">Pick up at</p>
                  <p className="serif mt-1 text-5xl">5 PM</p>
                </div>
              </div>
              {status && (
                <p className={`mt-6 rounded-2xl px-5 py-4 ${status.urgent ? "bg-leaf text-plum font-semibold" : "border border-on-plum text-on-plum-muted"}`}>
                  {status.hem}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ============ SPECIAL OCCASION (feature) ============ */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid overflow-hidden rounded-3xl bg-leaf-soft lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">Our specialty</p>
              <h2 className="serif section-title mt-3">Prom, bridesmaid &amp; special occasion dresses.</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Bring in that dress for your wedding party, school dance or big night, and Rhonda will give it that special fit. Gowns hemmed, taken in, bustled and adjusted with care.
              </p>
              <a href={PHONE_MAIN_HREF} className="btn btn-plum mt-8">Book a fitting</a>
            </div>
            <div className="relative flex items-center justify-center p-8 lg:col-span-5">
              {/* dress form illustration */}
              <svg className="h-72 w-auto sm:h-80" viewBox="0 0 200 300" role="img" aria-label="Dress on a dress form">
                <path d="M100 280v14M70 294h60" stroke="var(--plum)" strokeWidth="4" strokeLinecap="round" />
                <path d="M78 30c4-10 40-10 44 0l-2 22c10 6 14 18 12 30l-10 4c6 40 34 100 46 180H32c12-80 40-140 46-180l-10-4c-2-12 2-24 12-30z" fill="var(--plum)" />
                <path className="stitch" d="M80 86c14 6 26 6 40 0" style={{ strokeWidth: 2.4 }} />
                <path className="stitch" d="M46 230c36 10 72 10 108 0" style={{ strokeWidth: 2.4 }} />
                <circle cx="100" cy="20" r="8" fill="var(--leaf)" />
                <path d="M150 60l26-26" stroke="var(--plum)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="176" cy="34" r="4" fill="var(--leaf)" />
              </svg>
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="serif section-title max-w-xl">A solution for almost any sewing dilemma.</h2>
            <p className="max-w-sm text-muted">
              Prices vary by item. Call or bring it to the shop for a free estimate. For specialty items, just ask.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.title} className="service relative rounded-3xl border border-soft bg-card p-7">
                <svg className="stitch-corner absolute right-5 top-5 h-10 w-10" viewBox="0 0 40 40" aria-hidden="true">
                  <path className="stitch" d="M4 4h32v32" style={{ strokeWidth: 2.4, strokeDasharray: "5 5" }} />
                </svg>
                {s.tag && (
                  <span className="mb-4 inline-block rounded-full bg-leaf px-3 py-1 text-xs font-bold">{s.tag}</span>
                )}
                <h3 className="serif pr-10 text-3xl leading-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </article>
            ))}
          </div>

          {/* How it works */}
          <ol className="mt-16 grid gap-4 md:grid-cols-3" aria-label="How it works">
            {[
              ["Bring it in or call", "Stop by the shop on Riverview Road or call to describe what you need."],
              ["Free estimate & fitting", "Rhonda pins, measures and quotes your price, no obligation."],
              ["Pick up a perfect fit", "Your piece is ready before you know it. Jean hems, the same day."],
            ].map(([t, d], i) => (
              <li key={t} className="stitch-border rounded-3xl p-7">
                <span className="serif text-5xl text-leaf">{i + 1}</span>
                <p className="mt-3 text-lg font-semibold">{t}</p>
                <p className="mt-1 text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="border-y border-soft bg-card">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-sm rounded-full bg-leaf-soft">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200" aria-hidden="true">
                  <circle className="stitch stitch-plum" cx="100" cy="100" r="90" style={{ strokeWidth: 1.6, strokeDasharray: "6 6" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted">Sewing since</p>
                  <p className="serif text-8xl leading-none">1996</p>
                  <p className="mt-2 text-muted">Snohomish, Washington</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">Meet the owner</p>
              <h2 className="serif section-title mt-3">Hi, I'm Rhonda.</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed">
                <p>
                  Sew What is privately owned and operated by me, Rhonda Foltz, here in beautiful Snohomish. I've done everything from re-attaching a button to recovering sofa pillows, prom dress alterations to Halloween costumes, and everything in between.
                </p>
                <p className="text-muted">
                  It's my pleasure to serve you. Call today and I'll have your dress, jeans or other items finished before you know it. And of course, estimates are always free.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-soft p-5">
                <p className="font-semibold">Happy clients since 1996</p>
                <p className="mt-1 text-muted">References are gladly provided on request.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ AREAS ============ */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">Proudly serving</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {AREAS.map((a) => (
              <li key={a} className="serif rounded-full border border-soft px-5 py-2 text-2xl">{a}</li>
            ))}
          </ul>
        </section>

        {/* ============ VISIT ============ */}
        <section id="visit" className="bg-plum text-on-plum">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
            <div>
              <h2 className="serif section-title">Stop by the shop.</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-on-plum-muted">
                Bring your items in for a free estimate, or give Rhonda a call to talk through your project.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-leaf">Get directions</a>
                <a href={PHONE_MAIN_HREF} className="btn" style={{ border: "1.5px solid color-mix(in oklab, var(--celery) 40%, transparent)", color: "var(--celery)" }}>
                  Call {PHONE_MAIN}
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-on-plum p-6">
                <p className="text-sm text-on-plum-muted">Address</p>
                <p className="mt-2 font-semibold leading-relaxed">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
              </div>
              <div className="rounded-3xl border border-on-plum p-6">
                <p className="text-sm text-on-plum-muted">Phone</p>
                <a href={PHONE_MAIN_HREF} className="serif mt-1 block text-3xl">{PHONE_MAIN}</a>
                <a href={PHONE_ALT_HREF} className="mt-1 block text-on-plum-muted underline">{PHONE_ALT}</a>
              </div>
              <div className="rounded-3xl border border-on-plum p-6 sm:col-span-2">
                <p className="text-sm text-on-plum-muted">Hours</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex justify-between gap-4"><span>Monday – Friday</span><span className="font-semibold">10:00 AM – 6:00 PM</span></li>
                  <li className="flex justify-between gap-4"><span>Saturday</span><span className="font-semibold">By appointment</span></li>
                  <li className="flex justify-between gap-4"><span>Sunday</span><span className="font-semibold">Closed</span></li>
                </ul>
              </div>
              <div className="rounded-3xl bg-leaf p-6 text-plum sm:col-span-2">
                <p className="text-sm font-medium">Email</p>
                <a href={`mailto:${EMAIL}`} className="mt-1 block break-all text-lg font-semibold underline">{EMAIL}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-soft">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Sew What Alterations · Snohomish, WA</p>
          <nav className="flex flex-wrap gap-5" aria-label="Footer">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-plum">{n.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}