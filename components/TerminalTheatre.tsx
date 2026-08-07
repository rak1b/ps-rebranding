"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  {
    id: "pay",
    step: "01",
    menu: "Take the payment",
    title: "Tap. Approved. Next customer.",
    body: "Contactless, chip-and-PIN, Apple Pay and Google Pay — approved in under two seconds, right on the screen.",
  },
  {
    id: "track",
    step: "02",
    menu: "Watch it land",
    title: "Your takings, live on the till.",
    body: "Every sale appears the moment it happens — no logging in anywhere, no waiting for reports.",
  },
  {
    id: "save",
    step: "03",
    menu: "Keep more of it",
    title: "Your rate, on your screen.",
    body: "No mystery statements. The rate you pay is the rate you see — from 0.29%, always visible.",
  },
  {
    id: "loved",
    step: "04",
    menu: "Join the switchers",
    title: "Rated 5.0 by people like you.",
    body: "469+ verified Trustpilot reviews from UK shops, salons, cafés and trades that switched and stayed.",
  },
];

function ScreenPay() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-brand-400/40 animate-ripple motion-reduce:animate-none" />
        <span className="absolute inset-0 rounded-full bg-brand-400/30 animate-ripple motion-reduce:animate-none" style={{ animationDelay: "0.45s" }} />
        <span className="absolute inset-0 rounded-full bg-brand-400/20 animate-ripple motion-reduce:animate-none" style={{ animationDelay: "0.9s" }} />
        <svg viewBox="0 0 24 24" className="relative h-10 w-10 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7" />
          <path d="M10 6.5a11 11 0 0 1 0 11" />
          <path d="M13.5 4.5a14.5 14.5 0 0 1 0 15" />
        </svg>
      </div>
      <p className="mt-5 font-display text-4xl font-bold tabular-nums text-ink-950">
        £24.50
      </p>
      <p className="mt-1.5 text-xs font-medium text-ink-500">
        Hold card near the screen
      </p>
      <motion.span
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 240, damping: 15 }}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-mint-500/10 px-4 py-2 text-xs font-bold text-mint-500"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        Approved in 1.2s
      </motion.span>
    </div>
  );
}

function ScreenTrack() {
  const rows = [
    { name: "Contactless", amount: "+£24.50" },
    { name: "Payment link", amount: "+£50.00" },
    { name: "Online order", amount: "+£129.99" },
    { name: "Table 12", amount: "+£64.25" },
  ];
  return (
    <div className="flex h-full flex-col px-5 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
            Today so far
          </p>
          <p className="font-display text-3xl font-bold tabular-nums text-ink-950">
            £2,208.99
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-mint-500/10 px-2.5 py-1 text-[10px] font-bold text-mint-500">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse-dot motion-reduce:animate-none" />
          Live
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.14, duration: 0.45, ease: EASE }}
            className="flex items-center justify-between rounded-xl bg-ink-50 p-3 ring-1 ring-ink-100/70"
          >
            <span className="text-xs font-semibold text-ink-700">{row.name}</span>
            <span className="text-xs font-bold tabular-nums text-mint-500">
              {row.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScreenSave() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-400">
        Your rate
      </p>
      <p className="mt-1 bg-gradient-to-r from-brand-600 to-mint-500 bg-clip-text font-display text-6xl font-bold tabular-nums text-transparent">
        0.29%
      </p>
      <div className="mt-6 w-full space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-[10px] font-semibold text-ink-400">
            <span>Typical provider</span>
            <span>1.75%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="h-full rounded-full bg-ink-300"
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-[10px] font-semibold text-brand-700">
            <span>PaymentSave</span>
            <span>0.29%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "17%" }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-mint-400"
            />
          </div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-5 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-700"
      >
        Keep ~40% more of every fee
      </motion.p>
    </div>
  );
}

function ScreenLoved() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 260, damping: 14 }}
            viewBox="0 0 20 20"
            className="h-7 w-7 text-[#00b67a]"
            fill="currentColor"
          >
            <path d="M10 1.5l2.47 5.26 5.53.7-4.07 3.95.99 5.59L10 14.27 5.08 17l.99-5.59L2 7.46l5.53-.7L10 1.5z" />
          </motion.svg>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
        className="mt-5 text-sm font-semibold leading-relaxed text-ink-700"
      >
        &ldquo;Switched in an afternoon. Fees nearly halved and the money&apos;s
        in before we open.&rdquo;
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-3 text-[11px] font-bold text-ink-400"
      >
        Sarah M · Café owner · 469+ reviews
      </motion.p>
    </div>
  );
}

