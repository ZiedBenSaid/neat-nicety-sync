import { Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck2, Zap, Truck, Microscope, Building2 } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

const SERVICES = [
  { key: "s1", icon: FileCheck2 },
  { key: "s3", icon: Zap },
  { key: "s4", icon: Truck },
  { key: "s5", icon: Microscope },
  { key: "s6", icon: Building2 },
] as const;

export function Services() {
  const { t } = useI18n();

  return (
    <Section id="services" className="bg-background py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            {t("services.kicker")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t("services.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Interactive cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map(({ key, icon: Icon }) => (
            <Link
              key={key}
              to="/order"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              {/* Hover gradient */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%)",
                }}
              />

              <div className="flex items-start justify-between">
                <span className="inline-grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground/80">
                  {t(`services.${key}.price`)}
                </span>
              </div>

              <p className="mt-5 text-base font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                {t(`services.${key}.t`)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t(`services.${key}.d`)}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {t("services.learn") || "Learn more"}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
