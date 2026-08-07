"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "./ui/Reveal";

type Step = {
  number: string;
  title: string;
  body: string;
  chips: string[];
  theme: "light" | "tint" | "dark";
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Send us a recent statement",
    body: "A photo or PDF is fine. We review it line by line — every rate, every sneaky auxiliary charge — and show you exactly what you're really paying today.",
    chips: ["Takes 2 minutes", "No obligation", "Human review"],
    theme: "light",
  },
  {
    number: "02",
    title: "We beat it — or say so",
    body: "You get a like-for-like quote with one clear rate. If we genuinely can't save you money, we'll tell you to stay put. That honesty is why switchers stay.",
    chips: ["Avg. 40% saving", "One clear rate", "No exit fees"],
    theme: "tint",
  },
  {
    number: "03",
    title: "Swap in minutes, keep trading",
    body: "Your terminal arrives pre-configured — plug in, connect to Wi-Fi, take your first payment. Most businesses switch without missing a single sale.",
    chips: ["Free setup", "Arrives in 3 days", "24/7 support from day one"],
    theme: "dark",
  },
];

const THEMES: Record<Step["theme"], { card: string; number: string; title: string; body: string; chip: string }> = {
  light: {
    card: "bg-white ring-1 ring-ink-100",
    number: "text-brand-200",
    title: "text-ink-950",
    body: "text-ink-500",
    chip: "bg-ink-50 text-ink-700 ring-1 ring-ink-100",
  },
  tint: {
    card: "bg-gradient-to-br from-brand-50 to-brand-100 ring-1 ring-brand-200/70",
    number: "text-brand-300",
    title: "text-ink-950",
    body: "text-ink-600",
    chip: "bg-white/80 text-brand-700 ring-1 ring-brand-200",
  },
  dark: {
    card: "bg-gradient-to-br from-brand-500 to-brand-600 ring-1 ring-brand-400/60",
    number: "text-brand-200",
    title: "text-white",
    body: "text-white/85",
    chip: "bg-white/20 text-white ring-1 ring-white/25",
  },
};

function StackCard({
  step,
  index,
  total,
  progress,
  children,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  children?: ReactNode;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.055;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const t = THEMES[step.theme];

  return (
    <div
      className="sticky flex items-start justify-center"
      style={{ top: `calc(14vh + ${index * 32}px)` }}
    >
      <motion.div
        style={{ scale }}
        className={`w-full origin-top rounded-[2rem] p-8 shadow-[0_30px_70px_-30px_rgba(6,19,37,0.35)] sm:p-12 ${t.card}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className={`font-display text-2xl font-bold sm:text-4xl ${t.title}`}>
              {step.title}
            </h3>
            <p className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${t.body}`}>
              {step.body}
            </p>
          </div>
          <span className={`font-display text-6xl font-bold tabular-nums sm:text-8xl ${t.number}`}>
            {step.number}
          </span>
        </div>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {step.chips.map((chip) => (
            <span
              key={chip}
              className={`rounded-full px-4 py-2 text-xs font-bold sm:text-sm ${t.chip}`}
            >
              {chip}
            </span>
          ))}
        </div>
        {children}
      </motion.div>
    </div>
  );
}

export default function StackSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="switching" className="relative bg-ink-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Switching is simple
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Three steps. <span className="text-gradient">Zero downtime.</span>
          </h2>
        </Reveal>

        {reduce ? (
          <div className="mt-14 space-y-6">
            {STEPS.map((step) => (
              <div key={step.number} className={`rounded-[2rem] p-8 sm:p-12 ${THEMES[step.theme].card}`}>
                <h3 className={`font-display text-2xl font-bold sm:text-4xl ${THEMES[step.theme].title}`}>
                  {step.title}
                </h3>
                <p className={`mt-4 text-lg ${THEMES[step.theme].body}`}>{step.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div ref={ref} className="mt-10">
            {STEPS.map((step, i) => (
              <div key={step.number} className="pb-8 pt-6 sm:pb-10">
                <StackCard
                  step={step}
                  index={i}
                  total={STEPS.length}
                  progress={scrollYProgress}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
