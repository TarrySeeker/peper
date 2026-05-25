---
id: 41
title: Убрать изображения у товаров greb-bamboo и kosmet-quilt + fallback на пустой розовый блок во всех местах
status: done
agent: commerce-logic + frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
1. У товаров `greb-bamboo` (Гребешок «Bamboo Soul») и `kosmet-quilt` (Косметичка «Quilt Rose») установить `images: []` — пустой массив.
2. Во всех компонентах, где рендерится `<Image src={product.images[0]}>` или `item.image`, добавить guard: если изображения нет, показать **пустой розовый блок** (`bg-rose-50` или `bg-rose-100`) без `<Image>`. Без SVG-цветка (тот стиль уже отменён задачей 32) — чистый цветной блок.

## Контекст
Файлы, где есть `<Image src=...>` или прокидывание image в cart:
- `components/ProductCard.tsx` строка 55: `<Image src={product.images[0]}>` + строка 37 `image: product.images[0]` в handleAdd.
- `components/SearchOverlay.tsx` строка 109: `<Image src={p.images[0]}>` (миниатюра 64×64 в результатах).
- `components/FavoritesDrawer.tsx` строка 96: `<Image src={p.images[0]}>` (миниатюра 80×80).
- `components/CartDrawer.tsx` строка 90: `<Image src={item.image}>` — item.image берётся из product.images[0] при добавлении.
- `components/CartView.tsx` строка 100: `<Image src={item.image}>`.
- `app/product/[id]/page.tsx` строка 76: `<Image src={product.images[0]}>` (главное фото товара).
- `components/PersonalizationForm.tsx` строка 44 + `components/SimpleAddToCart.tsx` строка 27: оба пишут `image: product.images[0]` в cart — нужно поставить fallback `?? ""`.

Тип `CartItem.image: string` (`types/index.ts`) — обязателен. Используем `product.images[0] ?? ""` чтобы не нарушать тип, а в рендере CartDrawer/CartView проверяем `if (item.image)`.

## Что сделать

### Этап 1 (commerce-logic) — `lib/products.ts`
- Запись `greb-bamboo`: заменить поле `images: ["https://images.unsplash.com/photo-1556228720-..."]` (или что там сейчас) на `images: [],`.
- Запись `kosmet-quilt`: то же — `images: [],`.
- Прочие поля обеих записей и остальные товары **не трогать**.

### Этап 2 (frontend-builder) — Guards во всех компонентах

#### `components/ProductCard.tsx`
- В handleAdd (строка ~37): `image: product.images[0]` → `image: product.images[0] ?? "",`.
- В JSX зоны «фото» (строки 51-69 текущей версии): обернуть рендер `<Image>` × 1-2 + градиент условием `product.images[0]`:
  ```tsx
  <div className="relative aspect-[4/5] w-full bg-rose-50">
    {product.images[0] && (
      <>
        <Image src={product.images[0]} ... />
        {product.images[1] && <Image src={product.images[1]} ... />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </>
    )}
  </div>
  ```
  Если `images[0]` нет — внутри блока ничего, остаётся только `bg-rose-50`.

#### `components/SearchOverlay.tsx`
- В элементе результата (строка ~109): обернуть `<Image>` условием. Если нет фото — оставить просто блок `bg-rose-50` нужного размера (64×64 или какой там).

#### `components/FavoritesDrawer.tsx`
- Аналогично — guard `<Image src={p.images[0]}>` условием. Если нет — пустой блок.

#### `components/CartDrawer.tsx` и `components/CartView.tsx`
- Обернуть `<Image src={item.image}>` проверкой `item.image && `. Без — пустой `bg-rose-50` блок.

#### `app/product/[id]/page.tsx`
- Главное фото товара (строка ~76): guard `<Image>` условием `product.images[0]`. Без — пустой `bg-rose-50` блок того же aspect-ratio.

#### `components/PersonalizationForm.tsx` и `components/SimpleAddToCart.tsx`
- Заменить `image: product.images[0]` на `image: product.images[0] ?? ""`.

