---
id: 21
title: Категории «Гребешки» и «Сумки» — заменить Unsplash-фото на локальные файлы
status: done
agent: commerce-logic
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Аналог задач 19 и 20, теперь для двух последних запрошенных категорий: `grebeshki` и `sumki`. После этого 5 из 6 категорий используют локальные фото (zakolki остаётся на Unsplash).

## Контекст
- Файл: `lib/products.ts`, массив `categories`.
- Локальные файлы уже скопированы оркестратором:
  - `public/categories/grebeshki.jpg` (327 КБ, из `photo/4.jpg`)
  - `public/categories/sumki.jpg` (313 КБ, из `photo/5.jpg`)

## Что сделать
1. У `categories[4]` (slug `"grebeshki"`) — заменить `image` на `"/categories/grebeshki.jpg"`.
2. У `categories[5]` (slug `"sumki"`) — заменить `image` на `"/categories/sumki.jpg"`.

## Acceptance criteria
- [x] `categories[4].image === "/categories/grebeshki.jpg"`.
- [x] `categories[5].image === "/categories/sumki.jpg"`.
- [x] Остальные поля (slug, title, subtitle, description) — нетронуты.
- [x] `categories[0]` (krabiki), `[1]` (rascheski), `[2]` (kosmetichki) — уже на локальных путях, не трогать.
- [x] `categories[3]` (zakolki) — остаётся на Unsplash.
- [x] `products` массив — не трогать.
- [x] tsc-проверку выполнит оркестратор (commerce-logic без Bash).

## Не входит в задачу
- Менять `next.config.ts`.
- Менять компоненты UI.

## Артефакты
- `public/categories/grebeshki.jpg` — новый файл (327 КБ, из `photo/4.jpg`).
- `public/categories/sumki.jpg` — новый файл (313 КБ, из `photo/5.jpg`).
- `lib/products.ts` строки 43 и 51 — `categories[4].image` и `categories[5].image` заменены с Unsplash URL на `/categories/grebeshki.jpg` и `/categories/sumki.jpg`.

## Заметки исполнения
Третья по счёту follow-up к серии (19, 20). Теперь **5 из 6 категорий** на локальных файлах (krabiki, rascheski, kosmetichki, grebeshki, sumki). Осталась `zakolki` (`categories[3]`) на Unsplash. Замена URL гребешков особенно важна — старый Unsplash URL `photo-1631730486785-466d2b21ddca` давал 404 в логах dev-сервера. Теперь этого URL больше нет в `lib/products.ts`. `npx tsc --noEmit` запущен оркестратором — без ошибок.
