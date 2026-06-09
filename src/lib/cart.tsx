import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  /** Stable line-item id. Older carts may not have it; the provider migrates them on load. */
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  pages: number;
  expedited: boolean;
  qty: number;
};

type AddCartItem = Omit<CartItem, "id" | "qty"> & { qty?: number; id?: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isReady: boolean;
  add: (item: AddCartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setPages: (id: string, pages: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "certilingua-cart:v2";
const LEGACY_KEY = "certifypro-cart";
const MAX_QTY = 50;
const MAX_PAGES = 500;

type StoredCartItem = Partial<CartItem> & Pick<CartItem, "slug" | "name" | "price" | "image">;

function clampNumber(value: unknown, fallback: number, min: number, max: number) {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(number)));
}

function makeLineId(item: Pick<CartItem, "slug" | "pages" | "expedited">) {
  return `${item.slug}:${item.expedited ? "express" : "standard"}:${item.pages}`;
}

function normalizeItem(item: StoredCartItem): CartItem | null {
  if (!item || typeof item !== "object") return null;
  if (!item.slug || !item.name || typeof item.price !== "number" || !item.image) return null;

  const pages = clampNumber(item.pages, 1, 1, MAX_PAGES);
  const normalized: CartItem = {
    id: item.id || makeLineId({ slug: item.slug, pages, expedited: Boolean(item.expedited) }),
    slug: item.slug,
    name: item.name,
    price: Math.max(0, item.price),
    image: item.image,
    pages,
    expedited: Boolean(item.expedited),
    qty: clampNumber(item.qty, 1, 1, MAX_QTY),
  };

  return normalized;
}

function mergeDuplicateLines(items: CartItem[]) {
  const byId = new Map<string, CartItem>();

  for (const item of items) {
    const id = item.id || makeLineId(item);
    const existing = byId.get(id);
    if (existing) {
      byId.set(id, { ...existing, qty: clampNumber(existing.qty + item.qty, 1, 1, MAX_QTY) });
    } else {
      byId.set(id, { ...item, id });
    }
  }

  return Array.from(byId.values());
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  for (const key of [KEY, LEGACY_KEY]) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) continue;
      const normalized = parsed
        .map((item) => normalizeItem(item as StoredCartItem))
        .filter(Boolean);
      return mergeDuplicateLines(normalized as CartItem[]);
    } catch {
      // Corrupted localStorage should never break the checkout flow.
    }
  }

  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
      window.localStorage.removeItem(LEGACY_KEY);
    } catch {
      // Ignore quota/private-mode failures; cart still works for this session.
    }
  }, [isReady, items]);

  const add: CartContextValue["add"] = (item) => {
    const pages = clampNumber(item.pages, 1, 1, MAX_PAGES);
    const qty = clampNumber(item.qty, 1, 1, MAX_QTY);
    const nextItem: CartItem = {
      ...item,
      id: item.id || makeLineId({ slug: item.slug, pages, expedited: item.expedited }),
      pages,
      qty,
    };

    setItems((prev) => {
      const existing = prev.find((p) => p.id === nextItem.id);
      if (existing) {
        return prev.map((p) =>
          p.id === nextItem.id ? { ...p, qty: clampNumber(p.qty + qty, 1, 1, MAX_QTY) } : p,
        );
      }
      return [...prev, nextItem];
    });
  };

  const remove: CartContextValue["remove"] = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const setQty: CartContextValue["setQty"] = (id, qty) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: clampNumber(qty, 1, 1, MAX_QTY) } : p)),
    );

  const setPages: CartContextValue["setPages"] = (id, pages) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pages: clampNumber(pages, 1, 1, MAX_PAGES) } : p)),
    );

  const clear = () => setItems([]);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const line = (i.price + (i.expedited ? 30 : 0)) * i.pages * i.qty;
        return sum + line;
      }, 0),
    [items],
  );

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, count, subtotal, isReady, add, remove, setQty, setPages, clear }),
    [items, count, subtotal, isReady],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
