import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  pages: number;
  expedited: boolean;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  setPages: (slug: string, pages: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "certifypro-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add: CartContextValue["add"] = (item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug ? { ...p, qty: p.qty + (item.qty ?? 1) } : p,
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const remove: CartContextValue["remove"] = (slug) =>
    setItems((prev) => prev.filter((p) => p.slug !== slug));

  const setQty: CartContextValue["setQty"] = (slug, qty) =>
    setItems((prev) =>
      prev
        .map((p) => (p.slug === slug ? { ...p, qty: Math.max(1, qty) } : p))
        .filter((p) => p.qty > 0),
    );

  const setPages: CartContextValue["setPages"] = (slug, pages) =>
    setItems((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, pages: Math.max(1, pages) } : p)),
    );

  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, i) => {
    const line = (i.price + (i.expedited ? 30 : 0)) * i.pages * i.qty;
    return sum + line;
  }, 0);

  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, add, remove, setQty, setPages, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
