import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container, Section } from "@/components/landing/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CertiLingua" },
      { name: "description", content: "How CertiLingua collects, processes and protects your personal data under GDPR." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Section className="py-16 md:py-24">
          <Container className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last updated: May 1, 2026</p>
            <div className="prose prose-sm mt-8 max-w-none text-foreground/85">
              <p>CertiLingua processes personal data in accordance with the EU General Data Protection Regulation (GDPR). Documents you upload are encrypted in transit and at rest, retained for a maximum of 90 days unless you request earlier deletion, and never shared with third parties without your consent.</p>
              <h2 className="mt-8 text-xl font-bold">Data we collect</h2>
              <p>Contact details, billing information, and the documents you submit for translation.</p>
              <h2 className="mt-6 text-xl font-bold">Lawful basis</h2>
              <p>Performance of contract (Art. 6(1)(b) GDPR) and legitimate interest in providing certified translation services.</p>
              <h2 className="mt-6 text-xl font-bold">Your rights</h2>
              <p>Access, rectification, deletion, restriction, portability, and objection. Contact <a className="text-primary" href="mailto:privacy@certilingua.com">privacy@certilingua.com</a>.</p>
              <p className="mt-6 text-xs text-muted-foreground">This is a placeholder document. Replace with policy reviewed by legal counsel before launch.</p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
