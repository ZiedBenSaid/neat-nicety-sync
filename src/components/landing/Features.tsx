import { Zap, Globe2, BadgeCheck, Lock } from "lucide-react";
import { Container, Section } from "./Section";
import { GlobeBackdrop } from "./GlobeBackdrop";

const features = [
  {
    icon: Zap,
    title: "Fast 48-Hour Delivery",
    body: "Certified translations delivered within 48 hours. Professional and reliable service.",
  },
  {
    icon: Globe2,
    title: "Globally Recognized",
    body: "Accepted by authorities, universities, courts and more in over 100 countries worldwide.",
  },
  {
    icon: BadgeCheck,
    title: "Legal Certification",
    body: "Official sworn translations by certified linguists. Legally binding and recognized.",
  },
  {
    icon: Lock,
    title: "Secure & Encrypted",
    body: "Your documents remain private and secure with full GDPR and SOC2 data protection.",
  },
];

export function Features() {
  return (
    <Section className="relative overflow-hidden bg-surface py-20">
      <GlobeBackdrop opacity={0.45} />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Why CertiLingua
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter md:text-4xl">
            Professional Translation
            <br />
            Services You Can Trust
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-sm"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-highlight/20 text-amber-600">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
