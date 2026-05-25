---
id: 36
title: Удалить из каталога товары raschesk-poket (Карманная расчёска) и kosmet-mini (Косметичка «Petite»)
status: done
agent: commerce-logic
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Полностью убрать из каталога 2 товара (по запросу пользователя «удали ... полностью»):
- `raschesk-poket` — «Карманная расчёска "Pocket"» (цена 890, oldPrice 1190).
- `kosmet-mini` — «Косметичка "Petite"» (цена 1690, oldPrice 1990, `isNew: true`).

После удаления они исчезнут со страницы `/sale`, в SaleSection на главной, в категориях `rascheski` и `kosmetichki` и со страницы `/product/[id]`.

## Контекст
Файл: `lib/products.ts`.

После удаления:
- В массиве `products` останется **9 товаров** (было 11): raschesk-aurora, shkatulka-petite-maison, krab-pearl, krab-rose, krab-mini, raschesk-buk, kosmet-quilt, greb-bamboo, sumka-pouch.
- Товары со скидкой (`oldPrice`): останутся `krab-pearl` (1290 ← 1590) и `raschesk-buk` (1890 ← 2520). SaleSection использует `products.filter((p) => p.oldPrice).slice(0, 2)` — будет показывать ровно их.
- Категория `kosmetichki` после удаления `kosmet-mini` содержит товары: `shkatulka-petite-maison`, `kosmet-quilt` (2 шт.). Категория `rascheski` после удаления `raschesk-poket`: `raschesk-aurora`, `raschesk-buk` (2 шт.). Это нормально, просто меньше карточек в каталоге.

## Что сделать

### `lib/products.ts`
1. Полностью удалить запись `{ id: "raschesk-poket", ... }` из массива `products` (всю figure-скобку и трейлинг-запятую).
2. Полностью удалить запись `{ id: "kosmet-mini", ... }` из массива `products`.
3. Категории, прочие товары, функции (`getProductsByCategory`, `getProductById`, `getBestsellers`, `getCategoryBySlug`) — не трогать.

## Acceptance criteria
- [x] В `lib/products.ts` нет записи с `id: "raschesk-poket"`.
- [x] Нет записи с `id: "kosmet-mini"`.
- [x] Массив `products` валиден (все запятые/скобки корректны).
- [x] Остальные 9 товаров (raschesk-aurora, shkatulka-petite-maison, krab-pearl, krab-rose, krab-mini, raschesk-buk, kosmet-quilt, greb-bamboo, sumka-pouch) — не тронуты.
- [x] Массив `categories` и функции — не тронуты.
- [x] `types/index.ts`, компоненты, страницы — не тронуты.
- [x] `npx tsc --noEmit` проходит (запустит оркестратор).

## Запреты
- ❌ Не менять `types/index.ts`, `ProductCard.tsx`, `SaleSection.tsx`, `Bestsellers.tsx`, страницы каталога, `/product/[id]`.
- ❌ Не удалять и не редактировать остальные 9 товаров.
- ❌ Не менять `slice(0, N)` в Bestsellers/SaleSection.
- ❌ Не удалять файлы изображений в `public/` (вне скоупа, не мешает).

## Не входит в задачу
- Менять Hero / Categories / About / New / Footer.
- Менять SaleSection компонент (он сам подхватит — после удаления только 2 товара со скидкой останется, как раз slice(0,2)).
- Чистить изображения этих товаров в `public/` (внешние Unsplash URL — ничего не лежит локально).

## Артефакты
- `lib/products.ts` — удалены записи товаров с id `raschesk-poket` и `kosmet-mini`. Массив сокращён с 11 до 9 позиций. Все остальные товары и категории нетронуты. Синтаксис валиден (tsc --noEmit exit 0).

## Заметки исполнения
Задача выполнена commerce-logic агентом. Удаление товаров из массива `products` прошло чисто, без побочных эффектов. SaleSection теперь показывает ровно 2 товара со скидкой (krab-pearl, raschesk-buk), что соответствует slice(0,2). Категории rascheski и kosmetichki содержат по 2 товара каждая — это корректно по скоупу. Прямые URL удалённых товаров (/product/raschesk-poket, /product/kosmet-mini) теперь 404 — by design. Нет заблокированных пунктов, follow-up не требуются.
