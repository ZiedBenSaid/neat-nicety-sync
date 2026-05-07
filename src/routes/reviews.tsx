import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Star, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/landing/Section";
import { ReviewCard, Stars, reviews, summary, TRUSTPILOT_URL } from "@/components/landing/Reviews";
import { formatNumber } from "@/lib/i18n";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — CertiLingua | 4.9★ on Trustpilot" },
      { name: "description", content: "Read 12,000+ verified reviews from CertiLingua customers. ISO-certified translations trusted by USCIS, courts, and universities worldwide." },
      { property: "og:title", content: "CertiLingua Customer Reviews — 4.9★ Trustpilot" },
      { property: "og:description", content: "Read 12,000+ verified reviews from CertiLingua customers worldwide." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "CertiLingua",
          url: "https://certilingua.com",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: summary.score,
            bestRating: 5,
            ratingCount: summary.total,
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            reviewBody: r.body,
            name: r.title,
          })),
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border bg-surface py-14 md:py-20">
          <Container>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:text-primary">
              <ArrowLeft className="size-3.5" /> Back to home
            </Link>
            <div className="mt-4 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
                  What our customers say
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Independently verified by Trustpilot. Every review comes from a paying customer
                  whose translation was accepted by an embassy, court, university, or government office.
                </p>
                <a
                  href={TRUSTPILOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  View on Trustpilot
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight">{summary.score.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">/ 5.0</span>
                </div>
                <div className="mt-2"><Stars value={summary.score} size={18} /></div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on <span className="font-semibold text-foreground">{formatNumber(summary.total)}</span> verified reviews
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5">
                  <span className="grid size-6 place-items-center rounded-sm" style={{ backgroundColor: "#00B67A" }}>
                    <Star className="size-3.5" fill="white" stroke="white" />
                  </span>
                  <span className="text-sm font-semibold tracking-tight">Excellent on Trustpilot</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-20">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.concat(reviews).map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <a
                href={TRUSTPILOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Read all {formatNumber(summary.total)} reviews on Trustpilot
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
