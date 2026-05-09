import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "certilingua_consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-black/10 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      style={{ borderTopWidth: "0.5px" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
          Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Datenverkehr zu analysieren und Dokumente sicher zu verarbeiten. Weitere Informationen finden Sie in unserer{" "}
          <Link to="/privacy" className="text-primary underline hover:no-underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => decide("rejected")}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:text-sm"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:text-sm"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
