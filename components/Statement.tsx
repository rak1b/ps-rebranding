import { TextReveal } from "./ui/TextReveal";

export default function Statement() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-brand-600">
          The bigger picture
        </p>
        <TextReveal
          text="Every tap, link and checkout flows into *one* *account* — settled next day, visible in real time, and backed by humans who *actually* *answer* *the* *phone.*"
          className="mt-8 justify-center text-center font-display text-3xl font-bold leading-snug tracking-tight text-ink-950 sm:text-5xl sm:leading-snug"
        />
      </div>
    </section>
  );
}
