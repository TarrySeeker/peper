---
id: 19
title: Категория «Крабики» — заменить Unsplash-фото на локальный файл
status: done
agent: commerce-logic
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Заменить URL фото категории `krabiki` в каталоге с Unsplash на локальный файл, который пользователь добавила в проект.

## Контекст
- Файл: `lib/products.ts`, массив `categories`, элемент `[0]` (slug `"krabiki"`), строка 11.
- Сейчас: `image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&auto=format&fit=crop"`
- Локальный файл уже скопирован: `/Users/reoglw/Desktop/wes/public/categories/krabiki.jpg` (425 КБ, исходник `photo/1.jpg`).
- В Next.js публичные файлы из `public/` доступны по корневому URL — путь `/categories/krabiki.jpg`.

## Что сделать
1. В `lib/products.ts` заменить значение поля `image` у `categories[0]` (krabiki) на `"/categories/krabiki.jpg"`.

Всё. Никаких других правок.

## Acceptance criteria
- [x] `categories[0].image === "/categories/krabiki.jpg"` в `lib/products.ts`.
- [x] Остальные поля `categories[0]` (slug, title, subtitle, description) — нетронуты.
- [x] Другие элементы массива и `products` — нетронуты.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Где увидится изменение
- Сетка «Категории» на главной (`components/Categories.tsx`) — карточка krabiki.
- Раздел «О бренде» (`components/About.tsx`) — slideshow использует `categories[0]` как первый кадр.
- Страница `/catalog/krabiki/` — если использует `getCategoryBySlug("krabiki").image`.

## Не входит в задачу
- Менять `next.config.ts` (локальные файлы не требуют whitelist).
- Менять компоненты UI или текст категории.
- Заменять фото у других категорий.

## Артефакты
- `public/categories/krabiki.jpg` — новый файл (425 КБ), скопирован из исходника `photo/1.jpg`.
- `lib/products.ts` строка 10 — `categories[0].image` заменён с Unsplash URL на `"/categories/krabiki.jpg"`. Остальные категории и products нетронуты.

## Заметки исполнения
- Локальный путь подхватывается в трёх местах: сетка Categories на главной, slideshow в About (использует `categories[0]`), страница `/catalog/krabiki/`.
- Whitelist в `next.config.ts` не требуется — локальные файлы из `public/` работают напрямую.
- `npx tsc --noEmit` прошёл без ошибок. `npm run build` не запускался.
