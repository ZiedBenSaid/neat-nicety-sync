import { useMemo, useState } from "react";
import { Calculator, ShieldCheck, Mail, Truck, Lock } from "lucide-react";
import { Container, Section } from "./Section";

const LANGS = [
  "Deutsch", "Englisch", "Französisch", "Spanisch", "Italienisch",
  "Polnisch", "Russisch", "Türkisch", "Arabisch", "Rumänisch",
  "Ukrainisch", "Niederländisch", "Portugiesisch", "Chinesisch",
];

const DOC_TYPES: { label: string; base: number }[] = [
  { label: "Geburtsurkunde", base: 39 },
  { label: "Heiratsurkunde", base: 39 },
  { label: "Führerschein", base: 35 },
  { label: "Zeugnis / Diplom", base: 45 },
  { label: "Führungszeugnis", base: 35 },
  { label: "Arbeitszeugnis", base: 42 },
  { label: "Reisepass / Ausweis", base: 35 },
  { label: "Sonstiges Dokument", base: 49 },
];

export function PriceCalculator() {
  const [source, setSource] = useState("Deutsch");
  const [target, setTarget] = useState("Englisch");
  const [docType, setDocType] = useState(DOC_TYPES[0].label);
  const [shipping, setShipping] = useState<"digital" | "post">("digital");

  const total = useMemo(() => {
    const base = DOC_TYPES.find((d) => d.label === docType)?.base ?? 39;
    const ship = shipping === "post" ? 9.9 : 0;
    return (base + ship).toFixed(2).replace(".", ",");
  }, [docType, shipping]);

  return (
    <Section id="preisrechner" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Calculator className="size-4" /> Sofort-Preisrechner
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Festpreis in 30 Sekunden berechnen
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Transparent, ohne Anmeldung — Sie sehen den Preis, bevor Sie bestellen.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-[1.4fr_1fr] md:p-8">
          <div className="grid gap-4">
            <Field label="Quellsprache">
              <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                {LANGS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Zielsprache">
              <select value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                {LANGS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Dokumententyp">
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                {DOC_TYPES.map((d) => <option key={d.label}>{d.label}</option>)}
              </select>
            </Field>

            <div>
              <span className="mb-1.5 block text-sm font-semibold text-foreground/85">Lieferung</span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <ShipOption
                  active={shipping === "digital"}
                  onClick={() => setShipping("digital")}
                  icon={Mail}
                  title="Digitale Kopie (PDF)"
                  hint="Sofort per E-Mail · inklusive"
                />
                <ShipOption
                  active={shipping === "post"}
                  onClick={() => setShipping("post")}
                  icon={Truck}
                  title="Physischer Versand"
                  hint="Einschreiben · +€9,90"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-xl bg-primary/5 p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Direktangebot</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">€{total}</span>
              <span className="text-sm text-muted-foreground">inkl. MwSt.</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {source} → {target} · {docType}
            </p>
            <ul className="mt-5 space-y-2 text-xs text-foreground/80">
              <li className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-primary" /> Beglaubigt von vereidigtem Übersetzer</li>
              <li className="flex items-center gap-2"><Lock className="size-3.5 text-primary" /> 100% DSGVO-konform</li>
            </ul>
            <a
              href="#quote-form"
              onClick={(e) => { e.preventDefault(); document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:bg-primary/90"
            >
              Jetzt verbindlich bestellen
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground/85">{label}</span>
      {children}
    </label>
  );
}

function ShipOption({
  active, onClick, icon: Icon, title, hint,
}: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; title: string; hint: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${active ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-input bg-background hover:border-primary/40"}`}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"}`}>
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
    </button>
  );
}
