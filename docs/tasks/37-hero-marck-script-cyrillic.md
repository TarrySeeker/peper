---
id: 37
title: Hero — заменить шрифт H2 «Маленькие детали создают магию» на прописной кириллический Marck Script
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Заменить шрифт основного H2 в Hero с **Manrope (font-heavy, font-bold)** на **Marck Script** — прописной, тонкий, воздушный кириллический рукописный шрифт из Google Fonts. Применить ко всей фразе «Маленькие детали создают магию» — включая акцентное слово «создают» (оно остаётся выделенным цветом `text-rose-700`).

## Контекст
Файлы:
- `app/layout.tsx` — добавить импорт `Marck_Script` из `next/font/google`, создать переменную `--font-marck`. Manrope **оставить** — он используется в About (банкер «Итальянские ткани»).
- `tailwind.config.ts` — добавить новый alias `script-marck` (или `cursive`) в `extend.fontFamily`. **Не трогать** существующие `display`, `sans`, `script`, `heavy` (heavy ссылается на Manrope и нужен About).
- `components/Hero.tsx` — H2 (строки 33-39): убрать `font-heavy font-bold` и `font-script italic` со spana, поставить новый класс на h2 (заодно подкорректировать размер/leading/tracking).

Шрифт **Marck Script**:
- Google Fonts: поддержка `latin`, `latin-ext`, `cyrillic`. Вес 400 — единственный (тонкий, воздушный).
- Стиль: рукописный курсив, элегантный, не агрессивный. Премиум-флёр.
- При том же px-размере script-шрифт читается мельче, чем sans — поэтому в Hero **бампаем размеры на 1-2 ступени вверх** для пропорции.

## Что сделать

### 1. `app/layout.tsx`
Найти строку импорта Google Fonts (там сейчас `Playfair_Display, Inter, Cormorant_Garamond, Manrope`). Добавить `Marck_Script`:

```tsx
import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Manrope,
  Marck_Script,
} from "next/font/google";
```

Создать переменную:
```tsx
const marck = Marck_Script({
  subsets: ["latin", "cyrillic"],
  variable: "--font-marck",
  display: "swap",
  weight: "400",
});
```

(Marck_Script — single-weight, поэтому `weight: "400"` строкой, **не массивом**. Если в next/font/google это требует массива — `weight: ["400"]`. Агент: используй ту форму, которую принимает текущая версия Next 15 — обе валидны, но проверь.)

В `<html className={...}>` добавить `${marck.variable}` рядом с остальными.

### 2. `tailwind.config.ts`
В `extend.fontFamily` добавить новый alias. **Не трогать** существующие. Имя: `marck` (короткое и понятное):

```ts
fontFamily: {
  display: ["var(--font-playfair)", "serif"],
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  script: ["var(--font-cormorant)", "serif"],
  heavy: ["var(--font-manrope)", "system-ui", "sans-serif"],
  marck: ["var(--font-marck)", "cursive"], // ← добавить
},
```

### 3. `components/Hero.tsx` — H2
Сейчас:
```tsx
<h2 className="mt-6 font-heavy font-bold text-4xl leading-[1.05] tracking-normal text-ink-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
  Маленькие детали{" "}
  <span className="font-script italic text-rose-700">
    создают
  </span>{" "}
  магию
</h2>
```

Заменить на:
```tsx
<h2 className="mt-6 font-marck font-normal text-5xl leading-[1.1] tracking-normal text-ink-900 sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[9rem]">
  Маленькие детали{" "}
  <span className="text-rose-700">
    создают
  </span>{" "}
  магию
</h2>
```

Объяснение:
- `font-marck` — новый Marck Script.
- `font-normal` (400) — у Marck Script только один вес 400, не bold.
- Размеры **подняты на 1-2 ступени** (script читается мельче): `text-5xl→xl:text-[9rem]` (примерно 144px на desktop). При необходимости подстрой — если визуально слишком крупно или слишком мелко.
- `leading-[1.1]` — небольшой воздух между строками (у курсива нужно чуть больше).
- `tracking-normal` — script-шрифты обычно не нуждаются в кернинге.
- **Акцент «создают»**: убраны `font-script italic` (теперь всё в Marck — нет смысла переключаться на Cormorant). Остался только `text-rose-700` для цветового акцента — этого достаточно, шрифт сам по себе курсив.

