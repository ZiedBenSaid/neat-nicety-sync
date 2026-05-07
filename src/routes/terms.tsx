import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container, Section } from "@/components/landing/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — CertiLingua" },
      { name: "description", content: "Terms governing the use of CertiLingua certified translation services, including the 100% acceptance guarantee." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Section className="py-16 md:py-24">
          <Container className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">Terms of Service</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: May 1, 2026</p>
            <div className="prose prose-sm mt-8 max-w-none text-foreground/85">
              <h2 className="text-xl font-bold">1. Service</h2>
              <p>CertiLingua provides certified, sworn, and notarized translations carried out by professional linguists under ISO 17100 quality management.</p>
              <h2 className="mt-6 text-xl font-bold">2. Acceptance Guarantee</h2>
              <p>If a translation we deliver is rejected by the receiving authority for reasons attributable to the translation or certification, we will revise it free of charge or refund the order in full.</p>
              <h2 className="mt-6 text-xl font-bold">3. Confidentiality</h2>
              <p>All documents are handled under NDA and processed on encrypted, GDPR-compliant infrastructure inside the EU.</p>
              <h2 className="mt-6 text-xl font-bold">4. Payment</h2>
              <p>Orders are payable in advance via the methods listed at checkout. Quoted prices are inclusive of VAT where applicable.</p>
              <p className="mt-6 text-xs text-muted-foreground">This is a placeholder document. Replace with terms reviewed by legal counsel before launch.</p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
