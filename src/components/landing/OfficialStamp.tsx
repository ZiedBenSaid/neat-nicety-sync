import { Stamp, PenTool, Building2, GraduationCap, Landmark, Scale } from "lucide-react";
import { Container, Section } from "./Section";

export function OfficialStamp() {
  const authorities = [
    { icon: Building2, label: "Standesämter" },
    { icon: GraduationCap, label: "Universitäten" },
    { icon: Landmark, label: "Behörden" },
    { icon: Scale, label: "Gerichte" },
  ];
  return (
    <Section className="bg-surface py-16 md:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/5" />
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-primary/30" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="grid size-32 place-items-center rounded-full border-4 border-primary bg-white text-primary shadow-xl">
                <Stamp className="size-14" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
                <PenTool className="size-4 text-primary" />
                <span className="font-serif text-lg italic text-foreground/80">Unterschrift</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Offizielles Siegel & Unterschrift
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Anerkannt bei Standesämtern, Universitäten und Behörden
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Jede beglaubigte Übersetzung wird von einem in Deutschland gerichtlich
              vereidigten Übersetzer mit Originalstempel und handschriftlicher Unterschrift
              versehen — rechtsgültig im gesamten Bundesgebiet sowie international.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {authorities.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.label} className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-semibold">
                    <Icon className="size-4 text-primary" /> {a.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
