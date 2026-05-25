---
id: 24
title: Бестселлеры и Акции — оставить по 2 карточки в каждом блоке
status: done
agent: frontend-builder
priority: P2
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Уменьшить количество отображаемых карточек товаров в блоках «Бестселлеры» и «Акции» на главной — оставить по 2 в каждом (сейчас по 3).

## Контекст
- Файлы:
  - `components/Bestsellers.tsx` — сейчас рендерит все продукты с `isBestseller: true` (3 шт.) без slice.
  - `components/SaleSection.tsx` — сейчас рендерит `products.filter((p) => p.oldPrice).slice(0, 4)` (3 шт., так как только 3 продукта имеют oldPrice).
- Подход: добавить/изменить `.slice(0, 2)` в каждом блоке. Не трогаем `lib/products.ts` — флаги isBestseller и поля oldPrice остаются у тех же продуктов. Это значит, что на страницах `/sale` и `/new` и `/catalog` продукты продолжат отображаться.

## Что сделать
1. **`components/Bestsellers.tsx`** строка 10: `const items = getBestsellers();` → `const items = getBestsellers().slice(0, 2);`.
2. **`components/SaleSection.tsx`** строка 10: `const items = products.filter((p) => p.oldPrice).slice(0, 4);` → `const items = products.filter((p) => p.oldPrice).slice(0, 2);`.

После slice блоки покажут первые 2 продукта в порядке их появления в массиве `products` (Bestsellers: krab-pearl + raschesk-buk; Sale: первые 2 с oldPrice).

## Acceptance criteria
- [x] `components/Bestsellers.tsx` — `getBestsellers().slice(0, 2)`.
- [x] `components/SaleSection.tsx` — `slice(0, 2)` вместо `slice(0, 4)`.
- [x] Никаких других изменений в этих файлах (заголовки, сетка, описание — остаются).
- [x] `lib/products.ts` НЕ тронут.
- [x] Сетка `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` остаётся — на lg две карточки растянутся на половину ширины. Это ок.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Не входит в задачу
- Менять флаги в `lib/products.ts`.
- Менять страницы `/sale`, `/new`, `/catalog`.
- Менять компонент `ProductCard`.
- Менять заголовки секций или сетку колонок.

## Артефакты
- `components/Bestsellers.tsx` строка 10: добавлен `.slice(0, 2)` к `getBestsellers()`. На главной теперь 2 карточки бестселлеров вместо 3.
- `components/SaleSection.tsx` строка 10: `.slice(0, 4)` → `.slice(0, 2)`. На главной теперь 2 акционных карточки вместо 3.

## Заметки исполнения
Подход через slice выбран намеренно: данные продуктов в `lib/products.ts` не тронуты, флаги isBestseller и oldPrice сохранены. На страницах `/sale`, `/new`, `/catalog` все продукты продолжают отображаться. Сетка `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` оставлена — на lg две карточки растянутся на пол-ширины. `npx tsc --noEmit` прошёл без ошибок. `npm run build` не запускался (по условиям задачи).
