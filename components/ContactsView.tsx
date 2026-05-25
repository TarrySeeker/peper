"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Send,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const channels = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (495) 123‑45‑67",
    href: "tel:+74951234567",
  },
  {
    icon: Mail,
    label: "Почта",
    value: "hello@paperfairies.ru",
    href: "mailto:hello@paperfairies.ru",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@paper.fairies",
    href: "#",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@paper_fairies",
    href: "#",
  },
];

export default function ContactsView() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <article className="pt-10 pb-24 lg:pt-14">
      <div className="container-site">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-500">
          <Link href="/" className="hover:text-rose-700">
            Главная
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink-800">Контакты</span>
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              На связи с радостью
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl"
            >
              Напишите нам —
              <br />
              <span className="font-script italic font-light text-rose-600">
                мы любим письма
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-700"
            >
              Подскажем по размеру, посоветуем подарок и запишем в шоурум на
              примерку. Отвечаем в течение часа в рабочее время.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                  className="group flex items-center gap-4 rounded-2xl bg-white/70 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-700 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-ink-500">
                      {c.label}
                    </div>
                    <div className="mt-0.5 font-display text-lg text-ink-900">
                      {c.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              <div className="rounded-2xl bg-white/70 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-rose-700">
                  <MapPin className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-[0.25em]">
                    Шоурум
                  </span>
                </div>
                <p className="mt-3 font-display text-lg text-ink-900">
                  Москва, Большая Никитская 14
                </p>
                <p className="mt-1 text-sm text-ink-700">
                  3 этаж · по записи
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-rose-700">
                  <Clock className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-[0.25em]">
                    Часы работы
                  </span>
                </div>
                <p className="mt-3 font-display text-lg text-ink-900">
                  Пн–Пт · 11:00–20:00
                </p>
                <p className="mt-1 text-sm text-ink-700">Сб–Вс · 12:00–18:00</p>
              </div>
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl bg-white/80 p-7 shadow-soft backdrop-blur lg:sticky lg:top-32"
          >
            <h2 className="font-display text-2xl">Форма обратной связи</h2>
            <p className="mt-2 text-sm text-ink-700">
              Расскажите, чем мы можем помочь — ответим в течение часа.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                  Как вас зовут
                </span>
                <input
                  type="text"
                  required
                  placeholder="Анна"
                  className="mt-2 w-full rounded-full border border-rose-200 bg-white px-5 py-3 text-sm focus:border-rose-500 focus:outline-none"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="anna@mail.ru"
                    className="mt-2 w-full rounded-full border border-rose-200 bg-white px-5 py-3 text-sm focus:border-rose-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                    Телефон
                  </span>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___ ___"
                    className="mt-2 w-full rounded-full border border-rose-200 bg-white px-5 py-3 text-sm focus:border-rose-500 focus:outline-none"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                  Сообщение
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="Хочу подобрать подарок маме..."
                  className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-5 py-3 text-sm focus:border-rose-500 focus:outline-none"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="btn-primary mt-6 w-full"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Письмо отправлено
                </>
              ) : (
                "Отправить письмо"
              )}
            </button>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-ink-500">
              Нажимая кнопку, вы соглашаетесь с обработкой данных
            </p>
          </motion.form>
        </div>
      </div>
    </article>
  );
}
