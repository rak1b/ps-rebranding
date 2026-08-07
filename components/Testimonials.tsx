"use client";

import { Reveal } from "./ui/Reveal";

type Review = {
  quote: string;
  name: string;
  business: string;
  since: string;
};

const ROW_A: Review[] = [
  {
    quote:
      "Switched from our old provider in an afternoon. Fees nearly halved and the money's in the bank before we open.",
    name: "Sarah M.",
    business: "Café owner, Leeds",
    since: "Customer since 2024",
  },
  {
    quote:
      "The terminal just works. Tap, done, next customer. Queue times at lunch have genuinely dropped.",
    name: "Danny O.",
    business: "Street food, London",
    since: "Customer since 2025",
  },
  {
    quote:
      "Rang support at 11pm on a Saturday when a reader dropped offline. A human answered in under a minute.",
    name: "Priya K.",
    business: "Restaurant, Birmingham",
    since: "Customer since 2023",
  },
  {
    quote:
      "Payment links changed my business. Deposits are paid before I even leave the quote.",
    name: "Tom H.",
    business: "Electrician, Manchester",
    since: "Customer since 2025",
  },
];

const ROW_B: Review[] = [
  {
    quote:
      "They reviewed my statement and found charges I didn't even know I was paying. Saving about £2,400 a year.",
    name: "Lucy B.",
    business: "Salon owner, Bristol",
    since: "Customer since 2024",
  },
  {
    quote:
      "Set up across three sites in a week. The dashboard showing all shops in one place is brilliant.",
    name: "Ahmed R.",
    business: "Convenience stores, Glasgow",
    since: "Customer since 2023",
  },
  {
    quote:
      "No contract lock-in was the reason I tried them. The service is the reason I stayed.",
    name: "Grace W.",
    business: "Florist, Brighton",
    since: "Customer since 2025",
  },
  {
    quote:
      "Next-day payouts on weekends too. For a pub, that's cash flow sorted.",
    name: "Mike D.",
    business: "Pub landlord, Newcastle",
    since: "Customer since 2024",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#00b67a]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M10 1.5l2.47 5.26 5.53.7-4.07 3.95.99 5.59L10 14.27 5.08 17l.99-5.59L2 7.46l5.53-.7L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="w-[320px] shrink-0 rounded-3xl bg-white p-6 shadow-[0_16px_44px_-24px_rgba(6,19,37,0.18)] ring-1 ring-ink-100 transition-shadow duration-300 hover:shadow-[0_24px_54px_-24px_rgba(11,165,236,0.3)] sm:w-[380px]">
    <Stars />
      <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-700">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 font-display text-sm font-bold text-brand-700">
          {review.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-bold text-ink-900">{review.name}</p>
          <p className="text-xs text-ink-400">
            {review.business} · {review.since}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="overflow-hidden py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Wall of love
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
          Businesses that <span className="text-gradient">switched & stayed</span>
        </h2>
        <p className="mt-4 text-lg text-ink-500">
          Rated 5.0 from 469+ verified reviews on Trustpilot.
        </p>
      </Reveal>

      <div className="mt-14 space-y-5">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max gap-5 pr-5 animate-marquee-slow motion-reduce:animate-none hover:[animation-play-state:paused]">
            {[...ROW_A, ...ROW_A].map((review, i) => (
              <ReviewCard key={`a-${i}`} review={review} />
            ))}
          </div>
        </div>
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max gap-5 pr-5 animate-marquee-reverse motion-reduce:animate-none hover:[animation-play-state:paused]">
            {[...ROW_B, ...ROW_B].map((review, i) => (
              <ReviewCard key={`b-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
