import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/landing/Section";

export const Route = createFileRoute("/agb")({
  head: () => ({ meta: [{ title: "AGB | CertiLingua" }] }),
  component: AGBPage,
});

function AGBPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="py-16">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Allgemeine Geschäftsbedingungen</h1>
          <div className="prose prose-sm mt-8 max-w-none space-y-6 text-foreground/85">
            <section>
              <h2 className="text-lg font-semibold">§ 1 Geltungsbereich</h2>
              <p>Für alle Übersetzungs- und Beglaubigungsdienstleistungen der CertiLingua GmbH gelten ausschließlich diese Geschäftsbedingungen.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold">§ 2 Auftragserteilung</h2>
              <p>Der Auftrag wird mit Zahlungseingang verbindlich. Der Kunde übermittelt das zu übersetzende Dokument digital. Für die Vollständigkeit und Lesbarkeit ist der Kunde verantwortlich.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold">§ 3 Lieferung & Beglaubigung</h2>
              <p>Beglaubigte Übersetzungen werden von gerichtlich vereidigten Übersetzern angefertigt und mit Stempel sowie Unterschrift versehen. Standardlieferzeit: 24–48 Stunden.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold">§ 4 Preise & Zahlung</h2>
              <p>Es gelten die im Preisrechner ausgewiesenen Festpreise inkl. gesetzlicher MwSt. Zahlung per Kreditkarte, SEPA-Lastschrift oder PayPal.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold">§ 5 Haftung & Gewährleistung</h2>
              <p>Wir haften für die fachgerechte Anfertigung der Übersetzung. Bei Reklamation wird kostenlos nachgebessert oder der Kaufpreis erstattet.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold">§ 6 Widerruf</h2>
              <p>Bei individuell angefertigten Übersetzungen besteht gemäß § 312g Abs. 2 Nr. 1 BGB kein Widerrufsrecht.</p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
