---
id: 04
title: SEO metadata + JSON-LD для продуктов и категорий
status: todo
agent: content-seo
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Добавить SEO-метаданные (title/description/OpenGraph/Twitter) для динамических страниц и structured data (JSON-LD) для поисковиков — без этого товары не индексируются как Rich Results.

## Контекст
- Сейчас metadata есть только в `app/layout.tsx` (глобальная).
- Динамические страницы: `app/product/[id]/page.tsx`, `app/catalog/[category]/page.tsx` — нужны `generateMetadata`.
- Статические: `app/catalog/page.tsx`, `app/sale/page.tsx`, `app/new/page.tsx`, `app/cart/page.tsx`, `app/contacts/page.tsx`, `app/account/page.tsx` — нужны `export const metadata`.
- Данные брать из `lib/products.ts` через существующие селекторы `getProductById`, `getCategoryBySlug`.
- Базовый URL — `process.env.NEXT_PUBLIC_SITE_URL ?? "https://paper-fairies.ru"`.

## Acceptance criteria
- [ ] `app/product/[id]/page.tsx` — `generateMetadata({ params })` с title, description, openGraph (image из `product.images[0]`), twitter card.
- [ ] `app/catalog/[category]/page.tsx` — `generateMetadata({ params })` на основе `getCategoryBySlug`.
- [ ] Все статические страницы выше имеют `export const metadata` с уникальными title/description.
- [ ] На странице продукта рендерится JSON-LD `Product` (id, name, image, description, offers.price, priceCurrency: "RUB", availability).
- [ ] На странице продукта и категории рендерится JSON-LD `BreadcrumbList`.
- [ ] В `app/layout.tsx` рендерится JSON-LD `Organization` (name, url, logo placeholder, sameAs пустой массив).
- [ ] Метаданные используют `metadataBase` в `app/layout.tsx` для корректных абсолютных URL.

## Не входит в задачу
- Регистрация в Search Console, Яндекс.Вебмастер (ручное действие пользователя).
- Реальные `sameAs` (соцсети — пользователь даёт ссылки отдельно).
- Перевод метаданных на английский (мультиязычность — отдельный проект).

## Артефакты
_Заполняется по факту._

## Заметки исполнения
_Заполняется по факту._
