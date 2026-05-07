import { Plane, GraduationCap, Scale, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function UseCases() {
  const { t } = useI18n();
  const cases = [
    { icon: Plane, t: t("uc.immigration.t"), d: t("uc.immigration.d"), tag: "USCIS · IRCC · UKVI" },
    { icon: GraduationCap, t: t("uc.academic.t"), d: t("uc.academic.d"), tag: "WES · ECE · NARIC" },
    { icon: Scale, t: t("uc.legal.t"), d: t("uc.legal.d"), tag: "Sworn · Apostille" },
    { icon: Briefcase, t: t("uc.business.t"), d: t("uc.business.d"), tag: "ISO 17100" },
  ];

  return (
    <Section id="usecases" className="bg-surface py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("uc.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
            {t("uc.title")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("uc.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.t}
                to="/quote"
                className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">
                    {c.tag}
                  </span>
                  <ArrowRight className="size-4 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
