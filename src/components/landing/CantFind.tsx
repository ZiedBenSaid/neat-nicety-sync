import { FileQuestion, BadgeCheck, Stamp } from "lucide-react";
import { Container, Section } from "./Section";

export function CantFind() {
  return (
    <Section className="relative overflow-hidden bg-navy py-20 text-navy-foreground">
      {/* Decorative scattered icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0 text-navy-foreground/[0.06]">
        <FileQuestion className="absolute left-[6%] top-[18%] size-14" strokeWidth={1.2} />
        <BadgeCheck className="absolute left-[22%] top-[60%] size-12" strokeWidth={1.2} />
        <Stamp className="absolute left-[38%] top-[20%] size-10" strokeWidth={1.2} />
        <FileQuestion className="absolute right-[34%] top-[22%] size-12" strokeWidth={1.2} />
        <BadgeCheck className="absolute right-[10%] top-[28%] size-14" strokeWidth={1.2} />
        <Stamp className="absolute right-[6%] bottom-[18%] size-12" strokeWidth={1.2} />
        <FileQuestion className="absolute left-[14%] bottom-[15%] size-10" strokeWidth={1.2} />
        <BadgeCheck className="absolute right-[28%] bottom-[20%] size-10" strokeWidth={1.2} />
      </div>

      <Container className="relative text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Can&apos;t find your Document?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-navy-foreground/75 md:text-base">
          Your language or document type not listed?
          <br />
          We handle all types of official documents in over 120 languages.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* curly arrow - hidden on mobile */}
          <svg
            aria-hidden
            viewBox="0 0 80 50"
            className="hidden h-10 w-14 -rotate-6 text-highlight sm:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 8 C 25 -2, 55 25, 65 38" />
            <path d="M58 28 L 65 38 L 55 41" />
          </svg>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/90 sm:w-auto">
            Contact Us
          </button>
        </div>
      </Container>
    </Section>
  );
}
