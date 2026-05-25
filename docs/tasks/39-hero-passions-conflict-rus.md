---
id: 39
title: Hero — заменить Julia Script на локальный Passions Conflict RUS
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Заменить в Hero шрифт **Julia Script** на **Passions Conflict RUS** — локальный пользовательский шрифт с Mac. Кириллица поддерживается (проверено через fontTools — 66 кириллических глифов, есть М/а/я/ё). Шрифт декоративный, рукописный курсив, более изящный/динамичный чем Julia.

## Контекст
Файлы:
- Файл уже скопирован: `app/fonts/PassionsConflictRUS-Regular.otf` (~266 KB, OTF, не TTF).
- `app/fonts/Julia_Script.ttf` — оставить (backup, не подгружается без declaration).
- `app/layout.tsx` — заменить `localFont` declaration `julia` на `passions`.
- `tailwind.config.ts` — заменить алиас `julia` на `passions`.
- `components/Hero.tsx` — заменить `font-julia` на `font-passions`.

## Что сделать

### 1. `app/layout.tsx`
1. Удалить полностью блок:
   ```tsx
   const julia = localFont({
     src: "./fonts/Julia_Script.ttf",
     variable: "--font-julia",
     display: "swap",
   });
   ```
2. Добавить на его место:
   ```tsx
   const passions = localFont({
     src: "./fonts/PassionsConflictRUS-Regular.otf",
     variable: "--font-passions",
     display: "swap",
   });
   ```
   (`localFont` импорт уже есть — не дублировать.)
3. В `<html className={...}>` заменить `${julia.variable}` на `${passions.variable}`. Остальные переменные (playfair, inter, cormorant, manrope) — не трогать.

### 2. `tailwind.config.ts`
В `extend.fontFamily` заменить:
```ts
julia: ["var(--font-julia)", "cursive"],
```
на:
```ts
passions: ["var(--font-passions)", "cursive"],
```
Остальные алиасы (display, sans, script, heavy) не трогать.

### 3. `components/Hero.tsx`
В h2 заменить класс `font-julia` на `font-passions`. Остальные классы h2 сохранить или слегка подкорректировать (Passions Conflict — sharper и более экспрессивный, размеры могут потребовать -1 ступень, но это опционально). Акцентный span «создают» с `text-rose-700` не трогать.

### 4. Что НЕ трогать
- Манrope, Playfair, Inter, Cormorant — импорты, переменные, классы.
- Tailwind алиасы `display`, `sans`, `script`, `heavy`.
- Tagline в Hero, eyebrow, золотая линия, левая половина, Marquee.
- About-баннер «Итальянские ткани» (использует `font-heavy` = Manrope).
- Все остальные компоненты, страницы, types.

## Acceptance criteria
- [x] В `app/layout.tsx` блок `const julia = localFont({...})` удалён, на его место добавлен `const passions = localFont({ src: "./fonts/PassionsConflictRUS-Regular.otf", variable: "--font-passions", display: "swap" })`.
- [x] `import localFont from "next/font/local"` сохранён (один раз).
- [x] В `<html className={...}>` отсутствует `${julia.variable}`, присутствует `${passions.variable}`. Остальные переменные (playfair, inter, cormorant, manrope) на месте.
- [x] В `tailwind.config.ts` алиас `julia` заменён на `passions: ["var(--font-passions)", "cursive"]`. Прочие алиасы не тронуты.
- [x] В `components/Hero.tsx` h2 использует `font-passions` (вместо `font-julia`). Прочие классы h2 сохранены (или слегка скорректированы).
- [x] Акцентный span «создают» с `text-rose-700` — не тронут.
- [x] Hero остаётся server-component (без `"use client"`).
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не оставлять `julia` localFont declaration или алиас `julia` в Tailwind (полная замена).
- ❌ Не удалять файл `app/fonts/Julia_Script.ttf` — пусть остаётся как backup.
- ❌ Не использовать `@font-face` в CSS — только `next/font/local`.
- ❌ Не менять Manrope (нужен в About).
- ❌ Не класть OTF в `public/` — он уже в `app/fonts/`.

## Не входит в задачу
- Менять прочие части Hero, другие секции.
- Удалять Julia_Script.ttf файл.

## Артефакты
- `app/fonts/PassionsConflictRUS-Regular.otf` — новый файл (~266 KB, OTF), скопирован из системного шрифта Mac пользователя, кириллица (66 глифов U+0400–U+04FF) проверена.
- `app/layout.tsx` — заменена `localFont` declaration: `julia` → `passions`, переменная в `<html className>` обновлена.
- `tailwind.config.ts` — Tailwind alias `julia` → `passions: ["var(--font-passions)", "cursive"]`.
- `components/Hero.tsx` — класс h2 обновлён: `font-julia` → `font-passions`, остальные стили сохранены.

## Заметки исполнения
Passions Conflict RUS — декоративный рукописный OTF-шрифт пользователя с Mac, Single weight Regular, кириллический, более экспрессивный и динамичный чем Julia Script. Подключён через `next/font/local` в конвенции Next.js 15. Julia Script полностью отвязан (localFont declaration удалён, Tailwind alias удалён); файл `Julia_Script.ttf` остаётся в `app/fonts/` как backup для отката. Manrope сохранён в About-баннере (font-heavy). Проект подгружает 4 Google-шрифта + 1 локальный (Passions). Dev-сервер требует перезапуска с очисткой `.next/` для свежей генерации font-classes. TypeCheck пройден (exit 0), dev-server тестирован (curl + grep CSS).
