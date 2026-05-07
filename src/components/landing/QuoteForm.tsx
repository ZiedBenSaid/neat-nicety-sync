import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Upload, FileText, X, ShieldCheck, Lock, Clock, BadgeCheck, Send, CheckCircle2 } from "lucide-react";
import { Container, Section } from "./Section";

const LANGS = [
  "English", "German", "French", "Spanish", "Italian", "Portuguese", "Dutch",
  "Polish", "Russian", "Ukrainian", "Arabic", "Turkish", "Chinese (Simplified)",
  "Japanese", "Korean", "Hindi", "Romanian", "Greek", "Czech", "Swedish",
];

const TURNAROUNDS = [
  "Standard (24–48h)",
  "Rush (8–12h, +50%)",
  "Express (4h, +100%)",
];

export function QuoteForm() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [turnaround, setTurnaround] = useState(TURNAROUNDS[0]);
  const [message, setMessage] = useState("");
  const [langError, setLangError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).slice(0, 10 - files.length);
    setFiles((f) => [...f, ...next]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return;
    if (!source || !target || source === target) {
      setLangError(true);
      return;
    }
    navigate({ to: "/thank-you" });
  }

  return (
    <Section id="quote-form" className="bg-surface py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Free Quote · No obligation
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
              Request your certified translation quote
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Upload your document, choose your languages and turnaround, and we'll reply with a
              transparent quote within 30 minutes during business hours.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                { icon: ShieldCheck, t: "256-bit SSL secure upload" },
                { icon: BadgeCheck, t: "100% USCIS acceptance guarantee" },
                { icon: Lock, t: "GDPR · NDA-protected handling" },
                { icon: Clock, t: "30-minute average reply time" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.t} className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-medium text-foreground/85">{b.t}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            {false ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="size-7" />
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight">Quote request received</h3>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Jane Doe"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      required
                      maxLength={120}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field label="Source language *">
                    <select
                      required
                      value={source}
                      onChange={(e) => { setSource(e.target.value); setLangError(false); }}
                      className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${langError && !source ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">Select…</option>
                      {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </Field>
                  <Field label="Target language *">
                    <select
                      required
                      value={target}
                      onChange={(e) => { setTarget(e.target.value); setLangError(false); }}
                      className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${langError && (!target || target === source) ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">Select…</option>
                      {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Required turnaround">
                      <select
                        value={turnaround}
                        onChange={(e) => setTurnaround(e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {TURNAROUNDS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-sm font-semibold">Attach documents (PDF or image)</label>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                    className="mt-2 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface px-4 py-6 text-center transition hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                      <Upload className="size-5" />
                    </span>
                    <span className="mt-2 text-sm font-semibold">Drop files or click to upload</span>
                    <span className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG · up to 10 files · 100% DSGVO-konforme Datenübertragung</span>
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.heic"
                    className="sr-only"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                  {files.length > 0 && (
                    <>
                      <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary">
                        <CheckCircle2 className="size-4" />
                        {files.length} file{files.length === 1 ? "" : "s"} uploaded successfully
                      </div>
                      <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                          <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                            <span className="flex min-w-0 items-center gap-2">
                              <CheckCircle2 className="size-4 shrink-0 text-primary" />
                              <span className="truncate font-medium">✓ {f.name} uploaded</span>
                              <span className="shrink-0 text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
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
                    </>
                  )}
                </div>

                <div className="mt-5">
                  <Field label="Project notes (optional)">
                    <textarea
                      value={message}
                      maxLength={1000}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Authority of submission, deadlines, special instructions…"
                    />
                  </Field>
                </div>

                {langError && (
                  <p className="mt-4 text-center text-xs font-semibold text-destructive">
                    Please choose both an original and a different target language.
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01] hover:bg-primary/90"
                >
                  <Send className="size-4" /> Get my free quote
                </button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  By submitting you agree to our Privacy Policy. We never share your documents.
                </p>
              </>
            )}
          </form>
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
