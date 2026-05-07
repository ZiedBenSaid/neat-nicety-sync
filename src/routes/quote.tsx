import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Globe2, Clock, Check, ArrowRight, ArrowLeft,
  ShieldCheck, Lock, Mail, X, CheckCircle2, Zap, Rocket,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { Container, Section } from "@/components/landing/Section";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get an Instant Quote — CertiLingua Certified Translations" },
      { name: "description", content: "Upload your document, choose your language pair and turnaround, and get an instant quote for ISO-certified translation. Accepted by USCIS, courts and embassies." },
      { property: "og:title", content: "Instant Quote — CertiLingua" },
      { property: "og:description", content: "Get a transparent quote for your certified translation in under 60 seconds." },
    ],
  }),
  component: QuotePage,
});

const LANGS = [
  "English", "German", "French", "Spanish", "Italian", "Portuguese", "Dutch",
  "Polish", "Russian", "Ukrainian", "Arabic", "Turkish", "Chinese (Simplified)",
  "Japanese", "Korean", "Hindi", "Romanian", "Greek", "Czech", "Swedish",
];

const BASE_PER_PAGE = 16.99;

function QuotePage() {
  const { t } = useI18n();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState(1);
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("German");
  const [urgency, setUrgency] = useState<"standard" | "rush" | "express">("standard");
  const [notary, setNotary] = useState(false);
  const [hardcopy, setHardcopy] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totals = useMemo(() => {
    const base = BASE_PER_PAGE * Math.max(1, pages);
    const urgencyMult = urgency === "express" ? 1 : urgency === "rush" ? 0.5 : 0;
    const urgencyFee = base * urgencyMult;
    const notaryFee = notary ? 29 : 0;
    const hardcopyFee = hardcopy ? 15 : 0;
    const total = base + urgencyFee + notaryFee + hardcopyFee;
    return { base, urgencyFee, notaryFee, hardcopyFee, total };
  }, [pages, urgency, notary, hardcopy]);

  const stepValid =
    (step === 1 && files.length > 0) ||
    (step === 2 && from && to && from !== to) ||
    step === 3 ||
    (step === 4 && name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email));

  function onFileChange(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).slice(0, 10 - files.length);
    setFiles((f) => [...f, ...next]);
    if (pages === 1 && next.length > 0) setPages(Math.max(pages, next.length));
  }

  function onSubmit() {
    setSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    router.navigate({ to: "/thank-you" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Section className="bg-navy text-navy-foreground">
          <Container className="py-12 md:py-16">
            <div className="flex flex-col items-start gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-foreground/90 backdrop-blur">
                <ShieldCheck className="size-3.5 text-highlight" /> ISO 17100 · 100% acceptance
              </span>
              <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">
                {t("quote.title")}
              </h1>
              <p className="max-w-2xl text-sm text-navy-foreground/80 md:text-base">
                {t("quote.subtitle")}
              </p>
              <p className="inline-flex items-center gap-2 rounded-full bg-highlight/15 px-3 py-1 text-xs font-semibold text-highlight">
                ⏱ {t("micro.deliveryHero")}
              </p>
            </div>
          </Container>
        </Section>

        <Section className="py-12 md:py-16">
          <Container>
            {submitted ? (
              <SuccessState
                onHome={() => router.navigate({ to: "/" })}
                title={t("quote.success.title")}
                sub={t("quote.success.sub")}
                cta={t("quote.success.cta")}
              />
            ) : (
              <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <Stepper step={step} />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="mt-8"
                    >
                      {step === 1 && (
                        <Step1
                          files={files}
                          setFiles={setFiles}
                          pages={pages}
                          setPages={setPages}
                          onFileChange={onFileChange}
                        />
                      )}
                      {step === 2 && (
                        <Step2 from={from} to={to} setFrom={setFrom} setTo={setTo} />
                      )}
                      {step === 3 && (
                        <Step3
                          urgency={urgency}
                          setUrgency={setUrgency}
                          notary={notary}
                          setNotary={setNotary}
                          hardcopy={hardcopy}
                          setHardcopy={setHardcopy}
                        />
                      )}
                      {step === 4 && (
                        <Step4
                          name={name}
                          email={email}
                          setName={setName}
                          setEmail={setEmail}
                          summary={{
                            from, to, pages, urgency, notary, hardcopy,
                            files: files.length, totals,
                          }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      disabled={step === 1}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground/80 transition hover:border-primary/40 hover:text-primary disabled:opacity-40"
                    >
                      <ArrowLeft className="size-4" /> {t("quote.back")}
                    </button>
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => stepValid && setStep((s) => s + 1)}
                        disabled={!stepValid}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:bg-primary/90 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {t("quote.next")} <ArrowRight className="size-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onSubmit}
                        disabled={!stepValid}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:bg-primary/90 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {t("quote.submit")} <Check className="size-4" />
                      </button>
                    )}
                  </div>
                </div>

                <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                  <PriceSummary totals={totals} pages={pages} urgency={urgency} notary={notary} hardcopy={hardcopy} />
                  <TrustPanel />
                </aside>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const items = [
    { n: 1, icon: Upload, label: "Upload" },
    { n: 2, icon: Globe2, label: "Languages" },
    { n: 3, icon: Clock, label: "Turnaround" },
    { n: 4, icon: Mail, label: "Submit" },
  ];
  return (
    <ol className="flex items-center gap-2">
      {items.map((it, i) => {
        const Icon = it.icon;
        const done = step > it.n;
        const active = step === it.n;
        return (
          <li key={it.n} className="flex flex-1 items-center gap-2">
            <div
              className={
                "grid size-9 shrink-0 place-items-center rounded-full border text-xs font-bold transition " +
                (done
                  ? "border-primary bg-primary text-primary-foreground"
                  : active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground/40")
              }
            >
              {done ? <Check className="size-4" /> : <Icon className="size-4" />}
            </div>
            <span className={"hidden text-xs font-semibold sm:inline " + (active || done ? "text-foreground" : "text-foreground/40")}>
              {it.label}
            </span>
            {i < items.length - 1 && (
              <span className={"h-px flex-1 " + (done ? "bg-primary" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Step1({
  files, setFiles, pages, setPages, onFileChange,
}: {
  files: File[];
  setFiles: (f: File[]) => void;
  pages: number;
  setPages: (n: number) => void;
  onFileChange: (l: FileList | null) => void;
}) {
  const { t } = useI18n();
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{t("quote.s1.title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("quote.s1.sub")}</p>

      <label
        htmlFor="file-upload"
        className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center transition hover:border-primary/50 hover:bg-primary/5"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFileChange(e.dataTransfer.files);
        }}
      >
        <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Upload className="size-6" />
        </div>
        <p className="mt-4 text-sm font-semibold">{t("quote.s1.drop")}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t("quote.s1.hint")}</p>
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.heic"
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="size-4 shrink-0 text-primary" />
                <span className="truncate">{f.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {(f.size / 1024).toFixed(0)} KB
                </span>
              </span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, j) => j !== i))}
                className="grid size-7 place-items-center rounded-md text-foreground/50 transition hover:bg-muted hover:text-destructive"
                aria-label="Remove file"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <label htmlFor="pages" className="text-sm font-semibold">
          {t("quote.s1.pages")}
        </label>
        <input
          id="pages"
          type="number"
          min={1}
          max={500}
          value={pages}
          onChange={(e) => setPages(Math.max(1, parseInt(e.target.value || "1", 10)))}
          className="mt-2 block w-32 rounded-lg border border-input bg-background px-3 py-2 text-sm font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

function Step2({
  from, to, setFrom, setTo,
}: {
  from: string; to: string; setFrom: (s: string) => void; setTo: (s: string) => void;
}) {
  const { t } = useI18n();
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{t("quote.s2.title")}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <LangSelect label={t("quote.s2.from")} value={from} onChange={setFrom} />
        <LangSelect label={t("quote.s2.to")} value={to} onChange={setTo} />
      </div>
      {from === to && (
        <p className="mt-3 text-xs text-destructive">Source and target language must differ.</p>
      )}
    </div>
  );
}

function LangSelect({ label, value, onChange }: { label: string; value: string; onChange: (s: string) => void }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {LANGS.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </div>
  );
}

function Step3({
  urgency, setUrgency, notary, setNotary, hardcopy, setHardcopy,
}: {
  urgency: "standard" | "rush" | "express";
  setUrgency: (u: "standard" | "rush" | "express") => void;
  notary: boolean; setNotary: (b: boolean) => void;
  hardcopy: boolean; setHardcopy: (b: boolean) => void;
}) {
  const { t } = useI18n();
  const opts: { id: "standard" | "rush" | "express"; icon: typeof Clock; t: string; d: string }[] = [
    { id: "standard", icon: Clock, t: t("quote.s3.standard"), d: t("quote.s3.standard.d") },
    { id: "rush", icon: Zap, t: t("quote.s3.rush"), d: t("quote.s3.rush.d") },
    { id: "express", icon: Rocket, t: t("quote.s3.express"), d: t("quote.s3.express.d") },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{t("quote.s3.title")}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {opts.map((o) => {
          const Icon = o.icon;
          const active = urgency === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setUrgency(o.id)}
              className={
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition " +
                (active
                  ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                  : "border-border bg-background hover:border-primary/40")
              }
            >
              <div className={"grid size-9 place-items-center rounded-lg " + (active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70")}>
                <Icon className="size-4" />
              </div>
              <span className="text-sm font-semibold">{o.t}</span>
              <span className="text-xs text-muted-foreground">{o.d}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold">{t("quote.s3.addons")}</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Toggle label={t("quote.s3.notary")} checked={notary} onChange={setNotary} />
          <Toggle label={t("quote.s3.hardcopy")} checked={hardcopy} onChange={setHardcopy} />
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className={"flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition " + (checked ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40")}>
      <span className={"grid size-5 place-items-center rounded border-2 transition " + (checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background")}>
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="font-medium">{label}</span>
    </label>
  );
}

function Step4({
  name, email, setName, setEmail, summary,
}: {
  name: string; email: string;
  setName: (s: string) => void; setEmail: (s: string) => void;
  summary: {
    from: string; to: string; pages: number;
    urgency: string; notary: boolean; hardcopy: boolean; files: number;
    totals: { total: number };
  };
}) {
  const { t } = useI18n();
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{t("quote.s4.title")}</h2>

      <dl className="mt-6 grid gap-2 rounded-xl border border-border bg-surface p-4 text-sm">
        <Row label="Files" value={`${summary.files}`} />
        <Row label="Pages" value={`${summary.pages}`} />
        <Row label="Language pair" value={`${summary.from} → ${summary.to}`} />
        <Row label="Turnaround" value={summary.urgency} />
        {summary.notary && <Row label="Notarization" value="Yes" />}
        {summary.hardcopy && <Row label="Hard copy" value="Yes" />}
        <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base font-bold">
          <span>{t("quote.s4.summary")}</span>
          <span className="text-primary">€{summary.totals.total.toFixed(2)}</span>
        </div>
      </dl>

      <div className="mt-6 space-y-4">
        <p className="text-sm font-semibold">{t("quote.s4.contact")}</p>
        <div>
          <label className="text-sm font-medium">{t("quote.s4.name")}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("quote.s4.email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold capitalize">{value}</span>
    </div>
  );
}

function PriceSummary({
  totals, pages, urgency, notary, hardcopy,
}: {
  totals: { base: number; urgencyFee: number; notaryFee: number; hardcopyFee: number; total: number };
  pages: number; urgency: string; notary: boolean; hardcopy: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {t("quote.s4.summary")}
      </h3>
      <p className="mt-2 text-4xl font-bold tracking-tighter text-primary">
        €{totals.total.toFixed(2)}
      </p>
      <ul className="mt-5 space-y-1.5 text-sm">
        <li className="flex justify-between">
          <span className="text-muted-foreground">{t("quote.price.base")} ({pages}p)</span>
          <span>€{totals.base.toFixed(2)}</span>
        </li>
        {totals.urgencyFee > 0 && (
          <li className="flex justify-between">
            <span className="text-muted-foreground capitalize">{t("quote.price.urgency")} · {urgency}</span>
            <span>€{totals.urgencyFee.toFixed(2)}</span>
          </li>
        )}
        {notary && (
          <li className="flex justify-between">
            <span className="text-muted-foreground">{t("quote.price.notary")}</span>
            <span>€{totals.notaryFee.toFixed(2)}</span>
          </li>
        )}
        {hardcopy && (
          <li className="flex justify-between">
            <span className="text-muted-foreground">{t("quote.price.hardcopy")}</span>
            <span>€{totals.hardcopyFee.toFixed(2)}</span>
          </li>
        )}
      </ul>
      <p className="mt-4 text-[11px] text-muted-foreground">
        Final price confirmed within 30 minutes by a project manager.
      </p>
    </div>
  );
}

function TrustPanel() {
  const items = [
    { icon: ShieldCheck, t: "100% acceptance guarantee" },
    { icon: Lock, t: "GDPR · NDA · encrypted" },
    { icon: Clock, t: "Avg. response under 1 hour, 24/7" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <ul className="space-y-3 text-sm">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.t} className="flex items-center gap-3">
              <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <span className="font-medium">{it.t}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SuccessState({ onHome, title, sub, cta }: { onHome: () => void; title: string; sub: string; cta: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-8" />
      </div>
      <h2 className="mt-5 text-2xl font-bold tracking-tighter">{title}</h2>
      <p className="mt-3 text-sm text-muted-foreground">{sub}</p>
      <button
        type="button"
        onClick={onHome}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:bg-primary/90"
      >
        {cta} <ArrowRight className="size-4" />
      </button>
      <p className="mt-6 text-xs text-muted-foreground">
        Need it faster? Email{" "}
        <Link to="/" className="font-semibold text-primary hover:underline">hello@certilingua.com</Link>
        {" "}· avg. reply under 1 hour.
      </p>
    </div>
  );
}
