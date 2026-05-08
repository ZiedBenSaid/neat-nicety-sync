import { ShieldCheck, BadgeCheck, Lock, Clock } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function AcceptanceGuarantee() {
  const { t } = useI18n();
  const points = [
    { icon: ShieldCheck, t: t("guarantee.point1.t"), d: t("guarantee.point1.d") },
    { icon: BadgeCheck, t: t("guarantee.point2.t"), d: t("guarantee.point2.d") },
    { icon: Lock, t: t("guarantee.point3.t"), d: t("guarantee.point3.d") },
    { icon: Clock, t: t("guarantee.point4.t"), d: t("guarantee.point4.d") },
  ];

  return (
    <Section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("guarantee.kicker")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
              {t("guarantee.title")}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("guarantee.subtitle")}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <ShieldCheck className="size-6" />
              </div>
              <div className="text-sm">
                <p className="font-bold tracking-tight">100%</p>
                <p className="text-xs text-muted-foreground">Money-back guarantee</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.t}
                  className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
