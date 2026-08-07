"use client";

import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { InViewVideo } from "./ui/InViewVideo";

const VIDEOS = [
  {
    src: "/videos/5240924-hd_1920_1080_25fps.mp4",
    preload: "metadata" as const,
    name: "The Corner Deli",
    line: "Switched in an afternoon",
  },
  {
    src: "/videos/4170160-uhd_3840_2160_25fps.mp4",
    preload: "none" as const,
    name: "Brew & Bean",
    line: "Queues move twice as fast",
  },
  {
    src: "/videos/8657613-uhd_4096_2160_25fps.mp4",
    preload: "none" as const,
    name: "Luna Boutique",
    line: "Saving £2,400 a year",
  },
];

export default function VideoWall() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50/70 pb-24 pt-20 sm:pb-32">
      <div aria-hidden className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]" />
        <div className="absolute -right-24 top-0 h-[38vh] w-[38vh] rounded-full bg-brand-200/50 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            In the wild
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            Built for <span className="text-gradient">real counters</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.12}>
          {VIDEOS.map((video, i) => (
            <StaggerItem
              key={video.src}
              className={i === 1 ? "md:translate-y-10" : ""}
            >
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_36px_80px_-32px_rgba(2,134,201,0.4)] ring-1 ring-ink-100">
                <InViewVideo
                  src={video.src}
                  preload={video.preload}
                  className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                {/* Glass catch-light */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-bold text-white">
                    {video.name}
                  </p>
                  <p className="text-sm text-white/70">{video.line}</p>
                </figcaption>
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md ring-1 ring-white/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-400 animate-pulse-dot motion-reduce:animate-none" />
                  paymentsave customer
                </span>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
