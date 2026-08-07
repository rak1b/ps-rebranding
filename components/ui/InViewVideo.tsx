"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping video that only plays while on screen and never
 * autoplays for reduced-motion users. Keep preload="none" for
 * below-the-fold placements so heavy files don't block first load.
 */
export function InViewVideo({
  src,
  className,
  preload = "none",
}: {
  src: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      loop
      playsInline
      preload={preload}
      aria-hidden
    />
  );
}
