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

        <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {languages.map((l) => (
            <div
              key={l.name}
              className="group flex flex-col items-center justify-center gap-3 p-2"
            >
              <div className="relative">
                <span className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-md transition group-hover:bg-primary/40" />
                <div className="relative size-16 overflow-hidden rounded-full border-4 border-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] ring-2 ring-primary/20 transition group-hover:scale-110 group-hover:ring-primary/60">
                  <img
                    src={`https://flagcdn.com/w160/${l.code}.png`}
                    srcSet={`https://flagcdn.com/w320/${l.code}.png 2x`}
                    alt={`${l.name} flag`}
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary shadow-md" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
