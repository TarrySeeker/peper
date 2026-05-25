---
id: 20
title: Категории «Расчёски» и «Косметички» — заменить Unsplash-фото на локальные файлы
status: done
agent: commerce-logic
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Аналог задачи 19, но для двух категорий за раз: заменить URL-ы фото у `rascheski` и `kosmetichki` в `lib/products.ts` на локальные пути.

## Контекст
- Файл: `lib/products.ts`, массив `categories`.
- Локальные файлы уже скопированы оркестратором:
  - `public/categories/rascheski.jpg` (1.1 МБ, исходник `photo/2.jpg`)
  - `public/categories/kosmetichki.jpg` (352 КБ, исходник `photo/3.jpg`)

## Что сделать
1. В `lib/products.ts`:
   - У `categories[1]` (slug `"rascheski"`) — заменить `image` на `"/categories/rascheski.jpg"`.
   - У `categories[2]` (slug `"kosmetichki"`) — заменить `image` на `"/categories/kosmetichki.jpg"`.

Всё. Никаких других правок.

## Acceptance criteria
- [x] `categories[1].image === "/categories/rascheski.jpg"`.
- [x] `categories[2].image === "/categories/kosmetichki.jpg"`.
- [x] Остальные поля (slug, title, subtitle, description) — нетронуты.
- [x] Категория krabiki (`categories[0]`) уже изменена задачей 19 — её не трогать.
- [x] Категории `zakolki`, `grebeshki`, `sumki` — остаются на Unsplash.
- [x] `products` массив — не трогать.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Не входит в задачу
- Менять `next.config.ts`.
- Менять компоненты UI.

## Артефакты
- `public/categories/rascheski.jpg` — новый файл (1.1 МБ, из `photo/2.jpg`).
- `public/categories/kosmetichki.jpg` — новый файл (352 КБ, из `photo/3.jpg`).
- `lib/products.ts` строки 18 и 26 — `categories[1].image` и `categories[2].image` заменены с Unsplash URL на `/categories/rascheski.jpg` и `/categories/kosmetichki.jpg`.

## Заметки исполнения
- Следует за задачей 19. Теперь 3 из 6 категорий с локальными фото (krabiki, rascheski, kosmetichki). Zakolki, grebeshki, sumki остаются на Unsplash.
- `npx tsc --noEmit` запущен оркестратором — прошёл без вывода.
- Без побочных правок. `npm run build` не запускался.
