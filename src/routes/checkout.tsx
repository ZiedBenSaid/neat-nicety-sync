import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  Mail,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/landing/Section";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — CertiLingua" },
      { name: "description", content: "Complete your certified translation order securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const POSTAL_FEE = 18;
const COUNTRIES = ["Germany", "Austria", "Switzerland", "France", "Italy", "Spain", "Netherlands", "Belgium", "United Kingdom", "United States"];

type Payment = "card" | "paypal" | "klarna" | "invoice";

function CheckoutPage() {
  const { items, subtotal, count, clear } = useCart();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [delivery, setDelivery] = useState<"email" | "postal">("email");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Germany");
  const [orderRef, setOrderRef] = useState("");

  const [payment, setPayment] = useState<Payment>("card");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = delivery === "postal" ? POSTAL_FEE : 0;
  const tax = useMemo(() => subtotal * 0.19, [subtotal]);
  const total = subtotal + shipping + tax;

  function validate() {
    const e: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required";
    if (!firstName.trim()) e.firstName = "Required";
    if (!lastName.trim()) e.lastName = "Required";
    if (!phone.trim()) e.phone = "Required";
    if (delivery === "postal") {
      if (!street.trim()) e.street = "Required";
      if (!zip.trim()) e.zip = "Required";
      if (!city.trim()) e.city = "Required";
    }
    if (!agree) e.agree = "Please accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function placeOrder() {
    if (!validate()) {
      const first = document.querySelector("[data-error='true']") as HTMLElement | null;
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    clear();
    navigate({ to: "/thank-you" });
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Container className="py-24 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add a document before checking out.</p>
          <Link
            to="/cart"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Back to cart <ArrowRight className="size-4" />
          </Link>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <div className="border-b border-border bg-surface">
          <Container className="py-8">
            <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              <ArrowLeft className="size-3.5" /> Back to cart
            </Link>
            <h1 className="mt-3 text-3xl font-bold tracking-tighter md:text-4xl">Checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {count} item{count === 1 ? "" : "s"} · Secure SSL · GDPR compliant
            </p>
            <Stepper />
          </Container>
        </div>

        <Container className="py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Contact */}
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <SectionTitle index={1} title="Contact information" />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Email address" error={errors.email}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputCls(!!errors.email)}
                      data-error={!!errors.email}
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+49 …"
                      className={inputCls(!!errors.phone)}
                      data-error={!!errors.phone}
                    />
                  </Field>
                  <Field label="First name" error={errors.firstName}>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputCls(!!errors.firstName)}
                      data-error={!!errors.firstName}
                    />
                  </Field>
                  <Field label="Last name" error={errors.lastName}>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputCls(!!errors.lastName)}
                      data-error={!!errors.lastName}
                    />
                  </Field>
                </div>
              </motion.section>

              {/* Delivery */}
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <SectionTitle index={2} title="Delivery method" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <DeliveryCard
                    icon={<Mail className="size-5" />}
                    title="Email delivery"
                    sub="Included · Signed PDF"
                    body="Receive your certified translation as a digitally signed PDF, accepted by most authorities."
                    active={delivery === "email"}
                    onClick={() => setDelivery("email")}
                  />
                  <DeliveryCard
                    icon={<Truck className="size-5" />}
                    title="Postal delivery"
                    sub={`+€${POSTAL_FEE.toFixed(2)} · Original hard copy`}
                    body="Original stamped & signed translation sent by tracked post to your address (2–4 business days)."
                    active={delivery === "postal"}
                    onClick={() => setDelivery("postal")}
                  />
                </div>

                {delivery === "postal" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2"
                  >
                    <Field label="Street and number" error={errors.street} full>
                      <input
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Beedstraße 54"
                        className={inputCls(!!errors.street)}
                        data-error={!!errors.street}
                      />
                    </Field>
                    <Field label="Postal code" error={errors.zip}>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="40468"
                        className={inputCls(!!errors.zip)}
                        data-error={!!errors.zip}
                      />
                    </Field>
                    <Field label="City" error={errors.city}>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Düsseldorf"
                        className={inputCls(!!errors.city)}
                        data-error={!!errors.city}
                      />
                    </Field>
                    <Field label="Country">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={inputCls(false)}
                      >
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Order reference (optional)" full>
                      <input
                        value={orderRef}
                        onChange={(e) => setOrderRef(e.target.value)}
                        placeholder="Existing order number, if any"
                        className={inputCls(false)}
                      />
                    </Field>
                  </motion.div>
                )}
              </motion.section>

              {/* Payment */}
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <SectionTitle index={3} title="Payment method" />
                <div className="mt-4 grid gap-2.5">
                  <PaymentRow icon={<CreditCard className="size-4" />} label="Credit / Debit card" sub="Visa, Mastercard, Amex" value="card" active={payment} setActive={setPayment} />
                  <PaymentRow icon={<Wallet className="size-4" />} label="PayPal" sub="Pay with your PayPal balance" value="paypal" active={payment} setActive={setPayment} />
                  <PaymentRow icon={<ShieldCheck className="size-4" />} label="Klarna / SOFORT" sub="Buy now, pay later" value="klarna" active={payment} setActive={setPayment} />
                  <PaymentRow icon={<Mail className="size-4" />} label="Invoice (B2B)" sub="14 days net for companies" value="invoice" active={payment} setActive={setPayment} />
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2.5 text-xs text-foreground/80">
                  <Lock className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  Your payment is processed over a 256-bit encrypted SSL connection. We never store card details on our servers.
                </div>
              </motion.section>

              {/* Terms */}
              <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5" data-error={!!errors.agree}>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => { setAgree(e.target.checked); if (e.target.checked) setErrors((s) => ({ ...s, agree: "" })); }}
                  className="mt-0.5 size-4 accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/agb" className="font-semibold text-primary hover:underline">terms & conditions</Link> and{" "}
                  <Link to="/privacy" className="font-semibold text-primary hover:underline">privacy policy</Link>, and
                  acknowledge the cancellation policy for digital services.
                  {errors.agree && <span className="ml-2 font-semibold text-destructive">{errors.agree}</span>}
                </span>
              </label>
            </div>

            {/* Summary */}
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-base font-bold tracking-tight">Order summary</h2>
                <ul className="mt-4 space-y-3">
                  {items.map((it) => {
                    const lineUnit = it.price + (it.expedited ? 30 : 0);
                    const lineTotal = lineUnit * it.pages * it.qty;
                    return (
                      <li key={it.slug} className="flex gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted/40">
                          <img src={it.image} alt={it.name} className="size-full object-cover" />
                          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {it.qty * it.pages}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{it.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {it.pages} {it.pages === 1 ? "page" : "pages"} · {it.expedited ? "Expedited" : "Standard"}
                          </p>
                        </div>
                        <span className="text-sm font-semibold">€{lineTotal.toFixed(2)}</span>
                      </li>
                    );
                  })}
                </ul>

                <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                  <Row label="Subtotal" value={`€${subtotal.toFixed(2)}`} />
                  <Row
                    label={delivery === "postal" ? "Postal delivery" : "Email delivery"}
                    value={shipping ? `€${shipping.toFixed(2)}` : "Free"}
                  />
                  <Row label="VAT (19%)" value={`€${tax.toFixed(2)}`} />
                </dl>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">€{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={submitting}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? (
                    "Processing…"
                  ) : (
                    <>
                      <Lock className="size-4" /> Place order · €{total.toFixed(2)}
                    </>
                  )}
                </button>
              </div>

              <ul className="space-y-2 rounded-xl border border-border bg-surface p-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Certified by sworn translators</li>
                <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> 100% acceptance guarantee</li>
                <li className="flex items-center gap-2"><Lock className="size-4 text-primary" /> 256-bit SSL · GDPR</li>
              </ul>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

