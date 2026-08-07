"use client";

const BUSINESSES = [
  "The Corner Deli",
  "Brew & Bean",
  "Fade Studio",
  "Luna Boutique",
  "Chop House 44",
  "GreenGrocer",
  "Ride Repair Co.",
  "The Nail Bar",
  "Pizza Napoli",
  "Bloom Florist",
  "City Pharmacy",
  "Oak & Iron",
];

export default function LogoMarquee() {
  const row = [...BUSINESSES, ...BUSINESSES];
  return (
    <section className="border-y border-ink-100 bg-ink-50/60 py-8">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
        Powering 5,000+ independent UK businesses
      </p>
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max items-center gap-12 animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-ink-300 transition-colors duration-300 hover:text-brand-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
