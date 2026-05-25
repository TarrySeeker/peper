"use client";

import Link from "next/link";
import { Instagram, Mail, Send } from "lucide-react";
import { categories } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-32 bg-rose-700 text-rose-50">
      <div className="container-site grid gap-12 py-20 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
        <div>
          <div className="font-display text-3xl tracking-[0.16em]">
            PAPER<span className="text-gold-400">.</span>FAIRIES
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.4em] text-rose-200/70">
            Boutique
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-rose-100/85">
            Нежные аксессуары ручной работы. Каждая деталь создаётся как небольшое
            письмо — для той, кто умеет замечать тонкости.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              className="rounded-full border border-rose-400/40 p-3 transition-colors hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-full border border-rose-400/40 p-3 transition-colors hover:bg-white/10"
              aria-label="Telegram"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@paperfairies.ru"
              className="rounded-full border border-rose-400/40 p-3 transition-colors hover:bg-white/10"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold-400">
            Категории
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog/${c.slug}`}
                  className="text-rose-100/85 transition-colors hover:text-white"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold-400">
            Помощь
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a className="text-rose-100/85 transition-colors hover:text-white" href="#">
                Доставка и оплата
              </a>
            </li>
            <li>
              <a className="text-rose-100/85 transition-colors hover:text-white" href="#">
                Возврат и обмен
              </a>
            </li>
            <li>
              <a className="text-rose-100/85 transition-colors hover:text-white" href="#">
                Уход за изделиями
              </a>
            </li>
            <li>
              <a className="text-rose-100/85 transition-colors hover:text-white" href="#">
                Контакты
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold-400">
            Письма с заботой
          </h4>
          <p className="mt-5 text-sm text-rose-100/85">
            Подпишитесь и получите −10% на первый заказ.
          </p>
          <form
            className="mt-5 flex overflow-hidden rounded-full border border-rose-400/40 bg-white/5 backdrop-blur"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="ваш email"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-rose-200/50 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold-400 px-5 py-3 text-xs uppercase tracking-[0.2em] text-rose-700 transition-colors hover:bg-gold-500"
            >
              ок
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-rose-400/20">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-rose-200/70 sm:flex-row">
          <span>© {new Date().getFullYear()} PAPER.FAIRIES Boutique. Сделано с нежностью.</span>
          <div className="flex gap-6">
            <a className="py-2 hover:text-white" href="#">
              Политика конфиденциальности
            </a>
            <a className="py-2 hover:text-white" href="#">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
