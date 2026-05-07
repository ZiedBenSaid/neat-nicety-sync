import { MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FloatingContact() {
  const { lang } = useI18n();
  const label = lang === "DE" ? "Jetzt chatten" : "Chat with us";
  return (
    <a
      href="https://wa.me/491700000000"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="WhatsApp"
      className="fixed bottom-20 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:scale-[1.03] hover:bg-[#1ebe5d] md:bottom-5"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
