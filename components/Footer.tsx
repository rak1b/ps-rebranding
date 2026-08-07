import Image from "next/image";
import { Reveal } from "./ui/Reveal";

const COLUMNS = [
  {
    title: "Products",
    links: [
      "Card machines",
      "Mobile readers",
      "Online payments",
      "Payment links",
      "Virtual terminal",
      "EPOS systems",
    ],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Partners", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help centre", "Pricing guide", "Switching guide", "Blog", "API docs"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of service", "Cookie policy", "Complaints"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
            <div>
              <a href="#top" className="inline-block">
                <Image
                  src="/paymentsave-Logo-2048x448.png"
                  alt="PaymentSave"
                  width={2048}
                  height={448}
                  className="h-9 w-auto"
                />
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
                Fast, secure card payments for UK businesses — with next-day
                payouts and support that actually answers.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-ink-500">
                <span className="flex items-center gap-1 rounded-full bg-[#00b67a]/10 px-3 py-1.5 text-[#00896b]">
                  ★ 5.0 on Trustpilot
                </span>
                <span className="rounded-full bg-ink-50 px-3 py-1.5 ring-1 ring-ink-100">
                  PCI DSS Level 1
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {COLUMNS.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-bold text-ink-900">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-ink-400 transition-colors duration-200 hover:text-brand-600"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-8 text-xs text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} PaymentSave. All rights reserved.
            Rebrand concept.
          </p>
          <p>Made with ⚡ in the UK</p>
        </div>
      </div>
    </footer>
  );
}