## Acceptance criteria
- [x] В `lib/products.ts` у `greb-bamboo` поле `images: []` (пустой массив).
- [x] В `lib/products.ts` у `kosmet-quilt` поле `images: []` (пустой массив).
- [x] Прочие поля обеих записей (name, category, price, oldPrice, description, details, isBestseller, isNew, customizable, colors) — не тронуты.
- [x] Остальные 7 товаров — не тронуты.
- [x] `components/ProductCard.tsx` — `<Image>` рендер обёрнут проверкой; handleAdd использует `?? ""`.
- [x] `components/SearchOverlay.tsx` — `<Image>` обёрнут проверкой; fallback — `bg-rose-50` блок.
- [x] `components/FavoritesDrawer.tsx` — `<Image>` обёрнут проверкой; fallback — `bg-rose-50` блок.
- [x] `components/CartDrawer.tsx` — `<Image src={item.image}>` обёрнут проверкой `item.image`.
- [x] `components/CartView.tsx` — то же.
- [x] `app/product/[id]/page.tsx` — `<Image>` обёрнут проверкой; fallback — пустой `bg-rose-50` блок того же aspect-ratio.
- [x] `components/PersonalizationForm.tsx` и `components/SimpleAddToCart.tsx` — `image: product.images[0] ?? ""`.
- [x] `types/index.ts` — не тронут.
- [x] `npx tsc --noEmit` без ошибок.
- [x] Тип `CartItem.image: string` соблюдается (нет undefined).

## Запреты
- ❌ Не возвращать SVG-цветок из задачи 30 (уже отменён задачей 32).
- ❌ Не менять `types/index.ts` (image остаётся required string).
- ❌ Не добавлять placeholder-картинку (типа `/no-image.jpg`) — задача убрать фото, а не заменить на плейсхолдер-фото.
- ❌ Не менять структуру/layout карточек, drawer'ов, страницы товара.
- ❌ Не трогать остальные товары в каталоге.

## Не входит в задачу
- Менять Hero / Categories / About / Sale / Header / Footer / Marquee.
- Удалять unused product.images поля.
- Оптимизировать рендер других компонентов.

## Артефакты
- `lib/products.ts` — у `greb-bamboo` и `kosmet-quilt` установлены `images: []` вместо URL-массивов.
- `components/ProductCard.tsx` — `<Image>` + градиент обёрнуты в `{product.images[0] && (...)}`, handleAdd использует `?? ""`.
- `components/SearchOverlay.tsx` — миниатюра `<Image>` (64×64) обёрнута в `{p.images[0] && (...)}` с fallback `bg-rose-50`.
- `components/FavoritesDrawer.tsx` — миниатюра `<Image>` (80×80) обёрнута в `{p.images[0] && (...)}` с fallback `bg-rose-100`.
- `components/CartDrawer.tsx` — `<Image src={item.image}>` обёрнут в `{item.image && (...)}` с fallback `bg-rose-100`.
- `components/CartView.tsx` — то же что CartDrawer.
- `app/product/[id]/page.tsx` — главная `<Image>` обёрнута в `{product.images[0] && (...)}`, родительский `bg-rose-100` div остаётся как fallback.
- `components/PersonalizationForm.tsx` — `image: product.images[0] ?? ""` в add-to-cart payload.
- `components/SimpleAddToCart.tsx` — то же.

## Заметки исполнения
- Оба этапа завершены: commerce-logic заменил URLs на пустые массивы, frontend-builder добавил все 8 guards в места рендера фото.
- Pattern: пустой розовый блок (`bg-rose-50` или `bg-rose-100`) с сохранённым aspect-ratio даёт чистый минималистичный вид без placeholder-картинок.
- Type-safety соблюдена: `CartItem.image: string` остаётся required, используется fallback `?? ""` при записи в корзину.
- Проверка `npx tsc --noEmit` вернула exit 0, без ошибок типов.
- Dev-server отдаёт HTTP 200 на главную, страницы товаров `greb-bamboo` и `kosmet-quilt`, картина работает без фото: показаны только пустые розовые прямоугольники в нужных размерах.
- Товары доступны в поиске, избранном, корзине — везде показывают fallback блоки вместо фото.
