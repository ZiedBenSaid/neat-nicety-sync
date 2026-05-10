import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, BadgeCheck, Lock } from "lucide-react";

export function AcceptanceGuarantee() {
  const { t } = useI18n();

  const stats = [
    {
      icon: ShieldCheck,
      value: "100%",
      label: t("guarantee.point1.t"),
      desc: t("guarantee.point1.d"),
    },
    {
      icon: BadgeCheck,
      value: "ISO 17100",
      label: t("guarantee.point2.t"),
      desc: t("guarantee.point2.d"),
    },
    {
      icon: Lock,
      value: "256-bit",
      label: t("guarantee.point3.t"),
      desc: t("guarantee.point3.d"),
    },
  ];

  return (
    <Section className="relative overflow-hidden bg-surface py-12 md:py-20">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.86 0.18 95) 0%, transparent 70%)" }}
      />

      <Container>
        <div className="relative">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <ShieldCheck className="size-3.5" />
              {t("guarantee.kicker")}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("guarantee.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("guarantee.subtitle")}
            </p>
          </div>

          {/* Stats grid */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.value}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-7 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  {/* Number watermark */}
                  <span className="absolute -right-2 -top-4 select-none text-[6rem] font-black leading-none text-primary/5">
                    0{i + 1}
                  </span>

                  <div className="relative">
                    <span className="inline-grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </span>
                    <p className="mt-5 text-2xl font-bold tracking-tight text-primary md:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                      {s.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.03] hover:bg-primary/90"
            >
              {t("guarantee.cta")} <ArrowRight className="size-4" />
            </Link>
            <p className="text-xs text-muted-foreground">{t("guarantee.footnote")}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
