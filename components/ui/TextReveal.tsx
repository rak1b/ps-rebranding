"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Word({
  progress,
  range,
  children,
  accent,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block ${accent ? "text-gradient" : ""}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * Scroll-scrubbed word-by-word reveal: each word illuminates as it
 * passes through the reading zone. Wrap accent words in *asterisks*.
 */
export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  if (reduce) {
    return (
      <p className={className}>
        {words.map((w, i) => (
          <span key={i}>
            {w.startsWith("*") ? (
              <span className="text-gradient">{w.replaceAll("*", "")}</span>
            ) : (
              w
            )}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className ?? ""}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const accent = word.startsWith("*");
        return (
          <span key={i} className="mr-[0.28em] inline-block">
            <Word progress={scrollYProgress} range={[start, end]} accent={accent}>
              {word.replaceAll("*", "")}
            </Word>
          </span>
        );
      })}
    </p>
  );
}
