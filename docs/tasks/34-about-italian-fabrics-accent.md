---
id: 34
title: About — добавить акцентный блок «Итальянские ткани · premium качество · от 700 ₽/м»
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
В разделе «О бренде» (`components/About.tsx`) добавить **акцентный editorial-блок** с текстом:
> Итальянские ткани · premium качество · от 700 ₽/м

Блок должен явно выделяться (заметный, журнальный, дизайнерский), но органично укладываться в существующий тон About (палитра rose/gold/ink, шрифты Playfair display + Manrope heavy + Cormorant script).

## Контекст
Файл: `components/About.tsx` (376 строк).

Текущая структура About (для ориентира):
- Строки 127-175: Header Row — eyebrow «О бренде», H2 «Мы создаём вещи, которые хочется хранить», два интро-параграфа.
- Строки 178-186: **первый Pull Quote** (border-left, рендерится через `PullQuoteBlock`).
- Строки 197-348: Editorial Moodboard Grid (слайдшоу + 4 маленьких фото + второй Pull Quote).
- Строки 351-371: Нижний ряд из двух Pull Quotes 3-4.

**Куда вставлять:** между интро-параграфами (после строки 175, перед строкой 178) — там сейчас естественная пауза. Блок становится «акцентным манифестом» между описанием бренда и началом moodboard.

Палитра/шрифты доступны:
- Цвета: `text-rose-600/700`, `text-gold-600`, `text-ink-700/900`, `bg-rose-100`, `border-gold-400`, `border-rose-200`.
- Шрифты: `font-display` (Playfair), `font-heavy` (Manrope), `font-script` (Cormorant italic), `font-sans` (Inter).
- Размеры: уже используются `text-4xl … xl:text-8xl` для display заголовков в проекте.
- Eyebrow-паттерн: `text-[11px] uppercase tracking-[0.32em] text-gold-600` (см. класс `.eyebrow` в globals.css).
- Тонкая золотая линия-разделитель — паттерн из Hero: `h-px bg-gold-400/60`.

## Что сделать

### `components/About.tsx`

После закрывающего `</motion.p>` параграфа (строка 174, второй интро-параграф) и перед открывающим `<motion.div ... className="mt-12 mb-10 border-l-2 border-rose-200 pl-6 max-w-md">` (строка 178, первый PullQuote) — вставить НОВЫЙ блок:

```tsx
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
        Атеlier · Materiali
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
```

**Логика акцента:**
- Горизонтальные тонкие золотые линии сверху и снизу (`border-y border-gold-400/40`) — даёт «баннер» / «manifest»-вид.
- Слева — заголовок в два уровня: «Итальянские ткани» (Manrope heavy) + «premium качество» (Cormorant script italic, в розовом). Микс шрифтов как в Hero.
- Сверху над заголовком — мелкая капс-этикетка «Atelier · Materiali» (gold uppercase tracking) — editorial-eyebrow.
- Справа — цена-акцент: число «700» Manrope heavy bold в крупном размере (text-4xl→md:6xl), всё в rose-700. Маленький «₽/м» сверху-справа в Inter (типографический trick).
- На mobile (< md) — стопкой: заголовок сверху, цена снизу. На desktop — два столбца flex.
- Framer Motion fade-in снизу с whileInView (как остальные блоки About).

**Не использовать:**
- ❌ Не добавлять иконку, эмодзи или фото.
- ❌ Не использовать bg-fill (только border-y).
- ❌ Не отступать от палитры (rose / gold / ink / ivory). Никакого зелёного/синего.

**Альтернатива (на усмотрение агента, если визуально лучше):** заменить «Atelier · Materiali» на другой editorial-eyebrow (например, «Materia · Атеlier» или «Premium Tessuti»), но в той же типографике (gold uppercase tracking). Главное — сохранить итальянскую коннотацию и не уйти в кириллицу полностью.

