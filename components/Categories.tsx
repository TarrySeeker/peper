"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/products";
import type { Category } from "@/types";

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── Single category card ─────────────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
  priority: boolean;
}

function CategoryCard({ category: c, priority }: CategoryCardProps) {
  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/catalog/${c.slug}`}
        aria-label={`Перейти в категорию «${c.title}»`}
        className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink-900 focus-visible:ring-offset-4 focus-visible:ring-offset-ivory-50"
      >
        {/* Photo */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={c.image}
            alt={c.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-opacity duration-[350ms] ease-out group-hover:opacity-[0.88]"
            priority={priority}
          />
        </div>

        {/* Text block */}
        <div className="pt-5">
          <div className="border-t border-ink-300 transition-colors duration-[350ms] ease-out group-hover:border-ink-500 group-focus-visible:border-ink-500" />
          <div className="flex items-start justify-between pt-4">
            <div>
              <p className="font-sans text-base text-ink-900 transition-colors duration-[350ms] ease-out group-hover:text-rose-700 group-focus-visible:text-rose-700 lg:text-lg">
                {c.title}
              </p>
              <p className="mt-1 text-sm text-ink-500">{c.subtitle}</p>
            </div>
            <ArrowRight
              className="mt-0.5 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-[350ms] ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Categories() {
  return (
    <section className="bg-ivory-50 py-24 lg:py-32">
      <div className="container-site">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headerVariants}
          className="mb-14 lg:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ink-500">
            Категории
          </p>
          <h2 className="mt-4 font-display text-3xl text-ink-900 lg:text-4xl">
            Шесть тёплых вселенных
          </h2>
          <p className="mt-4 max-w-md text-ink-600">
            Каждая коллекция — небольшая история о деталях. Выберите свою.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20"
        >
          {categories.map((c, i) => (
            <CategoryCard
              key={c.slug}
              category={c}
              priority={i < 3}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
