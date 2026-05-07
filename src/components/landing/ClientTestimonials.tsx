import { useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section } from "./Section";

type T = { name: string; role: string; body: string; initials: string; flag: string };

const testimonials: T[] = [
  {
    name: "Dr. Eleanor Whitfield",
    role: "Immigration Attorney · New York",
    body: "I've referred dozens of clients to CertiLingua for USCIS filings. Every single translation has been accepted on first submission — the formatting and certification statement are exactly what adjudicators expect.",
    initials: "EW",
    flag: "us",
  },
  {
    name: "Marcus Reinhardt",
    role: "Visa applicant · Berlin → London",
    body: "Submitted my marriage certificate at 9pm, certified PDF in my inbox by 7am. The Home Office accepted it without a single follow-up. Worth every cent for the peace of mind.",
    initials: "MR",
    flag: "de",
  },
  {
    name: "Ana Beatriz Carvalho",
    role: "PhD candidate · Sorbonne",
    body: "My diploma and transcripts were translated and apostille-ready in under 36 hours. Professional, discreet, and the price was exactly what was quoted upfront. Highly recommended.",
    initials: "AC",
    flag: "br",
  },
];

export function ClientTestimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <Section className="bg-navy py-16 text-navy-foreground md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-highlight">
            What Our Clients Say
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
            Trusted by professionals handling high-stakes documents
          </h2>
        </div>

        <div className="relative mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur md:p-10">
          <Quote className="absolute -top-4 left-6 size-9 rounded-full bg-highlight p-2 text-navy" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="size-4 fill-highlight text-highlight" />
            ))}
          </div>
          <p className="mt-4 text-lg leading-relaxed text-navy-foreground/95 md:text-xl">
            "{t.body}"
          </p>
          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <span className="grid size-11 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {t.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-semibold">
                {t.name}
                <img src={`https://flagcdn.com/w20/${t.flag}.png`} alt="" className="size-3.5 rounded-[2px] object-cover" />
              </p>
              <p className="text-xs text-navy-foreground/70">{t.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
                className="grid size-9 place-items-center rounded-full border border-white/15 text-navy-foreground/80 transition hover:border-highlight hover:text-highlight"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setI((v) => (v + 1) % testimonials.length)}
                className="grid size-9 place-items-center rounded-full border border-white/15 text-navy-foreground/80 transition hover:border-highlight hover:text-highlight"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-highlight" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
