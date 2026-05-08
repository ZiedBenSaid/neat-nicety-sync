import { Link } from "@tanstack/react-router";
import { ShieldCheck, Clock, Award, Lock, Euro, Headset, ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function WhyChoose() {
  const { t } = useI18n();
  const cards = [
    { icon: ShieldCheck, t: t("why.c1.t"), d: t("why.c1.d") },
    { icon: Clock, t: t("why.c2.t"), d: t("why.c2.d") },
    { icon: Award, t: t("why.c3.t"), d: t("why.c3.d") },
    { icon: Lock, t: t("why.c4.t"), d: t("why.c4.d") },
    { icon: Euro, t: t("why.c5.t"), d: t("why.c5.d") },
    { icon: Headset, t: t("why.c6.t"), d: t("why.c6.d") },
  ];
  return (
    <Section id="why" className="bg-surface py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("why.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{t("why.subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.t}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03] hover:bg-primary/90"
          >
            {t("why.cta")} <ArrowRight className="size-5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
