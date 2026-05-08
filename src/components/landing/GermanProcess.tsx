import { Upload, CreditCard, Mail, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function GermanProcess() {
  const { t } = useI18n();
  const steps = [
    { icon: Upload, title: t("process.s1.t"), body: t("process.s1.d") },
    { icon: CreditCard, title: t("process.s2.t"), body: t("process.s2.d") },
    { icon: Mail, title: t("process.s3.t"), body: t("process.s3.d") },
  ];

  return (
    <Section id="ablauf" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("process.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {t("process.title.a")} <span className="text-highlight">{t("process.title.b")}</span> {t("process.title.c")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("process.subtitle")}</p>
        </div>

        <ol className="relative mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <span className="absolute -top-4 grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
                  {i + 1}
                </span>
                <span className="mt-3 grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                {i < steps.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 text-primary/40 md:block" />
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03] hover:bg-primary/90"
          >
            {t("process.cta")} <ArrowRight className="size-5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
