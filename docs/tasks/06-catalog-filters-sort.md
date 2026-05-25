---
id: 06
title: Каталог — фильтры и сортировка
status: todo
agent: commerce-logic → frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Дать пользователю возможность фильтровать каталог (категория, цена, новинки, sale, customizable) и сортировать (по цене ↑↓, новинки сначала, бестселлеры сначала) — без этого крупный каталог теряет конверсию.

## Контекст
- Каталог рендерится в `components/CatalogView.tsx` (используется на `app/catalog/page.tsx` и `app/catalog/[category]/page.tsx`).
- Данные — статические из `lib/products.ts`. Селекторы: `getProductsByCategory`, `getBestsellers`.
- Стор `lib/store.ts` пока только про корзину — фильтры держать в URL search params (Next 15 поддерживает `searchParams` в страницах + `useSearchParams` в client-компонентах). Это переживает обновление страницы и делится ссылкой.
- Типы — в `types/index.ts`.

## Acceptance criteria
**Часть 1 — commerce-logic:**
- [ ] В `lib/products.ts` добавлена чистая функция `filterAndSortProducts(products, { category?, minPrice?, maxPrice?, onlyNew?, onlySale?, onlyCustomizable?, sort? })` с покрытием всех полей.
- [ ] Тип `ProductFilters` и `ProductSort` экспортированы из `types/index.ts`.
- [ ] Хелперы парсинга/сериализации в URL searchParams (`parseFilters(searchParams)`, `filtersToParams(filters)`).
- [ ] Никакого UI — только чистые функции и типы.

**Часть 2 — frontend-builder (после commerce-logic):**
- [ ] В `CatalogView` добавлена панель фильтров (collapsible на mobile) и dropdown сортировки.
- [ ] Изменение фильтров обновляет URL через `router.replace` (без скролла наверх).
- [ ] Видимое количество найденных товаров ("Найдено: N").
- [ ] Пустое состояние с понятным текстом и кнопкой "Сбросить фильтры".
- [ ] Сортировка применяется визуально мгновенно.
- [ ] Стилизация в палитре проекта (rose/ivory/ink), focus-visible, мобильный адаптив.

## Не входит в задачу
- Полнотекстовый поиск (отдельная задача).
- Бесконечная прокрутка / пагинация (текущий каталог небольшой).
- Сохранение последних фильтров в localStorage.

## Артефакты
_Заполняется по факту._

## Заметки исполнения
_Заполняется по факту._
