import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

function BadgeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 4l6 5 8-1 2 8 7 4-3 8 3 8-7 4-2 8-8-1-6 5-6-5-8 1-2-8-7-4 3-8-3-8 7-4 2-8 8 1z"
        fill="currentColor"
        opacity="0.35"
      />
      <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="700" fill="currentColor" opacity="0.9">?</text>
    </svg>
  );
}

export function CantFind() {
  const { t } = useI18n();
  function scrollContact() {
    const el = document.getElementById("contact-form") || document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <Section id="cantfind" className="relative overflow-hidden bg-[#0c1a36] py-16 md:py-20">
      {/* Decorative scattered badge icons */}
      <BadgeIcon className="pointer-events-none absolute left-[6%] top-8 size-10 text-white/10" />
      <BadgeIcon className="pointer-events-none absolute left-[18%] top-1/2 size-7 text-white/10" />
      <BadgeIcon className="pointer-events-none absolute left-[28%] bottom-6 size-9 text-white/10" />
      <BadgeIcon className="pointer-events-none absolute right-[24%] top-6 size-14 text-white/15" />
      <BadgeIcon className="pointer-events-none absolute right-[8%] top-12 size-9 text-white/10" />
      <BadgeIcon className="pointer-events-none absolute right-[14%] bottom-8 size-8 text-white/10" />
      <BadgeIcon className="pointer-events-none absolute left-[3%] bottom-10 size-7 text-white/10" />

      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("cantfind.title2")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-white/80 md:text-base">
            {t("cantfind.sub2")}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            {/* Hand-drawn arrow */}
            <svg width="64" height="48" viewBox="0 0 80 60" fill="none" className="text-highlight" aria-hidden>
              <path
                d="M10 8 C 18 28, 22 44, 50 44"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M44 38 L52 45 L44 50"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
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
