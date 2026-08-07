import type { Metadata } from "next";
import { Caveat, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PaymentSave — Card payments that cost less",
  description:
    "Fast, secure card machines for retail, hospitality and on-the-go. Next-day payouts, rates from 0.29% and 5-star rated support. Get a free quote in minutes.",
  openGraph: {
    title: "PaymentSave — Card payments that cost less",
    description:
      "Fast, secure card machines with next-day payouts and 5-star rated UK support.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
