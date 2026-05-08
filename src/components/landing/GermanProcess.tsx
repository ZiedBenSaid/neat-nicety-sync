import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";
import documentStampingImg from "@/assets/document-stamping.jpg";

function UploadIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="24" height="28" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <rect x="12" y="16" width="16" height="2" rx="1" fill="#F59E0B" />
      <rect x="12" y="21" width="12" height="2" rx="1" fill="#F59E0B" />
      <rect x="12" y="26" width="14" height="2" rx="1" fill="#F59E0B" />
      <circle cx="32" cy="18" r="10" fill="#3B82F6" />
      <path d="M28 23L32 14L36 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TranslatorIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="28" height="24" rx="2" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
      <rect x="10" y="18" width="8" height="2" rx="1" fill="#EF4444" />
      <rect x="10" y="23" width="12" height="2" rx="1" fill="#EF4444" />
      <rect x="10" y="28" width="10" height="2" rx="1" fill="#EF4444" />
      <rect x="24" y="8" width="20" height="16" rx="2" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M30 18L32 12L34 18M30.5 16H33.5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ReviewIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="24" height="32" rx="2" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
      <rect x="12" y="14" width="16" height="2" rx="1" fill="#9CA3AF" />
      <rect x="12" y="19" width="12" height="2" rx="1" fill="#9CA3AF" />
      <rect x="12" y="24" width="14" height="2" rx="1" fill="#9CA3AF" />
      <circle cx="34" cy="30" r="10" fill="white" stroke="#3B82F6" strokeWidth="2" />
      <path d="M34 26V30H38" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="16" width="28" height="20" rx="2" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M4 18L18 28L32 18" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="24" y="8" width="20" height="26" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="40" cy="30" r="4" fill="#3B82F6" />
      <path d="M38.5 30L39.5 31L41.5 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GermanProcess() {
  const { t } = useI18n();
  const steps = [
    { Icon: UploadIcon, title: t("process.s1.t"), body: t("process.s1.d") },
    { Icon: TranslatorIcon, title: t("process.s2.t"), body: t("process.s2.d") },
    { Icon: ReviewIcon, title: t("process.s3.t"), body: t("process.s3.d") },
    { Icon: MailIcon, title: t("process.s4.t"), body: t("process.s4.d") },
  ];

  return (
    <Section id="ablauf" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("process.kicker")}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("process.title.a")} <span className="text-highlight">{t("process.title.b")}</span> {t("process.title.c")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground lg:mx-0">
              {t("process.subtitle")}
            </p>

            <ol className="mx-auto mt-10 grid max-w-md gap-6 lg:max-w-none">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-4 text-left">
                  <div className="relative flex flex-col items-center">
                    <div className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-primary/30 bg-primary/5 text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 ? (
                      <div className="mt-1 h-12 w-px bg-primary/20" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 items-start gap-3 pb-2">
                    <s.Icon />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to="/order"
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:scale-[1.02] hover:bg-primary/90 sm:w-auto"
            >
              {t("process.cta")} <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={documentStampingImg}
                alt="Certified document stamping process"
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent px-6 py-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: "60+", l: t("process.stat.langs") },
                    { v: "100%", l: t("process.stat.acc") },
                    { v: "24/7", l: t("process.stat.turn") },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="text-2xl font-bold text-white md:text-3xl">{s.v}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-white/85 md:text-xs">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
