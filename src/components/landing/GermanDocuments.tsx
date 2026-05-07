import {
  Baby, Heart, Scale, GraduationCap, FileWarning,
  BookUser, Briefcase, Stethoscope, FileSignature, Car,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

const docs = [
  { icon: Baby, key: "geburtsurkunde", de: "Geburtsurkunde", en: "Birth Certificate" },
  { icon: Heart, key: "heiratsurkunde", de: "Heiratsurkunde", en: "Marriage Certificate" },
  { icon: Scale, key: "scheidungsurteil", de: "Scheidungsurteil", en: "Divorce Certificate" },
  { icon: GraduationCap, key: "zeugnisse", de: "Schulzeugnisse & Universitätszeugnisse", en: "Academic Transcripts" },
  { icon: FileWarning, key: "strafregister", de: "Strafregisterauszug", en: "Police Clearance Certificate" },
  { icon: BookUser, key: "reisepass", de: "Reisepass & Personalausweis", en: "Passport & ID" },
  { icon: Briefcase, key: "arbeitsvertrag", de: "Arbeitsvertrag", en: "Employment Contract" },
  { icon: Stethoscope, key: "medizinisch", de: "Medizinische Unterlagen", en: "Medical Records" },
  { icon: FileSignature, key: "vollmacht", de: "Vollmacht", en: "Power of Attorney" },
  { icon: Car, key: "fuehrerschein", de: "Führerschein", en: "Driver's License" },
];

export function GermanDocuments() {
  const { lang, t } = useI18n();
  const isDe = lang === "DE";

  return (
    <Section id="dokumente" className="bg-surface py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("docs.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {isDe ? "Unsere Dokumente" : "Our Documents"}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("docs.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {docs.map((d) => {
            const Icon = d.icon;
            const primary = isDe ? d.de : d.en;
            const secondary = isDe ? d.en : d.de;
            return (
              <Link
                key={d.key}
                to="/order"
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <span className="text-sm font-semibold leading-tight">{primary}</span>
                <span className="text-xs font-medium text-muted-foreground leading-tight">{secondary}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
