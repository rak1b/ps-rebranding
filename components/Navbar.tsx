"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";

const LINKS = [
  { label: "Card machines", href: "#products" },
  { label: "Savings", href: "#savings" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function Logo({ dark }: { dark: boolean }) {
  return (
    <a href="#top" className="flex items-center">
      <Image
        src="/paymentsave-Logo-2048x448.png"
        alt="PaymentSave"
        width={2048}
        height={448}
        priority
        className={`h-9 w-auto transition-all duration-300 ${
          dark ? "lg:brightness-0 lg:invert" : ""
        }`}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-mint-400"
        style={{ scaleX: progress }}
      />

      <motion.header
        className={`animate-nav-drop fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-ink-100 shadow-[0_8px_30px_-12px_rgba(6,19,37,0.12)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo dark={false} />

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors duration-300 hover:text-ink-900"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#pricing"
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition-colors duration-300 hover:text-brand-600"
            >
              Sign in
            </a>
            <a
              href="#cta"
              className="group relative overflow-hidden rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink-900/20 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span className="relative z-10">Get a free quote</span>
              <span className="absolute inset-0 -z-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full ring-1 ring-ink-200 transition-colors duration-300 lg:hidden"
          >
            {[
              open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
              open ? { opacity: 0 } : { opacity: 1 },
              open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                animate={anim}
                className="h-[2px] w-5 rounded-full bg-ink-900"
              />
            ))}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass overflow-hidden border-b border-ink-100 lg:hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
                }}
                className="space-y-1 px-5 pb-6 pt-2"
              >
                {LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-base font-semibold text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="pt-3"
                >
                  <a
                    href="#cta"
                    onClick={() => setOpen(false)}
                    className="block rounded-full bg-ink-900 px-5 py-3.5 text-center text-sm font-semibold text-white"
                  >
                    Get a free quote
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
