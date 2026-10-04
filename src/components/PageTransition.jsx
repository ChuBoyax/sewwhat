import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { EASE, EASE_CURTAIN } from "../lib/motion";
import { LogoMark } from "./art";
import { Footer } from "./Footer";

let firstPage = true;

const CLOSED = "inset(50% 0% 50% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

/*
  Between pages a linen panel closes along a stitched seam over the old page,
  shows the next page's name, then opens again from the seam.
*/
export function PageTransition({ label, children }) {
  const isFirst = useRef(firstPage).current;
  useEffect(() => {
    firstPage = false;
  }, []);

  return (
    <>
      {/* closes over the outgoing page */}
      <motion.div
        aria-hidden="true"
        className="curtain z-[80] bg-linen"
        initial={{ clipPath: CLOSED }}
        animate={{ clipPath: CLOSED }}
        exit={{ clipPath: OPEN, transition: { duration: 0.6, ease: EASE_CURTAIN } }}
      />
      <motion.div
        aria-hidden="true"
        className="stitch-bar fixed inset-x-0 top-1/2 z-[82] h-[2px] origin-left -translate-y-1/2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1, transition: { duration: 0.6, ease: EASE_CURTAIN } }}
      />

      {/* opens on the incoming page */}
      <motion.div
        aria-hidden="true"
        className="curtain z-[81] flex items-center justify-center bg-linen"
        initial={isFirst ? false : { clipPath: OPEN }}
        animate={{ clipPath: CLOSED, transition: { duration: 0.8, ease: EASE_CURTAIN, delay: 0.45 } }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      >
        <motion.div
          initial={isFirst ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex -translate-y-14 items-center gap-3"
        >
          <LogoMark className="h-9 w-9" />
          <span className="display text-4xl italic text-moss sm:text-5xl">{label}</span>
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="stitch-bar fixed inset-x-0 top-1/2 z-[82] h-[2px] origin-right -translate-y-1/2"
        initial={isFirst ? false : { scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.8, ease: EASE_CURTAIN, delay: 0.45 } }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      />

      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
