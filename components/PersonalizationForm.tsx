"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import type { Product } from "@/types";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Sparkles, Plus, Minus } from "lucide-react";

const fonts = [
  { id: "display", label: "Serif Romance", className: "font-display" },
  { id: "script", label: "Script Italic", className: "font-script italic" },
  { id: "sans", label: "Sans Soft", className: "font-sans" },
];

const colors = [
  { id: "rose", name: "Розовый кварц", hex: "#D88891" },
  { id: "gold", name: "Золото", hex: "#B88A5A" },
  { id: "ivory", name: "Айвори", hex: "#7A6B5C" },
];

interface Props {
  product: Product;
}

export default function PersonalizationForm({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [text, setText] = useState("");
  const [fontId, setFontId] = useState(fonts[0].id);
  const [colorId, setColorId] = useState(colors[0].id);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);

  const font = fonts.find((f) => f.id === fontId)!;
  const color = colors.find((c) => c.id === colorId)!;

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      quantity: qty,
      customization: {
        text: text.trim() || undefined,
        font: fontId,
        color: colorId,
      },
    });
    setAdded(true);
    setTimeout(() => setOpen(true), 250);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-rose-700">
          <Sparkles className="h-4 w-4" />
          <span className="text-[11px] uppercase tracking-[0.3em]">
            Бесплатная гравировка
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-700">
          До 20 символов: имя, инициалы или короткая фраза.
        </p>

        <div className="mt-5 rounded-3xl border border-rose-200 bg-white/70 p-6 backdrop-blur">
          <motion.div
            key={`${text}-${fontId}-${colorId}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
              "flex h-24 items-center justify-center rounded-2xl bg-rose-50 px-6 text-center text-3xl",
              font.className
            )}
            style={{ color: color.hex }}
          >
            {text.trim() ? text : "ваше имя"}
          </motion.div>

          <input
            type="text"
            maxLength={20}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите текст для гравировки"
            className="mt-4 w-full rounded-full border border-rose-200 bg-white px-5 py-3 text-sm focus:border-rose-500 focus:outline-none"
          />

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
              Шрифт
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontId(f.id)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition-all",
                    f.className,
                    fontId === f.id
                      ? "border-rose-600 bg-rose-600 text-white"
                      : "border-rose-200 bg-white hover:border-rose-400"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
              Цвет гравировки
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColorId(c.id)}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-all",
                    colorId === c.id
                      ? "border-rose-600 bg-rose-50"
                      : "border-rose-200 bg-white hover:border-rose-400"
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-rose-200"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

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
        className={clsx(
          "btn-primary w-full",
          added && "bg-gold-500 hover:bg-gold-500"
        )}
      >
        {added
          ? "✓ добавлено в корзину"
          : `В корзину · ${formatPrice(product.price * qty)}`}
      </button>
    </div>
  );
}
