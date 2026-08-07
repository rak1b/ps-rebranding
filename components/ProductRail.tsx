"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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

type Product = {
  num: string;
  name: string;
  tag: string;
  desc: string;
  price: string;
  chips: string[];
  bg: string;
  img?: string;
  visual?: "checkout" | "link" | "virtual" | "epos";
};

const PRODUCTS: Product[] = [
  {
    num: "01",
    name: "PS One",
    tag: "The portable flagship",
    desc: "All-day battery, built-in printer and 4G + Wi-Fi — take the till to the customer, not the other way round.",
    img: "/devices/ps-one-upright-t.png",
    price: "From £9.99/mo",
    chips: ["14h+ battery", "Built-in printer", "4G + Wi-Fi"],
    bg: "from-brand-50 to-white",
  },
  {
    num: "02",
    name: "PS Counter",
    tag: "The till-side workhorse",
    desc: "A fixed countertop terminal with lightning checkout, rock-solid connectivity and full EPOS integration.",
    img: "/devices/ps-one-flat-t.png",
    price: "From £14.99/mo",
    chips: ["Ethernet + Wi-Fi", "EPOS ready", "Tap · Chip · Swipe"],
    bg: "from-white to-brand-50",
  },
  {
    num: "03",
    name: "PS Duo",
    tag: "Dual screen, zero waiting",
    desc: "A customer-facing second display with camera scanning — built for the busiest queues in retail.",
    img: "/devices/ps-one-duo-t.png",
    price: "From £19.99/mo",
    chips: ["Dual display", "Barcode camera", "In-screen NFC"],
    bg: "from-brand-100/60 to-white",
  },
  {
    num: "04",
    name: "Online Payments",
    tag: "Checkout that converts",
    desc: "Take cards and wallets on your website with a checkout built for speed — settled next day, like everything else.",
    visual: "checkout",
    price: "From 1.2% per sale",
    chips: ["Apple & Google Pay", "3DS2 built in", "No monthly fee"],
    bg: "from-white to-brand-50",
  },
  {
    num: "05",
    name: "Payment Links",
    tag: "Get paid in a message",
    desc: "Send a link by text, email or WhatsApp and watch it get paid in seconds. Perfect for deposits and invoices.",
    visual: "link",
    price: "Free with every account",
    chips: ["No website needed", "Instant confirmation", "Works anywhere"],
    bg: "from-brand-50 to-white",
  },
  {
    num: "06",
    name: "Virtual Terminal",
    tag: "Phone payments, secured",
    desc: "Take card payments over the phone from any browser — perfect for bookings, deposits and mail order.",
    visual: "virtual",
    price: "From 1.5% per sale",
    chips: ["No hardware needed", "PCI compliant", "Any browser"],
    bg: "from-white to-brand-100/50",
  },
  {
    num: "07",
    name: "EPOS Integration",
    tag: "Plugged into your till",
    desc: "Connect payments to the EPOS you already run — stock, staff and sales synced automatically, one daily payout.",
    visual: "epos",
    price: "Custom pricing",
    chips: ["Major EPOS supported", "Auto reconciliation", "One daily payout"],
    bg: "from-brand-50 to-white",
  },
];

function CheckoutMock() {
  return (
    <div className="w-[280px] -rotate-2 animate-float rounded-2xl bg-white p-4 shadow-[0_36px_60px_-24px_rgba(2,74,111,0.35)] ring-1 ring-ink-100 transition-transform duration-700 group-hover:-translate-y-3 motion-reduce:animate-none sm:w-[300px]">
      <div className="flex items-center gap-1.5">
        {["bg-red-300", "bg-amber-300", "bg-mint-400"].map((c) => (
          <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
        ))}
        <span className="ml-2 flex-1 rounded-md bg-ink-50 px-2 py-1 text-[9px] font-medium text-ink-400">
          checkout.yourshop.co.uk
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-ink-50 p-3">
        <div>
          <p className="text-xs font-bold text-ink-900">Order #2114</p>
          <p className="text-[10px] text-ink-400">2 items</p>
        </div>
        <p className="font-display text-lg font-bold tabular-nums text-ink-950">
          £48.00
        </p>
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 py-3 text-center text-sm font-bold text-white">
        Pay £48.00
      </div>
      <div className="mt-2.5 flex items-center justify-center gap-2 text-[8px] font-bold tracking-wider text-ink-300">
        <span>VISA</span>
        <span>MASTERCARD</span>
        <span>AMEX</span>
        <span> PAY</span>
        <span>G·PAY</span>
      </div>
    </div>
  );
}

function LinkMock() {
  return (
    <div className="w-[270px] rotate-2 animate-float space-y-2.5 transition-transform duration-700 group-hover:-translate-y-3 motion-reduce:animate-none sm:w-[290px]">
      <div className="ml-8 rounded-2xl rounded-br-md bg-gradient-to-r from-brand-500 to-brand-600 p-3.5 text-white shadow-lg">
        <p className="text-xs font-semibold">Hi John — deposit for Saturday:</p>
        <p className="mt-1.5 inline-block rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold">
          pay.paymentsave.uk/j8s2k
        </p>
      </div>
      <div className="mr-8 rounded-2xl rounded-bl-md bg-white p-3.5 shadow-[0_20px_44px_-20px_rgba(2,74,111,0.35)] ring-1 ring-ink-100">
        <p className="text-xs font-semibold text-ink-700">Done! 🎉</p>
      </div>
      <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-[0_20px_44px_-20px_rgba(2,74,111,0.35)] ring-1 ring-ink-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-500/15">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-mint-500" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <div>
          <p className="text-xs font-bold tabular-nums text-ink-900">
            £50.00 paid
          </p>
          <p className="text-[10px] text-ink-400">41 seconds after sending</p>
        </div>
      </div>
    </div>
  );
}

