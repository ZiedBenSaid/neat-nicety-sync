import { Calculator } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-2xl backdrop-blur md:hidden">
      <a
        href="#preisrechner"
        onClick={(e) => { e.preventDefault(); document.getElementById("preisrechner")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-[0.98]"
      >
        <Calculator className="size-5" /> Jetzt Preis berechnen
      </a>
    </div>
  );
}
