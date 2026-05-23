import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { Container } from "@/components/landing/Section";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — CertiLingua" },
      { name: "description", content: "Review and check out your certified translation order." },
    ],
  }),
  component: CartPage,
});

const LANGS = [
  "English", "German", "French", "Spanish", "Italian", "Portuguese", "Dutch",
  "Polish", "Russian", "Ukrainian", "Arabic", "Turkish", "Chinese (Simplified)",
  "Japanese", "Korean", "Hindi", "Romanian", "Greek", "Czech", "Swedish",
];

function CartPage() {
  const { items, subtotal, setPages, remove, count } = useCart();
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [langError, setLangError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const shipping = items.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.19;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  function applyPromo() {
    if (promo.trim().toLowerCase() === "certify10") setDiscount(subtotal * 0.1);
    else setDiscount(0);
  }

  function handleCheckout() {
    if (!sourceLang || !targetLang || sourceLang === targetLang) {
      setLangError(true);
      const el = document.getElementById("lang-pair");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLangError(false);
    navigate({ to: "/checkout" });
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).slice(0, 10 - files.length);
    setFiles((f) => [...f, ...next]);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <div className="border-b border-border bg-surface">
          <Container className="py-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Your Cart
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {count === 0
                ? "Your cart is empty."
                : `You have ${count} item${count === 1 ? "" : "s"} in your cart.`}
            </p>
          </Container>
        </div>

        <Container className="py-12">
          {items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                <ShoppingCart className="size-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">Nothing here yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse our certified translations and add them to your cart.
              </p>
              <Link
                to="/"
                hash="documents"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:bg-primary/90"
              >
                Browse Documents <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <AnimatePresence initial={false}>
                  {items.map((it) => {
                    const lineUnit = it.price + (it.expedited ? 30 : 0);
                    const lineTotal = lineUnit * it.pages * it.qty;
                    return (
                      <motion.div
                        key={it.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-sm"
                      >
                        <Link
                          to="/product/$slug"
                          params={{ slug: it.slug }}
                          className="size-24 shrink-0 overflow-hidden rounded-lg bg-muted/40"
                        >
                          <img src={it.image} alt={it.name} className="size-full object-cover" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Link
                                to="/product/$slug"
                                params={{ slug: it.slug }}
                                className="text-sm font-semibold tracking-tight hover:text-primary"
                              >
                                {it.name}
                              </Link>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                                <span className="rounded-full bg-surface px-2 py-0.5">
                                  {it.pages} {it.pages === 1 ? "page" : "pages"}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 ${
                                    it.expedited
                                      ? "bg-highlight/20 text-amber-700"
                                      : "bg-surface"
                                  }`}
                                >
                                  {it.expedited ? "Expedited" : "Standard"}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => remove(it.slug)}
                              aria-label="Remove"
                              className="text-muted-foreground transition hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center gap-3">
                              <div className="inline-flex items-center rounded-md border border-border">
                                <button
                                  onClick={() => setPages(it.slug, it.pages - 1)}
                                  aria-label="Decrease pages"
                                  className="grid size-8 place-items-center text-foreground/70 transition hover:bg-muted"
                                >
                                  <Minus className="size-3.5" />
                                </button>
                                <span className="min-w-7 text-center text-sm font-semibold">
                                  {it.pages}
                                </span>
                                <button
                                  onClick={() => setPages(it.slug, it.pages + 1)}
                                  aria-label="Increase pages"
                                  className="grid size-8 place-items-center text-foreground/70 transition hover:bg-muted"
                                >
                                  <Plus className="size-3.5" />
                                </button>
                              </div>
                              <span className="text-[11px] text-muted-foreground">
                                €{lineUnit.toFixed(2)} <span className="font-semibold">per page</span> × {it.pages} {it.pages === 1 ? "page" : "pages"}
                              </span>
                            </div>
                            <span className="text-base font-bold text-primary">
                              €{lineTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Language pair */}
                <div id="lang-pair" className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold tracking-tight">Language pair</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Required so we know what to translate from and to.
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-foreground/85">
                        Original language <span className="text-destructive">*</span>
                      </span>
                      <select
                        value={sourceLang}
                        onChange={(e) => { setSourceLang(e.target.value); setLangError(false); }}
                        className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${langError && !sourceLang ? "border-destructive" : "border-input"}`}
                      >
                        <option value="">Select original language…</option>
                        {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-foreground/85">
                        Target language <span className="text-destructive">*</span>
                      </span>
                      <select
                        value={targetLang}
                        onChange={(e) => { setTargetLang(e.target.value); setLangError(false); }}
                        className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${langError && (!targetLang || targetLang === sourceLang) ? "border-destructive" : "border-input"}`}
                      >
                        <option value="">Select target language…</option>
                        {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </label>
                  </div>
                  {langError && (
                    <p className="mt-2 text-xs font-semibold text-destructive">
                      Please choose both an original and a different target language before checkout.
                    </p>
                  )}
                </div>

                {/* Document upload */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold tracking-tight">Upload your documents</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <Lock className="size-3.5" /> 256-bit encrypted
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                    className="mt-3 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface px-4 py-6 text-center transition hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                      <Upload className="size-5" />
                    </span>
                    <span className="mt-2 text-sm font-semibold">
                      {files.length > 0 ? "Add more files" : "Drop files or click to upload"}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG · up to 10 files</span>
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
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
                              aria-label="Remove file"
                              className="grid size-7 place-items-center rounded-md text-foreground/50 transition hover:bg-muted hover:text-destructive"
                            >
                              <X className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    All documents are handled with 256-bit encryption and strict confidentiality.
                  </p>
                </div>

                {/* Notes / instructions */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <label htmlFor="cart-notes" className="text-sm font-semibold tracking-tight">
                    Notes & instructions
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Spelling of names, target authority, deadlines or any specific requirements.
                  </p>
                  <textarea
                    id="cart-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    maxLength={1000}
                    placeholder="e.g. Submit to USCIS. Name spelled 'Müller' as 'Mueller'."
                    className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <Link
                  to="/"
                  hash="documents"
                  className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-primary hover:underline"
                >
                  ← Continue shopping
                </Link>
              </div>

              {/* Summary */}
              <aside className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h2 className="text-base font-bold tracking-tight">Order Summary</h2>

                  <div className="mt-4 flex items-center gap-2">
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                    <button
                      onClick={applyPromo}
                      className="inline-flex items-center gap-1.5 rounded-md bg-foreground/90 px-3 py-2 text-xs font-semibold text-background transition hover:bg-foreground"
                    >
                      <Tag className="size-3.5" /> Apply
                    </button>
                  </div>
                  {discount > 0 ? (
                    <p className="mt-2 text-xs text-primary">Promo applied: −€{discount.toFixed(2)}</p>
                  ) : null}

                  <dl className="mt-5 space-y-2.5 text-sm">
                    <Row label="Subtotal" value={`€${subtotal.toFixed(2)}`} />
                    <Row label="Shipping" value={`€${shipping.toFixed(2)}`} />
                    <Row label="Tax (19% VAT)" value={`€${tax.toFixed(2)}`} />
                    {discount > 0 ? (
                      <Row label="Discount" value={`−€${discount.toFixed(2)}`} accent />
                    ) : null}
                  </dl>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">€{total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99]"
                  >
                    Proceed to Checkout <ArrowRight className="size-4" />
                  </button>
                </div>

                <ul className="space-y-2 rounded-xl border border-border bg-surface p-4 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" /> Secure SSL checkout & GDPR compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="size-4 text-primary" /> Optional physical copy by post
                  </li>
                </ul>
              </aside>
            </div>
          )}
        </Container>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-semibold ${accent ? "text-primary" : "text-foreground"}`}>{value}</dd>
    </div>
  );
}
