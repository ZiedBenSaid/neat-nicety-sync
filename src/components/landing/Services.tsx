import { Link } from "@tanstack/react-router";
import { FileCheck2, Stamp, Zap, Mail, GraduationCap, Building2, ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function Services() {
  const { t } = useI18n();
  const items = [
    { icon: FileCheck2, t: t("services.s1.t"), d: t("services.s1.d") },
    { icon: Stamp, t: t("services.s2.t"), d: t("services.s2.d") },
    { icon: Zap, t: t("services.s3.t"), d: t("services.s3.d") },
    { icon: Mail, t: t("services.s4.t"), d: t("services.s4.d") },
    { icon: GraduationCap, t: t("services.s5.t"), d: t("services.s5.d") },
    { icon: Building2, t: t("services.s6.t"), d: t("services.s6.d") },
  ];
  return (
    <Section id="services" className="bg-background py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("services.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t("services.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{t("services.subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.t}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <Link
                  to="/order"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5"
                >
                  {t("services.learn")} <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
