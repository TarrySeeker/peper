"use client";

import { create } from "zustand";

interface SearchState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useSearch = create<SearchState>((set) => ({
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
}));
