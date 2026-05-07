import { ShieldCheck, Lock, BadgeCheck, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function TrustStrip() {
  const { t } = useI18n();
  const items = [
    { icon: ShieldCheck, label: t("strip.guarantee") },
    { icon: Clock, label: t("strip.delivery") },
    { icon: Lock, label: t("strip.confidential") },
    { icon: BadgeCheck, label: t("strip.experts") },
  ];
  return (
    <div className="border-b border-border bg-gradient-to-r from-primary/10 via-surface to-primary/5">
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-10">
        <ul className="flex w-full items-center justify-between gap-4 whitespace-nowrap text-[11px] font-semibold tracking-wide text-foreground/85 sm:text-xs">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.label} className="flex items-center gap-1.5">
                <Icon className="size-3.5 text-primary" />
                <span>{it.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
