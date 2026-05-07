import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/landing/FloatingContact";
import { Container, Section } from "@/components/landing/Section";
import { products } from "@/lib/products";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — CertiLingua Certified Translations" },
      {
        name: "description",
        content:
          "Browse all certified translation services: passports, diplomas, birth certificates, USCIS documents and more. ISO certified, accepted worldwide.",
      },
      { property: "og:title", content: "Our Services — CertiLingua" },
      {
        property: "og:description",
        content: "All certified translation services in one place.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Section className="bg-navy text-navy-foreground">
          <Container className="py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-highlight">
                Our Services
              </span>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tighter md:text-5xl">
                Certified translations for every official document
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-navy-foreground/80 md:text-base">
                Browse our full catalogue. Every document is translated by ISO-certified
                professionals and accepted worldwide.
              </p>
            </motion.div>
          </Container>
        </Section>

        <Section className="py-16">
          <Container>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((d) => (
                <Link
                  key={d.slug}
                  to="/product/$slug"
                  params={{ slug: d.slug }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted/40">
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      className="size-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-sm">
                      <Star className="size-3 fill-primary text-primary" /> Certified
                    </span>
                  </div>
                  <div className="space-y-1.5 p-4">
                    <h3 className="text-sm font-semibold tracking-tight">{d.name}</h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3 fill-highlight text-highlight" />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">({d.reviews})</span>
                    </div>
                    <p className="pt-1 text-base font-bold text-primary">€{d.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                Back to home <ArrowRight className="size-4" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
