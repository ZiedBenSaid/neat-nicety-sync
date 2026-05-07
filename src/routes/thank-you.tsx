import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, Clock, FileText, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/landing/Section";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — CertiLingua" },
      { name: "description", content: "Your certified translation order has been received." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function makeOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `CL-${new Date().getFullYear()}-${n}`;
}

function ThankYouPage() {
  const orderId = typeof window !== "undefined" ? makeOrderId() : "CL-2025-000000";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-9" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tighter md:text-4xl">
              Thank you — your order was received
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              We've sent a confirmation email with your order details and next steps.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Order # <span className="font-mono">{orderId}</span>
            </div>

            <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left text-sm">
              <li className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <span><strong>Email confirmation sent.</strong> Check your inbox (and spam) within a few minutes.</span>
              </li>
              <li className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span><strong>Expected delivery:</strong> Standard 24–48 hours · Rush 8–12 hours · Express 4 hours.</span>
              </li>
              <li className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3">
                <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                <span><strong>Next steps:</strong> A certified project manager will review your documents and email your translation as a signed PDF.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:bg-primary/90"
              >
                Back to home <ArrowRight className="size-4" />
              </Link>
              <a
                href="mailto:hello@certilingua.com"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground/80 transition hover:border-primary/40 hover:text-primary"
              >
                Contact support
              </a>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
