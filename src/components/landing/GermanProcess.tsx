import { Upload, CreditCard, Mail, ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";

const steps = [
  {
    icon: Upload,
    title: "Dokument hochladen",
    body: "Scan oder Foto Ihres Dokuments hochladen — 100% DSGVO-konforme Datenübertragung.",
  },
  {
    icon: CreditCard,
    title: "Festpreis erhalten & bezahlen",
    body: "Sie bekommen sofort einen verbindlichen Festpreis. Sicher zahlen per SEPA, Kreditkarte oder PayPal.",
  },
  {
    icon: Mail,
    title: "Beglaubigte Übersetzung per Post & PDF erhalten",
    body: "Digitales PDF in 24 Stunden, Original mit Stempel & Unterschrift per Einschreiben.",
  },
];

export function GermanProcess() {
  return (
    <Section id="ablauf" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">So funktioniert's</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            In 3 Schritten zur beglaubigten Übersetzung
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Schnell, transparent und ohne Behördengang — alles bequem online.
          </p>
        </div>

        <ol className="relative mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <span className="absolute -top-4 grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
                  {i + 1}
                </span>
                <span className="mt-3 grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                {i < steps.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 text-primary/40 md:block" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
