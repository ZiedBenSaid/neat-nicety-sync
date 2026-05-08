import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AcceptanceGuarantee } from "@/components/landing/AcceptanceGuarantee";
import { FAQ } from "@/components/landing/FAQ";
import { Reviews } from "@/components/landing/Reviews";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { GermanProcess } from "@/components/landing/GermanProcess";
import { GermanDocuments } from "@/components/landing/GermanDocuments";
import { Languages } from "@/components/landing/Languages";
import { CantFind } from "@/components/landing/CantFind";
import { Services } from "@/components/landing/Services";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CertiLingua — Beglaubigte Übersetzungen, anerkannt weltweit" },
      { name: "description", content: "ISO 17100 zertifizierte beglaubigte Übersetzungen in 60+ Sprachen. 100% Akzeptanz garantiert. Lieferung in 24 Stunden." },
      { property: "og:title", content: "CertiLingua — Beglaubigte Übersetzungen" },
      { property: "og:description", content: "ISO 17100 zertifizierte Übersetzungen, anerkannt von Behörden, Gerichten und Universitäten weltweit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <AcceptanceGuarantee />
        <GermanProcess />
        <div id="documents">
          <GermanDocuments />
        </div>
        <div id="contact">
          <CantFind />
        </div>
        <Services />
        <WhyChoose />
        <Languages />
        <div id="reviews">
          <Reviews />
        </div>
        <FAQ />
      </main>
      <Footer />
      <FloatingContact />
      <StickyMobileCTA />
    </div>
  );
}
