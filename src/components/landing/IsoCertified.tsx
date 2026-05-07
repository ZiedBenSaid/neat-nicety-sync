import { BadgeCheck, Award } from "lucide-react";
import { Container, Section } from "./Section";
import iso9001 from "@/assets/iso-9001.png";
import iso17100 from "@/assets/iso-17100.png";
import iso13485 from "@/assets/iso-13485.png";

const badges = [
  { title: "Quality Management System", code: "ISO 9001", image: iso9001 },
  { title: "Translation services", code: "ISO 17100", image: iso17100 },
  { title: "Compliant Medical Translations", code: "ISO 13485", image: iso13485 },
];

export function IsoCertified() {
  return (
    <Section className="relative overflow-hidden bg-background py-20">
      {/* Faded scattered checkmark badges background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 text-primary/15">
        <BadgeCheck className="absolute left-[3%] top-[12%] size-12" strokeWidth={1.4} />
        <BadgeCheck className="absolute left-[8%] top-[55%] size-7" strokeWidth={1.4} />
        <BadgeCheck className="absolute left-[40%] top-[82%] size-9" strokeWidth={1.4} />
        <BadgeCheck className="absolute right-[5%] top-[10%] size-14" strokeWidth={1.4} />
        <BadgeCheck className="absolute right-[3%] top-[48%] size-16" strokeWidth={1.4} />
        <BadgeCheck className="absolute right-[12%] bottom-[12%] size-9" strokeWidth={1.4} />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
            <Award className="size-3.5" />
            ISO Certified
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            We are ISO Certified
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Ensuring the highest standards in quality and security
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {badges.map((b) => (
            <div key={b.code} className="flex flex-col items-center text-center">
              <img
                src={b.image}
                alt={`${b.code} certification badge`}
                loading="lazy"
                className="size-32 object-contain md:size-36"
              />
              <h3 className="mt-5 text-base font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{b.code}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
