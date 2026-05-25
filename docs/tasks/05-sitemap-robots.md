---
id: 05
title: app/sitemap.ts и app/robots.ts
status: todo
agent: content-seo
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Сгенерировать sitemap.xml и robots.txt средствами Next.js Metadata API, чтобы краулеры видели всю структуру каталога.

## Контекст
- Next.js 15 поддерживает `app/sitemap.ts` и `app/robots.ts` — экспортируют функции, возвращающие `MetadataRoute.Sitemap` / `MetadataRoute.Robots`.
- Данные брать из `lib/products.ts` (массивы `categories`, `products`).
- Базовый URL: `process.env.NEXT_PUBLIC_SITE_URL ?? "https://paper-fairies.ru"`.

## Acceptance criteria
- [ ] Создан `app/sitemap.ts`, в выдаче: `/`, `/catalog`, `/sale`, `/new`, `/cart`, `/contacts`, `/account`, все `/catalog/[category]` (для каждого slug из `categories`), все `/product/[id]` (для каждого id из `products`).
- [ ] Создан `app/robots.ts` с `allow: "/"` и ссылкой на `sitemap`.
- [ ] У всех URL установлен `lastModified: new Date()` (или константа сборки).
- [ ] У главной и категорий — `changeFrequency: "weekly"`, `priority: 0.8–1.0`. У продуктов — `"monthly"`, `0.6`.
- [ ] После `npm run build` файлы доступны по `/sitemap.xml` и `/robots.txt` (проверить через `npm run start` и curl).

## Не входит в задачу
- Контент-страницы (доставка, оплата, политики) — добавятся к sitemap отдельно в задаче 08 либо когда они появятся.
- Локализованные версии (`hreflang`).
- Image sitemap.

## Артефакты
_Заполняется по факту._

## Заметки исполнения
_Заполняется по факту._
