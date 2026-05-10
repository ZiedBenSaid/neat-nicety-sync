import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section, Container } from "./Section";
import { useI18n, formatNumber } from "@/lib/i18n";

export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/certilingua.com";

export type Review = {
  name: string;
  country: string;
  flag: string;
  date: string;
  title: string;
  body: string;
  rating: number;
  verified: boolean;
};

export const reviews: Review[] = [
  { name: "Lukas M.", country: "Deutschland", flag: "de", date: "vor 1 Woche", title: "Beglaubigte Übersetzung — perfekt", body: "Heiratsurkunde für das Standesamt übersetzt. Stempel, Unterschrift, alles korrekt. Sehr professionell und schneller als versprochen.", rating: 5, verified: true },
  { name: "Anna K.", country: "Deutschland", flag: "de", date: "vor 4 Tagen", title: "Schnell und absolut zuverlässig", body: "Geburtsurkunde innerhalb von 24 Stunden beglaubigt übersetzt. Wurde ohne Nachfrage von der Ausländerbehörde anerkannt. Ich kann CertiLingua wärmstens empfehlen.", rating: 5, verified: true },
  { name: "Stefan H.", country: "Österreich", flag: "at", date: "vor 2 Wochen", title: "Top Service für Visa-Antrag", body: "Diplom und Notenspiegel für die Bewerbung in den USA übersetzt. Alles ISO-konform, vereidigter Übersetzer, faire Preise. Zahlung erst nach Freigabe — sehr seriös.", rating: 5, verified: true },
  { name: "Julia B.", country: "Schweiz", flag: "ch", date: "vor 3 Wochen", title: "Kompetente und freundliche Beratung", body: "Hatte viele Fragen zur Beglaubigung für das BAMF. Das Team war sofort per WhatsApp erreichbar und hat alles geduldig erklärt. Lieferung pünktlich, Qualität einwandfrei.", rating: 5, verified: true },
  { name: "Amelia R.", country: "United Kingdom", flag: "gb", date: "vor 3 Tagen", title: "Accepted by USCIS first try", body: "Translated my birth certificate for a US visa. Document was accepted by USCIS without a single question. Turnaround was under 24 hours.", rating: 5, verified: true },
  { name: "Sofia C.", country: "Italy", flag: "it", date: "vor 2 Wochen", title: "University enrollment saved", body: "Needed my diploma translated for Sorbonne enrollment with two days notice. They delivered overnight, certified, and the apostille was already attached.", rating: 5, verified: true },
];

export const summary = {
  score: 4.9,
  total: 12483,
  distribution: [
    { stars: 5, pct: 92 },
    { stars: 4, pct: 6 },
    { stars: 3, pct: 1 },
    { stars: 2, pct: 0 },
    { stars: 1, pct: 1 },
  ],
};

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <span
            key={i}
            className="grid place-items-center"
            style={{ width: size + 4, height: size + 4, backgroundColor: filled ? "#00B67A" : "#DCDCE6" }}
          >
            <Star style={{ width: size - 2, height: size - 2 }} fill="white" stroke="white" strokeWidth={1.5} />
          </span>
        );
      })}
    </span>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Quote className="absolute right-5 top-5 size-6 text-primary/15" aria-hidden />
      <Stars value={review.rating} size={13} />
      <h3 className="mt-3 text-base font-semibold tracking-tight">{review.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-muted text-xs font-bold text-foreground">
          {review.name.split(" ").map((n) => n[0]).join("")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold">{review.name}</span>
            {review.verified ? (
              <span className="grid size-4 shrink-0 place-items-center rounded-full" style={{ backgroundColor: "#00B67A" }} title="Verified order">
                <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <img src={`https://flagcdn.com/w20/${review.flag}.png`} alt="" className="size-3 rounded-[2px] object-cover" />
            <span>{review.country}</span>
            <span>·</span>
            <span>{review.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Carousel of reviews — used on the homepage. */
export function Reviews() {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const step = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  const aggregateJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CertiLingua",
    url: "https://certilingua.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.score,
      bestRating: 5,
      worstRating: 1,
      ratingCount: summary.total,
    },
    review: reviews.slice(0, 3).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
      name: r.title,
    })),
  };

  return (
    <Section id="reviews" className="bg-surface py-12 md:py-20">
      <Container>
        {/* Header / summary */}
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="inline-block size-2 rounded-full" style={{ backgroundColor: "#00B67A" }} />
              {t("reviews.badge")}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tighter sm:text-4xl md:text-5xl">
              {t("reviews.title.a")} <br className="hidden sm:block" />
              <span className="text-primary">{t("reviews.title.b")}</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("reviews.subtitle")}
            </p>
          </div>

          {/* Score card */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight md:text-5xl">{summary.score.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">/ 5.0</span>
                </div>
                <div className="mt-2"><Stars value={summary.score} size={16} /></div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("reviews.basedOn")}{" "}
                  <span className="font-semibold text-foreground">{formatNumber(summary.total)}</span>{" "}
                  {t("reviews.verifiedReviews")}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <span className="grid size-6 place-items-center rounded-sm" style={{ backgroundColor: "#00B67A" }}>
                    <Star className="size-3.5" fill="white" stroke="white" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{t("reviews.excellent")}</span>
                </div>
                <span className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Trustscore</span>
              </div>
            </div>
            <ul className="mt-5 space-y-1.5">
              {summary.distribution.map((d) => (
                <li key={d.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-7 shrink-0 text-muted-foreground">{d.stars}★</span>
                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: "#00B67A" }} />
                  </span>
                  <span className="w-9 shrink-0 text-right tabular-nums text-muted-foreground">{d.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">{t("reviews.latest")}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                disabled={!canPrev}
                aria-label="Previous reviews"
                className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground/70 transition hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground/70"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={!canNext}
                aria-label="Next reviews"
                className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground/70 transition hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground/70"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <div
                key={r.name}
                data-review-card
                className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
              >
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer trust strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-background p-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-md" style={{ backgroundColor: "#00B67A" }}>
              <Star className="size-5" fill="white" stroke="white" />
            </span>
            <div className="text-sm">
              <p className="font-semibold">{t("reviews.verifiedFooter.title")}</p>
              <p className="text-xs text-muted-foreground">
                {t("reviews.verifiedFooter.sub")}
              </p>
            </div>
          </div>
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            {t("reviews.readAll")}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateJsonLd) }}
      />
    </Section>
  );
}
