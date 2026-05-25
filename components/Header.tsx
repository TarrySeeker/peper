"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Heart, Search, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store";
import { useFavorites } from "@/lib/store-favorites";
import { useSearch } from "@/lib/store-search";
import { categories } from "@/lib/products";
import clsx from "clsx";

interface NavLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

const secondaryNav: NavLink[] = [
  { href: "/catalog", label: "Каталог", hasDropdown: true },
  { href: "/#bestsellers", label: "Бестселлеры" },
  { href: "/new", label: "Новые поступления" },
  { href: "/sale", label: "Акции" },
  { href: "/#about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const favCount = useFavorites((s) => s.count());
  const setFavOpen = useFavorites((s) => s.setOpen);
  const setSearchOpen = useSearch((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <div className="bg-rose-500 text-white">
        <div className="container-site flex items-center justify-center gap-2 py-2 text-[11px] uppercase tracking-[0.3em]">
          <span className="hidden sm:inline">Бесплатная доставка от 5 000 ₽</span>
          <span className="hidden sm:inline opacity-50">·</span>
          <span>Гравировка в подарок к гребешкам</span>
        </div>
      </div>

      <header
        className={clsx(
          "sticky top-0 z-40 w-full transition-all duration-500",
          scrolled
            ? "bg-rose-50/90 shadow-soft backdrop-blur-xl"
            : "bg-transparent backdrop-blur-0"
        )}
      >
        <div className="container-site grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-5 lg:py-6">
          <div className="flex items-center justify-start gap-1">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden rounded-full p-3 text-ink-800 hover:bg-rose-100"
              aria-label="Открыть меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Link href="/" className="block whitespace-nowrap text-center">
            <span className="font-display text-xl font-medium tracking-[0.16em] text-ink-900 sm:text-2xl lg:text-[26px]">
              PAPER<span className="shimmer-text">.</span>FAIRIES
            </span>
            <span className="block text-center text-[9px] uppercase tracking-[0.4em] text-ink-500">
              Boutique
            </span>
          </Link>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-3 text-ink-800 transition-colors hover:bg-rose-100 hover:text-rose-700"
              aria-label="Поиск"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={() => setFavOpen(true)}
              className="relative hidden sm:inline-flex rounded-full p-3 text-ink-800 transition-colors hover:bg-rose-100 hover:text-rose-700"
              aria-label="Избранное"
            >
              <Heart className="h-[18px] w-[18px]" />
              {favCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 text-[10px] font-medium text-white"
                >
                  {favCount}
                </motion.span>
              )}
            </button>
            <Link
              href="/account"
              className="rounded-full p-3 text-ink-800 transition-colors hover:bg-rose-100 hover:text-rose-700"
              aria-label="Личный кабинет"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="relative rounded-full p-3 text-ink-800 transition-colors hover:bg-rose-100 hover:text-rose-700"
              aria-label="Корзина"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 text-[10px] font-medium text-white"
                >
                  {totalCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        <div
          className={clsx(
            "hidden lg:block border-t transition-colors duration-500",
            scrolled
              ? "border-rose-200/70 bg-rose-50/90 backdrop-blur-xl"
              : "border-rose-200/50 bg-rose-50/40 backdrop-blur-md"
          )}
        >
          <div className="container-site flex justify-center">
            <nav className="flex items-center gap-1 py-2">
              {secondaryNav.map((link) => {
                const active = isActive(link.href);
                return (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={clsx(
                        "relative flex items-center gap-1 px-5 py-3 text-[12px] uppercase tracking-[0.28em] transition-colors",
                        active
                          ? "text-rose-700"
                          : "text-ink-800 hover:text-rose-700"
                      )}
                    >
                      <span className="relative">
                        {link.label}
                        <span
                          className={clsx(
                            "absolute -bottom-1 left-0 h-px bg-rose-600 transition-all duration-300",
                            active
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          )}
                        />
                      </span>
                      {link.hasDropdown && (
                        <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </Link>

                    {link.hasDropdown && (
                      <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-[480px] -translate-x-1/2 rounded-2xl bg-white/95 p-3 opacity-0 shadow-petal backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                        <div className="grid grid-cols-2 gap-1">
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/catalog/${c.slug}`}
                              className="group/item flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-rose-50"
                            >
                              <span className="h-2 w-2 rounded-full bg-rose-300 transition-all group-hover/item:scale-150 group-hover/item:bg-rose-600" />
                              <div>
                                <div className="font-display text-base text-ink-900">
                                  {c.title}
                                </div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-500">
                                  {c.subtitle}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 border-t border-rose-100 pt-2">
                          <Link
                            href="/catalog"
                            className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] uppercase tracking-[0.25em] text-rose-700 hover:bg-rose-50"
                          >
                            Все товары
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-petal-gradient p-8 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl tracking-[0.14em]">
                  PAPER<span className="shimmer-text">.</span>FAIRIES
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-3 hover:bg-rose-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {secondaryNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-rose-200 py-4 font-display text-2xl text-ink-900 transition-colors hover:text-rose-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                  Категории
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/catalog/${c.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-white/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      <span className="font-display text-base text-ink-800">
                        {c.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
