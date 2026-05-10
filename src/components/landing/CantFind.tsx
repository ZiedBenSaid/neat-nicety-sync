import { HelpCircle, ArrowRight } from "lucide-react";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";

export function CantFind() {
  const { t } = useI18n();
  function scrollContact() {
    const el = document.getElementById("contact-form") || document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Floating "?" decorations — varied sizes, positions, opacity, animation delays
  const marks = [
    { top: "8%", left: "6%", size: "text-7xl", delay: "0s", opacity: "opacity-[0.07]" },
    { top: "18%", left: "88%", size: "text-9xl", delay: "1.2s", opacity: "opacity-[0.05]" },
    { top: "62%", left: "4%", size: "text-8xl", delay: "0.6s", opacity: "opacity-[0.06]" },
    { top: "75%", left: "82%", size: "text-7xl", delay: "1.8s", opacity: "opacity-[0.08]" },
    { top: "40%", left: "14%", size: "text-5xl", delay: "2.4s", opacity: "opacity-[0.05]" },
    { top: "30%", left: "72%", size: "text-6xl", delay: "0.9s", opacity: "opacity-[0.06]" },
    { top: "85%", left: "48%", size: "text-5xl", delay: "1.5s", opacity: "opacity-[0.05]" },
    { top: "5%", left: "44%", size: "text-6xl", delay: "2.1s", opacity: "opacity-[0.06]" },
  ];

  return (
    <Section id="cantfind" className="relative overflow-hidden bg-navy py-14 md:py-20">
      {/* Soft gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
      />

      {/* Floating ??? marks */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {marks.map((m, i) => (
          <span
            key={i}
            className={`absolute select-none font-black text-white ${m.size} ${m.opacity} animate-[float_6s_ease-in-out_infinite]`}
            style={{ top: m.top, left: m.left, animationDelay: m.delay }}
          >
            ?
          </span>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
        }
      `}</style>

      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center text-navy-foreground">
          <span className="inline-grid size-14 place-items-center rounded-2xl bg-highlight/15 text-highlight ring-1 ring-highlight/30">
            <HelpCircle className="size-7" />
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("cantfind.title2")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-navy-foreground/75 md:text-base">
            {t("cantfind.sub2")}
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={scrollContact}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03] hover:bg-primary/90"
            >
              {t("cantfind.cta")}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
