"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

const FAQS = [
  {
    q: "How quickly can I start taking payments?",
    a: "Most businesses are approved within 24 hours and taking payments within 3 working days of applying. Your terminal arrives pre-configured — just plug in, connect to Wi-Fi and go.",
  },
  {
    q: "Are there any hidden fees or long contracts?",
    a: "No. One clear transaction rate, no PCI non-compliance charges, no minimum monthly service charge and no exit fees. Our rolling plans let you leave whenever you like — we'd rather keep you with service than small print.",
  },
  {
    q: "When do I receive my money?",
    a: "Next business day as standard, with funds typically in your account by 9am. Eligible plans include 7-day payouts, so weekend takings land on Monday morning — or sooner.",
  },
  {
    q: "Can you really beat my current rates?",
    a: "In most cases, yes — businesses switching to us save around 40% on processing fees. Send us a recent statement and we'll give you a line-by-line comparison. If we can't beat it, we'll tell you straight.",
  },
  {
    q: "What payment types can I accept?",
    a: "All major cards (Visa, Mastercard, Amex), contactless, chip-and-PIN, Apple Pay, Google Pay, online checkout, payment links and phone payments through the virtual terminal — all settled into one account.",
  },
  {
    q: "What happens if my terminal breaks?",
    a: "We'll ship a pre-configured replacement within 24 hours, free of charge. In the meantime, you can keep trading with payment links or the virtual terminal from any phone or browser.",
  },
];

function Item({
  faq,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl ring-1 transition-all duration-300 ${
        open
          ? "bg-white shadow-[0_16px_40px_-20px_rgba(11,165,236,0.25)] ring-brand-200"
          : "bg-white ring-ink-100 hover:ring-brand-200"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-bold text-ink-900 sm:text-lg">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-medium transition-colors duration-300 ${
            open ? "bg-brand-500 text-white" : "bg-ink-50 text-ink-500"
          }`}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Questions, answered
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Everything you need <span className="text-gradient">to know</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.06} y={20}>
              <Item
                faq={faq}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
