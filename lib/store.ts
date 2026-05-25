"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity" | "cartKey"> & { quantity?: number; cartKey?: string }) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  totalCount: () => number;
  totalPrice: () => number;
}

function buildKey(productId: string, customization?: CartItem["customization"]) {
  if (!customization) return productId;
  return `${productId}__${customization.text ?? ""}__${customization.font ?? ""}__${customization.color ?? ""}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const cartKey = item.cartKey ?? buildKey(item.productId, item.customization);
        const quantity = item.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) => i.cartKey === cartKey);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartKey === cartKey ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: item.productId,
                name: item.name,
                price: item.price,
                image: item.image,
                customization: item.customization,
                quantity,
                cartKey,
              },
            ],
          };
        });
      },
      removeItem: (cartKey) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartKey !== cartKey),
        })),
      updateQuantity: (cartKey, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.cartKey === cartKey ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      totalCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    {
      name: "paper-fairies-cart-v1",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
