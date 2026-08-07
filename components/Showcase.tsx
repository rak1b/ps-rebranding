"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

type Tx = {
  id: number;
  name: string;
  method: string;
  amount: string;
  icon: "tap" | "link" | "online";
};

const TX_POOL: Omit<Tx, "id">[] = [
  { name: "Flat white x2", method: "Contactless", amount: "+£7.40", icon: "tap" },
  { name: "Haircut & finish", method: "Payment link", amount: "+£38.00", icon: "link" },
  { name: "Table 12", method: "Portable terminal", amount: "+£64.25", icon: "tap" },
  { name: "Web order #2114", method: "Online checkout", amount: "+£129.99", icon: "online" },
  { name: "Deposit — J. Carter", method: "Virtual terminal", amount: "+£50.00", icon: "link" },
  { name: "Market stall sale", method: "Mobile reader", amount: "+£18.50", icon: "tap" },
];

const ICONS = {
  tap: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7" />
      <path d="M10 6.5a11 11 0 0 1 0 11" />
      <path d="M13.5 4.5a14.5 14.5 0 0 1 0 15" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 14.5l5-5M8 11l-2.8 2.8a3.7 3.7 0 0 0 5.2 5.2L13 16.5M16 13l2.8-2.8a3.7 3.7 0 0 0-5.2-5.2L11 7.5" />
    </svg>
  ),
  online: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
};

const PERKS = [
  {
    title: "Next-day payouts, every day",
    body: "Yesterday's takings hit your bank by 9am — weekends included on eligible plans.",
  },
  {
    title: "Live sales, one dashboard",
    body: "Watch every location, terminal and channel in real time from your phone.",
  },
  {
    title: "Smart flat pricing",
    body: "One clear rate across cards and wallets. No PCI surprises, no minimum-billing traps.",
  },
];

export default function Showcase() {
  const [txs, setTxs] = useState<Tx[]>(() =>
    TX_POOL.slice(0, 3).map((t, i) => ({ ...t, id: i }))
  );
  const [total, setTotal] = useState(1834.4);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let count = 3;
    const interval = setInterval(() => {
      const next = TX_POOL[count % TX_POOL.length];
      const value = Number(next.amount.replace(/[+£]/g, ""));
      setTxs((prev) => [{ ...next, id: count }, ...prev].slice(0, 3));
      setTotal((t) => t + value);
      count++;
    }, 2000);
    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Live feed mockup */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(11,165,236,0.16),transparent)] blur-xl"
            />
            <div className="rounded-3xl bg-white p-6 shadow-[0_32px_80px_-32px_rgba(6,19,37,0.28)] ring-1 ring-ink-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Today so far
                  </p>
                  <motion.p
                    key={Math.round(total * 100)}
                    initial={reduce ? false : { opacity: 0.5, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 font-display text-3xl font-bold tabular-nums text-ink-950"
                  >
                    £{total.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </motion.p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-mint-500/10 px-3 py-1.5 text-xs font-bold text-mint-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse-dot motion-reduce:animate-none" />
                  Live
                </span>
              </div>

              <div className="mt-5 h-[172px] space-y-2 overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  {txs.map((tx) => (
                    <motion.div
                      key={tx.id}
                      layout
                      initial={{ opacity: 0, y: -18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 14, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      className="flex items-center gap-3 rounded-xl bg-ink-50 p-2.5 ring-1 ring-ink-100/60"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                        {ICONS[tx.icon]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink-800">
                          {tx.name}
                        </p>
                        <p className="text-xs text-ink-400">{tx.method}</p>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-mint-500">
                        {tx.amount}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 p-4 text-white">
                <div>
                  <p className="text-[11px] font-medium text-white/75">
                    Payout scheduled
                  </p>
                  <p className="text-sm font-bold tabular-nums">
                    Tomorrow, 9:00am
                  </p>
                </div>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-mint-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="13" rx="2.5" />
                  <path d="M3 10.5h18M7 15h4" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
              Money in motion
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
              Get paid in seconds,{" "}
              <span className="text-gradient">banked by 9am</span>
            </h2>
          </Reveal>

          <div className="mt-9 space-y-2">
            {PERKS.map((perk, i) => (
              <Reveal key={perk.title} delay={0.1 + i * 0.1}>
                <div className="group flex gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-brand-50">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 font-display text-sm font-bold text-brand-600 transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      {perk.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-500">
                      {perk.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
