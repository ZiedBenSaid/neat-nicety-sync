import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/landing/Section";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum | CertiLingua" }] }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="py-16">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Impressum</h1>
          <div className="prose prose-sm mt-8 max-w-none text-foreground/85">
            <h2 className="mt-8 text-lg font-semibold">Angaben gemäß § 5 TMG</h2>
            <p>CertiLingua GmbH<br/>Königsallee 1<br/>40468 Düsseldorf<br/>Deutschland</p>
            <h2 className="mt-8 text-lg font-semibold">Kontakt</h2>
            <p>E-Mail: hello@certilingua.com<br/>Telefon: +49 (0) 211 000 0000</p>
            <h2 className="mt-8 text-lg font-semibold">Handelsregister</h2>
            <p>Amtsgericht Düsseldorf · HRB 000000<br/>USt-IdNr.: DE000000000</p>
            <h2 className="mt-8 text-lg font-semibold">Vertretungsberechtigt</h2>
            <p>Geschäftsführung: Max Mustermann</p>
            <h2 className="mt-8 text-lg font-semibold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Max Mustermann, Anschrift wie oben</p>
            <h2 className="mt-8 text-lg font-semibold">Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr</p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
