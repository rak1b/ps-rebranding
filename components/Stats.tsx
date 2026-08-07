"use client";

import { CountUp } from "./ui/CountUp";
import { Stagger, StaggerItem } from "./ui/Reveal";

const STATS = [
  {
    value: <CountUp to={99.99} decimals={2} suffix="%" />,
    label: "Payment uptime",
    sub: "so you never miss a sale",
  },
  {
    value: <CountUp to={2} prefix="<" suffix="s" />,
    label: "Tap-to-approved",
    sub: "keep queues moving",
  },
  {
    value: <CountUp to={40} suffix="%" />,
    label: "Average fee saving",
    sub: "when switching to us",
  },
  {
    value: <CountUp to={24} suffix="/7" />,
    label: "UK-based support",
    sub: "real humans, no bots",
  },
];

export default function Stats() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold tabular-nums tracking-tight text-ink-950 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-600">
                {stat.label}
              </p>
              <p className="mt-0.5 text-sm text-ink-400">{stat.sub}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
