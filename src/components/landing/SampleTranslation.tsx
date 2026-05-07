import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stamp, Signature, FileCheck2, Mail, X, ZoomIn, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container, Section } from "./Section";
import { useI18n } from "@/lib/i18n";
import sampleImg from "@/assets/sample-certified-translation.jpg";

export function SampleTranslation() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const bullets = [
    { icon: FileCheck2, text: t("sample.bullet1") },
    { icon: Stamp, text: t("sample.bullet2") },
    { icon: Signature, text: t("sample.bullet3") },
    { icon: Mail, text: t("sample.bullet4") },
  ];

  return (
    <Section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("sample.kicker")}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
              {t("sample.title")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("sample.subtitle")}
            </p>
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm leading-relaxed">{b.text}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-[1.03] hover:bg-primary/90"
              >
                <ShieldCheck className="size-4" /> {t("micro.secureQuote")}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
              >
                <ZoomIn className="size-4" /> {t("sample.cta")}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-xl shadow-primary/5 transition hover:shadow-primary/15"
          >
            <img
              src={sampleImg}
              alt="Sample certified translation document with notary stamp and signature"
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full rounded-lg object-cover transition group-hover:scale-[1.02]"
            />
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-navy/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
              <ShieldCheck className="size-3 text-highlight" /> ISO 17100 Sample
            </span>
            <span className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow">
              <ZoomIn className="size-3.5" /> Click to enlarge
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <p className="text-sm font-semibold">{t("sample.modal.title")}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("sample.modal.close")}
                  className="grid size-8 place-items-center rounded-md text-foreground/70 transition hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="max-h-[75vh] overflow-auto bg-surface p-4">
                <img
                  src={sampleImg}
                  alt="Sample certified translation, full size"
                  className="mx-auto w-full max-w-2xl rounded-lg shadow-lg"
                />
              </div>
              <p className="border-t border-border px-5 py-3 text-center text-xs text-muted-foreground">
                {t("sample.modal.note")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
