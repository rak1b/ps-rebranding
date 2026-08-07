"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

function MiniBars() {
  const heights = [22, 34, 18, 42, 30, 52, 46];
  return (
    <div className="mt-4 flex items-end gap-2">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: h }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className={`w-4 rounded-t-md ${i >= 4 ? "bg-brand-500" : "bg-ink-200"}`}
        />
      ))}
    </div>
  );
}

const CARD =
  "group h-full rounded-3xl p-6 ring-1 transition-all duration-300 hover:-translate-y-1.5";

export default function Bento() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            One dashboard
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Your business, <span className="text-gradient">at a glance</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Sales, payouts, links and pots — everything in one clean view, on
            any device.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {/* Gross sales */}
          <StaggerItem className="h-full">
            <div className={`${CARD} bg-white ring-ink-100 shadow-[0_20px_50px_-30px_rgba(6,19,37,0.2)] hover:shadow-[0_28px_60px_-28px_rgba(11,165,236,0.35)]`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                Gross sales · today
              </p>
              <p className="mt-2 font-display text-4xl font-bold tabular-nums text-ink-950">
                £2,208.99
              </p>
              <p className="mt-1 text-sm font-semibold text-mint-500">
                ↑ £438.26 vs yesterday
              </p>
              <MiniBars />
            </div>
          </StaggerItem>

          {/* Balance */}
          <StaggerItem className="h-full">
            <div className={`${CARD} bg-white ring-ink-100 shadow-[0_20px_50px_-30px_rgba(6,19,37,0.2)] hover:shadow-[0_28px_60px_-28px_rgba(11,165,236,0.35)]`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                Available balance
              </p>
              <p className="mt-2 font-display text-4xl font-bold tabular-nums text-ink-950">
                £14,382.20
              </p>
              <div className="mt-5 flex gap-2">
                <span className="rounded-full bg-brand-500 px-4 py-2 text-xs font-bold text-white transition-transform duration-300 group-hover:scale-105">
                  ⇄ Move money
                </span>
                <span className="rounded-full bg-ink-50 px-4 py-2 text-xs font-bold text-ink-700 ring-1 ring-ink-100">
                  → Pay
                </span>
              </div>
              <p className="mt-5 text-xs text-ink-400">
                Instant transfers between pots, free forever.
              </p>
            </div>
          </StaggerItem>

          {/* Payout — tinted */}
          <StaggerItem className="h-full">
            <div className={`${CARD} bg-brand-50 ring-brand-200/70 shadow-[0_20px_50px_-26px_rgba(2,134,201,0.35)] hover:shadow-[0_28px_60px_-26px_rgba(2,134,201,0.45)]`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700/70">
                Next payout
              </p>
              <p className="mt-2 font-display text-4xl font-bold tabular-nums text-ink-950">
                £1,284.90
              </p>
              <p className="mt-1 text-sm font-semibold text-mint-500">
                Tomorrow, 9:00am → Barclays ····82
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white p-3 ring-1 ring-brand-100">
                <span className="h-2 w-2 rounded-full bg-mint-500 animate-pulse-dot motion-reduce:animate-none" />
                <p className="text-xs font-medium text-ink-500">
                  7-day payouts active — weekends included
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Payment link — brand gradient */}
          <StaggerItem className="h-full">
            <div className={`${CARD} bg-gradient-to-br from-brand-500 to-brand-700 ring-white/20 shadow-[0_20px_50px_-26px_rgba(11,165,236,0.6)]`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-100">
                Payment link
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                £50.00 deposit
              </p>
              <p className="mt-1 text-sm text-white/70">
                Sent by WhatsApp · J. Carter
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-bold text-white">
                Paid in 41 seconds ✓
              </span>
            </div>
          </StaggerItem>

          {/* Savings pot */}
          <StaggerItem className="h-full">
            <div className={`${CARD} bg-white ring-ink-100 shadow-[0_20px_50px_-30px_rgba(6,19,37,0.2)] hover:shadow-[0_28px_60px_-28px_rgba(11,165,236,0.35)]`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                Savings pot
              </p>
              <p className="mt-2 font-display text-xl font-bold text-ink-950">
                New espresso machine
              </p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "68%" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-mint-400"
                />
              </div>
              <p className="mt-2 text-sm font-semibold tabular-nums text-ink-500">
                £1,130.80 of £1,650
              </p>
              <p className="mt-4 text-xs text-ink-400">
                Auto-save 5% of takings, every payout.
              </p>
            </div>
          </StaggerItem>

          {/* Multi-site */}
          <StaggerItem className="h-full">
            <div className={`${CARD} bg-white ring-ink-100 shadow-[0_20px_50px_-30px_rgba(6,19,37,0.2)] hover:shadow-[0_28px_60px_-28px_rgba(11,165,236,0.35)]`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                All locations · live
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { name: "High Street", amount: "£1,204.10", pct: "82%" },
                  { name: "Market Stall", amount: "£486.90", pct: "54%" },
                  { name: "Online store", amount: "£517.99", pct: "61%" },
                ].map((loc, i) => (
                  <div key={loc.name}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-semibold text-ink-800">{loc.name}</span>
                      <span className="font-bold tabular-nums text-ink-900">
                        {loc.amount}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: loc.pct }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-brand-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
