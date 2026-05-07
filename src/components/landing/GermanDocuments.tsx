import { Baby, Car, Heart, GraduationCap, FileText, Scale, Briefcase, Globe2 } from "lucide-react";
import { Container, Section } from "./Section";

const docs = [
  { icon: Baby, name: "Geburtsurkunde", price: "ab €39" },
  { icon: Car, name: "Führerschein", price: "ab €35" },
  { icon: Heart, name: "Heiratsurkunde", price: "ab €39" },
  { icon: GraduationCap, name: "Zeugnisse & Diplome", price: "ab €45" },
  { icon: FileText, name: "Führungszeugnis", price: "ab €35" },
  { icon: Scale, name: "Gerichtsurkunden", price: "ab €49" },
  { icon: Briefcase, name: "Arbeitszeugnisse", price: "ab €42" },
  { icon: Globe2, name: "Reisepass / Ausweis", price: "ab €35" },
];

export function GermanDocuments() {
  return (
    <Section id="dokumente" className="bg-surface py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Häufig übersetzte Dokumente
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Welches Dokument brauchen Sie übersetzt?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Alle Dokumente werden von gerichtlich vereidigten Übersetzern beglaubigt.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {docs.map((d) => {
            const Icon = d.icon;
            return (
              <a
                key={d.name}
                href="#preisrechner"
                onClick={(e) => { e.preventDefault(); document.getElementById("preisrechner")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <span className="text-sm font-semibold">{d.name}</span>
                <span className="text-xs font-medium text-muted-foreground">{d.price}</span>
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
