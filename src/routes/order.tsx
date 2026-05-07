import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Upload, Check, ArrowRight, ArrowLeft, ShieldCheck, Lock, X, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container, Section } from "@/components/landing/Section";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Certified Translation — CertiLingua" },
      { name: "description", content: "Order your certified translation in 4 simple steps." },
    ],
  }),
  component: OrderPage,
});

const LANGS = [
  "Deutsch", "English", "Français", "Español", "Italiano", "Português",
  "Nederlands", "Polski", "Русский", "Українська", "العربية", "Türkçe",
  "中文", "日本語", "한국어", "हिन्दी", "Română", "Ελληνικά",
];

const RATES = { standard: 24, express: 39, rush: 59 } as const;
type Urgency = keyof typeof RATES;

function OrderPage() {
  const { t, lang } = useI18n();
  const isDe = lang === "DE";
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [from, setFrom] = useState("Deutsch");
  const [to, setTo] = useState("English");
  const [notes, setNotes] = useState("");
  const [urgency, setUrgency] = useState<Urgency>("standard");
  const [pages, setPages] = useState(1);
  const [notary, setNotary] = useState(false);
  const [hardcopy, setHardcopy] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(isDe ? "Deutschland" : "Germany");
  const [orderNo] = useState(() => "CL-" + Math.floor(100000 + Math.random() * 900000));

  const totals = useMemo(() => {
    const base = RATES[urgency] * Math.max(1, pages);
    const addons = (notary ? 19 : 0) + (hardcopy ? 12 : 0);
    return { base, addons, total: base + addons };
  }, [urgency, pages, notary, hardcopy]);

  function onFiles(list: FileList | null) {
    if (!list) return;
    const accepted = Array.from(list).filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((prev) => [...prev, ...accepted].slice(0, 10));
  }

  const canNext =
    (step === 1 && files.length > 0 && from && to && from !== to) ||
    (step === 2 && pages >= 1) ||
    (step === 3 && name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email) && street && zip && city);

  const labels = ["order.s1.title", "order.s2.title", "order.s3.title", "order.s4.title"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Section className="py-10 md:py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("order.title")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t("order.subtitle")}</p>
          </div>

          {/* Progress */}
          <ol className="mx-auto mt-8 grid max-w-3xl grid-cols-4 gap-2">
            {labels.map((k, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <li key={k} className="flex flex-col items-center gap-2 text-center">
                  <span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                    done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"
                  }`}>
                    {done ? <Check className="size-4" /> : n}
                  </span>
                  <span className={`text-[11px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                    {t("order.step")} {n}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">{t("order.s1.title")}</h2>
                  <label className="block">
                    <span className="text-sm font-medium">{t("order.s1.upload")}</span>
                    <div className="mt-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center">
                      <Upload className="mx-auto size-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">{t("order.s1.dropzone")}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{t("order.s1.uploadHint")}</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => onFiles(e.target.files)}
                        className="mt-3 block w-full text-sm"
                      />
                    </div>
                    {files.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {files.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="size-4 text-green-600" />
                            <span className="font-medium">✓ {f.name}</span>
                            <button
                              type="button"
                              onClick={() => setFiles(files.filter((_, j) => j !== i))}
                              className="ml-auto text-muted-foreground hover:text-foreground"
                              aria-label="Remove"
                            >
                              <X className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium">{t("order.s1.from")} *</span>
                      <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                        {LANGS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">{t("order.s1.to")} *</span>
                      <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                        {LANGS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium">{t("order.s1.notes")}</span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">{t("order.s2.title")}</h2>
                  <div>
                    <span className="text-sm font-medium">{t("order.s2.turnaround")}</span>
                    <div className="mt-2 grid gap-2">
                      {(Object.keys(RATES) as Urgency[]).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUrgency(u)}
                          className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition ${
                            urgency === u ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                          }`}
                        >
                          <span className="font-semibold">{t(`order.s2.${u}`)}</span>
                          <span className="font-bold text-primary">€{RATES[u]}/{isDe ? "Seite" : "page"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="block">
                    <span className="text-sm font-medium">{t("order.s2.pages")}</span>
                    <input
                      type="number"
                      min={1}
                      value={pages}
                      onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                      className="mt-1 w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    />
                  </label>
                  <div>
                    <span className="text-sm font-medium">{t("order.s2.addons")}</span>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm">
                        <input type="checkbox" checked={notary} onChange={(e) => setNotary(e.target.checked)} />
                        <span className="flex-1">+ {t("order.s2.notary")}</span>
                        <span className="font-semibold">+€19</span>
                      </label>
                      <label className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm">
                        <input type="checkbox" checked={hardcopy} onChange={(e) => setHardcopy(e.target.checked)} />
                        <span className="flex-1">+ {t("order.s2.hardcopy")}</span>
                        <span className="font-semibold">+€12</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{t("order.s3.title")}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2"><span className="text-sm font-medium">{t("order.s3.name")} *</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                    </label>
                    <label className="block sm:col-span-2"><span className="text-sm font-medium">{t("order.s3.email")} *</span>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                    </label>
                    <label className="block sm:col-span-2"><span className="text-sm font-medium">{t("order.s3.street")} *</span>
                      <input value={street} onChange={(e) => setStreet(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                    </label>
                    <label className="block"><span className="text-sm font-medium">{t("order.s3.zip")} *</span>
                      <input value={zip} onChange={(e) => setZip(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                    </label>
                    <label className="block"><span className="text-sm font-medium">{t("order.s3.city")} *</span>
                      <input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                    </label>
                    <label className="block sm:col-span-2"><span className="text-sm font-medium">{t("order.s3.country")} *</span>
                      <input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t("order.s3.vat")}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Lock className="size-3.5" /> SSL</span>
                    <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5" /> Stripe</span>
                    <span className="rounded border border-border px-2 py-0.5 font-semibold">VISA</span>
                    <span className="rounded border border-border px-2 py-0.5 font-semibold">Mastercard</span>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 text-center">
                  <CheckCircle2 className="mx-auto size-16 text-green-600" />
                  <h2 className="text-2xl font-bold">{t("order.s4.title")}</h2>
                  <p className="text-sm text-muted-foreground">{t("order.s4.orderNo")}: <span className="font-mono font-semibold text-foreground">{orderNo}</span></p>
                  <div className="mx-auto max-w-sm rounded-lg border border-border bg-muted/30 p-4 text-left text-sm">
                    <div className="flex justify-between"><span>{t("order.s2.pages")}</span><span>{pages}</span></div>
                    <div className="flex justify-between"><span>{t("order.s2.turnaround")}</span><span>{t(`order.s2.${urgency}`)}</span></div>
                    <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold"><span>{t("order.s2.total")}</span><span>€{totals.total.toFixed(2)}</span></div>
                  </div>
                  <p className="text-sm font-semibold text-primary">{t("order.s4.delivery")}</p>
                  <p className="text-sm text-muted-foreground">{t("order.s4.emailSent")}</p>
                  <Link to="/" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                    {t("order.s4.home")}
                  </Link>
                </div>
              )}

              {step < 4 && (
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
                  <button
                    type="button"
                    disabled={step === 1}
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
                  >
                    <ArrowLeft className="size-4" /> {t("order.back")}
                  </button>
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90"
                  >
                    {step === 3 ? t("order.s3.pay") : t("order.next")} <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Live summary */}
            {step < 4 && (
              <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
                <h3 className="text-base font-semibold">{t("order.s2.summary")}</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{pages} {isDe ? "Seiten" : "pages"} × €{RATES[urgency]}</dt>
                    <dd className="font-semibold">€{totals.base.toFixed(2)}</dd>
                  </div>
                  {(notary || hardcopy) && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">+ {t("order.s2.addons")}</dt>
                      <dd className="font-semibold">€{totals.addons.toFixed(2)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                    <dt>{t("order.s2.total")}</dt>
                    <dd>€{totals.total.toFixed(2)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">{t("order.s3.vat")}</p>
              </aside>
            )}
          </div>
        </Container>
      </Section>
      <Footer />
    </div>
  );
}
