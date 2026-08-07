"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";
import { InViewVideo } from "./ui/InViewVideo";

export default function CTA() {
  return (
    <section id="cta" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-500 to-mint-400 px-6 py-16 text-center shadow-[0_48px_100px_-40px_rgba(11,165,236,0.6)] sm:px-16 sm:py-24">
          {/* Video layer under the brand wash */}
          <div aria-hidden className="absolute inset-0">
            <InViewVideo
              src="/videos/8465184-uhd_3840_2160_25fps.mp4"
              preload="none"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 via-brand-500/85 to-mint-400/80" />
          </div>
          {/* Decorative layers */}
          <div aria-hidden className="absolute inset-0">
            <div className="bg-grid absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,black,transparent)]" />
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl animate-aurora-1 motion-reduce:animate-none" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-ink-900/20 blur-3xl animate-aurora-2 motion-reduce:animate-none" />
            {/* Floating coins */}
            {[
              { left: "8%", top: "18%", delay: 0 },
              { left: "88%", top: "24%", delay: 0.8 },
              { left: "14%", top: "72%", delay: 1.4 },
              { left: "82%", top: "68%", delay: 0.4 },
            ].map((coin, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + coin.delay * 0.3, type: "spring", stiffness: 200, damping: 15 }}
                style={{ left: coin.left, top: coin.top, animationDelay: `${coin.delay}s` }}
                className="absolute hidden h-10 w-10 items-center justify-center rounded-full bg-white/20 font-display text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur-sm animate-float motion-reduce:animate-none sm:flex"
              >
                £
              </motion.span>
            ))}
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Ready to keep more of every sale?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
              Get a free, no-obligation quote in minutes. We&apos;ll beat your
              current rates — or tell you honestly to stay put.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href="#"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-9 py-4 text-base font-bold text-brand-700 shadow-2xl transition-transform duration-300 hover:scale-[1.05] active:scale-95"
                >
                  Get your free quote
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand-100/70 to-transparent animate-shine motion-reduce:animate-none" />
                </a>
              </Magnetic>
              <a
                href="tel:03303411330"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-white ring-1 ring-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:ring-white/70"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 3.2 6.5a1.8 1.8 0 0 1 1.8-2z" />
                </svg>
                Call 0330 341 1330
              </a>
            </div>

            <p className="mt-8 text-sm text-white/70">
              Free setup · No exit fees · 5.0 ★ rated support
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
