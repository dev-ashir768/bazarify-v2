import { create } from "zustand";
import { persist } from "zustand/middleware";

// ========================= Types ========================= \\
export interface CartItem {
  /** Unique key: `${productId}__${variationId ?? "default"}` */
  cartItemId: string;
  productId: string;
  acno: string;
  productName: string;
  /** Full image URL (already includes base + acno + filename) */
  image: string;
  price: string;
  variationId?: string;
  /** Human-readable label, e.g. "Size: M / Color: Red" */
  variationLabel?: string;
  skuCode: string;
  quantity: number;
  maxStock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subTotal: () => number;
}

// ========================= Store ========================= \\
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (incoming) => {
        const { cartItemId, maxStock, quantity = 1 } = incoming;
        set((state) => {
          const existing = state.items.find((i) => i.cartItemId === cartItemId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId
                  ? {
                      ...i,
                      quantity: Math.min(i.quantity + quantity, maxStock),
                    }
                  : i,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...incoming, quantity: Math.min(quantity, maxStock) },
            ],
          };
        });
      },

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        })),

      updateQuantity: (cartItemId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.cartItemId === cartItemId
                ? { ...i, quantity: Math.max(0, Math.min(quantity, i.maxStock)) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subTotal: () =>
        get().items.reduce(
          (sum, i) => sum + parseFloat(i.price) * i.quantity,
          0,
        ),
    }),
    {
      name: "bazarify-cart",
    },
  ),
);
