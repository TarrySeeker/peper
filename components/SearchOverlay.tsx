"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/lib/store-search";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function SearchOverlay() {
  const isOpen = useSearch((s) => s.isOpen);
  const setOpen = useSearch((s) => s.setOpen);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const trimmedQuery = query.trim();
  const results = trimmedQuery.length > 0
    ? products.filter((p) =>
        p.name.toLowerCase().includes(trimmedQuery.toLowerCase())
      )
    : [];

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-[70] px-4 pt-16 sm:pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-2xl bg-white shadow-petal">
              <div className="flex items-center gap-3 border-b border-rose-200 px-6 py-5">
                <Search className="h-5 w-5 shrink-0 text-ink-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по магазину"
                  autoFocus
                  className="flex-1 text-2xl text-ink-900 placeholder-ink-400 outline-none transition-colors border-b border-transparent focus:border-rose-600"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 shrink-0 rounded-full p-3 text-ink-500 transition-colors hover:bg-rose-50 hover:text-ink-900"
                  aria-label="Закрыть поиск"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {trimmedQuery.length === 0 ? (
                  <p className="px-6 py-8 text-center text-sm text-ink-400">
                    Начните вводить, чтобы найти товар
                  </p>
                ) : results.length === 0 ? (
                  <p className="px-6 py-8 text-center text-sm text-ink-400">
                    Ничего не найдено. Попробуйте другое слово
                  </p>
                ) : (
                  <ul>
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.id}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-rose-50"
                        >
                          <div className="relative h-16 w-16 shrink-0 bg-rose-50">
                            {p.images[0] && (
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display text-base text-ink-900 truncate">
                              {p.name}
                            </div>
                            <div className="mt-0.5 text-sm font-medium text-rose-700">
                              {formatPrice(p.price)}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
