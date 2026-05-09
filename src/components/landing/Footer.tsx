import type { ReactNode } from "react";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Apple, ShieldCheck, BadgeCheck, Lock, Award, Building2, GraduationCap, Gavel, Landmark, Globe2, FileCheck2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container } from "./Section";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const authorities = [
    { icon: Landmark, label: t("footer.auth.uscis") },
    { icon: Building2, label: t("footer.auth.dmv") },
    { icon: Gavel, label: t("footer.auth.courts") },
    { icon: Globe2, label: t("footer.auth.embassies") },
    { icon: GraduationCap, label: t("footer.auth.universities") },
    { icon: FileCheck2, label: t("footer.auth.notaries") },
  ];

  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Why choose strip */}
      <div className="border-b border-navy-border bg-navy/60">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "100% Acceptance Guarantee", d: "Or full refund — no questions asked." },
            { icon: Award, t: "ISO 17100 Certified", d: "Audited quality management." },
            { icon: Lock, t: "Confidential by Design", d: "GDPR · NDA · EU-encrypted." },
            { icon: BadgeCheck, t: "Sworn Translators", d: "Court-recognised linguists." },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.t} className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-foreground">{b.t}</p>
                  <p className="mt-0.5 text-xs text-navy-foreground/65">{b.d}</p>
                </div>
              </div>
            );
          })}
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo textClassName="text-white" iconSize={32} />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-navy-foreground/70">
              {t("footer.why.body")}
            </p>
            {/* Social icons hidden until real profiles are connected */}
            <div className="mt-6 flex flex-wrap items-center gap-1.5">
              <PayChip>
                <span className="text-[10px] font-extrabold italic leading-none">
                  <span className="text-[#003087]">Pay</span>
                  <span className="text-[#009CDE]">Pal</span>
                </span>
              </PayChip>
              <PayChip>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold leading-none text-black">
                  <Apple className="size-3 fill-black" strokeWidth={0} />
                  Pay
                </span>
              </PayChip>
              <PayChip>
                <span className="text-[10px] font-bold italic leading-none text-[#635BFF]">stripe</span>
              </PayChip>
              <PayChip>
                <span className="text-[10px] font-extrabold italic tracking-wider leading-none text-[#1A1F71]">VISA</span>
              </PayChip>
              <PayChip>
                <span className="relative flex items-center">
                  <span className="size-2.5 rounded-full bg-[#EB001B]" />
                  <span className="-ml-1 size-2.5 rounded-full bg-[#F79E1B] mix-blend-multiply" />
                </span>
              </PayChip>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold tracking-tight">{t("footer.authorities")}</h4>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm text-navy-foreground/75">
              {authorities.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.label} className="inline-flex items-center gap-2">
                    <Icon className="size-4 text-highlight" />
                    <span>{a.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold tracking-tight">{t("footer.menu")}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
              <li><Link to="/" className="hover:text-primary">{t("nav.home")}</Link></li>
              <li><Link to="/services" className="hover:text-primary">{t("nav.services")}</Link></li>
              <li><Link to="/quote" className="hover:text-primary">{t("nav.quote")}</Link></li>
              <li><Link to="/reviews" className="hover:text-primary">{t("nav.reviews")}</Link></li>
            </ul>
            <h4 className="mt-6 text-sm font-semibold tracking-tight">{t("footer.legal")}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
              <li><Link to="/impressum" className="hover:text-primary">Impressum</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Datenschutz (DSGVO)</Link></li>
              <li><Link to="/terms" className="hover:text-primary">AGB</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold tracking-tight">{t("footer.contact")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
              <li className="inline-flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a href="mailto:hello@certilingua.com" className="hover:text-primary">hello@certilingua.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 text-primary" />
                <span>40468 Düsseldorf, Deutschland</span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <span>(+46) 000 000 000</span>
              </li>
              <li className="mt-2 rounded-md bg-white/5 p-2.5 text-xs text-navy-foreground/85">
                ⚡ {t("footer.response")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-navy-border pt-6 text-center text-xs text-navy-foreground/55 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} CertiLingua. {t("footer.rights")}</p>
          <p className="inline-flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-highlight" /> ISO 17100 · DSGVO · NDA-gesichert
          </p>
        </div>
      </Container>
    </footer>
  );
}

function PayChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-7 min-w-[44px] items-center justify-center rounded-md bg-white px-2 shadow-sm">
      {children}
    </span>
  );
}
