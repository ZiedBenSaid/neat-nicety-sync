import { Check, FileText, Stamp, Truck, ShieldCheck, ArrowRight, Info } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function Pricing() {
  const { t } = useI18n();

  const included = [
    t("pricing.inc.1"),
    t("pricing.inc.2"),
    t("pricing.inc.3"),
    t("pricing.inc.4"),
    t("pricing.inc.5"),
  ];

  const addons = [
    {
      icon: Stamp,
      title: t("pricing.addon.notary.t"),
      price: "+ €19",
      desc: t("pricing.addon.notary.d"),
    },
    {
      icon: Truck,
      title: t("pricing.addon.hardcopy.t"),
      price: "+ €12",
      desc: t("pricing.addon.hardcopy.d"),
    },
    {
      icon: FileText,
      title: t("pricing.addon.rush.t"),
      price: "+ 50%",
      desc: t("pricing.addon.rush.d"),
    },
  ];

  return (
    <Section id="pricing" className="bg-surface py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("pricing.kicker")}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          {/* Main price card */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-xl shadow-primary/5">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck className="size-3.5" /> {t("pricing.bestValue")}
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">
              {t("pricing.card.title")}
            </h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tighter text-foreground">€24</span>
              <span className="text-sm font-medium text-muted-foreground">{t("pricing.perPage")}</span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="size-3.5" /> {t("pricing.pageDef")}
            </p>

            <ul className="mt-6 space-y-2.5">
              {included.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/85">{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="#quote-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.01] hover:bg-primary/90"
            >
              {t("pricing.cta")} <ArrowRight className="size-4" />
            </a>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              {t("pricing.reassure")}
            </p>
          </div>

          {/* Add-ons */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("pricing.addons")}
            </h3>
            {addons.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-sm"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold tracking-tight">{a.title}</h4>
                      <span className="shrink-0 text-sm font-bold text-primary">{a.price}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              );
            })}
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {t("pricing.noHidden")}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
