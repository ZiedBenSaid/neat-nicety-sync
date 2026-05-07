import { Globe } from "lucide-react";
import { Container, Section } from "./Section";
import { GlobeBackdrop } from "./GlobeBackdrop";

const languages = [
  { name: "German", code: "de" },
  { name: "English", code: "gb" },
  { name: "Spanish", code: "es" },
  { name: "Chinese", code: "cn" },
  { name: "French", code: "fr" },
  { name: "Japanese", code: "jp" },
  { name: "Ukrainian", code: "ua" },
  { name: "Arabic", code: "ae" },
  { name: "Portuguese", code: "pt" },
  { name: "Greek", code: "gr" },
  { name: "Italian", code: "it" },
  { name: "Korean", code: "kr" },
];

export function Languages() {
  return (
    <Section className="relative overflow-hidden bg-surface py-20 md:py-24">
      <GlobeBackdrop opacity={0.5} />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Globe className="mx-auto size-8 text-primary" strokeWidth={1.8} />
          <h2 className="mt-3 text-3xl font-bold tracking-tighter md:text-4xl">
            Certified Translations in{" "}
            <span className="text-primary">50+ Languages</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            We support all official European Union languages and many additional global languages,
            delivered by native-speaking, ISO-certified professionals and accepted by official
            institutions worldwide.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {languages.map((l) => (
            <div
              key={l.name}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="overflow-hidden rounded-md ring-1 ring-border/60 shadow-sm">
                <img
                  src={`https://flagcdn.com/w160/${l.code}.png`}
                  srcSet={`https://flagcdn.com/w320/${l.code}.png 2x`}
                  alt={`${l.name} flag`}
                  width={64}
                  height={42}
                  loading="lazy"
                  className="block h-[42px] w-[64px] object-cover"
                />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
