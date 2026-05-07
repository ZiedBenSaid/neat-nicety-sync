import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";
import { products } from "@/lib/products";

export function GermanDocuments() {
  const { lang, t } = useI18n();
  const isDe = lang === "DE";
  const visible = products.slice(0, 4);

  return (
    <Section id="dokumente" className="bg-surface py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("docs.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {isDe ? "Was möchten Sie übersetzen lassen?" : "What do you need translated?"}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("docs.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {visible.map((d) => (
            <Link
              key={d.slug}
              to="/product/$slug"
              params={{ slug: d.slug }}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted/40">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-sm">
                  <Star className="size-3 fill-primary text-primary" /> {isDe ? "Beglaubigt" : "Certified"}
                </span>
              </div>
              <div className="space-y-1.5 p-4">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">{d.name}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-highlight text-highlight" />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">({d.reviews})</span>
                </div>
                <p className="pt-1 text-base font-bold text-primary">€{d.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition hover:scale-[1.03] hover:bg-primary/90"
          >
            {isDe ? "Mehr anzeigen" : "See More"}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