function inputCls(error: boolean) {
  return `w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
    error ? "border-destructive" : "border-input"
  }`;
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-semibold text-foreground/85">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {index}
      </span>
      <h2 className="text-base font-bold tracking-tight md:text-lg">{title}</h2>
    </div>
  );
}

function DeliveryCard({
  icon, title, sub, body, active, onClick,
}: {
  icon: React.ReactNode; title: string; sub: string; body: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-xl border-2 p-4 transition ${
        active
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`grid size-9 place-items-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold">{title}</p>
          <p className="text-[11px] font-semibold text-primary">{sub}</p>
        </div>
        {active && <CheckCircle2 className="ml-auto size-5 text-primary" />}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </button>
  );
}

function PaymentRow({
  icon, label, sub, value, active, setActive,
}: {
  icon: React.ReactNode; label: string; sub: string; value: Payment; active: Payment; setActive: (v: Payment) => void;
}) {
  const checked = active === value;
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition ${
        checked ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <input
        type="radio"
        name="payment"
        checked={checked}
        onChange={() => setActive(value)}
        className="size-4 accent-primary"
      />
      <span className={`grid size-8 place-items-center rounded-md ${checked ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-[11px] text-muted-foreground">{sub}</span>
      </span>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function Stepper() {
  const steps = ["Cart", "Checkout", "Confirmation"];
  return (
    <ol className="mt-5 flex items-center gap-2 text-xs">
      {steps.map((s, i) => {
        const active = i === 1;
        const done = i < 1;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`grid size-6 place-items-center rounded-full text-[10px] font-bold ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span className={`font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}
