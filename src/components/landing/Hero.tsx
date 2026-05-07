import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, FileCheck2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import heroStamp from "@/assets/hero-stamp.jpg";
import heroGavel from "@/assets/hero-gavel.jpg";
import heroPassportSign from "@/assets/hero-passport-sign.jpg";
import heroPassportDocs from "@/assets/hero-passport-docs.jpg";

const slides = [heroStamp, heroGavel, heroPassportSign, heroPassportDocs];

export function Hero() {
  const [index, setIndex] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden bg-navy text-navy-foreground"
      >
          {/* rotating background images */}
          <div className="absolute inset-0">
            <AnimatePresence mode="sync">
              <motion.img
                key={index}
                src={slides[index]}
                alt=""
                aria-hidden
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            {/* dark gradient overlay for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.222 0.062 257 / 0.92) 0%, oklch(0.222 0.062 257 / 0.78) 45%, oklch(0.222 0.062 257 / 0.35) 100%)",
              }}
              aria-hidden
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative mx-auto grid w-full max-w-[1280px] gap-8 px-4 py-16 text-center sm:gap-10 sm:px-6 sm:py-20 md:px-12 md:py-24 md:text-left lg:px-10 lg:py-32"
          >
            <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-foreground/90 backdrop-blur md:mx-0">
              <ShieldCheck className="size-3.5 text-highlight" /> {t("hero.badge")}
            </span>
            <div className="mx-auto max-w-3xl md:mx-0">
              <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title.a")}{" "}
                <span className="relative inline-block">
                  {t("hero.title.b")}
                  <svg
                    className="absolute -inset-x-2 -inset-y-1 h-[120%] w-[110%] text-highlight"
                    viewBox="0 0 200 60"
                    fill="none"
                    aria-hidden
                  >
                    <ellipse
                      cx="100"
                      cy="30"
                      rx="95"
                      ry="22"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                      strokeDashoffset="0.02"
                    />
                  </svg>
                </span>
                <br />
                {t("hero.title.c")}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-navy-foreground/85 md:mx-0 md:text-base">
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center md:justify-start">
              <a
                href="#quote-form"
                onClick={(e) => { e.preventDefault(); document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="relative z-20 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/40 ring-1 ring-primary/40 transition hover:scale-[1.03] hover:bg-primary/90 sm:w-auto"
              >
                Get My Certified Translation <ArrowRight className="size-5" />
              </a>
              <a
                href="#pricing"
                onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                className="relative z-20 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-navy-foreground backdrop-blur transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
              >
                See pricing — from $25/page
              </a>
            </div>

            <p className="-mt-1 text-center text-xs font-semibold text-highlight md:text-left">
              ⏱ {t("micro.deliveryHero")}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 md:justify-start md:pt-4">
              {[
                { icon: Lock, label: "256-bit Secure Upload" },
                { icon: BadgeCheck, label: "100% USCIS Acceptance" },
                { icon: Headphones, label: "24/7 Expert Support" },
                { icon: ShieldCheck, label: "ISO 17100 Certified" },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-navy-foreground/90 backdrop-blur">
                    <Icon className="size-3.5 text-highlight" />
                    {b.label}
                  </span>
                );
              })}
            </div>

            {/* slide indicator dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
      </motion.div>
    </section>
  );
}
