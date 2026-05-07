import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronRight,
  Info,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Upload,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { Container } from "@/components/landing/Section";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — CertiLingua` },
          { name: "description", content: loaderData.product.short },
          { property: "og:title", content: `${loaderData.product.name} — CertiLingua` },
          { property: "og:description", content: loaderData.product.short },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  ),
});

const langs = ["German", "English", "French", "Spanish", "Italian", "Arabic"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(0);
  const [pages, setPages] = useState(2);
  const [expedited, setExpedited] = useState(true);
  const [source, setSource] = useState("German");
  const [target, setTarget] = useState("German");
  const cart = useCart();
  const navigate = useNavigate();

  const unitPrice = product.price + (expedited ? 30 : 0);
  const total = unitPrice * pages;

  function handleAdd(goToCart = false) {
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      pages,
      expedited,
    });
    if (goToCart) navigate({ to: "/cart" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Container className="py-6">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link to="/" hash="documents" className="hover:text-primary">
              Documents
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-primary">{product.name}</span>
          </nav>
        </Container>

        <Container className="pb-16">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="overflow-hidden rounded-xl border border-border bg-surface">
                <img
                  src={product.gallery[activeImg]}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="mt-3 flex gap-3">
                {product.gallery.map((g: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`overflow-hidden rounded-lg border-2 transition ${
                      i === activeImg
                        ? "border-primary"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <img src={g} alt="" className="size-20 object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                <BadgeCheck className="size-3" /> Certified Translation
              </span>
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">{product.name}</h1>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-highlight text-highlight" />
                ))}
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="text-3xl font-bold text-foreground">€{product.price.toFixed(2)} EUR</div>
              <p className="text-xs text-muted-foreground">
                Taxes included. <span className="underline">Shipping</span> calculated at checkout.
              </p>

              <div className="grid gap-4 pt-2">
                <Field label="Source Language (original)" required>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm"
                  >
                    {langs.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Target Language" required>
                  <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm"
                  >
                    {langs.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Upload Your Documents" required>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-surface px-4 py-6 text-center transition hover:border-primary/50 hover:bg-primary/5">
                    <span className="grid size-9 place-items-center rounded-md bg-primary/10 text-primary">
                      <Upload className="size-4" />
                    </span>
                    <span className="text-sm font-medium">Click or drag file to this area to upload</span>
                    <span className="text-xs text-muted-foreground">Support for a single or bulk upload.</span>
                    <input type="file" multiple className="hidden" />
                  </label>
                  <div className="mt-2 flex items-start gap-2 rounded-md bg-primary/5 px-3 py-2 text-xs text-foreground/80">
                    <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>
                      We accept scans or photographs of documents in all common formats including PDF,
                      JPEG, JPG, PNG, GIF, TIFF, or DOCX format.
                    </span>
                  </div>
                </Field>

                <Field label="Total Pages" required>
                  <div className="inline-flex items-center gap-3 rounded-md border border-border">
                    <button
                      onClick={() => setPages((p) => Math.max(1, p - 1))}
                      className="grid size-9 place-items-center rounded-l-md text-foreground/70 transition hover:bg-muted"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{pages}</span>
                    <button
                      onClick={() => setPages((p) => p + 1)}
                      className="grid size-9 place-items-center rounded-r-md text-foreground/70 transition hover:bg-muted"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-start gap-2 rounded-md bg-primary/5 px-3 py-2 text-xs text-foreground/80">
                    <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>
                      A page is defined as 250 words or fewer, including numbers on a single sheet.
                    </span>
                  </div>
                </Field>

                <Field label="Turnaround" required>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TurnaroundCard
                      title="Standard Turnaround"
                      sub="Included"
                      body="Typically 24 hours for up to 2 pages, 48 hours for up to 4 pages."
                      active={!expedited}
                      onClick={() => setExpedited(false)}
                    />
                    <TurnaroundCard
                      title="Expedited Turnaround"
                      sub="+€30 Per Page"
                      body="Your order will be prioritized and turnaround time reduced by up to 75%."
                      active={expedited}
                      onClick={() => setExpedited(true)}
                    />
                  </div>
                </Field>
              </div>

              <div className="flex items-center justify-between rounded-md bg-surface px-4 py-3">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">€{total.toFixed(2)}</span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => handleAdd(false)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99]"
                >
                  <ShoppingCart className="size-4" /> Add to Cart
                </button>
                <button
                  onClick={() => handleAdd(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition hover:bg-primary/5"
                >
                  Buy Now
                </button>
              </div>

              <div className="space-y-4 pt-6">
                <h2 className="flex items-center gap-2 text-sm font-bold tracking-tight">
                  <Check className="size-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
                  {product.name.toUpperCase()} - Certified translation
                </h2>
                {product.description.map((p: string, i: number) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                <h3 className="flex items-center gap-2 pt-3 text-sm font-bold tracking-tight">
                  <Check className="size-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
                  Officially Recognized and Legally Valid
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          <section className="mt-20">
            <h2 className="text-xl font-bold tracking-tight">You may also like</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((p) => p.slug !== product.slug)
                .slice(0, 4)
                .map((p) => (
                  <Link
                    key={p.slug}
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-muted/40">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="space-y-1.5 p-4">
                      <h3 className="text-sm font-semibold tracking-tight">{p.name}</h3>
                      <p className="pt-1 text-base font-bold text-primary">€{p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="mt-8">
              <Link
                to="/"
                hash="documents"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="size-4" /> Back to all documents
              </Link>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function TurnaroundCard({
  title,
  sub,
  body,
  active,
  onClick,
}: {
  title: string;
  sub: string;
  body: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-lg border p-4 text-left transition ${
        active
          ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {active ? (
        <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      ) : null}
      <div className="text-sm font-bold tracking-tight">{title}</div>
      <div className="mt-0.5 text-xs font-semibold text-primary">{sub}</div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </button>
  );
}
