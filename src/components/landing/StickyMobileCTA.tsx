import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function StickyMobileCTA() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-2xl backdrop-blur md:hidden">
      <Link
        to="/order"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-[0.98]"
      >
        {t("hero.cta")} <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}
