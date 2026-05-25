---
id: 29
title: Hero — Manrope (аналог Josefin Sans с кириллицей) + текст в центр розового блока
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

> **⚠ Изменение в процессе.** Изначально планировался Josefin Sans (как на glowrecipe.com), но он не поддерживает кириллицу — русский текст не отображался бы. По согласованию с пользователем выбран **Manrope** — geometric sans с полной кириллицей, аналогичный character.

## Цель
1. Заменить недавно подключённый шрифт **Unbounded** на **Josefin Sans** — это шрифт с референса glowrecipe.com (проверено через curl HTML — там реально используется `font-family: Josefin Sans, sans-serif`). Josefin Sans — geometric sans-serif с art-deco характером, тонкий-средний, есть кириллица.
2. Сместить текстовый блок из верхнего правого угла обратно в **центр** правой розовой колонки (vertical + horizontal center).

## Контекст
Файлы:
- `app/layout.tsx` — заменить импорт Unbounded на Josefin_Sans.
- `tailwind.config.ts` — в `fontFamily.heavy` поменять CSS-переменную с `--font-unbounded` на `--font-josefin`.
- `components/Hero.tsx` — изменить layout-обёртку правого блока (centered) и убрать text-right.

## Что сделать

### 1. `app/layout.tsx`
- Заменить импорт `Unbounded` на `Josefin_Sans` (Google Fonts использует подчёркивание в имени):
  ```tsx
  import { Playfair_Display, Inter, Cormorant_Garamond, Josefin_Sans } from "next/font/google";
  ```
- Заменить переменную:
  ```tsx
  const josefin = Josefin_Sans({
    subsets: ["latin", "cyrillic"],
    variable: "--font-josefin",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
  });
  ```
- В `<html className={...}>` заменить `${unbounded.variable}` на `${josefin.variable}`.

### 2. `tailwind.config.ts`
- В `extend.fontFamily.heavy` поменять CSS-переменную:
  ```ts
  heavy: ["var(--font-josefin)", "system-ui", "sans-serif"],
  ```
  (имя `heavy` в Tailwind можно оставить — это просто алиас).

### 3. `components/Hero.tsx`
Правый блок:

**Layout-обёртка** — вернуть к центрированию:
- Сейчас: `flex items-start justify-end bg-rose-100 px-8 py-16 md:h-full md:w-1/2 md:px-12 md:py-20 lg:px-16 lg:py-24`
- Изменить на: `flex items-center justify-center bg-rose-100 px-8 py-12 md:h-full md:w-1/2 md:px-12 lg:px-16` (items-center + justify-center, обычный py-12).
- На внутреннем `max-w-md` — убрать `text-right`, можно поставить `text-center` для центрированного текста (рекомендуется) или оставить без выравнивания (текст по левому краю).

**H2 — изменить вес и tracking** для Josefin Sans:
- Сейчас: `mt-6 font-heavy font-black text-3xl leading-[0.95] tracking-tighter text-ink-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`
- Изменить на: `mt-6 font-heavy font-bold text-4xl leading-[1.05] tracking-normal text-ink-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl` (Josefin Sans хорошо смотрится в weight 700 = `font-bold`, с нормальным трекингом и slightly increased line-height — он более воздушный шрифт).
- Размеры можно увеличить обратно (до xl:text-8xl), т.к. Josefin Sans тоньше Unbounded и читается меньше «массивно».
- Акцентное слово «создают» остаётся в `font-script italic text-rose-700` (микс шрифтов).

**Tagline, eyebrow, золотая линия** — без изменений.

## Acceptance criteria
- [x] В `app/layout.tsx` импортирован `Manrope` (вместо Unbounded/Josefin), переменная `--font-manrope` объявлена и применена к `<html>`. Прежние переменные удалены.
- [x] В `tailwind.config.ts` `fontFamily.heavy` ссылается на `var(--font-manrope)`.
- [x] В `components/Hero.tsx` правый блок имеет `items-center justify-center` (без `items-start justify-end`).
- [x] На `max-w-md` нет `text-right` (есть `text-center`).
- [x] H2 использует `font-heavy font-bold` (Manrope 700) с увеличенными размерами и `tracking-normal` (без `tracking-tighter`).
- [x] Акцент «создают» в `font-script italic text-rose-700` сохранён.
- [x] Tagline остался в `font-script italic text-rose-700`.
- [x] Компонент Hero остался server-component (без `"use client"`).
- [x] `npx tsc --noEmit` проходит.

## Запреты
- ❌ Не оставлять одновременно и Unbounded, и Josefin Sans — Unbounded удаляется (он больше не нужен и просто грузит лишний шрифт).
- ❌ Не менять Playfair / Inter / Cormorant.
- ❌ Не трогать левую половину Hero и marquee.
- ❌ Не возвращать `"use client"` или Framer Motion.

## Артефакты
- `app/layout.tsx` — Unbounded и Josefin Sans удалены. Подключён Manrope (`subsets: ["latin", "cyrillic"]`, `weight: ["300","400","500","600","700","800"]`, CSS-переменная `--font-manrope`).
- `tailwind.config.ts` — `fontFamily.heavy` ссылается на `var(--font-manrope)`. Имя класса `heavy` сохранено как алиас.
- `components/Hero.tsx` — правый блок: `items-start justify-end` → `items-center justify-center` + py-12. Внутренний контейнер: `text-right` → `text-center`. H2: `font-black` → `font-bold`, `leading-[0.95]` → `leading-[1.05]`, `tracking-tighter` → `tracking-normal`, размеры вверх на ступень (`text-4xl → xl:text-8xl`). Акцент «создают» в `font-script italic text-rose-700` сохранён.

## Заметки исполнения
- Glow Recipe (референс) использует Josefin Sans для латинских заголовков — проверено через curl HTML их главной.
- Josefin Sans в Google Fonts не имеет cyrillic subset — для русского текста требуется аналог.
- Manrope выбран как ближайший аналог: modern geometric sans с полной кириллицей.
- Класс Tailwind `font-heavy` остался как абстракция — переменная менялась дважды (Unbounded → Josefin → Manrope), но в Hero.tsx селекторы не правились.
- Компонент Hero остался server-component.
- `npx tsc --noEmit` — без ошибок.
