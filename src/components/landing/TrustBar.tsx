import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

const logos = ["PENG", "Amplitude", "veroxfloor", "RPUBLICA", "Amplitude"];

export function TrustBar() {
  const { t } = useI18n();
  return (
    <Section className="py-12 md:py-16">
      <Container>
        <p className="text-center text-base font-semibold tracking-tight text-foreground/85 md:text-lg">
          {t("trustbar.title")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:mt-10 md:flex-nowrap md:justify-between">
          {logos.map((l, i) => (
            <div key={i} className="flex items-center justify-center md:flex-1">
              <span className="text-center text-sm font-semibold tracking-wide text-foreground/55 md:text-base">
                {l}
              </span>
              {i < logos.length - 1 ? (
                <span
                  aria-hidden
                  className="ml-6 hidden h-8 w-px bg-border md:block"
                />
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
