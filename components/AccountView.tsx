"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Sparkles,
  Heart,
  Package,
  Gift,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";

type Mode = "login" | "register";

const perks = [
  {
    icon: Package,
    title: "История заказов",
    text: "Все ваши заказы в одном месте, с возможностью повторить покупку в один клик.",
  },
  {
    icon: Heart,
    title: "Список желаний",
    text: "Сохраняйте любимые позиции и получайте уведомления о возврате в наличие.",
  },
  {
    icon: Gift,
    title: "Закрытые акции",
    text: "Эксклюзивные предложения и ранний доступ к новинкам — только для участниц клуба.",
  },
  {
    icon: Sparkles,
    title: "Бонусы за покупки",
    text: "Получайте баллы PAPER, которыми можно оплатить до 30% следующего заказа.",
  },
];

export default function AccountView() {
  const [mode, setMode] = useState<Mode>("login");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  }

  return (
    <article className="pt-10 pb-24 lg:pt-14">
      <div className="container-site">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-500">
          <Link href="/" className="hover:text-rose-700">
            Главная
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink-800">Личный кабинет</span>
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              Клуб PAPER.FAIRIES
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl"
            >
              Ваш{" "}
              <span className="font-script italic font-light text-rose-600">
                бутик
              </span>{" "}
              в&nbsp;один клик
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-700"
            >
              Войдите, чтобы управлять заказами, копить баллы и первыми узнавать
              о появлении новых коллекций. Регистрация займёт меньше минуты.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {perks.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  className="rounded-2xl bg-white/70 p-5 backdrop-blur"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl bg-white/85 p-7 shadow-soft backdrop-blur lg:sticky lg:top-32 lg:p-9"
          >
            <div className="relative grid grid-cols-2 rounded-full bg-rose-50 p-1.5">
              <div
                className={clsx(
                  "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-rose-700 transition-all duration-300",
                  mode === "login" ? "left-1.5" : "left-[calc(50%+0px)]"
                )}
              />
              <button
                onClick={() => setMode("login")}
                className={clsx(
                  "relative z-10 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors",
                  mode === "login" ? "text-white" : "text-ink-700"
                )}
              >
                Вход
              </button>
              <button
                onClick={() => setMode("register")}
                className={clsx(
                  "relative z-10 rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors",
                  mode === "register" ? "text-white" : "text-ink-700"
                )}
              >
                Регистрация
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-7 space-y-4"
              >
                {mode === "register" && (
                  <Field
                    icon={UserIcon}
                    label="Как вас зовут"
                    placeholder="Анна"
                    type="text"
                    required
                  />
                )}
                <Field
                  icon={Mail}
                  label="Email"
                  placeholder="anna@mail.ru"
                  type="email"
                  required
                />
                {mode === "register" && (
                  <Field
                    icon={Phone}
                    label="Телефон"
                    placeholder="+7 (___) ___ ___"
                    type="tel"
                  />
                )}
                <Field
                  icon={Lock}
                  label="Пароль"
                  placeholder="не короче 6 символов"
                  type="password"
                  required
                />

                {mode === "login" && (
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em]">
                    <label className="inline-flex items-center gap-2 text-ink-700">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-rose-300 text-rose-600 focus:ring-rose-400"
                      />
                      Запомнить меня
                    </label>
                    <a href="#" className="text-rose-700 hover:text-rose-900">
                      Забыли?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitted}
                  className="btn-primary mt-2 w-full"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />{" "}
                      {mode === "login" ? "Вход выполнен" : "Добро пожаловать"}
                    </>
                  ) : mode === "login" ? (
                    "Войти в кабинет"
                  ) : (
                    "Создать аккаунт"
                  )}
                </button>

                {mode === "register" && (
                  <p className="text-center text-[10px] uppercase tracking-[0.2em] text-ink-500">
                    Регистрируясь, вы соглашаетесь с офертой и обработкой данных
                  </p>
                )}
              </motion.form>
            </AnimatePresence>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-rose-200" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
                или
              </span>
              <span className="h-px flex-1 bg-rose-200" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="rounded-full border border-rose-200 bg-white py-3 text-xs uppercase tracking-[0.22em] text-ink-700 transition-colors hover:border-rose-400">
                Google
              </button>
              <button className="rounded-full border border-rose-200 bg-white py-3 text-xs uppercase tracking-[0.22em] text-ink-700 transition-colors hover:border-rose-400">
                Apple
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
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
          className="w-full rounded-full border border-rose-200 bg-white py-3 pl-11 pr-5 text-sm focus:border-rose-500 focus:outline-none"
        />
      </div>
    </label>
  );
}
