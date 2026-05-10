import { Globe } from "lucide-react";
import { Container, Section } from "./Section";
import { GlobeBackdrop } from "./GlobeBackdrop";

type Lang = { name: string; code: string; top: string; left: string };

// Approximate map coordinates over the dotted world background
const languages: Lang[] = [
  { name: "English (US)", code: "us", top: "32%", left: "18%" },
  { name: "Portuguese", code: "br", top: "68%", left: "26%" },
  { name: "English (UK)", code: "gb", top: "26%", left: "44%" },
  { name: "French", code: "fr", top: "38%", left: "47%" },
  { name: "Spanish", code: "es", top: "52%", left: "40%" },
  { name: "Italian", code: "it", top: "62%", left: "50%" },
  { name: "German", code: "de", top: "16%", left: "52%" },
  { name: "Greek", code: "gr", top: "70%", left: "56%" },
  { name: "Arabic", code: "ae", top: "56%", left: "62%" },
  { name: "Russian", code: "ru", top: "20%", left: "70%" },
  { name: "Chinese", code: "cn", top: "40%", left: "78%" },
  { name: "Japanese", code: "jp", top: "44%", left: "92%" },
  { name: "Korean", code: "kr", top: "60%", left: "88%" },
  { name: "Ukrainian", code: "ua", top: "30%", left: "60%" },
];

function Pill({ name, code }: { name: string; code: string }) {
  return (
    <div className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/95 px-3 py-1.5 shadow-[0_6px_20px_-6px_rgba(15,23,42,0.25)] backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_10px_28px_-6px_rgba(37,99,235,0.35)]">
      <span className="overflow-hidden rounded-sm ring-1 ring-black/5">
        <img
          src={`https://flagcdn.com/w80/${code}.png`}
          srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
          alt=""
          loading="lazy"
          className="block h-4 w-6 object-cover"
        />
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">{name}</span>
    </div>
  );
}

export function Languages() {
  return (
    <Section className="relative overflow-hidden bg-surface py-12 md:py-20">
      <GlobeBackdrop opacity={0.45} />
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

        {/* Desktop / tablet: scattered pills over the dotted map */}
        <div className="relative mx-auto mt-10 hidden h-[460px] w-full max-w-5xl md:block">
          {languages.map((l) => (
            <div
              key={l.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-[fadeIn_0.6s_ease-out_both]"
              style={{ top: l.top, left: l.left }}
            >
              <Pill name={l.name} code={l.code} />
              <span className="mx-auto mt-1 block size-1.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.15)]" />
            </div>
          ))}
        </div>

        {/* Mobile: clean grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
          {languages.map((l) => (
            <div
              key={l.name}
              className="flex items-center gap-2 rounded-full border border-border bg-white/95 px-3 py-2 shadow-sm"
            >
              <img
                src={`https://flagcdn.com/w80/${l.code}.png`}
                srcSet={`https://flagcdn.com/w160/${l.code}.png 2x`}
                alt=""
                loading="lazy"
                className="block h-4 w-6 rounded-sm object-cover ring-1 ring-black/5"
              />
              <span className="truncate text-sm font-semibold">{l.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
