"use client";

import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

const PLANS = [
  {
    name: "Pay as you go",
    price: "1.39%",
    unit: "per transaction",
    blurb: "No monthly fee. Perfect for markets, pop-ups and getting started.",
    features: [
      "Free mobile card reader",
      "Next-day payouts",
      "All cards & digital wallets",
      "No contract, leave anytime",
    ],
    cta: "Start free",
  },
  {
    name: "Growth",
    price: "0.79%",
    unit: "per transaction",
    monthly: "+ £9.99/mo",
    blurb: "Our lowest rates for established businesses taking regular card payments.",
    features: [
      "Countertop or portable terminal included",
      "Priority next-day payouts (7 days)",
      "Live dashboard & sales reports",
      "24/7 UK support, named account manager",
      "Free replacement within 24 hours",
    ],
    cta: "Get your quote",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "tailored rates",
    blurb: "Multi-site, high-volume or franchise? We'll build pricing around you.",
    features: [
      "Interchange++ transparent pricing",
      "Multi-location reporting",
      "EPOS & API integrations",
      "Dedicated onboarding team",
    ],
    cta: "Talk to sales",
  },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-mint-500" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-ink-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Simple pricing
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Clear rates. <span className="text-gradient">Zero surprises.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Send us a recent statement and we&apos;ll beat it — or tell you
            honestly to stay where you are.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {PLANS.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "gradient-border shadow-[0_32px_70px_-28px_rgba(11,165,236,0.45)]"
                    : "bg-white ring-1 ring-ink-100 shadow-[0_20px_50px_-30px_rgba(6,19,37,0.2)] hover:shadow-[0_28px_60px_-28px_rgba(6,19,37,0.28)]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-brand-500/40">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-ink-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tabular-nums tracking-tight text-ink-950">
                    {plan.price}
                  </span>
                  <span className="text-sm text-ink-400">{plan.unit}</span>
                </div>
                {plan.monthly && (
                  <p className="mt-1 text-sm font-semibold text-brand-600">
                    {plan.monthly}
                  </p>
                )}
                <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                  {plan.blurb}
                </p>
                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm font-medium text-ink-700"
                    >
                      <span className="mt-0.5">
                        <Check />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-8 block rounded-full py-3.5 text-center text-sm font-bold transition-all duration-300 active:scale-95 ${
                    plan.popular
                      ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/35 hover:scale-[1.03]"
                      : "bg-ink-900 text-white hover:bg-ink-800 hover:scale-[1.02]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-10 text-center text-sm text-ink-400">
          All plans include fraud protection, PCI compliance and free setup.
          No exit fees, ever.
        </Reveal>
      </div>
    </section>
  );
}
