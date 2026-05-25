---
id: 03
title: Миграция всех <img> на next/image
status: todo
agent: quality-guardian
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Заменить все нативные `<img>` на компонент `next/image` для автоматической оптимизации (lazy loading, форматы WebP/AVIF, корректные размеры) — это улучшит LCP и Lighthouse Performance.

## Контекст
- Сейчас изображения хранятся как URL `https://images.unsplash.com/...` в `lib/products.ts` (категории, продукты) и могут использоваться в компонентах `components/Hero.tsx`, `components/Categories.tsx`, `components/Bestsellers.tsx`, `components/ProductCard.tsx`, `components/ProductGrid.tsx`, `components/CatalogView.tsx`, `components/SectionHero.tsx` (точно проверь grep'ом).
- Внешний домен `images.unsplash.com` нужно whitelist'нуть в `next.config.ts` через `images.remotePatterns`.
- Для LCP-картинки на главной (Hero) — обязательно `priority`.

## Acceptance criteria
- [ ] В `next.config.ts` добавлен `images.remotePatterns` с `{ protocol: "https", hostname: "images.unsplash.com" }`.
- [ ] Все `<img>` заменены на `<Image>` из `next/image` (grep -rn "<img" по `app/` и `components/` — пусто).
- [ ] Каждое изображение имеет `alt` (осмысленный или пустой для декоративных).
- [ ] Заданы `width`/`height` (для фиксированных) или `fill` + контейнер с `relative` + `sizes` (для адаптивных карточек).
- [ ] Hero-картинка имеет `priority`.
- [ ] `npm run build` проходит без ошибок и предупреждений про изображения.

## Не входит в задачу
- Замена URL картинок на свои/локальные.
- Создание плейсхолдеров (blurDataURL).
- Полный a11y-аудит alt-текстов (это задача 09).

## Артефакты
_Заполняется по факту._

## Заметки исполнения
_Заполняется по факту._
