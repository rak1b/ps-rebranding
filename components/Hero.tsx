"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Magnetic } from "./ui/Magnetic";

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

/** CSS-driven write-on: renders even if JavaScript never hydrates */
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
    <span
      style={{ animationDelay: `${delay}s`, transformOrigin: "0% 100%" }}
      className={`inline-block animate-rise-in ${className}`}
    >
      {children}
    </span>
  );
}

/** Spec chip that slides in beside the device */
function Chip({
  progress,
  range,
  from,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  from: number;
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(progress, range, [from, 0]);
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.div
      style={{ x, opacity }}
      className={`absolute whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-bold text-ink-800 shadow-[0_16px_40px_-16px_rgba(2,134,201,0.4)] ring-1 ring-ink-100 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/** Item that rides an orbit ring while staying upright */
function OrbitItem({
  duration,
  reverse,
  className,
  children,
}: {
  duration: number;
  reverse?: boolean;
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div
        style={{ animationDuration: `${duration}s` }}
        className={`motion-reduce:animate-none ${
          reverse
            ? "animate-[spin_20s_linear_infinite]"
            : "animate-[spin_20s_linear_infinite_reverse]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

const POP_DEVICES = [
  "/devices/ps-one-upright-t.png",
  "/devices/ps-one-angle-t.png",
  "/devices/ps-one-duo-t.png",
  "/devices/ps-one-flat-t.png",
  "/devices/ps-one-side-t.png",
];

const POP_SPOTS = [
  "left-[6%] top-[14%]",
  "right-[5%] top-[18%]",
  "left-[7%] bottom-[16%]",
  "right-[6%] bottom-[20%]",
];

/** Ghosted terminals popping in and out of the corner lanes */
function DevicePops() {
  const reduce = useReducedMotion();
  const counter = useRef(1);
  const [items, setItems] = useState([
    { id: 0, img: POP_DEVICES[0], spot: POP_SPOTS[0] },
    { id: 1, img: POP_DEVICES[1], spot: POP_SPOTS[3] },
  ]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      counter.current += 1;
      const c = counter.current;
      setItems((prev) => [
        prev[1],
        { id: c, img: POP_DEVICES[c % 5], spot: POP_SPOTS[c % 4] },
      ]);
    }, 4200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, y: 34, rotate: -10 }}
            animate={{ opacity: 0.45, scale: 1, y: 0, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.6, y: 24, rotate: 6 }}
            transition={{ type: "spring", stiffness: 130, damping: 16 }}
            className={`absolute ${item.spot}`}
          >
            <div className="animate-float motion-reduce:animate-none">
              <Image
                src={item.img}
                alt=""
                width={300}
                height={300}
                className="h-auto w-28 drop-shadow-[0_18px_28px_rgba(2,74,111,0.25)] xl:w-36"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const TICKER = [
  { name: "The Corner Deli", amount: "+£24.50" },
  { name: "Fade Studio", amount: "+£38.00" },
  { name: "Brew & Bean", amount: "+£7.40" },
  { name: "Luna Boutique", amount: "+£129.99" },
  { name: "Pizza Napoli", amount: "+£64.25" },
  { name: "Bloom Florist", amount: "+£50.00" },
  { name: "Oak & Iron", amount: "+£86.10" },
  { name: "City Pharmacy", amount: "+£12.80" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pinned = desktop && !reduce;

  const smooth = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001,
  });

  // Mouse: spotlight + gentle 3D tilt of the whole scene
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(440px at ${mx}px ${my}px, rgba(11,165,236,0.12), transparent 70%)`;
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(ny, [0, 1], [2.5, -2.5]), {
    stiffness: 60,
    damping: 16,
  });
  const tiltY = useSpring(useTransform(nx, [0, 1], [-3, 3]), {
    stiffness: 60,
    damping: 16,
  });

  // Act I → II: the blue scene dissolves into the light stage
  const sceneOpacity = useTransform(smooth, [0.24, 0.48], [1, 0]);
  const heroTextOpacity = useTransform(smooth, [0.16, 0.34], [1, 0]);
  const heroTextScale = useTransform(smooth, [0.05, 0.34], [1, 0.86]);
  const heroTextBlur = useTransform(smooth, [0.16, 0.34], [0, 12]);
  const heroTextFilter = useMotionTemplate`blur(${heroTextBlur}px)`;
  const heroTextEvents = useTransform(scrollYProgress, (v) =>
    v > 0.34 ? ("none" as const) : ("auto" as const)
  );
  const stageOpacity = useTransform(smooth, [0.28, 0.5], [0, 1]);

  // Act II — message in ink on the light stage
  const msgOpacity = useTransform(smooth, [0.42, 0.54, 0.64, 0.72], [0, 1, 1, 0]);
  const msgY = useTransform(smooth, [0.42, 0.54, 0.64, 0.72], [36, 0, 0, -26]);

  // Act III — the device rises centre-stage
  const devOpacity = useTransform(smooth, [0.64, 0.78], [0, 1]);
  const devY = useTransform(smooth, [0.64, 0.84], [130, 0]);
  const devScale = useTransform(smooth, [0.64, 0.84], [0.86, 1]);
  const devBlur = useTransform(smooth, [0.64, 0.78], [10, 0]);
  const devFilter = useMotionTemplate`blur(${devBlur}px)`;
  const capOpacity = useTransform(smooth, [0.82, 0.92], [0, 1]);
  const capY = useTransform(smooth, [0.82, 0.92], [22, 0]);

  // Light sweep + recede exit
  const sweepX = useTransform(smooth, [0.8, 0.94], ["-120%", "380%"]);
  const sweepOpacity = useTransform(smooth, [0.8, 0.84, 0.9, 0.94], [0, 0.45, 0.45, 0]);
  const exitScale = useTransform(smooth, [0.94, 1], [1, 0.96]);
  const exitY = useTransform(smooth, [0.94, 1], [0, -30]);
  const exitOpacity = useTransform(smooth, [0.97, 1], [1, 0.85]);
  const hintOpacity = useTransform(smooth, [0, 0.1], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX);
        my.set(e.clientY);
        nx.set(e.clientX / window.innerWidth);
        ny.set(e.clientY / window.innerHeight);
      }}
      className="relative bg-white lg:h-[340vh]"
    >
      <div className="relative lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden">
        <motion.div
          style={pinned ? { scale: exitScale, y: exitY, opacity: exitOpacity } : undefined}
          className="lg:h-full"
        >
          {/* Light stage revealed as the scene dissolves */}
          <motion.div
            aria-hidden
            style={pinned ? { opacity: stageOpacity } : { opacity: 0 }}
            className="absolute inset-0"
          >
            <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
            <div className="absolute -left-24 top-[8%] h-[44vh] w-[44vh] rounded-full bg-brand-200/60 blur-[110px]" />
            <div className="absolute -right-24 bottom-[6%] h-[44vh] w-[44vh] rounded-full bg-mint-400/20 blur-[110px]" />
            <div className="absolute left-1/2 top-1/2 h-[52vh] w-[52vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/70 blur-[120px]" />
          </motion.div>

          {/* ————— Act I: the living blue scene ————— */}
          <motion.div
            style={pinned ? { opacity: sceneOpacity } : undefined}
            className="relative z-10 h-svh overflow-hidden bg-white"
          >
            {/* Aurora + grid + rotating halo */}
            <div aria-hidden className="absolute inset-0">
              <div className="absolute -left-32 top-[-12%] h-[55vh] w-[55vh] rounded-full bg-brand-200/70 blur-[110px] animate-aurora-1 motion-reduce:animate-none" />
              <div className="absolute -right-32 bottom-[-10%] h-[55vh] w-[55vh] rounded-full bg-mint-400/25 blur-[110px] animate-aurora-2 motion-reduce:animate-none" />
              <div className="absolute left-[30%] top-[55%] h-[40vh] w-[40vh] rounded-full bg-brand-100/80 blur-[100px] animate-aurora-3 motion-reduce:animate-none" />
              <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,black,transparent)]" />
              <div className="absolute left-1/2 top-[50%] h-[85vh] w-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(11,165,236,0.12)_22%,transparent_45%)] blur-2xl animate-spin-slow motion-reduce:animate-none" />
            </div>

            {/* Mouse spotlight */}
            <motion.div
              aria-hidden
              style={{ background: spotlight }}
              className="absolute inset-0 hidden lg:block"
            />

            {/* Tilting scene: orbits + headline */}
            <motion.div
              style={
                pinned
                  ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }
                  : undefined
              }
              className="relative flex h-full flex-col items-center justify-center px-6"
            >
              {/* Orbit rings — uniform quiet chips, headline stays dominant */}
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 opacity-40">
                {/* Ring A */}
                <div className="relative h-[22rem] w-[22rem] sm:h-[30rem] sm:w-[30rem] xl:h-[34rem] xl:w-[34rem]">
                  <div className="absolute inset-0 rounded-full border border-dashed border-brand-300/50" />
                  <div className="absolute inset-0 animate-[spin_26s_linear_infinite] motion-reduce:animate-none">
                    <OrbitItem duration={26} className="left-[14.6%] top-[14.6%] -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
                          <path d="M2.5 9.5h19" />
                        </svg>
                      </div>
                    </OrbitItem>
                    <OrbitItem duration={26} className="right-[14.6%] top-[14.6%] -translate-y-1/2 translate-x-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7" />
                          <path d="M10 6.5a11 11 0 0 1 0 11" />
                          <path d="M13.5 4.5a14.5 14.5 0 0 1 0 15" />
                        </svg>
                      </div>
                    </OrbitItem>
                    <OrbitItem duration={26} className="bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-mint-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </div>
                    </OrbitItem>
                    <OrbitItem duration={26} className="bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 font-display text-sm font-bold text-brand-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        £
                      </div>
                    </OrbitItem>
                  </div>
                </div>
                {/* Ring B — wider, slower, opposite direction */}
                <div className="absolute left-1/2 top-1/2 hidden h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 sm:block sm:h-[38rem] sm:w-[38rem] xl:h-[40rem] xl:w-[40rem]">
                  <div className="absolute inset-0 rounded-full border border-brand-200/60" />
                  <div className="absolute inset-0 animate-[spin_44s_linear_infinite_reverse] motion-reduce:animate-none">
                    <OrbitItem duration={44} reverse className="left-[14.6%] top-[14.6%] -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M19 5L5 19M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                      </div>
                    </OrbitItem>
                    <OrbitItem duration={44} reverse className="right-[14.6%] top-[14.6%] -translate-y-1/2 translate-x-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="8.5" />
                          <path d="M12 7.5V12l3 2" />
                        </svg>
                      </div>
                    </OrbitItem>
                    <OrbitItem duration={44} reverse className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-500/80 shadow-[0_8px_20px_-8px_rgba(2,134,201,0.35)] ring-1 ring-ink-100/80">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3l2.1 4.9 5.4.5-4.1 3.6 1.2 5.3L12 14.5 7.4 17.3l1.2-5.3L4.5 8.4l5.4-.5L12 3z" />
                        </svg>
                      </div>
                    </OrbitItem>
                  </div>
                </div>
              </div>

              {/* Headline */}
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
                className="relative z-10 flex flex-col items-center text-center"
              >
                <h1 className="-rotate-2 text-center font-script font-bold leading-[0.95] [text-shadow:0_2px_30px_rgba(255,255,255,0.95)]">
                  <BlurWord
                    delay={0.25}
                    className="text-[3.4rem] text-ink-950 sm:text-[5.75rem] xl:text-[7.25rem]"
                  >
                    Take payments fast,
                  </BlurWord>
                  <br />
                  <BlurWord
                    delay={0.55}
                    className="text-[3.7rem] text-brand-500 sm:text-[6.25rem] xl:text-[8rem]"
                  >
                    get paid faster.
                  </BlurWord>
                </h1>

                <p
                  style={{ animationDelay: "0.95s" }}
                  className="mt-6 max-w-xl animate-fade-up text-balance text-center text-base font-medium text-ink-600 sm:text-lg"
                >
                  Card payments for UK businesses — low fees, next-day
                  settlement, 24/7 support.
                </p>

                <div
                  style={{ animationDelay: "1.15s" }}
                  className="mt-9 animate-fade-up"
                >
                  <Magnetic>
                    <a
                      href="#cta"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-9 py-4 text-base font-bold text-white shadow-[0_24px_60px_-16px_rgba(2,134,201,0.55)] transition-transform duration-300 hover:scale-[1.05] active:scale-95"
                    >
                      Get your free quote
                      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                      <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine motion-reduce:animate-none" />
                    </a>
                  </Magnetic>
                </div>

                <p
                  style={{ animationDelay: "1.4s" }}
                  className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-semibold text-ink-500"
                >
                  <span className="flex items-center gap-1">
                    <span className="text-[#00b67a]">★★★★★</span> 5.0 on
                    Trustpilot
                  </span>
                  <span aria-hidden className="text-ink-300">
                    ·
                  </span>
                  <span>PCI DSS Level 1</span>
                  <span aria-hidden className="text-ink-300">
                    ·
                  </span>
                  <span>No hidden fees</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Ghosted devices popping through the corner lanes */}
            <DevicePops />

            {/* Live payments ticker */}
            <div className="mask-fade-x absolute inset-x-0 bottom-6 overflow-hidden">
              <div className="flex w-max items-center gap-3 animate-marquee motion-reduce:animate-none">
                {[...TICKER, ...TICKER].map((t, i) => (
                  <span
                    key={`${t.name}-${i}`}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-2 pl-3 pr-4 text-xs font-semibold text-ink-700 shadow-[0_10px_24px_-10px_rgba(2,134,201,0.3)] ring-1 ring-ink-100"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint-500/15 text-[9px] text-mint-500">
                      ✓
                    </span>
                    {t.name}
                    <span className="font-bold text-mint-500">{t.amount}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Act II — message in ink on the light stage */}
          <motion.div
            style={{ opacity: pinned ? msgOpacity : 0, y: msgY }}
            className="absolute inset-0 z-20 hidden items-center justify-center px-8 lg:flex"
          >
            <p className="max-w-3xl text-center font-display text-5xl font-bold leading-tight tracking-tight text-ink-950 xl:text-6xl">
              From tap to bank —{" "}
              <span className="text-gradient">one smooth flow.</span>
            </p>
          </motion.div>

          {/* Act III — the device rises centre-stage */}
          <motion.div
            style={{
              opacity: pinned ? devOpacity : 0,
              y: devY,
              scale: devScale,
              filter: devFilter,
            }}
            className="absolute inset-0 z-20 hidden items-center justify-center lg:flex"
          >
            <div className="relative flex flex-col items-center">
              <div
                aria-hidden
                className="absolute top-1/3 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(185,230,254,0.5),transparent)] blur-xl"
              />
              <div className="animate-float motion-reduce:animate-none">
                <Image
                  src="/devices/ps-one-side-t.png"
                  alt="PS One card terminal"
                  width={460}
                  height={460}
                  className="relative h-auto w-[380px] drop-shadow-[0_30px_44px_rgba(2,74,111,0.28)] xl:w-[430px]"
                />
              </div>

              <Chip progress={smooth} range={[0.74, 0.86]} from={-60} className="left-[-190px] top-[16%]">
                Rates from <span className="text-brand-600">0.29%</span>
              </Chip>
              <Chip progress={smooth} range={[0.78, 0.9]} from={-60} className="bottom-[30%] left-[-230px]">
                Next-day payouts
              </Chip>
              <Chip progress={smooth} range={[0.76, 0.88]} from={60} className="right-[-200px] top-[20%]">
                24/7 UK support
              </Chip>
              <Chip progress={smooth} range={[0.8, 0.92]} from={60} className="bottom-[26%] right-[-215px]">
                Tap · Chip · Swipe
              </Chip>

              <motion.div
                style={{ opacity: capOpacity, y: capY }}
                className="mt-2 text-center"
              >
                <p className="font-display text-2xl font-bold text-ink-950">
                  Meet the PS One
                </p>
                <p className="mt-1 text-sm font-medium text-ink-500">
                  Our flagship terminal · from £9.99/mo — keep scrolling for the
                  lineup
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Light sweep across the device act */}
          <motion.div
            aria-hidden
            style={pinned ? { x: sweepX, opacity: sweepOpacity } : { opacity: 0 }}
            className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-[38%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent lg:block"
          />

          {/* Scroll hint */}
          <motion.div
            style={pinned ? { opacity: hintOpacity } : undefined}
            className="absolute bottom-20 left-1/2 z-30 hidden -translate-x-1/2 lg:block"
          >
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-9 w-6 items-start justify-center rounded-full pt-1.5 ring-2 ring-ink-300"
            >
              <span className="h-2 w-1 rounded-full bg-ink-400" />
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
