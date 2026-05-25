"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/store";
import { useFavorites } from "@/lib/store-favorites";
import clsx from "clsx";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);
  const liked = useFavorites((s) => s.has(product.id));
  const toggleFav = useFavorites((s) => s.toggle);
  const [adding, setAdding] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.customizable) {
      window.location.href = `/product/${product.id}`;
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
    });
    setAdding(true);
    setTimeout(() => setAdding(false), 1100);
    setTimeout(() => setOpen(true), 280);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="product-card group"
    >
      <Link href={`/product/${product.id}`} className="relative block overflow-hidden">
        {product.images[0] ? (
          <div className="relative aspect-[4/5] w-full bg-rose-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative aspect-[4/5] w-full bg-rose-50" />
        )}

        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-rose-700 backdrop-blur">
              Новинка
            </span>
          )}
          {product.oldPrice && (
            <span className="rounded-full bg-rose-600 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
              −{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
          {product.customizable && (
            <span className="rounded-full bg-gold-400/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-rose-700 backdrop-blur">
              Гравировка
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFav(product.id);
          }}
          className={clsx(
            "absolute right-4 top-4 rounded-full p-3 backdrop-blur transition-all",
            liked ? "bg-rose-600 text-white" : "bg-white/80 text-ink-700 hover:bg-white"
          )}
          aria-label="В избранное"
        >
          <Heart className={clsx("h-4 w-4", liked && "fill-current")} />
        </button>
      </Link>

      <div className="flex flex-col gap-3 p-5">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-display text-xl leading-snug text-ink-900 transition-colors group-hover:text-rose-700">
            {product.name}
          </h3>
        </Link>

        {product.colors && (
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-rose-200"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="ml-1 text-[10px] uppercase tracking-[0.2em] text-ink-500">
              {product.colors.length} цвет{product.colors.length === 1 ? "" : product.colors.length < 5 ? "а" : "ов"}
            </span>
          </div>
        )}

        <div className="mt-1 flex items-end justify-between gap-3">
          <div>
            <div className="font-display text-2xl text-ink-900">
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && (
              <div className="text-xs text-ink-500 line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={clsx(
              "shrink-0 min-h-[44px] rounded-full border border-rose-300 px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] transition-all",
              adding
                ? "bg-rose-600 text-white border-rose-600"
                : "text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600"
            )}
          >
            {adding ? "✓ В корзине" : product.customizable ? "Настроить" : "В корзину"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
