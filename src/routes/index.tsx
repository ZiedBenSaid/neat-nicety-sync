import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { AcceptanceGuarantee } from "@/components/landing/AcceptanceGuarantee";
import { Languages } from "@/components/landing/Languages";
import { UseCases } from "@/components/landing/UseCases";
import { SampleTranslation } from "@/components/landing/SampleTranslation";
import { Blog } from "@/components/landing/Blog";
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/landing/Pricing";
import { Reviews } from "@/components/landing/Reviews";
import { QuoteForm } from "@/components/landing/QuoteForm";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { OfficialStamp } from "@/components/landing/OfficialStamp";
import { GermanProcess } from "@/components/landing/GermanProcess";
import { GermanDocuments } from "@/components/landing/GermanDocuments";
import { PriceCalculator } from "@/components/landing/PriceCalculator";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Certified Translations Accepted by USCIS, Courts & Embassies | CertiLingua" },
      { name: "description", content: "ISO 17100 certified translations in 60+ languages. 100% acceptance guaranteed by USCIS, embassies, courts and universities. Delivered in 24h. Trusted by 12,000+ clients." },
      { name: "keywords", content: "certified translation, USCIS translation, sworn translation, ISO 17100, notarized translation, official document translation" },
      { property: "og:title", content: "Certified Translations Accepted Worldwide — CertiLingua" },
      { property: "og:description", content: "ISO-certified translations in 60+ languages — guaranteed accepted by USCIS, courts, embassies and universities. Delivered in 24h." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Certified Translations Accepted Worldwide — CertiLingua" },
      { name: "twitter:description", content: "ISO-certified translations guaranteed accepted by USCIS, courts and embassies." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "CertiLingua",
          description: "ISO 17100 certified translation service. Sworn translations accepted by USCIS, courts, embassies and universities worldwide.",
          url: "https://certilingua.com",
          telephone: "+46-000-000-000",
          email: "hello@certilingua.com",
          address: {
            "@type": "PostalAddress",
            postalCode: "40468",
            addressLocality: "Düsseldorf",
            addressCountry: "DE",
          },
          areaServed: "Worldwide",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "12483",
            bestRating: "5",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <TrustBar />
        <OfficialStamp />
        <GermanProcess />
        <div id="documents">
          <GermanDocuments />
        </div>
        <PriceCalculator />
        <Pricing />
        <AcceptanceGuarantee />
        <Languages />
        <div id="usecases">
          <UseCases />
        </div>
        <SampleTranslation />
        <div id="reviews">
          <Reviews />
        </div>
        <div id="blog">
          <Blog />
        </div>
        <FAQ />
        <QuoteForm />
        <CTA />
      </main>
      <div id="contact">
        <Footer />
      </div>
      <FloatingContact />
      <StickyMobileCTA />
    </div>
  );
}
