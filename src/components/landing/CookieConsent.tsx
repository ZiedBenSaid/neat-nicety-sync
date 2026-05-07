import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const KEY = "certilingua-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const { lang } = useI18n();
  const isDe = lang === "DE";

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  const c = isDe
    ? {
        title: "Wir schätzen Ihre Privatsphäre",
        body: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Datenverkehr zu analysieren und Dokumente sicher zu verarbeiten. Siehe unsere",
        and: "und",
        privacy: "Datenschutzerklärung",
        terms: "AGB",
        decline: "Ablehnen",
        accept: "Akzeptieren",
      }
    : {
        title: "We value your privacy",
        body: "We use cookies to improve your experience, analyse traffic and secure document handling. See our",
        and: "and",
        privacy: "Privacy Policy",
        terms: "Terms",
        decline: "Decline",
        accept: "Accept all",
      };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:left-4 sm:right-4 md:left-6 md:right-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Cookie className="size-5" />
        </span>
        <div className="flex-1 text-sm text-foreground/85">
          <p className="font-semibold text-foreground">{c.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {c.body}{" "}
            <Link to="/privacy" className="text-primary underline">{c.privacy}</Link>
            {" "}{c.and}{" "}
            <Link to="/terms" className="text-primary underline">{c.terms}</Link>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => decide("declined")}
            className="rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground/80 transition hover:bg-muted"
          >
            {c.decline}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {c.accept}
          </button>
          <button
            onClick={() => decide("declined")}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-md text-foreground/60 hover:bg-muted hover:text-foreground sm:hidden"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
