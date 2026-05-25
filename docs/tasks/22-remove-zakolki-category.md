---
id: 22
title: Удалить категорию «Заколки» из проекта
status: done
agent: commerce-logic + content-seo + frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Полностью удалить категорию `zakolki` из каталога: убрать из данных, типов, метаданных и компонентов. После выполнения в проекте остаётся 5 категорий (krabiki, rascheski, kosmetichki, grebeshki, sumki).

## Файлы, которые надо тронуть

### 1. `lib/products.ts` (commerce-logic)
- Удалить объект `categories[3]` (slug `"zakolki"`, title «Заколки»).
- Удалить 2 продукта с `category: "zakolki"`:
  - `id: "zakol-pearl"` («Pearl Crescent»)
  - `id: "zakol-set"` («Crystal Drops»)
- Убедиться, что нумерация продуктов после удаления валидна.

### 2. `types/index.ts` (commerce-logic)
- Из union-типа `CategorySlug` убрать `"zakolki"`.

### 3. `app/layout.tsx` (content-seo)
- Строка 37: из массива keywords убрать `"заколки"`.

### 4. `app/catalog/page.tsx` (content-seo)
- Строка 7: в описании метаданных убрать «заколки, » (например, было «крабики, расчёски, заколки, гребешки с гравировкой» — стало «крабики, расчёски, гребешки с гравировкой»).

### 5. `app/new/page.tsx` (content-seo)
- Строка 8: в описании убрать «заколки, » (например, было «крабики, заколки, гребешки и сумки» — стало «крабики, гребешки и сумки»).

### 6. `components/About.tsx` (frontend-builder)
**Это критично — после удаления 2 продуктов индексы массива сдвинутся:**
- Был `products[7]` = zakol-pearl → станет greb-bamboo
- Был `products[8]` = zakol-set → станет sumka-pouch
- Был `products[9]` = greb-bamboo → выйдет за границы или станет следующим товаром

Чтобы slideshow не сломался — **переписать ссылки на продукты через `getProductById` или `.find(...)` по id**, а не по индексу. Также удалить из slideshow и smallPhotos любые ссылки на удалённые id (`zakol-pearl`, `zakol-set`) — заменить их на продукты из других категорий (например, krab-pearl, kosmet-quilt, sumka-pouch и т.п.).

Текущие ссылки в About.tsx:
- slideshow: содержит products[8] (zakol-set) → заменить на любой не-удалённый продукт (например, krab-rose / kosmet-quilt).
- smallPhotos: содержит products[7] (zakol-pearl) → заменить на любой не-удалённый продукт.
- products[3], products[2], products[9] — нужно перевести на стабильные id (raschesk-buk, krab-mini, greb-bamboo соответственно).

После перевода on id — комментарии «zakol-set», «zakol-pearl» в коде убрать.

### 7. `public/categories/` (оркестратор)
- Файла `zakolki.jpg` тут НЕТ (не был добавлен). Ничего удалять не надо.

### 8. `app/catalog/zakolki/`
- Отдельной папки нет (всё через `[category]` динамический роут). Ничего не удаляем — динамический роут просто перестанет возвращать совпадение по `getCategoryBySlug("zakolki")` и вернёт 404.

## Acceptance criteria
- [x] В `lib/products.ts` массив `categories` содержит 5 элементов (без zakolki).
- [x] В `lib/products.ts` массив `products` не содержит товаров с `category: "zakolki"`.
- [x] В `types/index.ts` `CategorySlug` не содержит `"zakolki"`.
- [x] В `app/layout.tsx`, `app/catalog/page.tsx`, `app/new/page.tsx` — нет упоминаний «заколки» (грэп пустой).
- [x] В `components/About.tsx`:
  - Нет упоминаний `zakol-pearl`, `zakol-set`, `zakolki`.
  - Все ссылки на products переведены на устойчивый поиск по id через `getProductById` или `.find(p => p.id === "...")`.
  - Slideshow и smallPhotos продолжают работать с валидными продуктами.
- [x] `npx tsc --noEmit` (запустит оркестратор) проходит без ошибок.

## Не входит в задачу
- Удалять `public/categories/zakolki.jpg` (его нет).
- Менять `app/catalog/[category]/page.tsx` или другие компоненты.
- Менять иные тексты, не упомянутые выше.

## Порядок выполнения
1. **Параллельно**: commerce-logic (файлы 1-2) + content-seo (файлы 3-5).
2. **После завершения 1**: frontend-builder (файл 6) — нужны стабильные id из обновлённого `lib/products.ts`.

## Артефакты
- `lib/products.ts` — удалена категория `categories[3]` (slug `zakolki`, объект). Удалены 2 продукта: `zakol-pearl` и `zakol-set`. После: 5 категорий (krabiki, rascheski, kosmetichki, grebeshki, sumki) и 9 продуктов.
- `types/index.ts` — из union `CategorySlug` удалено `"zakolki"`. Осталось 5 значений.
- `app/layout.tsx` — из массива keywords (строка 37) удалено `"заколки"`.
- `app/catalog/page.tsx` — из описания metadata (строка 7) удалено «заколки, » (теперь «крабики, расчёски, гребешки с гравировкой, косметички и сумки»).
- `app/new/page.tsx` — из описания (строка 8) удалено «заколки, » (теперь «крабики, гребешки и сумки»).
- `components/About.tsx` — все ссылки на продукты через индексы (products[2/3/7/8/9]) переведены на `getProductById("id")`. Заменены продукты на slideshow и smallPhotos: slideshow: krabiki (categories[0]), sumki (categories[4]), raschesk-buk, kosmetichki (categories[2]). smallPhotos: kosmet-quilt, raschesk-buk, krab-mini, greb-bamboo. Удалены устаревшие комментарии про zakol-set/zakolki.

## Заметки исполнения
- Задача выполнена в 3 этапа: (1) commerce-logic + content-seo параллельно, (2) frontend-builder после.
- Попутный фикс в About.tsx: `categories[5]` (sumki) ссылался на несуществующий индекс после удаления — исправлен на `categories[4]`. Это был баг, существовавший до удаления zakolki — отдельная неточность, которая не проявлялась пока массив был длиннее.
- `getProductById` помог отвязаться от хрупких индексов — теперь добавление/удаление продуктов не сломает About.
- `npx tsc --noEmit` запущен оркестратором — без ошибок.
- `grep "zakolki\|zakol-\|заколк"` по всему проекту (app/components/lib/types) — пустой результат.
- `npm run build` не запускался.
