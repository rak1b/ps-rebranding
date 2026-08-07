"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 180,
    damping: 20,
  });
  const spotlight = useTransform(
    [mx, my] as const,
    ([x, y]: number[]) =>
      `radial-gradient(280px circle at ${x * 100}% ${y * 100}%, rgba(11,165,236,0.1), transparent 65%)`
  );

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
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
      className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-[0_20px_50px_-24px_rgba(6,19,37,0.16)] ring-1 ring-ink-100 transition-all duration-300 hover:ring-brand-200 hover:shadow-[0_28px_70px_-24px_rgba(11,165,236,0.35)]"
    >
      {/* Mouse-follow spotlight */}
      <motion.span
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

const PRODUCTS = [
  {
    title: "Countertop & portable",
    body: "Sleek terminals for the till or the table. Tap, chip-and-PIN, Apple Pay and Google Pay — approved in under two seconds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
        <path d="M9 6.5h6M9.5 17.5h5" />
      </svg>
    ),
    tag: "Most popular",
  },
  {
    title: "Mobile card readers",
    body: "Pocket-sized readers that go where you go. Perfect for markets, trades, taxis and pop-ups — all you need is a signal.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M6.5 8.5a7.5 7.5 0 0 1 0 7M10 6.5a11 11 0 0 1 0 11M13.5 4.5a14.5 14.5 0 0 1 0 15" />
      </svg>
    ),
  },
  {
    title: "Online payments",
    body: "Take payments on your website with a checkout that converts. Cards, wallets and pay-by-link, settled next day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "Payment links",
    body: "Send a link by text, email or WhatsApp and get paid in seconds. Ideal for invoices, deposits and remote sales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M9.5 14.5l5-5M8 11l-2.8 2.8a3.7 3.7 0 0 0 5.2 5.2L13 16.5M16 13l2.8-2.8a3.7 3.7 0 0 0-5.2-5.2L11 7.5" />
      </svg>
    ),
  },
  {
    title: "Virtual terminal",
    body: "Take secure card payments over the phone from any browser. Built for salons, clinics and booking-led businesses.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 3.2 6.5a1.8 1.8 0 0 1 1.8-2z" />
      </svg>
    ),
  },
  {
    title: "EPOS integration",
    body: "Plug into the tills and software you already use. Stock, staff and sales reporting — one system, zero re-keying.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="products" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Every way to pay
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            One provider for{" "}
            <span className="text-gradient">every payment</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            In-store, online, over the phone or on the move — take every payment
            with one account, one payout and one bill.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.title}>
              <TiltCard>
                <div className="flex items-start justify-between">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 p-3 text-brand-600 ring-1 ring-brand-200/60 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    {product.icon}
                  </span>
                  {product.tag && (
                    <span className="rounded-full bg-brand-500/10 px-3 py-1 text-[11px] font-bold text-brand-600">
                      {product.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                  {product.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                  {product.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Learn more
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
