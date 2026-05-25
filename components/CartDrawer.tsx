"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useEffect } from "react";

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-[85%] max-w-md flex-col bg-petal-gradient"
          >
            <header className="flex items-center justify-between border-b border-rose-200 px-7 py-6">
              <div>
                <div className="eyebrow">Ваш заказ</div>
                <h2 className="mt-1 font-display text-2xl">Корзина</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-3 hover:bg-white/60"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-white/70 p-6">
                    <ShoppingBag className="h-10 w-10 text-rose-400" />
                  </div>
                  <p className="mt-6 font-display text-2xl">Пока пусто</p>
                  <p className="mt-2 max-w-xs text-sm text-ink-700">
                    Добавьте что‑нибудь нежное — мы аккуратно сохраним ваш выбор.
                  </p>
                  <Link
                    href="/catalog"
                    onClick={() => setOpen(false)}
                    className="btn-primary mt-8"
                  >
                    В каталог
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <motion.li
                      key={item.cartKey}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4 rounded-2xl bg-white/70 p-3 backdrop-blur"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-rose-100">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-base leading-snug text-ink-900">
                              {item.name}
                            </h3>
                            {item.customization?.text && (
                              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-rose-600">
                                Гравировка: «{item.customization.text}»
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.cartKey)}
                            className="rounded-full p-2.5 text-ink-500 transition-colors hover:bg-rose-100 hover:text-rose-700"
                            aria-label="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center rounded-full border border-rose-200 bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(item.cartKey, item.quantity - 1)
                              }
                              className="px-2.5 py-2.5 text-ink-700 hover:text-rose-700"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartKey, item.quantity + 1)
                              }
                              className="px-2.5 py-2.5 text-ink-700 hover:text-rose-700"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-lg text-ink-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-rose-200 bg-white/50 px-7 py-6 backdrop-blur">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-ink-500">
                    Итого
                  </span>
                  <span className="font-display text-3xl text-ink-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-ink-500">
                  Доставка рассчитается на следующем шаге
                </p>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-5 w-full"
                >
                  Оформить заказ
                </Link>
                <Link
                  href="/catalog"
                  onClick={() => setOpen(false)}
                  className="mt-3 block text-center text-xs uppercase tracking-[0.3em] text-ink-700 hover:text-rose-700"
                >
                  продолжить покупки
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
