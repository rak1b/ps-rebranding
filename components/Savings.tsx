"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

const TYPICAL_RATE = 0.0175;
const OUR_RATE = 0.0079;

function Bar({
  label,
  rate,
  amount,
  highlight,
  delay,
}: {
  label: string;
  rate: number;
  amount: string;
  highlight?: boolean;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const width = `${(rate / TYPICAL_RATE) * 100}%`;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span
          className={`text-sm font-semibold ${highlight ? "text-white" : "text-white/70"}`}
        >
          {label}
        </span>
        <span
          className={`font-display text-lg font-bold tabular-nums ${highlight ? "text-white" : "text-white/80"}`}
        >
          {amount}
        </span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-white/20">
        <motion.div
          initial={{ width: reduce ? width : 0 }}
          whileInView={{ width }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${
            highlight
              ? "bg-gradient-to-r from-white to-mint-300"
              : "bg-white/45"
          }`}
        />
      </div>
    </div>
  );
}

export default function Savings() {
  const [monthly, setMonthly] = useState(15000);
  const yearlySaving = Math.round(monthly * 12 * (TYPICAL_RATE - OUR_RATE));

  return (
    <section
      id="savings"
      className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 py-20 text-white sm:py-28"
    >
      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
        <div className="absolute -left-24 top-0 h-[400px] w-[400px] rounded-full bg-white/15 blur-[120px] animate-aurora-1 motion-reduce:animate-none" />
        <div className="absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-mint-300/20 blur-[120px] animate-aurora-2 motion-reduce:animate-none" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-100">
            The switch that pays
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Stop overpaying on{" "}
            <span className="text-mint-300">card fees</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">
            Most UK businesses are on legacy rates and don&apos;t know it. We
            review your latest statement line by line and beat it — or we&apos;ll
            tell you to stay put. No contract tricks, no exit fees.
          </p>

          <div className="mt-10 space-y-7">
            <Bar
              label="Typical provider"
              rate={TYPICAL_RATE}
              amount="1.75%"
              delay={0.1}
            />
            <Bar
              label="PaymentSave"
              rate={OUR_RATE}
              amount="0.79%"
              highlight
              delay={0.35}
            />
          </div>
          <p className="mt-4 text-xs text-white/60">
            Illustrative blended consumer-card rates. Your quote is tailored to
            your business.
          </p>
        </Reveal>

        {/* Interactive savings calculator */}
        <Reveal delay={0.15}>
          <div className="rounded-3xl bg-white p-8 shadow-[0_40px_90px_-30px_rgba(6,74,111,0.5)] ring-1 ring-white/50 sm:p-10">
            <h3 className="font-display text-xl font-bold text-ink-950">
              What could you save?
            </h3>
            <p className="mt-1 text-sm text-ink-400">
              Drag to your monthly card turnover
            </p>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink-500">
                  Monthly card sales
                </span>
                <span className="font-display text-2xl font-bold tabular-nums text-ink-950">
                  £{monthly.toLocaleString("en-GB")}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                aria-label="Monthly card turnover"
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-brand-500 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(11,165,236,0.2)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="mt-2 flex justify-between text-xs text-ink-400">
                <span>£1k</span>
                <span>£100k</span>
              </div>
            </div>

            <div className="mt-9 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-400/10 p-6 ring-1 ring-brand-200">
              <p className="text-sm font-medium text-ink-500">
                Estimated yearly saving
              </p>
              <motion.p
                key={yearlySaving}
                initial={{ opacity: 0.4, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-1 font-display text-5xl font-bold tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-mint-500"
              >
                £{yearlySaving.toLocaleString("en-GB")}
              </motion.p>
              <p className="mt-2 text-xs text-ink-400">
                vs. a typical 1.75% legacy rate
              </p>
            </div>

            <a
              href="#cta"
              className="group mt-7 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            >
              Claim this saving
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
