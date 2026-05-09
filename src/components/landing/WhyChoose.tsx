import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function WhyChoose() {
  const { t } = useI18n();

  const points = [
    { title: t("why.p1.t"), desc: t("why.p1.d") },
    { title: t("why.p2.t"), desc: t("why.p2.d") },
    { title: t("why.p3.t"), desc: t("why.p3.d") },
    { title: t("why.p4.t"), desc: t("why.p4.d") },
  ];

  return (
    <Section id="why" className="bg-surface py-16 md:py-24">
      <Container>
        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
          {/* Left — heading + pull quote */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("why.kicker")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {t("why.title")}
            </h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground md:text-base">
              {t("why.tagline")}
            </p>

            <blockquote className="mt-8 border-l-2 border-primary pl-5">
              <p className="text-base italic leading-relaxed text-foreground md:text-lg">
                &ldquo;{t("why.pullquote")}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Right — 4 differentiators */}
          <div className="flex flex-col divide-y divide-border">
            {points.map((p) => (
              <div key={p.title} className="py-5 first:pt-0 last:pb-0">
                <p className="text-sm font-bold tracking-tight text-foreground">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dark CTA bar */}
        <div
          className="mt-14 flex flex-col items-start gap-4 rounded-2xl px-8 py-7 sm:flex-row sm:items-center sm:justify-between"
          style={{ background: "var(--navy)" }}
        >
          <p
            className="text-base font-semibold"
            style={{ color: "var(--navy-foreground)" }}
          >
            {t("why.ctabar")}
          </p>
          <Link
            to="/order"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{
              background: "var(--highlight)",
              color: "var(--navy)",
            }}
          >
            {t("why.cta")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}