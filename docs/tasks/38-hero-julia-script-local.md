---
id: 38
title: Hero — заменить Marck Script на локальный Julia Script (с Mac пользователя)
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Заменить в Hero шрифт Marck Script на **Julia Script** — локальный пользовательский шрифт с Mac, который уже скопирован в проект. Julia Script поддерживает кириллицу (проверено через fontTools — 65 глифов кириллицы, есть М, а, я и т.д.). Шрифт декоративный, рукописный.

## Контекст
Файлы:
- Файл шрифта уже скопирован: `/Users/reoglw/Desktop/wes/app/fonts/Julia_Script.ttf` (~113 KB).
- `app/layout.tsx` — заменить Marck Script на Julia Script через `next/font/local`. Marck больше не нужен — удалить.
- `tailwind.config.ts` — заменить алиас `marck` на `julia`.
- `components/Hero.tsx` — заменить класс `font-marck` на `font-julia`.

`next/font/local` — стандартный способ Next.js 15 подгружать локальные шрифты. Импорт через `import localFont from "next/font/local"`, путь — относительно файла, где вызывается.

## Что сделать

### 1. `app/layout.tsx`
1. Добавить импорт `localFont`:
   ```tsx
   import localFont from "next/font/local";
   ```
2. Создать переменную `julia` (рядом с остальными переменными шрифтов):
   ```tsx
   const julia = localFont({
     src: "./fonts/Julia_Script.ttf",
     variable: "--font-julia",
     display: "swap",
   });
   ```
3. Удалить импорт `Marck_Script` из строки импорта `next/font/google` (оставить там Playfair_Display, Inter, Cormorant_Garamond, Manrope).
4. Удалить целиком блок объявления `const marck = Marck_Script({...});`.
5. В `<html className={...}>` заменить `${marck.variable}` на `${julia.variable}`. Прочие переменные (playfair, inter, cormorant, manrope) остаются.

### 2. `tailwind.config.ts`
В `extend.fontFamily` заменить строку:
```ts
marck: ["var(--font-marck)", "cursive"],
```
на:
```ts
julia: ["var(--font-julia)", "cursive"],
```
Остальные алиасы (display, sans, script, heavy) не трогать.

### 3. `components/Hero.tsx`
В h2 заменить класс `font-marck` на `font-julia`. Остальные классы h2 (`mt-6 font-normal text-5xl leading-[1.1] tracking-normal text-ink-900 sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[9rem]`) — оставить. Акцентный span «создают» с `text-rose-700` не трогать.

При необходимости — можно слегка подкорректировать `leading` или размеры под Julia Script, если визуально требуется (Julia может быть тоньше или жирнее Marck). Но это опциональная полировка.

### 4. Что НЕ трогать
- Manrope, Playfair, Inter, Cormorant — импорты, переменные, классы остаются.
- Tailwind алиасы `display`, `sans`, `script`, `heavy`.
- Tagline в Hero, eyebrow, золотая линия.
- About (банкер «Итальянские ткани» использует `font-heavy` = Manrope).
- Все остальные компоненты, страницы, types.

## Acceptance criteria
- [x] В `app/layout.tsx` добавлен `import localFont from "next/font/local"`.
- [x] Объявлена переменная `julia` через `localFont({ src: "./fonts/Julia_Script.ttf", variable: "--font-julia", display: "swap" })`.
- [x] Импорт `Marck_Script` и переменная `marck` **полностью удалены** из layout.tsx.
- [x] В `<html className={...}>` присутствует `${julia.variable}`, отсутствует `${marck.variable}`.
- [x] Остальные шрифты (Playfair, Inter, Cormorant, Manrope) и их переменные сохранены без изменений.
- [x] В `tailwind.config.ts` алиас `marck` заменён на `julia: ["var(--font-julia)", "cursive"]`. Прочие алиасы не тронуты.
- [x] В `components/Hero.tsx` h2 использует `font-julia` (вместо `font-marck`). Прочие классы h2 сохранены или слегка подкорректированы.
- [x] Акцентный span «создают» с `text-rose-700` не тронут.
- [x] Hero остаётся server-component (без `"use client"`).
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не оставлять Marck Script (его нужно полностью убрать, чтобы не подгружался лишний шрифт).
- ❌ Не трогать Manrope (он нужен в About).
- ❌ Не использовать `@font-face` в CSS — только через `next/font/local`.
- ❌ Не класть `Julia_Script.ttf` в `public/` — конвенция next/font хочет файл внутри `app/` (уже в `app/fonts/`).
- ❌ Не менять имя файла шрифта.
- ❌ Не добавлять `"use client"` в Hero.

## Не входит в задачу
- Менять Tagline, eyebrow, прочие части Hero.
- Менять другие секции (About, Categories, Bestsellers, Sale, New).

## Артефакты
- `app/fonts/Julia_Script.ttf` — новый локальный шрифт (113 KB), скопирован из Mac пользователя. Кириллица: 65 глифов, поддержка «создают» и др.
- `app/layout.tsx` — добавлен импорт `localFont`, переменная `julia`, удалены `Marck_Script` и `marck`.
- `tailwind.config.ts` — алиас `marck` заменён на `julia: ["var(--font-julia)", "cursive"]`.
- `components/Hero.tsx` — h2 переведена с `font-marck` на `font-julia`. Остальные классы h2 и акцентный span сохранены.

## Заметки исполнения
- Julia Script — декоративный рукописный шрифт пользователя с Mac. Подключён локально через `next/font/local`, файл в `app/fonts/` (конвенция Next.js 15).
- Кириллица проверена до копирования через fontTools: 302 глифа всего, 65 в диапазоне U+0400–U+04FF (М, а, я, все необходимые буквы для фразы «Маленькие детали создают магию»).
- Marck Script полностью удалён из проекта (импорт и переменная) — нет лишней загрузки Google-шрифта.
- Manrope сохранён, используется в About-баннере «Итальянские ткани» (`font-heavy`).
- Проект теперь подгружает: 4 Google-шрифта (Playfair Display, Inter, Cormorant Garamond, Manrope) + 1 локальный (Julia Script).
- TypeScript-проверка пройдена (`npx tsc --noEmit` exit 0).
