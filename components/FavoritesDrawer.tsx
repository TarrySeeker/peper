"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFavorites } from "@/lib/store-favorites";
import { getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function FavoritesDrawer() {
  const isOpen = useFavorites((s) => s.isOpen);
  const setOpen = useFavorites((s) => s.setOpen);
  const ids = useFavorites((s) => s.ids);
  const remove = useFavorites((s) => s.remove);

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
            transition={{ duration: 0.3, ease: "easeOut" }}
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
                <div className="eyebrow">Сохранённые</div>
                <h2 className="mt-1 font-display text-2xl">Избранное</h2>
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
              {ids.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-white/70 p-6">
                    <Heart className="h-10 w-10 text-rose-400" />
                  </div>
                  <p className="mt-6 font-display text-2xl">Пока пусто</p>
                  <p className="mt-2 max-w-xs text-sm text-ink-700">
                    В избранном пока пусто. Сохраняйте любимое — оно будет ждать здесь.
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
                <ul className="space-y-4">
                  {ids.map((id) => {
                    const p = getProductById(id);
                    if (!p) return null;
                    return (
                      <motion.li
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex gap-4 rounded-2xl bg-white/70 p-3 backdrop-blur"
                      >
                        <Link
                          href={`/product/${id}`}
                          onClick={() => setOpen(false)}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-rose-100"
                        >
                          {p.images[0] && (
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </Link>
                        <div className="flex flex-1 flex-col justify-between py-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${id}`}
                              onClick={() => setOpen(false)}
                              className="flex-1 min-w-0"
                            >
                              <h3 className="font-display text-base leading-snug text-ink-900 hover:text-rose-700 transition-colors">
                                {p.name}
                              </h3>
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                remove(id);
                              }}
                              className="shrink-0 rounded-full p-2.5 text-ink-400 transition-colors hover:bg-rose-100 hover:text-rose-700"
                              aria-label="Удалить из избранного"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="font-display text-lg text-ink-900">
                            {formatPrice(p.price)}
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
