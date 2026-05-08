import { Mail, Phone, Search, ShoppingCart, Menu, X, ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Section";
import { Logo } from "./Logo";
import { TrustStrip } from "./TrustStrip";
import { useCart } from "@/lib/cart";
import { useI18n, type Lang } from "@/lib/i18n";

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: "EN", label: "English", flag: "gb" },
  { code: "DE", label: "Deutsch", flag: "de" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const cart = useCart();
  const { lang, setLang, t } = useI18n();
  const active = langs.find((l) => l.code === lang) ?? langs[0];
  const onHome = router.state.location.pathname === "/";

  const navLinks = [
    { label: t("nav.home"), target: "home" },
    { label: t("nav.documents"), target: "documents" },
    { label: t("nav.services"), target: "services" },
    { label: t("nav.why"), target: "why" },
    { label: t("nav.faq"), target: "faq" },
    { label: t("nav.contact"), target: "cantfind" },
  ];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function scrollTo(id: string) {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNavClick(e: React.MouseEvent, target: string) {
    if (onHome) {
      e.preventDefault();
      scrollTo(target);
      setMobileOpen(false);
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      style={{ borderBottom: "1px solid #23262D" }}
    >
      <div className="bg-navy text-navy-foreground" style={{ borderBottom: "1px solid #23262D" }}>
        <Container className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-navy-foreground/80">
              <Mail className="size-3.5" />
              <span>hello@certilingua.com</span>
            </span>
            <span className="hidden items-center gap-1.5 text-navy-foreground/80 sm:inline-flex">
              <Phone className="size-3.5" />
              <span>+61 000 000 000</span>
            </span>
          </div>
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          aria-label="CertiLingua home"
          className="flex items-center transition hover:opacity-80"
        >
          <Logo textClassName="text-foreground" iconSize={34} />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={onHome ? `#${l.target}` : `/#${l.target}`}
              onClick={(e) => handleNavClick(e, l.target)}
              className="text-foreground/80 transition hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/quote"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition hover:scale-[1.03] hover:bg-primary/90 lg:inline-flex"
          >
            {t("nav.quote")}
          </Link>
          <button aria-label="Search" className="grid size-9 place-items-center rounded-md text-foreground/70 transition hover:bg-muted hover:text-foreground">
            <Search className="size-4" />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-9 place-items-center rounded-md text-foreground/70 transition hover:bg-muted hover:text-foreground"
          >
            <ShoppingCart className="size-4" />
            {cart.count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cart.count}
              </span>
            ) : null}
          </Link>

          <div className="relative hidden md:block" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-1.5 py-1 text-sm font-semibold text-foreground"
            >
              <span className="grid size-6 place-items-center overflow-hidden rounded-full ring-1 ring-border">
                <img
                  src={`https://flagcdn.com/w40/${active.flag}.png`}
                  alt=""
                  className="size-full object-cover"
                />
              </span>
              <span>{active.code}</span>
              <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-28 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-semibold transition hover:bg-muted"
                  >
                    <span className="grid size-6 place-items-center overflow-hidden rounded-full ring-1 ring-border">
                      <img
                        src={`https://flagcdn.com/w40/${l.flag}.png`}
                        alt=""
                        className="size-full object-cover"
                      />
                    </span>
                    <span>{l.code}</span>
                    {l.code === active.code ? (
                      <Check className="ml-auto size-4 text-primary" />
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md text-foreground/70 transition hover:bg-muted md:hidden"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <Container className="flex flex-col gap-1 py-3">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={onHome ? `#${l.target}` : `/#${l.target}`}
                  onClick={(e) => handleNavClick(e, l.target)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/85 transition hover:bg-muted hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                <span>Cart</span>
                <span className="text-xs text-muted-foreground">{cart.count} items</span>
              </Link>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <TrustStrip />
    </header>
  );
}
