"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getBestsellers } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function Bestsellers() {
  const items = getBestsellers().slice(0, 4);

  return (
    <section id="bestsellers" className="relative overflow-hidden bg-rose-100/50 py-28">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-rose-200/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-rose-300/45 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-rose-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-20 h-64 w-64 rounded-full bg-rose-200/55 blur-3xl" />
      <div className="container-site">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display text-4xl sm:text-5xl lg:text-6xl"
            >
              Бестселлеры
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-base text-ink-700"
            >
              Самые желанные находки — те, что наши покупательницы заказывают
              снова и снова. Выбраны по любви и отзывам.
            </motion.p>
          </div>
          <Link
            href="/catalog"
            className="group inline-flex shrink-0 items-center gap-2 py-2 text-sm uppercase tracking-[0.25em] text-rose-700 hover:text-rose-900"
          >
            Весь каталог
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
