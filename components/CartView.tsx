"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartView() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 5000 ? 390 : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  function applyPromo() {
    if (promo.trim().toLowerCase() === "fairies10") {
      setPromoApplied(true);
    }
  }

  if (items.length === 0) {
    return (
      <section className="container-site flex flex-col items-center justify-center py-32 text-center">
        <div className="rounded-full bg-white/70 p-8 shadow-soft">
          <ShoppingBag className="h-12 w-12 text-rose-400" />
        </div>
        <h1 className="heading-display mt-8 text-4xl sm:text-5xl">
          Корзина пока пуста
        </h1>
        <p className="mt-4 max-w-sm text-ink-700">
          Загляните в каталог — у нас есть и нежные крабики, и гребешки с
          гравировкой, и сумки из мягкой nappa‑кожи.
        </p>
        <Link href="/catalog" className="btn-primary mt-10">
          В каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="container-site py-12 lg:py-16">
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-500">
        <Link href="/" className="hover:text-rose-700">
          Главная
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink-800">Корзина</span>
      </nav>

      <div className="mt-8 flex items-end justify-between gap-6">
        <div>
          <div className="eyebrow">Ваш заказ</div>
          <h1 className="heading-display mt-3 text-4xl sm:text-5xl">
            Корзина
          </h1>
        </div>
        <button
          onClick={clear}
          className="text-xs uppercase tracking-[0.2em] text-ink-500 hover:text-rose-700"
        >
          Очистить
        </button>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.article
                key={item.cartKey}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="flex gap-5 rounded-3xl bg-white/70 p-5 backdrop-blur"
              >
                <Link
                  href={`/product/${item.productId}`}
                  className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-rose-100 sm:h-36 sm:w-32"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  )}
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-display text-xl text-ink-900 hover:text-rose-700">
                          {item.name}
                        </h3>
                      </Link>
                      {item.customization?.text && (
                        <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-rose-700">
                          гравировка: «{item.customization.text}»
                        </p>
                      )}
                      {item.customization?.color &&
                        !item.customization.text && (
                          <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-ink-500">
                            цвет: {item.customization.color}
                          </p>
                        )}
                    </div>
                    <button
                      onClick={() => removeItem(item.cartKey)}
                      className="rounded-full p-2 text-ink-500 hover:bg-rose-100 hover:text-rose-700"
                      aria-label="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="inline-flex items-center rounded-full border border-rose-200 bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartKey, item.quantity - 1)
                        }
                        className="px-3 py-2 text-ink-700 hover:text-rose-700"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartKey, item.quantity + 1)
                        }
                        className="px-3 py-2 text-ink-700 hover:text-rose-700"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl text-ink-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-ink-500">
                          {formatPrice(item.price)} × {item.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-white/85 p-7 shadow-soft backdrop-blur">
            <h2 className="font-display text-2xl">Итог</h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-ink-700">
                <span>Товары · {items.reduce((a, i) => a + i.quantity, 0)} шт</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-700">
                <span>Доставка</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-rose-700">бесплатно</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-rose-700">
                  <span>Промокод FAIRIES10</span>
                  <span>−{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="mt-5 border-t border-rose-200 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-ink-500">
                  К оплате
                </span>
                <span className="font-display text-3xl text-ink-900">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {!promoApplied && (
              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                  Промокод
                </div>
                <div className="mt-2 flex overflow-hidden rounded-full border border-rose-200 bg-white">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="FAIRIES10"
                    className="flex-1 bg-transparent px-5 py-3 text-sm focus:outline-none"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-rose-600 px-5 text-xs uppercase tracking-[0.2em] text-white hover:bg-rose-700"
                  >
                    Ок
                  </button>
                </div>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-ink-500">
                  <Sparkles className="h-3 w-3 text-rose-500" />
                  Подсказка: попробуйте «FAIRIES10» — −10%
                </p>
              </div>
            )}

            <button className="btn-primary mt-7 w-full">Оформить заказ</button>
            <Link
              href="/catalog"
              className="mt-3 block text-center text-xs uppercase tracking-[0.3em] text-ink-700 hover:text-rose-700"
            >
              продолжить покупки
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