### Остальное в About — НЕ ТРОГАТЬ
- Header row, интро-параграфы — не менять.
- Pull Quotes 1-4 — не менять.
- Moodboard grid, слайдшоу, smallPhotos, slideshowImages — не менять.
- `useScroll`, `useTransform`, `useState`, `useEffect`, AnimatePresence — не менять.
- Глобальные стили, шрифты, Tailwind config — не менять.

## Acceptance criteria
- [x] В `components/About.tsx` между концом блока интро-параграфов (после второго `<motion.p>`) и началом первого PullQuote-блока появился новый `<motion.div>` с классом-обёрткой `mt-16 mb-14 max-w-4xl` (или близкие отступы).
- [x] Внутри новой обёртки — flex-контейнер с `border-y border-gold-400/40 py-10 sm:py-12`, расположенный `flex-col md:flex-row md:items-end md:justify-between`.
- [x] Левый блок содержит eyebrow в `font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600` и `<h3>` с миксом `font-heavy` + `font-script italic`. Текст в h3: «Итальянские ткани» (heavy) + «premium качество» (script italic, в `text-rose-700`).
- [x] Правый блок содержит маленький подзаголовок (gold/ink uppercase tracking) и крупную цену: «от 700 ₽/м», где «700» в `font-heavy font-bold` в больших размерах (text-4xl→md:text-6xl) в `text-rose-700`, и «₽/м» — мелким Inter сверху-справа (typographic detail).
- [x] Появление блока анимировано через `motion.div` с fade-in (`initial opacity:0 y:24` → `whileInView opacity:1 y:0`, duration ~0.7).
- [x] На mobile (< md) — заголовок и цена вертикально, цена слева; на desktop (md+) — два столбца с цена-справа.
- [x] В блоке только цвета из палитры (rose / gold / ink). Нет иконок / эмодзи / фото / bg-fill.
- [x] Существующие блоки About (Header, PullQuotes 1-4, Moodboard, slideshow) — не тронуты.
- [x] Глобальные стили, шрифты, Tailwind, types — не тронуты.
- [x] Компонент остаётся Client Component (`"use client"`), framer-motion работает.
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не менять интро-параграфы, H2, PullQuotes, moodboard.
- ❌ Не добавлять иконки (Lucide), эмодзи, картинки или фоны (border-y — да, bg — нет).
- ❌ Не использовать цвета вне палитры rose/gold/ink/ivory.
- ❌ Не вводить `rounded-*` на блоке (карточки сайта стали чёткие после задачи 30, держим стиль).
- ❌ Не менять текст «Итальянские ткани · premium качество · от 700 ₽/м» — это запрошенный пользователем контент.

## Не входит в задачу
- Менять другие секции (Hero, Categories, Bestsellers, Sale, New, Footer).
- Добавлять третий язык / переводы.
- Менять данные в `lib/products.ts`.

## Артефакты
- `components/About.tsx` — добавлен editorial-баннер между интро-параграфами (строки 176–212) с motion-анимацией, золотыми горизонтальными линиями, микс-шрифтов h3 (Manrope + Cormorant italic) и крупной ценой (700 ₽/м, тип-трюк с align-top для валюты).

## Заметки исполнения
- Опечатка в шаблоне: «Атеlier» (кириллическая «А» + латинское слово) исправлена на корректное «Atelier».
- Дизайн: горизонтальные тонкие золотые линии (`border-y border-gold-400/40`) дают «манифест-баннер» вид; микс шрифтов на h3 повторяет паттерн Hero; число «700» в Manrope heavy bold с мелким «₽/м» в Inter — типографический трюк для editorial-акцента.
- Адаптив: стопка на mobile, два столбца flex (justify-between, items-end) на md+.
- Framer Motion: fade-in снизу (y:24→0, duration 0.7, whileInView once:true).
- Остальной About (Header, PullQuotes 1-4, slideshow, moodboard grid) не тронут; useScroll/useTransform/AnimatePresence работают.
- `npx tsc --noEmit` — exit 0.
