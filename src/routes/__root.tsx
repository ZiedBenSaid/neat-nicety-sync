import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { I18nProvider } from "@/lib/i18n";
import { CookieConsent } from "@/components/landing/CookieConsent";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CertiLingua — Certified Translations Accepted Worldwide" },
      { name: "description", content: "ISO-certified translations in 50+ languages, 100% accepted by USCIS, courts, universities and legal use." },
      { name: "author", content: "CertiLingua" },
      { property: "og:title", content: "CertiLingua — Certified Translations Accepted Worldwide" },
      { property: "og:description", content: "ISO-certified translations in 50+ languages, 100% accepted by USCIS, courts, universities and legal use." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "CertiLingua — Certified Translations Accepted Worldwide" },
      { name: "twitter:description", content: "ISO-certified translations in 50+ languages, 100% accepted by USCIS, courts, universities and legal use." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52cb916c-e9a3-48ef-b6d1-8e4abc0d1abf/id-preview-6873d7e7--9ca86a89-9313-4ff1-8de9-89f5c855deb0.lovable.app-1777230253570.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52cb916c-e9a3-48ef-b6d1-8e4abc0d1abf/id-preview-6873d7e7--9ca86a89-9313-4ff1-8de9-89f5c855deb0.lovable.app-1777230253570.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <CartProvider>
        <Outlet />
        <CookieConsent />
      </CartProvider>
    </I18nProvider>
  );
}
