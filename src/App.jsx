import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { NAV, SITE } from "./data/site";
import { destroyLenis, initLenis, scrollToTop } from "./lib/lenis";
import { useRoute } from "./lib/router";
import { Header, ScrollProgress } from "./components/Header";
import { PageTransition } from "./components/PageTransition";
import { Preloader } from "./components/Preloader";
import { ThreadCursor } from "./components/ThreadCursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";

const PAGES = { "/": Home, "/about": About, "/services": Services, "/testimonials": Testimonials, "/contact": Contact };

export default function App() {
  const route = useRoute();
  const key = PAGES[route] ? route : "/";
  const Page = PAGES[key];
  const label = NAV.find((n) => n.to === key)?.label ?? "Home";
  const [loaded, setLoaded] = useState(false);
  const onLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (!loaded) return;
    initLenis();
    return destroyLenis;
  }, [loaded]);

  useEffect(() => {
    document.title = key === "/" ? `${SITE.name} · Snohomish, WA` : `${label} · ${SITE.name}`;
  }, [key, label]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!loaded && <Preloader key="preloader" onDone={onLoaded} />}</AnimatePresence>

      {loaded && (
        <>
          <a
            href="#main"
            onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-moss focus:px-5 focus:py-3 focus:text-linen"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Header route={key} />
          <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
            <PageTransition key={key} label={label}>
              <Page />
            </PageTransition>
          </AnimatePresence>
        </>
      )}

      <ThreadCursor />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
