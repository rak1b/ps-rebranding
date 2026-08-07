"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Phase = "idle" | "typing" | "tap" | "processing" | "approved";

const PHASE_DURATION: Record<Phase, number> = {
  idle: 1500,
  typing: 2600,
  tap: 2500,
  processing: 1400,
  approved: 3000,
};

const NEXT_PHASE: Record<Phase, Phase> = {
  idle: "typing",
  typing: "tap",
  tap: "processing",
  processing: "approved",
  approved: "idle",
};

const AMOUNT_CHARS = ["2", "4", ".", "5", "0"];
const KEYPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2.5 text-[9px] font-semibold text-ink-500">
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="flex items-end gap-[2px]">
          <span className="h-1 w-[3px] rounded-sm bg-ink-400" />
          <span className="h-1.5 w-[3px] rounded-sm bg-ink-400" />
          <span className="h-2 w-[3px] rounded-sm bg-ink-500" />
        </span>
        <span>5G</span>
        <span className="relative h-[9px] w-[18px] rounded-[3px] ring-1 ring-ink-400">
          <span className="absolute inset-[1.5px] right-[5px] rounded-[1px] bg-mint-500" />
          <span className="absolute -right-[3px] top-[2.5px] h-[4px] w-[2px] rounded-r-sm bg-ink-400" />
        </span>
      </div>
    </div>
  );
}

