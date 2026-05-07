import { Star, Briefcase, GraduationCap, Scale, User, Building2, IdCard, Gavel } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Container, Section } from "./Section";
import { products } from "@/lib/products";

const tabs = [
  { label: "Most Requested", icon: Star },
  { label: "Personal", icon: User },
  { label: "USCIS", icon: Building2 },
  { label: "Immigration", icon: IdCard },
  { label: "Academic", icon: GraduationCap },
  { label: "Legal", icon: Gavel },
  { label: "Business", icon: Briefcase },
];

export function Documents() {
  const [active, setActive] = useState("Most Requested");

  const visible =
    active === "Most Requested"
      ? products.slice(0, 4)
      : products.filter((p) => p.category === active);

  return (
    <Section id="documents" className="bg-surface py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Our Services
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
            What do you need translated?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We specialize in certified translations for all official purposes. Select your document
            type to get translated.
          </p>
        </div>

        <div className="mt-8 -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.label === active;
            return (
              <button
                key={t.label}
                onClick={() => setActive(t.label)}
                className={
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition " +
                  (isActive
                    ? "border-primary bg-primary text-primary-foreground shadow shadow-primary/20"
                    : "border-border bg-card text-foreground/70 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground")
                }
              >
                <Icon className="size-4" /> {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  width={512}
                  height={640}
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-sm">
                  <Star className="size-3 fill-primary text-primary" /> Certified
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
            See More
          </Link>
        </div>
      </Container>
    </Section>
  );
}
