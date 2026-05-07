import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container, Section } from "./Section";
import { GlobeBackdrop } from "./GlobeBackdrop";
import { useI18n } from "@/lib/i18n";

export function CTA() {
  const { t } = useI18n();
  return (
    <Section className="pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-primary/10 px-5 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16">
          <GlobeBackdrop opacity={0.35} />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("cta.kicker")}
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                {t("cta.title.a")}
                <br />
                {t("cta.title.b")}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                {t("cta.subtitle")}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.03] hover:bg-primary/90 sm:w-auto"
            >
              {t("cta.button")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
