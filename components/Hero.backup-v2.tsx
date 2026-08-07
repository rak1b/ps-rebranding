"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { InViewVideo } from "./ui/InViewVideo";
import Terminal from "./Terminal";

const EASE = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function BlurWord({
  children,
  delay,
  className = "",
}: {
  children: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 24, rotate: -7, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ transformOrigin: "0% 100%" }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** Bento-wall card: rises in sharpening from a blur, then floats forever */
function WallCard({
  progress,
  from,
  range,
  floatDelay = 0,
  className,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  range: [number, number];
  floatDelay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const x = useTransform(progress, range, [from, 0]);
  const y = useTransform(progress, range, [56, 0]);
  const scale = useTransform(progress, range, [0.94, 1]);
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [9, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const rotateY = useTransform(
    progress,
    range,
    [from > 0 ? 55 : from < 0 ? -55 : 0, 0]
  );
  return (
    <motion.div
      style={{ x, y, scale, opacity, filter, rotateY, transformPerspective: 1200 }}
      className={`absolute z-20 hidden lg:block ${className ?? ""}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="h-full"
      >
        <div className="h-full rounded-3xl bg-white/95 p-5 shadow-[0_28px_60px_-24px_rgba(2,134,201,0.35)] ring-1 ring-ink-100 backdrop-blur-sm">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DarkBars({ progress }: { progress: MotionValue<number> }) {
  const heights = [20, 32, 16, 40, 28, 50, 44];
  const grow = useTransform(progress, [0.42, 0.62], [0, 1]);
  return (
    <div className="mt-3 flex items-end gap-1.5">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          style={{ scaleY: grow, height: h }}
          className={`w-3 origin-bottom rounded-t ${i >= 4 ? "bg-brand-500" : "bg-ink-200"}`}
        />
      ))}
    </div>
  );
}

function Sparkline({ progress }: { progress: MotionValue<number> }) {
  const draw = useTransform(progress, [0.45, 0.68], [0, 1]);
  return (
    <svg viewBox="0 0 120 40" className="mt-3 h-10 w-full" fill="none">
      <motion.path
        d="M2 32 L20 26 L38 29 L56 16 L74 20 L92 8 L118 12"
        stroke="#36bffa"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pinned = desktop && !reduce;

  // Act 0 — brand curtain that opens onto the hero
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    if (reduce) {
      setIntro(false);
      return;
    }
    const t = setTimeout(() => setIntro(false), 1700);
    return () => clearTimeout(t);
  }, [reduce]);

  // Spring-smoothed scrub: every transform inherits gentle inertia
  const smooth = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 23,
    restDelta: 0.001,
  });
  // Glass frame materialises around the video as it becomes a card
  const frameOpacity = useTransform(smooth, [0.42, 0.6], [0, 1]);

  // Video: full-bleed → centered rounded card on the light stage,
  // while the footage inside "pulls back" like a camera move
  const videoScale = useTransform(smooth, [0.08, 0.55], [1, 0.44]);
  const videoRadius = useTransform(smooth, [0.08, 0.55], [0, 40]);
  const innerZoom = useTransform(smooth, [0.08, 0.55], [1.14, 1]);
  // Headline dissolves: fades, shrinks and blurs away with the video
  const heroTextOpacity = useTransform(smooth, [0.3, 0.48], [1, 0]);
  const heroTextScale = useTransform(smooth, [0.08, 0.48], [1, 0.84]);
  const heroTextBlur = useTransform(smooth, [0.3, 0.48], [0, 12]);
  const heroTextFilter = useMotionTemplate`blur(${heroTextBlur}px)`;
  const heroTextEvents = useTransform(scrollYProgress, (v) =>
    v > 0.48 ? ("none" as const) : ("auto" as const)
  );
  // Stage decorations emerge as the video reveals the light canvas
  const stageOpacity = useTransform(smooth, [0.15, 0.45], [0, 1]);
  // Two-stage message over the shrunk video: A fades in then hands to B
  const payoffAOpacity = useTransform(smooth, [0.56, 0.66, 0.76, 0.84], [0, 1, 1, 0]);
  const payoffAY = useTransform(smooth, [0.56, 0.66, 0.76, 0.84], [24, 0, 0, -20]);
  const payoffBOpacity = useTransform(smooth, [0.84, 0.94], [0, 1]);
  const payoffBY = useTransform(smooth, [0.84, 0.94], [24, 0]);
  // Terminal drifts upward and straightens as you scroll
  const termY = useTransform(smooth, [0.35, 1], [30, -30]);
  const termRot = useTransform(smooth, [0.35, 1], [-9, 3]);
  const hintOpacity = useTransform(smooth, [0, 0.1], [1, 0]);
  // Light sweep across the assembled wall
  const sweepX = useTransform(smooth, [0.68, 0.88], ["-120%", "380%"]);
  const sweepOpacity = useTransform(
    smooth,
    [0.68, 0.72, 0.84, 0.88],
    [0, 0.55, 0.55, 0]
  );
  // Act IV — the whole stage recedes and fully dissolves at hand-off
  const exitScale = useTransform(smooth, [0.88, 1], [1, 0.9]);
  const exitY = useTransform(smooth, [0.88, 1], [0, -60]);
  const exitOpacity = useTransform(smooth, [0.88, 0.99], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative bg-white lg:h-[320vh]">
      {/* Act 0 — brand curtain page transition */}
      <AnimatePresence>
        {intro && (
          <motion.div key="curtain" className="fixed inset-0 z-[80]">
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "-101%" }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-700 to-brand-500"
            />
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "101%" }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-700 to-brand-500"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.15, filter: "blur(6px)" }}
              transition={{ duration: 0.65, ease: EASE }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/paymentsave-Logo-2048x448.png"
                alt="PaymentSave"
                className="h-12 w-auto brightness-0 invert"
              />
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ duration: 1.05, delay: 0.3, ease: EASE }}
                className="h-[3px] rounded-full bg-white/80"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pt-20 lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden lg:pt-0">
        <motion.div
          style={pinned ? { scale: exitScale, y: exitY, opacity: exitOpacity } : undefined}
          className="lg:h-full"
        >
        {/* Light stage behind the shrinking video */}
        <motion.div
          aria-hidden
          style={pinned ? { opacity: stageOpacity } : undefined}
          className="absolute inset-0"
        >
          <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
          <div className="absolute -left-24 top-[10%] h-[40vh] w-[40vh] rounded-full bg-brand-200/60 blur-[110px]" />
          <div className="absolute -right-24 bottom-[8%] h-[40vh] w-[40vh] rounded-full bg-mint-400/20 blur-[110px]" />
        </motion.div>

        {/* Video: full-bleed on desktop, rounded card on mobile */}
        <motion.div
          style={pinned ? { scale: videoScale, borderRadius: videoRadius } : undefined}
          className="relative z-10 mx-3 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl sm:aspect-video lg:m-0 lg:aspect-auto lg:h-svh lg:rounded-none"
        >
          <motion.div
            style={pinned ? { scale: innerZoom } : undefined}
            className="h-full w-full"
          >
            <InViewVideo
              src="/videos/hero.mp4"
              preload="auto"
              className="h-full w-full object-cover brightness-[0.5] saturate-[0.8]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink-950/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_42%,rgba(6,19,37,0.5),transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_30%,rgba(6,19,37,0.55)_100%)]" />

          {/* Glass frame that materialises as the video becomes a card */}
          <motion.div
            aria-hidden
            style={{ opacity: pinned ? frameOpacity : 0 }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          >
            <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-x-14 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />
          </motion.div>

          {/* Two-stage message over the shrunk video */}
          <div className="absolute inset-0 hidden lg:block">
            <motion.div
              style={{ opacity: pinned ? payoffAOpacity : 0, y: payoffAY }}
              className="absolute inset-0 flex items-center justify-center px-10"
            >
              <p className="max-w-2xl text-center font-display text-4xl font-bold leading-snug text-white [text-shadow:0_2px_30px_rgba(6,19,37,0.9)] xl:text-5xl">
                From tap to bank —{" "}
                <span className="text-brand-300">one smooth flow.</span>
              </p>
            </motion.div>
            <motion.div
              style={{ opacity: pinned ? payoffBOpacity : 0, y: payoffBY }}
              className="absolute inset-0 flex items-center justify-center px-10"
            >
              <p className="max-w-2xl text-center font-display text-4xl font-bold leading-snug text-white [text-shadow:0_2px_30px_rgba(6,19,37,0.9)] xl:text-5xl">
                Everything your business takes,{" "}
                <span className="text-brand-300">in one place.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Headline stage over the full video */}
        <motion.div
          style={
            pinned
              ? {
                  opacity: heroTextOpacity,
                  scale: heroTextScale,
                  filter: heroTextFilter,
                  pointerEvents: heroTextEvents,
                }
              : undefined
          }
          className="absolute inset-0 top-20 z-30 flex flex-col items-center justify-center px-6 text-center lg:top-0"
        >
          <h1 className="-rotate-2 text-center font-script font-bold leading-[0.95] [text-shadow:0_4px_50px_rgba(6,19,37,0.75)]">
            <BlurWord
              delay={2.15}
              className="text-[4.2rem] text-white sm:text-[6.5rem] xl:text-[8rem]"
            >
              Take payments fast,
            </BlurWord>
            <br />
            <BlurWord
              delay={2.45}
              className="text-[4.6rem] text-brand-300 sm:text-[7rem] xl:text-[8.75rem]"
            >
              get paid faster.
            </BlurWord>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.9, ease: EASE }}
            className="mt-7 max-w-2xl text-center text-base font-medium text-white/90 [text-shadow:0_2px_20px_rgba(6,19,37,0.7)] sm:text-lg"
          >
            Card payments for UK businesses — low fees, next-day settlement,
            24/7 support.
          </motion.p>
        </motion.div>

        {/* ——— Bento wall: left column, bleeding off the screen edge ——— */}
        <WallCard progress={smooth} from={-300} range={[0.32, 0.5]} floatDelay={0} className="left-[1.5%] top-[13%] w-[24%] min-w-[240px]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            Gross sales · today
          </p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink-950">
            £2,208.99
          </p>
          <p className="text-[11px] font-semibold text-mint-500">
            ↑ £438.26 vs yesterday
          </p>
          <DarkBars progress={smooth} />
        </WallCard>

        <WallCard progress={smooth} from={-300} range={[0.38, 0.56]} floatDelay={1.1} className="left-[1.5%] top-[39%] w-[24%] min-w-[240px]">
          <p className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            PS One · live
            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[9px] font-bold normal-case tracking-normal text-brand-600">
              New
            </span>
          </p>
          <motion.div
            style={{ y: termY, rotate: termRot }}
            className="flex h-[210px] items-center justify-center overflow-hidden"
          >
            <div className="scale-[0.38]">
              <Terminal />
            </div>
          </motion.div>
        </WallCard>

        <WallCard progress={smooth} from={-300} range={[0.44, 0.62]} floatDelay={2.3} className="bottom-[4%] left-[1.5%] w-[24%] min-w-[240px]">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-400 animate-pulse-dot motion-reduce:animate-none" />
            Latest payments
          </p>
          {[
            { name: "Contactless", amount: "+£24.50" },
            { name: "Payment link", amount: "+£50.00" },
            { name: "Online order", amount: "+£129.99" },
          ].map((tx) => (
            <div
              key={tx.name}
              className="mt-2 flex items-center justify-between text-xs"
            >
              <span className="font-medium text-ink-600">{tx.name}</span>
              <span className="font-bold tabular-nums text-mint-400">
                {tx.amount}
              </span>
            </div>
          ))}
        </WallCard>

        {/* ——— Bento wall: right column, bleeding off the screen edge ——— */}
        <WallCard progress={smooth} from={300} range={[0.34, 0.52]} floatDelay={0.6} className="right-[1.5%] top-[13%] w-[24%] min-w-[240px]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            Received · last 7 days
          </p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink-950">
            £7,940
          </p>
          <Sparkline progress={smooth} />
        </WallCard>

        <WallCard progress={smooth} from={300} range={[0.4, 0.58]} floatDelay={1.7} className="right-[1.5%] top-[41%] w-[24%] min-w-[240px]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            Available balance
          </p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-ink-950">
            £14,382.20
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-brand-500 px-3.5 py-1.5 text-[11px] font-bold text-white">
              ⇄ Move
            </span>
            <span className="rounded-full bg-ink-50 px-3.5 py-1.5 text-[11px] font-bold text-ink-700 ring-1 ring-ink-100">
              → Pay
            </span>
          </div>
        </WallCard>

        <WallCard progress={smooth} from={300} range={[0.46, 0.64]} floatDelay={2.9} className="bottom-[4%] right-[1.5%] w-[24%] min-w-[240px]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            Invoices · to pay
          </p>
          {[
            { name: "Dairy_INV-014.pdf", due: "Due 17 Feb", amount: "£117.97" },
            { name: "Roast_INV-009.pdf", due: "Due 15 Feb", amount: "£86.94" },
          ].map((inv) => (
            <div
              key={inv.name}
              className="mt-2 flex items-center justify-between rounded-xl bg-ink-50 p-2.5 ring-1 ring-ink-100"
            >
              <div>
                <p className="text-[11px] font-bold text-ink-900">{inv.name}</p>
                <p className="text-[9px] text-ink-400">{inv.due}</p>
              </div>
              <span className="text-xs font-bold tabular-nums text-ink-950">
                {inv.amount}
              </span>
            </div>
          ))}
        </WallCard>

        {/* ——— Top tile: peeks into the band above the video, video-width ——— */}
        <WallCard progress={smooth} from={0} range={[0.3, 0.48]} floatDelay={0.4} className="left-[28%] top-[13%] w-[44%]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7M10 6.5a11 11 0 0 1 0 11M13.5 4.5a14.5 14.5 0 0 1 0 15" />
                </svg>
              </span>
              <div>
                <p className="whitespace-nowrap text-xs font-bold text-ink-900">
                  Table 12 · Contactless
                </p>
                <p className="text-[10px] text-ink-400">just now</p>
              </div>
              <span className="text-sm font-bold tabular-nums text-mint-500">
                +£64.25
              </span>
            </div>
            <div className="hidden items-baseline gap-2 xl:flex">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-dot motion-reduce:animate-none" />
                Payments today
              </span>
              <span className="font-display text-xl font-bold tabular-nums text-ink-950">
                247
              </span>
            </div>
            <p className="whitespace-nowrap text-xs font-bold text-ink-900">
              <span className="text-[#00b67a]">★★★★★</span> 5.0 on Trustpilot
            </p>
          </div>
        </WallCard>

        {/* ——— Bottom tile: peeks into the band below the video, video-width ——— */}
        <WallCard progress={smooth} from={0} range={[0.48, 0.66]} floatDelay={1.9} className="left-[28%] top-[76%] w-[44%]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                Tip added
              </p>
              <p className="mt-0.5 font-display text-lg font-bold tabular-nums text-mint-500">
                +£4.90
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                Payout scheduled
              </p>
              <p className="mt-0.5 text-sm font-bold text-ink-900">
                Tomorrow, 9:00am ·{" "}
                <span className="tabular-nums text-mint-500">£1,284.90</span>
              </p>
            </div>
            <p className="flex items-center gap-1.5 whitespace-nowrap pt-1 text-xs font-bold text-ink-900">
              Apple Pay · accepted
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-mint-500" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </p>
          </div>
        </WallCard>

        {/* Light sweep across the assembled wall */}
        <motion.div
          aria-hidden
          style={pinned ? { x: sweepX, opacity: sweepOpacity } : { opacity: 0 }}
          className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-[38%] -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent lg:block"
        />

        {/* Scroll hint */}
        <motion.div
          style={pinned ? { opacity: hintOpacity } : undefined}
          className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 lg:block"
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-6 items-start justify-center rounded-full pt-1.5 ring-2 ring-white/30"
          >
            <span className="h-2 w-1 rounded-full bg-white/70" />
          </motion.span>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
