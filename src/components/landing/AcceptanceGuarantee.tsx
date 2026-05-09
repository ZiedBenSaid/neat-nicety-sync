import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function AcceptanceGuarantee() {
  const { t } = useI18n();

  const stats = [
    {
      value: "100%",
      label: t("guarantee.point1.t"),
      desc: t("guarantee.point1.d"),
    },
    {
      value: "ISO 17100",
      label: t("guarantee.point2.t"),
      desc: t("guarantee.point2.d"),
    },
    {
      value: "256-bit",
      label: t("guarantee.point3.t"),
      desc: t("guarantee.point3.d"),
    },
  ];

  return (
    <Section className="py-20 md:py-28" style={{ background: "var(--navy)" }}>
      <Container>
        {/* Amber accent bar */}
        <div className="h-0.5 w-12 bg-highlight" />

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left: heading + CTA */}
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--highlight)" }}
            >
              {t("guarantee.kicker")}
            </span>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--navy-foreground)" }}
            >
              {t("guarantee.title")}
            </h2>
            <p
              className="mt-4 max-w-md text-sm leading-relaxed md:text-base"
              style={{ color: "oklch(0.72 0.02 255)" }}
            >
              {t("guarantee.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/order"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{
                  background: "var(--highlight)",
                  color: "var(--navy)",
                }}
              >
                {t("guarantee.cta")} <ArrowRight className="size-4" />
              </Link>
              <p className="text-xs" style={{ color: "oklch(0.55 0.02 255)" }}>
                {t("guarantee.footnote")}
              </p>
            </div>
          </div>

          {/* Right: 3 stat rows */}
          <div className="flex flex-col divide-y" style={{ borderColor: "oklch(0.30 0.04 258)" }}>
            {stats.map((s) => (
              <div key={s.value} className="flex items-start gap-6 py-6 first:pt-0 last:pb-0">
                <p
                  className="w-24 shrink-0 text-3xl font-bold tracking-tight"
                  style={{ color: "var(--highlight)" }}
                >
                  {s.value}
                </p>
                <div>
                  <p
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: "var(--navy-foreground)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "oklch(0.62 0.02 255)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}