const SCREENS: Record<string, () => React.JSX.Element> = {
  pay: ScreenPay,
  track: ScreenTrack,
  save: ScreenSave,
  loved: ScreenLoved,
};

function Device({ stage }: { stage: number }) {
  const Screen = SCREENS[STAGES[stage].id];
  return (
    <div className="relative w-[290px] rounded-[2.3rem] bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700 p-3 pb-3.5 shadow-[0_50px_90px_-28px_rgba(2,74,111,0.55)] ring-1 ring-brand-700/60 sm:w-[310px]">
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[2.3rem] bg-[linear-gradient(118deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.06)_30%,transparent_50%)]" />
      <span className="absolute -right-[3px] top-24 h-9 w-[3px] rounded-r bg-brand-800" />
      <span className="absolute -right-[3px] top-36 h-14 w-[3px] rounded-r bg-brand-800" />
      <span className="absolute -left-[3px] top-28 h-11 w-[3px] rounded-l bg-brand-800" />

      <div className="relative mb-2 flex items-center justify-center py-1.5">
        <span className="h-[3px] w-24 rounded-full bg-brand-900/60 shadow-inner" />
        <span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-black ring-1 ring-white/25">
          <span className="absolute left-[2px] top-[2px] h-[3px] w-[3px] rounded-full bg-brand-300/90" />
        </span>
      </div>

      {/* Screen with swappable content */}
      <div className="relative h-[440px] overflow-hidden rounded-[1.6rem] border-[6px] border-black bg-gradient-to-b from-white to-brand-50">
        <div className="flex items-center justify-between px-4 pt-2 text-[9px] font-semibold text-ink-500">
          <span className="tabular-nums">9:41</span>
          <span>5G ▮</span>
        </div>
        <div className="h-[calc(100%-26px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={STAGES[stage].id}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="h-full"
            >
              <Screen />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {STAGES.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === stage ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TerminalTheatre() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 23,
    restDelta: 0.001,
  });

  const [stage, setStage] = useState(0);
  useMotionValueEvent(smooth, "change", (v) => {
    const next = Math.min(
      STAGES.length - 1,
      Math.max(0, Math.floor((v - 0.06) / 0.23))
    );
    setStage(next);
  });

  const pinned = desktop && !reduce;
  const active = STAGES[stage];

  return (
    <section ref={ref} className="relative bg-white lg:h-[420vh]">
      <div className="flex flex-col gap-10 px-5 py-20 lg:sticky lg:top-0 lg:h-svh lg:justify-center lg:overflow-hidden lg:py-0">
        <div className="mx-auto w-full max-w-7xl text-center lg:pt-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Inside the terminal
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Everything happens{" "}
            <span className="font-script text-5xl text-brand-500 sm:text-6xl">
              on the screen.
            </span>
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto_1.1fr] lg:gap-14">
          {/* Step menu */}
          <div className="hidden space-y-1 lg:block">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 ${
                  i === stage ? "bg-brand-50 ring-1 ring-brand-200" : ""
                }`}
              >
                <span
                  className={`font-display text-lg font-bold tabular-nums transition-colors duration-500 ${
                    i === stage ? "text-brand-600" : "text-ink-200"
                  }`}
                >
                  {s.step}
                </span>
                <span
                  className={`text-base font-bold transition-colors duration-500 ${
                    i === stage ? "text-ink-950" : "text-ink-300"
                  }`}
                >
                  {s.menu}
                </span>
              </div>
            ))}
          </div>

          {/* The device */}
          <div className="flex justify-center">
            <div className="animate-float motion-reduce:animate-none">
              <Device stage={pinned ? stage : 0} />
            </div>
          </div>

          {/* Stage copy */}
          <div className="relative min-h-[140px] text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="font-display text-3xl font-bold tracking-tight text-ink-950 xl:text-4xl">
                  {active.title}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-500 lg:mx-0 xl:text-lg">
                  {active.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile step captions */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {STAGES.map((s) => (
            <div key={s.id} className="rounded-2xl bg-ink-50 p-4 ring-1 ring-ink-100">
              <p className="font-display text-sm font-bold text-brand-600">
                {s.step}
              </p>
              <p className="mt-0.5 text-sm font-bold text-ink-900">{s.menu}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
