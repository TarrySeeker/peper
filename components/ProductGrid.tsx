"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  emptyTitle?: string;
  emptyText?: string;
}

export default function ProductGrid({
  products,
  emptyTitle = "Пока пусто",
  emptyText = "В этом разделе пока нет товаров — загляните чуть позже.",
}: Props) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl bg-white/60 py-24 text-center"
      >
        <p className="font-display text-2xl">{emptyTitle}</p>
        <p className="mt-2 max-w-sm text-sm text-ink-600">{emptyText}</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
