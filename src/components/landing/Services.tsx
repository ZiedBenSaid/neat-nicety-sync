import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

const SERVICE_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"] as const;

export function Services() {
  const { t } = useI18n();

  return (
    <Section id="services" className="bg-background py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("services.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {t("services.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Service list — 2 columns on larger screens */}
        <div className="mt-12 grid border-t border-border sm:grid-cols-2">
          {SERVICE_KEYS.map((key) => (
            <Link
              key={key}
              to="/order"
              className="group flex items-start justify-between gap-4 border-b border-border py-6 transition hover:bg-muted/40 sm:px-2"
            >
              <div className="flex-1">
                <p className="text-base font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                  {t(`services.${key}.t`)}
                </p>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {t(`services.${key}.d`)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {t(`services.${key}.price`)}
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>

        {/* Can't find CTA */}
        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-border bg-muted/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{t("cantfind.title2")}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{t("cantfind.sub2")}</p>
          </div>
          <Link
            to="/#cantfind"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition hover:underline"
          >
            {t("cantfind.cta")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}