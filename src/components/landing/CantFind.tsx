import { FileQuestion } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function CantFind() {
  const { t } = useI18n();
  function scrollContact() {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <Section id="cantfind" className="bg-muted/40 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <FileQuestion className="size-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{t("cantfind.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("cantfind.sub")}
          </p>
          <button
            onClick={scrollContact}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:scale-[1.03] hover:bg-primary/90"
          >
            {t("cantfind.cta")}
          </button>
        </div>
      </Container>
    </Section>
  );
}
