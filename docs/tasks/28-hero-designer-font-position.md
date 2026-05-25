---
id: 28
title: Hero — подключить дизайнерский шрифт Unbounded для H2 + сместить текст правее и выше
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
1. Подключить новый «дизайнерский» жирный шрифт **Unbounded** (Google Fonts, geometric heavy, есть кириллица) и применить его к главному H2 в Hero.
2. Tagline оставить в текущем `font-script italic` (Cormorant).
3. Сместить весь текстовый блок правее и выше — не по центру правой колонки, а ближе к верхнему правому краю.

## Контекст
- Файлы для правки:
  - `app/layout.tsx` — подключить Unbounded через `next/font/google`.
  - `tailwind.config.ts` — добавить fontFamily.heavy.
  - `components/Hero.tsx` — применить новый шрифт к H2, сместить текст.
- Размер шрифта Unbounded подходит для display-заголовков, очень журнальный/дизайнерский, поддерживает кириллицу. Веса 400-900.
- Сейчас H2 использует `font-display` (Playfair) — пользователь хочет ЗАМЕНИТЬ на новый, более «жирный, необычный, дизайнерский».
- Tagline остаётся `font-script italic text-rose-700` (без изменений по сути).

## Что сделать

### 1. `app/layout.tsx`
- Добавить импорт: `import { Unbounded, ... } from "next/font/google";`
- Создать переменную:
  ```tsx
  const unbounded = Unbounded({
    subsets: ["latin", "cyrillic"],
    variable: "--font-unbounded",
    display: "swap",
    weight: ["400", "600", "700", "800", "900"],
  });
  ```
- В `<html>` добавить класс `${unbounded.variable}` к существующим.

### 2. `tailwind.config.ts`
- В `extend.fontFamily` добавить:
  ```ts
  heavy: ["var(--font-unbounded)", "system-ui", "sans-serif"],
  ```
  (рядом с `display`, `sans`, `script`).

### 3. `components/Hero.tsx` — правый блок:

**Изменить layout-обёртку** правого блока с центрирования на верхнее-правое:
- Сейчас: `flex items-center bg-rose-100 px-8 py-12 md:h-full md:w-1/2 md:px-12 lg:px-20`
- Изменить на: `flex items-start justify-end bg-rose-100 px-8 py-16 md:h-full md:w-1/2 md:px-12 md:py-20 lg:px-16 lg:py-24` (items-start + justify-end + увеличенный py).
- Внутренний контейнер `max-w-md` оставить, но можно добавить `text-right` для журнального правостороннего выравнивания текста (опционально, агент сам решит после визуального теста).

**Изменить H2**: 
- Заменить `font-display font-light` на `font-heavy font-black` (новый Unbounded weight 900) или `font-heavy font-extrabold` (800).
- Размеры: можно слегка уменьшить, потому что heavy шрифты выглядят крупнее. Например `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl` (вместо текущих text-4xl→xl:text-8xl).
- Tracking: `tracking-tight` оставить или сменить на `tracking-tighter` (heavy дисплейные часто лучше с минусовым трекингом).
- Слово-акцент «создают» оставить в `font-script italic text-rose-700` (без font-heavy) — этот контраст и есть «микс жирного и нежного».
- Можно убрать `<br className="hidden sm:block"/>` или оставить — зависит от того, как новый шрифт ложится. Агент решает.

**Tagline** — без структурных изменений, но проверить что после H2 и линии он выглядит сбалансированно. Может потребоваться корректировка `mt-6`.

## Acceptance criteria
- [x] В `app/layout.tsx` добавлен импорт `Unbounded` из `next/font/google`, переменная `--font-unbounded`, класс на `<html>`.
- [x] В `tailwind.config.ts` в `extend.fontFamily` появилось `heavy: ["var(--font-unbounded)", "system-ui", "sans-serif"]`.
- [x] В `components/Hero.tsx` H2 использует `font-heavy` с весом 800 или 900 (`font-extrabold` / `font-black`).
- [x] Tagline остался в `font-script italic text-rose-700`.
- [x] Акцентное слово «создают» в H2 — в `font-script italic text-rose-700` (микс шрифтов сохранён).
- [x] Текстовый блок смещён вверх-вправо: `items-start justify-end` на родителе + увеличенный py.
- [x] Компонент остался server-component (без `"use client"`).
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Запреты
- ❌ Не подключать кастомный CSS / @import — только через `next/font/google`.
- ❌ Не менять Playfair / Inter / Cormorant — они нужны другим компонентам.
- ❌ Не трогать левую половину Hero с фото.
- ❌ Не трогать marquee.
- ❌ Не возвращать `"use client"` или Framer Motion.

## Не входит в задачу
- Применять `font-heavy` к другим заголовкам сайта (Categories h2, About h2 и т.п.) — это отдельная задача.
- Менять текст пользователя.

## Артефакты
- `app/layout.tsx` — добавлен импорт `Unbounded` из `next/font/google`, создана переменная `unbounded` с CSS-variable `--font-unbounded`, weight `["400","600","700","800","900"]`, subsets `["latin","cyrillic"]`. Переменная добавлена в `className` на `<html>` рядом с playfair/inter/cormorant.
- `tailwind.config.ts` — в `extend.fontFamily` добавлена запись `heavy: ["var(--font-unbounded)", "system-ui", "sans-serif"]`. Существующие `display`, `sans`, `script` нетронуты.
- `components/Hero.tsx`: правый блок изменён на `items-start justify-end` с увеличенными `py-16 md:py-20 lg:py-24` — текст переместился в верхний правый угол. Внутренний `max-w-md` получил `text-right`. H2 переведён с `font-display font-light` на `font-heavy font-black text-3xl→xl:7xl tracking-tighter` (Unbounded weight 900). Акцентное слово «создают» сохранено в `font-script italic text-rose-700` (микс шрифтов). Оба `<br className="hidden sm:block"/>` убраны — Unbounded компактно ложится. Tagline, eyebrow, золотая линия, левая половина Hero и marquee не тронуты.

## Заметки исполнения
- Подключён 4-й Google-шрифт проекта — Unbounded (geometric heavy, поддерживает кириллицу).
- Микс шрифтов в H2 теперь: Unbounded font-black (массивный, дизайнерский) + Cormorant italic (нежный) — на одном слове.
- Композиция текста смещена: items-center → items-start justify-end + увеличенный padding-top + text-right на блоке.
- Компонент Hero остался server-component (без `"use client"`).
- `npx tsc --noEmit` прошёл без ошибок. `npm run build` не запускался.