function VirtualTerminalMock() {
  return (
    <div className="w-[270px] -rotate-2 animate-float rounded-2xl bg-white p-4 shadow-[0_36px_60px_-24px_rgba(2,74,111,0.35)] ring-1 ring-ink-100 transition-transform duration-700 group-hover:-translate-y-3 motion-reduce:animate-none sm:w-[290px]">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 3.2 6.5a1.8 1.8 0 0 1 1.8-2z" />
        </svg>
        Virtual terminal
      </p>
      <div className="mt-3 rounded-xl bg-ink-50 p-3">
        <p className="text-[9px] font-semibold text-ink-400">Amount</p>
        <p className="font-display text-2xl font-bold tabular-nums text-ink-950">
          £120.00
        </p>
      </div>
      <div className="mt-2 rounded-xl bg-ink-50 p-3">
        <p className="text-[9px] font-semibold text-ink-400">Card number</p>
        <p className="text-sm font-bold tracking-[0.14em] text-ink-700">
          •••• •••• •••• 4832
        </p>
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 py-3 text-center text-sm font-bold text-white">
        Charge £120.00
      </div>
    </div>
  );
}

function EposMock() {
  const items = [
    { name: "Flat white ×2", price: "£7.40" },
    { name: "Sourdough toast", price: "£6.50" },
  ];
  return (
    <div className="w-[260px] rotate-2 animate-float rounded-2xl bg-white p-4 shadow-[0_36px_60px_-24px_rgba(2,74,111,0.35)] ring-1 ring-ink-100 transition-transform duration-700 group-hover:-translate-y-3 motion-reduce:animate-none sm:w-[280px]">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
        Order · Table 4
      </p>
      <div className="mt-2.5 space-y-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink-700">{item.name}</span>
            <span className="font-bold tabular-nums text-ink-900">{item.price}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-ink-200 pt-3">
        <span className="text-xs font-bold text-ink-900">Total</span>
        <span className="font-display text-lg font-bold tabular-nums text-ink-950">
          £13.90
        </span>
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mint-500/10 px-3 py-1.5 text-[10px] font-bold text-mint-500">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        Sent to PS Counter
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={`group relative grid h-full w-full shrink-0 grid-cols-1 items-center gap-6 rounded-[2.5rem] bg-gradient-to-br p-8 ring-1 ring-ink-100 shadow-[0_40px_90px_-40px_rgba(2,134,201,0.4)] sm:grid-cols-2 sm:p-12 ${product.bg}`}
    >
      {/* Ghost number, clipped to the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]"
      >
        <span className="absolute -right-4 -top-10 font-display text-[11rem] font-bold text-brand-500/[0.07] sm:text-[15rem]">
          {product.num}
        </span>
      </div>

      <div className="relative">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          {product.tag}
        </p>
        <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
          {product.name}
        </h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-500 sm:text-base">
          {product.desc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink-700 ring-1 ring-ink-100"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-7 flex items-center gap-4">
          <span className="rounded-full bg-brand-500/10 px-4 py-2 text-sm font-bold text-brand-700">
            {product.price}
          </span>
          <a
            href="#cta"
            className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-ink-900 transition-colors hover:text-brand-600"
          >
            Get a quote
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Visual: device flying out of the card, or a UI mock */}
      <div className="relative flex items-center justify-center">
        {product.img ? (
          <>
            {/* Contact shadow selling the float */}
            <span
              aria-hidden
              className="absolute bottom-2 left-1/2 h-7 w-3/5 -translate-x-1/2 rounded-[100%] bg-brand-900/15 blur-lg"
            />
            <Image
              src={product.img}
              alt={`${product.name} card terminal`}
              width={460}
              height={460}
              className="relative h-auto w-[250px] rotate-[4deg] drop-shadow-[0_24px_36px_rgba(2,74,111,0.25)] transition-transform duration-700 group-hover:-translate-y-4 group-hover:scale-[1.04] animate-float motion-reduce:animate-none sm:w-[320px] lg:-mt-24"
            />
          </>
        ) : product.visual === "checkout" ? (
          <CheckoutMock />
        ) : product.visual === "virtual" ? (
          <VirtualTerminalMock />
        ) : product.visual === "epos" ? (
          <EposMock />
        ) : (
          <LinkMock />
        )}
      </div>
    </div>
  );
}

export default function ProductRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const pinned = desktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 23,
    restDelta: 0.001,
  });
  // Vertical scroll → horizontal rail motion (7 cards)
  const x = useTransform(smooth, [0.04, 0.96], ["0vw", "-404vw"]);
  const barScale = useTransform(smooth, [0.04, 0.96], [0, 1]);

  return (
    <section ref={ref} className="relative bg-white lg:h-[560vh]">
      <div className="flex flex-col justify-center gap-8 px-5 py-20 lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden lg:px-0 lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-0 sm:px-8 lg:pt-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            The lineup
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Every way to <span className="text-gradient">get paid</span>
          </h2>
        </div>

        {/* Rail: horizontal on desktop, stacked on mobile */}
        <motion.div
          style={pinned ? { x } : undefined}
          className="flex flex-col gap-6 lg:h-[56vh] lg:flex-row lg:gap-[4vw] lg:pl-[15vw]"
        >
          {PRODUCTS.map((product) => (
            <div key={product.num} className="shrink-0 lg:h-full lg:w-[66vw]">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="mx-auto hidden h-1 w-48 overflow-hidden rounded-full bg-ink-100 lg:block">
          <motion.div
            style={{ scaleX: barScale }}
            className="h-full origin-left rounded-full bg-gradient-to-r from-brand-500 to-mint-400"
          />
        </div>
      </div>
    </section>
  );
}
