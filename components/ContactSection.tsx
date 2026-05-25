"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section id="feedback" className="relative overflow-hidden bg-rose-100/50 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-12 h-96 w-96 rounded-full bg-rose-300/55 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute right-1/3 top-20 h-72 w-72 rounded-full bg-rose-200/55 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/4 bottom-12 h-80 w-80 rounded-full bg-rose-400/25 blur-3xl" />

      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Связь с заботой
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl"
            >
              Напишите нам
              <br />
              <span className="font-script italic font-light text-rose-600">
                с любовью
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-700"
            >
              Поможем подобрать подарок, расскажем о персонализации и запишем
              в&nbsp;шоурум. Каждое сообщение читаем с тёплым чаем — и&nbsp;отвечаем
              в&nbsp;течение часа.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 space-y-4"
            >
              <a
                href="mailto:hello@paperfairies.ru"
                className="group flex items-center gap-4 rounded-2xl bg-white/60 px-5 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-700 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-ink-500">
                    Почта
                  </span>
                  <span className="mt-0.5 block font-display text-lg text-ink-900">
                    hello@paperfairies.ru
                  </span>
                </span>
              </a>
              <a
                href="tel:+74951234567"
                className="group flex items-center gap-4 rounded-2xl bg-white/60 px-5 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-700 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-ink-500">
                    Телефон
                  </span>
                  <span className="mt-0.5 block font-display text-lg text-ink-900">
                    +7 (495) 123‑45‑67
                  </span>
                </span>
              </a>
            </motion.div>

            <motion.svg
              aria-hidden
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="pointer-events-none absolute -right-6 -top-12 hidden h-32 w-32 text-rose-300 sm:block"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="50" cy="50" r="6" />
              <path d="M50 14 C 60 30, 60 40, 50 50 C 40 40, 40 30, 50 14 Z" />
              <path d="M50 86 C 60 70, 60 60, 50 50 C 40 60, 40 70, 50 86 Z" />
              <path d="M14 50 C 30 60, 40 60, 50 50 C 40 40, 30 40, 14 50 Z" />
              <path d="M86 50 C 70 60, 60 60, 50 50 C 60 40, 70 40, 86 50 Z" />
              <path d="M25 25 C 35 32, 42 35, 50 50 C 35 42, 32 35, 25 25 Z" />
              <path d="M75 25 C 65 32, 58 35, 50 50 C 65 42, 68 35, 75 25 Z" />
              <path d="M25 75 C 35 68, 42 65, 50 50 C 35 58, 32 65, 25 75 Z" />
              <path d="M75 75 C 65 68, 58 65, 50 50 C 65 58, 68 65, 75 75 Z" />
            </motion.svg>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-[2.2rem] bg-white/85 p-7 shadow-petal backdrop-blur lg:p-10"
          >
            <span
              aria-hidden
              className="absolute -top-4 left-10 inline-flex items-center gap-2 rounded-full bg-rose-700 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white"
            >
              <Sparkles className="h-3 w-3" />
              форма
            </span>

            <h3 className="font-display text-2xl text-ink-900 sm:text-3xl">
              Оставьте сообщение
            </h3>
            <p className="mt-2 text-sm text-ink-700">
              Заполните пару полей — расскажем подробнее и поможем выбрать.
            </p>

            <div className="mt-7 space-y-4">
              <Field
                label="Как вас зовут"
                placeholder="Анна"
                type="text"
                required
                icon={MessageCircle}
              />
              <Field
                label="Email"
                placeholder="anna@mail.ru"
                type="email"
                required
                icon={Mail}
              />
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                  Сообщение
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="Хочу подобрать подарок маме..."
                  className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-5 py-3.5 text-sm transition-colors focus:border-rose-500 focus:outline-none"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="btn-primary mt-7 w-full"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Письмо отправлено
                </>
              ) : (
                "Отправить с заботой"
              )}
            </button>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-ink-500">
              Отвечаем в течение часа · с пн‑пт, 11–20
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  ...input
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
        {label}
      </span>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
        <input
          {...input}
          className="w-full rounded-full border border-rose-200 bg-white py-4 pl-11 pr-5 text-sm transition-colors focus:border-rose-500 focus:outline-none"
        />
      </div>
    </label>
  );
}
