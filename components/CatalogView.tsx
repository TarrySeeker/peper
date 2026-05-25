"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Product, CategorySlug } from "@/types";
import { categories } from "@/lib/products";
import ProductCard from "./ProductCard";
import clsx from "clsx";

type SortMode = "popular" | "price-asc" | "price-desc" | "new";

interface Props {
  products: Product[];
  initialCategory?: CategorySlug | "all";
  title: string;
  subtitle?: string;
  description?: string;
}

const sortOptions: { id: SortMode; label: string }[] = [
  { id: "popular", label: "По популярности" },
  { id: "new", label: "Сначала новинки" },
  { id: "price-asc", label: "Цена ↑" },
  { id: "price-desc", label: "Цена ↓" },
];

export default function CatalogView({
  products,
  initialCategory = "all",
  title,
  subtitle,
  description,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    initialCategory
  );
  const [sort, setSort] = useState<SortMode>("popular");
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyCustom, setOnlyCustom] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (onlyNew) list = list.filter((p) => p.isNew);
    if (onlyCustom) list = list.filter((p) => p.customizable);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "new":
        list.sort((a, b) => Number(b.isNew ?? 0) - Number(a.isNew ?? 0));
        break;
      default:
        list.sort(
          (a, b) =>
            Number(b.isBestseller ?? 0) - Number(a.isBestseller ?? 0)
        );
    }
    return list;
  }, [products, activeCategory, onlyNew, onlyCustom, sort]);

  return (
    <section className="pt-10 pb-24 lg:pt-14">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          {subtitle && <div className="eyebrow">{subtitle}</div>}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-5 max-w-xl text-ink-700"
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={clsx(
              "rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-all",
              activeCategory === "all"
                ? "bg-rose-700 text-white shadow-soft"
                : "border border-rose-300 text-rose-700 hover:border-rose-500 hover:bg-white"
            )}
          >
            Все товары
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={clsx(
                "rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-all",
                activeCategory === c.slug
                  ? "bg-rose-700 text-white shadow-soft"
                  : "border border-rose-300 text-rose-700 hover:border-rose-500 hover:bg-white"
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/60 px-5 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyNew((v) => !v)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all",
                onlyNew
                  ? "bg-rose-100 text-rose-700"
                  : "text-ink-700 hover:bg-rose-50"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" /> Новинки
            </button>
            <button
              onClick={() => setOnlyCustom((v) => !v)}
              className={clsx(
                "rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all",
                onlyCustom
                  ? "bg-rose-100 text-rose-700"
                  : "text-ink-700 hover:bg-rose-50"
              )}
            >
              С гравировкой
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink-500">
              Сортировка:
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="cursor-pointer rounded-full border border-rose-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink-800 focus:border-rose-500 focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 min-h-[400px]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white/60 py-24 text-center">
              <p className="font-display text-2xl">Ничего не нашлось</p>
              <p className="mt-2 max-w-sm text-sm text-ink-600">
                Попробуйте смягчить фильтры или вернуться ко всем товарам.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
