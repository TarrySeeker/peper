"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function SaleSection() {
  const items = products.filter((p) => p.oldPrice).slice(0, 2);

  if (items.length === 0) return null;

  const maxDiscount = items.reduce((acc, p) => {
    const d = Math.round((1 - p.price / (p.oldPrice ?? p.price)) * 100);
    return Math.max(acc, d);
  }, 0);

  return (
    <section id="sale" className="relative overflow-hidden bg-rose-100/50 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-rose-100/60 via-rose-100/20 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-rose-300/50 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 bottom-12 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-300/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-16 bottom-0 h-60 w-60 rounded-full bg-rose-400/25 blur-3xl" />

      <div className="container-site relative">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white"
            >
              <Sparkles className="h-3 w-3" />
              скидки до {maxDiscount}%
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-display mt-5 text-4xl sm:text-5xl lg:text-6xl"
            >
              Акции
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-base text-ink-700"
            >
              Любимые позиции по особенной цене — спешите выбрать, остатки
              ограничены.
            </motion.p>
          </div>
          <Link
            href="/sale"
            className="group inline-flex shrink-0 items-center gap-2 py-2 text-sm uppercase tracking-[0.25em] text-rose-700 hover:text-rose-900"
          >
            Все акции
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
