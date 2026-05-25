"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/types";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

interface Props {
  product: Product;
}

export default function SimpleAddToCart({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [colorIdx, setColorIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);

  function handleAdd() {
    const color = product.colors?.[colorIdx];
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      quantity: qty,
      customization: color ? { color: color.name } : undefined,
    });
    setAdded(true);
    setTimeout(() => setOpen(true), 250);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-7">
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
            Цвет — {product.colors[colorIdx].name}
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                className={clsx(
                  "h-9 w-9 rounded-full transition-all",
                  colorIdx === i
                    ? "ring-2 ring-rose-600 ring-offset-2 ring-offset-ivory-100"
                    : "ring-1 ring-rose-200"
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 rounded-full border border-rose-200 bg-white/70 px-5 py-3 backdrop-blur">
        <span className="text-xs uppercase tracking-[0.3em] text-ink-500">
          Количество
        </span>
        <div className="inline-flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="rounded-full border border-rose-200 p-2 hover:bg-rose-100"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-6 text-center font-display text-lg">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="rounded-full border border-rose-200 p-2 hover:bg-rose-100"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={clsx("btn-primary w-full", added && "bg-gold-500 hover:bg-gold-500")}
      >
        {added
          ? "✓ добавлено в корзину"
          : `В корзину · ${formatPrice(product.price * qty)}`}
      </button>
    </div>
  );
}