### 4. Что НЕ трогать
- Eyebrow «Spring 2026 · №06», золотая линия, tagline («Любимые аксессуары…» — он в font-script Cormorant). Tagline остаётся в Cormorant — это другой блок и другая роль.
- Левая половина Hero с фото.
- Marquee после `</section>`.
- Manrope в About (банкер «Итальянские ткани» — `font-heavy` там нужен).
- Все остальные компоненты, страницы, шрифты, types.

## Acceptance criteria
- [x] В `app/layout.tsx` импортирован `Marck_Script` из `next/font/google`, переменная `--font-marck` объявлена с `subsets: ["latin", "cyrillic"]`, `weight: "400"` (или `["400"]`), `display: "swap"`. Класс `${marck.variable}` добавлен в `<html>`.
- [x] Manrope **остался** в layout.tsx и в Hero не задействован (импорт и переменная сохранены).
- [x] В `tailwind.config.ts` в `extend.fontFamily` добавлена запись `marck: ["var(--font-marck)", "cursive"]`. Существующие `display`, `sans`, `script`, `heavy` — не тронуты.
- [x] В `components/Hero.tsx` h2 использует `font-marck` (без `font-heavy`, без `font-bold`).
- [x] H2 имеет `font-normal` (или класса веса нет вовсе — Marck Script всё равно один вес).
- [x] Размеры h2 подняты до примерно `text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[9rem]` (или сравнимые — агент может слегка подстроить визуально).
- [x] Акцентный span «создают» содержит только `text-rose-700` (без `font-script italic`). Текст «создают» в нём не тронут.
- [x] Tagline «Любимые аксессуары…» остался в `font-script italic text-rose-700` (не тронут).
- [x] Eyebrow «Spring 2026 · №06», золотая линия — не тронуты.
- [x] Marquee и левая половина Hero — не тронуты.
- [x] About, Categories, Bestsellers, Sale, прочее — не тронуты.
- [x] Компонент Hero остаётся server-component (без `"use client"`).
- [x] `npx tsc --noEmit` — без ошибок.

## Запреты
- ❌ Не удалять Manrope и его переменную из layout.tsx (он нужен About).
- ❌ Не менять `font-heavy` в `tailwind.config.ts` (он ссылается на Manrope, нужен About).
- ❌ Не трогать tagline (Cormorant остаётся).
- ❌ Не использовать кастомный CSS / @font-face — только через `next/font/google`.
- ❌ Не добавлять `"use client"` или Framer Motion в Hero.
- ❌ Не менять структуру Hero (split 50/50, центрирование текста).

## Не входит в задачу
- Заменять шрифт в Categories / Bestsellers / About / Sale.
- Очищать или удалять Cormorant / Playfair / Inter.

## Артефакты
- `app/layout.tsx` — добавлен импорт `Marck_Script`, создана переменная `marck` с кириллической поддержкой, класс `${marck.variable}` добавлен в `<html>`.
- `tailwind.config.ts` — добавлен новый font-alias `marck: ["var(--font-marck)", "cursive"]` в `extend.fontFamily`.
- `components/Hero.tsx` — h2 переписан: `font-heavy font-bold` → `font-marck font-normal`, размеры подняты на 1-2 ступени (`text-5xl...xl:text-[9rem]`), акцентный span «создают» очищен от `font-script italic`.

## Заметки исполнения
Marck Script — тонкий, воздушный рукописный шрифт с полной кириллической поддержкой (Google Fonts). Идеально подходит для «красивого прописного» эффекта. Размеры подняты (script читается мельче при том же px). Manrope сохранён в layout и About. Tagline остался в Cormorant. TS без ошибок. Все AC выполнены.
