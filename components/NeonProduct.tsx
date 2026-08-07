"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal } from "./ui/Reveal";

function TiltPhoto({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
    stiffness: 160,
    damping: 18,
  });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

const SPECS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="7" width="16" height="10" rx="2" />
        <path d="M21.5 10.5v3M6 10.5v3" />
      </svg>
    ),
    text: "All-day battery — 14h+ of continuous use",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7M10 6.5a11 11 0 0 1 0 11M13.5 4.5a14.5 14.5 0 0 1 0 15" />
      </svg>
    ),
    text: "In-screen NFC — tap right on the display",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V4h12v5M6 14h12v6H6zM4 9h16a1.5 1.5 0 0 1 1.5 1.5v4H2.5v-4A1.5 1.5 0 0 1 4 9z" />
      </svg>
    ),
    text: "Receipts printed in under a second",
  },
];

export default function NeonProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const deviceY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const deviceRotate = useTransform(scrollYProgress, [0, 1], [5, -2]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-brand-400 via-brand-300 to-brand-100 py-20 sm:py-28"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]" />
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-white/25 blur-3xl animate-aurora-1 motion-reduce:animate-none" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-6xl">
            Serve customers{" "}
            <span className="font-script text-5xl font-bold sm:text-7xl">
              faster.
            </span>
            <br />
            See money sooner.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <Reveal delay={0.1} className="order-2 text-center lg:order-1 lg:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-800/70">
              Our flagship
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold text-ink-950">
              Meet the PS One
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-ink-800/80 lg:mx-0">
              Built for busy counters — a full touchscreen terminal with
              all-day battery, blazing checkout and a built-in printer. Works
              with the EPOS you already run.
            </p>
            <a
              href="#pricing"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-ink-900/25 transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              See the PS One
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </Reveal>

          <motion.div
            style={{ y: deviceY, rotate: deviceRotate }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative">
              {/* Soft light behind the device */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 scale-125 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.8),transparent)] blur-2xl"
              />
              <TiltPhoto>
                <motion.div
                  initial={{ opacity: 0, y: 44, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[300px] rounded-[2rem] bg-white p-5 shadow-[0_50px_100px_-30px_rgba(2,74,111,0.55)] ring-1 ring-white/70 sm:w-[360px]"
                >
                  <Image
                    src="/devices/ps-one-angle-t.png"
                    alt="PS One card terminal"
                    width={601}
                    height={492}
                    className="h-auto w-full drop-shadow-[0_24px_36px_rgba(2,74,111,0.25)]"
                  />
                  <div className="flex items-center justify-between px-1 pb-1">
                    <p className="font-display text-lg font-bold text-ink-950">
                      PS One
                    </p>
                    <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold text-brand-700">
                      From £9.99/mo
                    </span>
                  </div>
                </motion.div>
              </TiltPhoto>

              {/* Secondary angle, floating */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -12 }}
                whileInView={{ opacity: 1, y: 0, rotate: -8 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-10 -left-8 hidden w-36 animate-float-delay motion-reduce:animate-none sm:block lg:-left-14"
              >
                <div className="rounded-2xl bg-white p-2.5 shadow-xl ring-1 ring-ink-100">
                  <Image
                    src="/devices/ps-one-flat-t.png"
                    alt="PS One handheld view"
                    width={289}
                    height={296}
                    className="h-auto w-full drop-shadow-[0_16px_24px_rgba(2,74,111,0.2)]"
                  />
                  <p className="mt-1.5 text-center text-[10px] font-bold text-ink-500">
                    In-screen NFC
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="order-3 space-y-5">
            {SPECS.map((spec, i) => (
              <Reveal key={spec.text} delay={0.15 + i * 0.12}>
                <div className="mx-auto flex max-w-sm items-center gap-4 rounded-2xl bg-white/60 p-4 ring-1 ring-white/70 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03] lg:mx-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-brand-300">
                    {spec.icon}
                  </span>
                  <p className="text-sm font-semibold text-ink-900">{spec.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
