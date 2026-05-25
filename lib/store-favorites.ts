"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  ids: string[];
  isOpen: boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
  setOpen: (open: boolean) => void;
  count: () => number;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      isOpen: false,
      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
      remove: (productId) =>
        set((state) => ({
          ids: state.ids.filter((id) => id !== productId),
        })),
      clear: () => set({ ids: [] }),
      has: (productId) => get().ids.includes(productId),
      setOpen: (open) => set({ isOpen: open }),
      count: () => get().ids.length,
    }),
    {
      name: "paper-fairies-favorites-v1",
      partialize: (state) => ({ ids: state.ids }),
    }
  )
);
