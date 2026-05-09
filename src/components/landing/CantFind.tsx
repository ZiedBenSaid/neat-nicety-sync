import { HelpCircle } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function CantFind() {
  const { t } = useI18n();
  function scrollContact() {
    const el = document.getElementById("contact-form") || document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <Section id="cantfind" className="relative overflow-hidden bg-[#0c1a36] py-16 md:py-20">
      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <div className="flex items-center justify-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-highlight/15 text-highlight">
              <HelpCircle className="size-6" />
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("cantfind.title2")}
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-white/80 md:text-base">
            {t("cantfind.sub2")}
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={scrollContact}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0c1a36] shadow-lg transition hover:scale-[1.03] hover:bg-white/95"
            >
              {t("cantfind.cta")}
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
