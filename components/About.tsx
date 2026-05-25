"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
// slideshowImages — локальные фото из public/about/.
const slideshowImages: { src: string; alt: string }[] = [
  {
    src: "/about/13.jpg",
    alt: "PAPER.FAIRIES — атмосфера ателье",
  },
];

// smallPhotos — локальные фото из public/about/.
const smallPhotos: { src: string; alt: string }[] = [
  { src: "/about/11.jpg", alt: "PAPER.FAIRIES — детали коллекции" },
  { src: "/about/12.jpg", alt: "PAPER.FAIRIES — материал и текстура" },
  { src: "/about/14.png", alt: "PAPER.FAIRIES — мастерская" },
  { src: "/about/15.jpg", alt: "PAPER.FAIRIES — финальный штрих" },
];

interface PullQuote {
  text: string;
  label: string;
}

const pullQuotes: PullQuote[] = [
  {
    text: "Каждая вещь проходит через руки мастеров — без конвейера и спешки.",
    label: "Ручная работа",
  },
  {
    text: "Переработанный картон, шёлковые ленты и сухоцветы — упаковка как часть подарка.",
    label: "Бережная упаковка",
  },
  {
    text: "Ацетат, nappa-кожа, пресноводный жемчуг — материалы, которые приятно держать в руках.",
    label: "Премиум материалы",
  },
  {
    text: "Гравировка инициалов превращает аксессуар в личную историю.",
    label: "Персонализация",
  },
];

function PullQuoteBlock({ quote }: { quote: PullQuote }) {
  return (
    <blockquote className="py-6">
      <span
        aria-hidden
        className="block font-display text-5xl leading-none text-rose-300/60 select-none"
      >
        «
      </span>
      <p className="mt-1 font-display italic text-2xl lg:text-3xl text-ink-900 leading-snug">
        {quote.text}
      </p>
      <span className="mt-3 block font-sans text-[10px] uppercase tracking-[0.3em] text-gold-600">
        — {quote.label.toUpperCase()}
      </span>
    </blockquote>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-rose-100/50 py-24 lg:py-32">
      {/* Atmospheric background blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-rose-200/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-1/4 h-[320px] w-[320px] rounded-full bg-gold-400/10 blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/4 bottom-1/4 h-72 w-72 rounded-full bg-rose-400/25 blur-3xl" />

      <div className="container-site relative">

        {/* ── Header Row ── */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="eyebrow"
          >
            О бренде
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl"
          >
            Мы создаём вещи,
            <br />
            которые{" "}
            <span className="font-script italic font-light text-rose-600">
              хочется хранить
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-base leading-relaxed text-ink-700 max-w-xl"
          >
            PAPER.FAIRIES — небольшое московское ателье. Мы верим, что женские
            аксессуары должны быть продолжением характера: лёгкими, надёжными
            и с тем самым ощущением, когда хочется снова надеть любимое.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-ink-500 max-w-lg"
          >
            Каждая коллекция — разговор о деталях: выборе материала, форме застёжки,
            запахе подарочной бумаги. Мы работаем медленно — чтобы результат оставался надолго.
          </motion.p>
        </div>

        {/* ── Accent banner — Итальянские ткани, premium качество, от 700 ₽/м ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16 mb-14 max-w-4xl"
        >
          <div className="flex flex-col gap-4 border-y border-gold-400/40 py-10 sm:py-12 md:flex-row md:items-end md:justify-between md:gap-10">
            {/* Левый блок — заголовок (микс шрифтов) */}
            <div className="flex-1">
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600">
                Atelier
              </p>
              <h3 className="mt-3 font-heavy text-3xl leading-[1.05] tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
                Итальянские ткани
                <span className="block font-script italic font-light text-rose-700">
                  premium качество
                </span>
              </h3>
            </div>

            {/* Правый блок — цена-акцент */}
            <div className="md:text-right md:shrink-0">
              <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-ink-500">
                Стоимость материала
              </p>
              <p className="mt-2 font-display text-4xl leading-none text-rose-700 sm:text-5xl md:text-6xl">
                от <span className="font-heavy font-bold">700</span>
                <span className="ml-1 font-sans text-base align-top text-ink-700">₽/м</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Pull Quote 1 — above moodboard ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-12 mb-10 border-l-2 border-rose-200 pl-6 max-w-md"
        >
          <PullQuoteBlock quote={pullQuotes[0]} />
        </motion.div>

        {/* ── Editorial Moodboard — cleaned up 2-col layout ── */}
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
          {/* Slideshow — левая колонка, spans 2 rows на lg */}
          <motion.div
            ref={slideshowRef}
            style={{ y }}
            className="relative overflow-hidden rounded-sm lg:row-span-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ivory-200 lg:aspect-auto lg:h-full">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slideshowImages[activeIndex].src}
                    alt={slideshowImages[activeIndex].alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slideshow dot indicators — только если slides > 1 */}
              {slideshowImages.length > 1 && (
                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                  role="tablist"
                  aria-label="Слайды главного фото"
                >
                  {slideshowImages.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === activeIndex}
                      aria-label={`Фото ${i + 1} из ${slideshowImages.length}`}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1 rounded-full transition-all duration-400 ${
                        i === activeIndex
                          ? "w-6 bg-rose-700"
                          : "w-6 bg-ink-300/70 hover:bg-ink-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Правая верхняя ячейка — Pull Quote 2 над сеткой 2x2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-3 lg:gap-6"
          >
            <div className="border-l-2 border-gold-400/40 pl-5">
              <PullQuoteBlock quote={pullQuotes[1]} />
            </div>

            {/* 2x2 grid маленьких фото */}
            <div className="grid grid-cols-2 gap-3 lg:gap-6">
              {smallPhotos.slice(0, 4).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.07 * i, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-sm"
                >
                  <div className="relative aspect-square overflow-hidden bg-ivory-200">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-ink-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Pull Quotes Row — quotes 3 & 4 ── */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-2 border-rose-200 pl-6"
          >
            <PullQuoteBlock quote={pullQuotes[2]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="border-l-2 border-gold-400/40 pl-6"
          >
            <PullQuoteBlock quote={pullQuotes[3]} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