export default function Terminal() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setPhase("approved");
      setTyped(AMOUNT_CHARS.length);
      return;
    }
    const t = setTimeout(() => {
      const next = NEXT_PHASE[phase];
      if (next === "typing") setTyped(0);
      setPhase(next);
    }, PHASE_DURATION[phase]);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "typing" || reduce) return;
    const interval = setInterval(() => {
      setTyped((n) => Math.min(n + 1, AMOUNT_CHARS.length));
    }, 330);
    return () => clearInterval(interval);
  }, [phase, reduce]);

  const shownAmount = AMOUNT_CHARS.slice(0, typed).join("");
  const complete = typed >= AMOUNT_CHARS.length;
  const activeKey =
    phase === "typing" && !complete ? AMOUNT_CHARS[typed] : null;

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind the device */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-125 rounded-full bg-[radial-gradient(closest-side,rgba(54,191,250,0.35),rgba(45,212,191,0.12),transparent)] blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="animate-float motion-reduce:animate-none"
      >
        <div style={{ transform: "perspective(1300px) rotateY(-7deg) rotateX(2deg)" }}>
          {/* Receipt printing out of the top slot */}
          <AnimatePresence>
            {phase === "approved" && !reduce && (
              <motion.div
                key="receipt"
                initial={{ height: 0 }}
                animate={{ height: 52 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="absolute -top-[46px] left-1/2 w-28 -translate-x-1/2 overflow-hidden rounded-t-md bg-white shadow-md"
              >
                <div className="space-y-1.5 p-2">
                  <div className="h-1 w-16 rounded bg-ink-200" />
                  <div className="h-1 w-20 rounded bg-ink-100" />
                  <div className="h-1 w-12 rounded bg-ink-100" />
                  <div className="h-1.5 w-14 rounded bg-mint-400/70" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Device body — brand-blue hardware, like a real product render */}
          <div className="relative w-[272px] rounded-[2.3rem] bg-gradient-to-b from-brand-400 via-brand-500 to-brand-700 p-3 pb-3.5 shadow-[0_50px_90px_-28px_rgba(2,74,111,0.55)] ring-1 ring-brand-700/60">
            {/* Glossy body highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2.3rem] bg-[linear-gradient(118deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.06)_30%,transparent_50%)]"
            />
            {/* Side buttons */}
            <span className="absolute -right-[3px] top-24 h-9 w-[3px] rounded-r bg-brand-800" />
            <span className="absolute -right-[3px] top-36 h-14 w-[3px] rounded-r bg-brand-800" />
            <span className="absolute -left-[3px] top-28 h-11 w-[3px] rounded-l bg-brand-800" />

            {/* Top bezel: printer slot + camera + speaker */}
            <div className="relative mb-2 flex items-center justify-center py-1.5">
              <span className="h-[3px] w-24 rounded-full bg-brand-900/60 shadow-inner" />
              <span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-black ring-1 ring-white/25">
                <span className="absolute left-[2px] top-[2px] h-[3px] w-[3px] rounded-full bg-brand-300/90" />
              </span>
              <span className="absolute left-5 flex gap-[3px]">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="h-[3px] w-[3px] rounded-full bg-white/35" />
                ))}
              </span>
            </div>

            {/* Screen — true black bezel like real hardware */}
            <div className="relative h-[430px] overflow-hidden rounded-[1.6rem] border-[6px] border-black bg-gradient-to-b from-white to-brand-50">
              {/* Glass reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(115deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_28%,transparent_45%)]"
              />

              <StatusBar />

              <div className="relative flex h-[calc(100%-30px)] flex-col px-4 pb-4">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-1 flex-col items-center justify-center text-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/paymentsave-Logo-2048x448.png"
                        alt="PaymentSave"
                        className="h-8 w-auto"
                      />
                      <p className="mt-4 text-[11px] text-ink-400">
                        Ready to take payment
                      </p>
                      <span className="mt-3 flex items-center gap-1.5 rounded-full bg-mint-500/10 px-3 py-1 text-[10px] font-bold text-mint-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse-dot motion-reduce:animate-none" />
                        Online
                      </span>
                    </motion.div>
                  )}

                  {phase === "typing" && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-1 flex-col"
                    >
                      <div className="pt-3 text-center">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-400">
                          Enter amount
                        </p>
                        <p className="mt-1 font-display text-4xl font-bold tabular-nums text-ink-950">
                          £{shownAmount || "0"}
                          <span className="ml-0.5 inline-block h-7 w-[2px] translate-y-0.5 bg-brand-500 animate-ticker motion-reduce:animate-none" />
                        </p>
                      </div>

                      {/* On-screen keypad */}
                      <div className="mt-auto grid grid-cols-3 gap-1.5">
                        {KEYPAD.map((key) => {
                          const isActive = activeKey === key;
                          return (
                            <motion.div
                              key={key}
                              animate={
                                isActive
                                  ? { scale: 0.9, backgroundColor: "#0ba5ec", color: "#ffffff" }
                                  : { scale: 1, backgroundColor: "#ffffff", color: "#10263f" }
                              }
                              transition={{ duration: 0.16 }}
                              className="flex h-[46px] items-center justify-center rounded-xl text-lg font-semibold shadow-sm ring-1 ring-ink-100"
                            >
                              {key}
                            </motion.div>
                          );
                        })}
                      </div>
                      <motion.div
                        animate={
                          complete
                            ? { backgroundColor: "#0ba5ec", color: "#ffffff", scale: 1 }
                            : { backgroundColor: "#e8f0f8", color: "#7290ad", scale: 1 }
                        }
                        className="mt-2 flex h-[46px] items-center justify-center rounded-xl text-sm font-bold"
                      >
                        {complete ? "Charge £24.50" : "Charge"}
                      </motion.div>
                    </motion.div>
                  )}

                  {phase === "tap" && (
                    <motion.div
                      key="tap"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-1 flex-col items-center justify-center text-center"
                    >
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
                      <p className="mt-4 font-display text-3xl font-bold tabular-nums text-ink-950">
                        £24.50
                      </p>
                      <p className="mt-1.5 text-[11px] font-medium text-ink-500">
                        Hold card near the screen
                      </p>
                      <div className="mt-5 flex items-center gap-2.5 text-[7px] font-bold tracking-[0.14em] text-ink-300">
                        <span>VISA</span>
                        <span>MASTERCARD</span>
                        <span>AMEX</span>
                        <span>G·PAY</span>
                        <span>PAY</span>
                      </div>
                    </motion.div>
                  )}

                  {phase === "processing" && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-1 flex-col items-center justify-center text-center"
                    >
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-3 w-3 rounded-full bg-brand-500"
                            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.14 }}
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm font-semibold text-ink-700">
                        Processing…
                      </p>
                      <p className="mt-1 text-[10px] text-ink-400">
                        Contacting your bank
                      </p>
                    </motion.div>
                  )}

                  {phase === "approved" && (
                    <motion.div
                      key="approved"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative flex flex-1 flex-col items-center justify-center text-center"
                    >
                      {!reduce &&
                        [...Array(12)].map((_, i) => {
                          const angle = (i / 12) * Math.PI * 2;
                          return (
                            <motion.span
                              key={i}
                              className="absolute left-1/2 top-[38%] h-1.5 w-1.5 rounded-full"
                              style={{
                                background:
                                  i % 3 === 0 ? "#0ba5ec" : i % 3 === 1 ? "#2dd4bf" : "#7cd4fd",
                              }}
                              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                              animate={{
                                x: Math.cos(angle) * 78,
                                y: Math.sin(angle) * 78,
                                opacity: 0,
                                scale: 0.4,
                              }}
                              transition={{ duration: 0.9, ease: "easeOut" }}
                            />
                          );
                        })}
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 14 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-mint-500/15"
                      >
                        <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none">
                          <motion.path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            stroke="#14b8a6"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                          />
                        </svg>
                      </motion.div>
                      <p className="mt-4 font-display text-3xl font-bold tabular-nums text-ink-950">
                        £24.50
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-mint-500">
                        Payment approved
                      </p>
                      <p className="mt-3 text-[10px] text-ink-400">
                        Printing receipt…
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom brand */}
            <p className="mt-2.5 text-center font-display text-[9px] font-bold tracking-[0.3em] text-white/70">
              PS ONE
            </p>

            {/* Contact shadow */}
            <span
              aria-hidden
              className="absolute -bottom-8 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-[100%] bg-ink-900/25 blur-lg"
            />
          </div>

          {/* Tapping card */}
          <AnimatePresence>
            {phase === "tap" && !reduce && (
              <motion.div
                key="card"
                initial={{ x: 200, y: -20, rotate: 24, opacity: 0 }}
                animate={{ x: 108, y: 16, rotate: 10, opacity: 1 }}
                exit={{ x: 210, y: -40, rotate: 28, opacity: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 14 }}
                className="absolute right-0 top-24 z-30"
              >
                <div className="h-[100px] w-[158px] rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-ink-800 p-3.5 shadow-2xl ring-1 ring-white/25">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-[10px] font-bold text-white/95">
                      paymentsave
                    </span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-90 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7" />
                      <path d="M10 6.5a11 11 0 0 1 0 11" />
                    </svg>
                  </div>
                  <div className="mt-3.5 h-5 w-7 rounded bg-gradient-to-br from-yellow-200 to-yellow-400/80" />
                  <p className="mt-1.5 text-[9px] tracking-[0.18em] text-white/70">
                    •••• 4832
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
