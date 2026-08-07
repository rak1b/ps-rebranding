# PaymentSave — Rebrand Landing Page

A fully animated rebrand concept for [paymentsave.co.uk](https://paymentsave.co.uk), built with Next.js. White + sky-blue brand palette, design and motion language inspired by modern fintech leaders.

## Stack

- **Next.js 16** (App Router, Turbopack, fully static output)
- **Tailwind CSS v4** — design tokens in `app/globals.css` via `@theme`
- **Framer Motion** — scroll reveals, springs, layout animations, the terminal state machine
- **Lenis** — buttery smooth scrolling
- **next/font** — self-hosted Inter (body) + Space Grotesk (display)

## Run it

```bash
npm install
npm run dev      # development on http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Highlights

- **Animated payment terminal** (`components/Terminal.tsx`) — a CSS-built card machine that loops a real payment: amount keyed in digit-by-digit → contactless tap with ripple rings and a card flying in → processing → approved with an SVG-drawn checkmark and confetti burst. Live payment toasts and a payout chip float alongside.
- **Interactive savings calculator** — drag a turnover slider, watch the yearly saving spring-update; fee comparison bars grow on scroll.
- **Live transaction feed** — Teya-style dashboard mock where new sales slide in every couple of seconds and the daily total ticks up.
- **Ambient motion everywhere** — aurora gradient blobs, dual-direction testimonial marquees (pause on hover), magnetic CTAs with shine sweeps, count-up stats, tilt-on-hover product cards, glass navbar with scroll progress bar, staggered mobile menu.
- **Performance & accessibility** — transform/opacity-only animations, zero external images (all SVG/CSS), static prerender, and full `prefers-reduced-motion` support (CSS loops stop, terminal settles on its success state).
