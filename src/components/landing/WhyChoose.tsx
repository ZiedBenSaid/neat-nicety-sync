import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Eye, Clock, Award } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function WhyChoose() {
  const { t } = useI18n();

  const points = [
    { icon: ShieldCheck, title: t("why.p1.t"), desc: t("why.p1.d") },
    { icon: Eye, title: t("why.p2.t"), desc: t("why.p2.d") },
    { icon: Clock, title: t("why.p3.t"), desc: t("why.p3.d") },
    { icon: Award, title: t("why.p4.t"), desc: t("why.p4.d") },
  ];

  return (
    <Section id="why" className="relative overflow-hidden bg-surface py-12 md:py-20">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />

      <Container>
        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left — heading + pull quote */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {t("why.kicker")}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {t("why.title")}
            </h2>
            <p className="mt-3 text-base font-medium text-muted-foreground">
              {t("why.tagline")}
            </p>

            <blockquote className="mt-8 rounded-2xl border-l-4 border-primary bg-card p-6 shadow-sm">
              <p className="text-base italic leading-relaxed text-foreground md:text-lg">
                &ldquo;{t("why.pullquote")}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Right — interactive cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group rounded-2xl border border-border bg-card p-3.5 sm:p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <span className="inline-grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 text-sm font-bold tracking-tight text-foreground">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* On-brand CTA bar — primary blue gradient */}
        <div
          className="relative mt-14 overflow-hidden rounded-2xl px-8 py-8 sm:px-10"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 75%, var(--navy)) 100%)",
          }}
        >
          {/* Subtle pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-bold tracking-tight text-primary-foreground md:text-2xl">
                {t("why.ctabar")}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80">
                {t("guarantee.footnote")}
              </p>
            </div>
            <Link
              to="/order"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition hover:scale-[1.03]"
            >
              {t("why.cta")}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
