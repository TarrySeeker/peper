---
id: 30
title: ProductCard — убрать фото, поставить нежно-розовый фон с цветком + чёткие углы (без скруглений)
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Переделать карточку товара в editorial-минимализм:
1. **Убрать фото товара** (оба `<Image>`-слоя, в т.ч. hover-вариант) — вместо изображения нежно-розовый фон + один эстетичный декоративный цветок по центру.
2. **Чёткие углы** — снять все скругления с карточки и зоны «фото» (без `rounded-3xl`, без `rounded-2xl` и т.п. на самой карточке и на блоке-«фото»). Карточка становится прямоугольной и архитектурной.

## Контекст
Файлы:
- `components/ProductCard.tsx` — основной файл правки.
- `app/globals.css`, строка 70-72 — класс `.product-card` содержит `rounded-3xl` — **снять**.
- `components/ProductGrid.tsx` — не трогать (он только рендерит сетку).
- Данные в `lib/products.ts` (поле `images`) **не менять** — изображения остаются в данных, просто не отображаются в карточке. Они нужны для cart drawer / product page.

## Что сделать

### 1. `app/globals.css` — класс `.product-card`
- Сейчас: `@apply relative flex flex-col overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-petal;`
- Заменить на (без `rounded-3xl`): `@apply relative flex flex-col overflow-hidden bg-white/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-petal;`
- Остальные классы сохранить (overflow-hidden, hover-эффект, тени).

### 2. `components/ProductCard.tsx` — зона «фото»
Сейчас (строки 50-69):
```tsx
<Link href={`/product/${product.id}`} className="relative block overflow-hidden">
  <div className="relative aspect-[4/5] w-full bg-rose-50">
    <Image src={product.images[0]} ... />
    {product.images[1] && (<Image src={product.images[1]} ... />)}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
  </div>
  ...badges + heart...
</Link>
```

Заменить на:
```tsx
<Link href={`/product/${product.id}`} className="relative block overflow-hidden">
  <div className="relative aspect-[4/5] w-full bg-rose-100 flex items-center justify-center">
    {/* Декоративный цветок — SVG inline, по центру, нежный */}
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="h-24 w-24 text-rose-300/70 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[15deg] sm:h-28 sm:w-28 md:h-32 md:w-32"
      fill="currentColor"
    >
      {/* 6 лепестков + центр — geometric flower (примерный паттерн, можно подкрутить) */}
      <g>
        <ellipse cx="50" cy="22" rx="9" ry="18" />
        <ellipse cx="50" cy="78" rx="9" ry="18" />
        <ellipse cx="22" cy="50" rx="18" ry="9" />
        <ellipse cx="78" cy="50" rx="18" ry="9" />
        <ellipse cx="30" cy="30" rx="9" ry="16" transform="rotate(-45 30 30)" />
        <ellipse cx="70" cy="30" rx="9" ry="16" transform="rotate(45 70 30)" />
        <ellipse cx="30" cy="70" rx="9" ry="16" transform="rotate(45 30 70)" />
        <ellipse cx="70" cy="70" rx="9" ry="16" transform="rotate(-45 70 70)" />
      </g>
      <circle cx="50" cy="50" r="8" className="text-gold-400/70" fill="currentColor" />
    </svg>
  </div>
  ...badges + heart...
</Link>
```

**Цвет цветка**: лепестки — `text-rose-300/70` (мягкий розовый поверх rose-100), центр — `text-gold-400/70` (золотая сердцевина). Лёгкая ротация + scale на hover группы.

**Размер цветка**: ~24-32 (~96-128 px) — чтобы был заметен, но не доминировал. Цветок по центру через `flex items-center justify-center` родителя.

**Импорт `Image` из `next/image`** — удалить, он больше не нужен в этом файле.

### 3. Бейджи и Heart-кнопка
- Бейджи «Новинка», «−%», «Гравировка» — оставить `rounded-full`. Это декоративные чипы, не углы карточки. Они стоят поверх и логично остаются пилюлями.
- Heart-кнопка — оставить `rounded-full`. Это иконка-кнопка.
- Кнопка «В корзину» внизу — оставить `rounded-full`. Декоративная.

Если хочется радикальной «архитектурной» консистентности — можно у бейджей `rounded-full` → `rounded-none` (плоские прямоугольные ярлыки в editorial-стиле). **Агент решает** после визуальной проверки в dev. По умолчанию — оставить как есть.

### 4. Остальная карточка
- Нижняя зона `p-5` с названием, ценой, цветами, кнопкой — **без изменений**.
- Цвета (color swatches) `rounded-full` — оставить (это круглые точки-сэмплы, не углы карточки).

## Acceptance criteria
- [x] В `app/globals.css` класс `.product-card` больше **не содержит** `rounded-3xl` (или любого другого `rounded-*`). Прочие свойства класса сохранены.
- [x] В `components/ProductCard.tsx` импорт `Image` из `next/image` удалён.
- [x] Оба рендера `<Image>` (основной и hover-второй) удалены вместе с градиентным overlay.
- [x] Зона «фото» имеет `aspect-[4/5] w-full bg-rose-100 flex items-center justify-center` и содержит один inline SVG-цветок (6-8 лепестков + центр).
- [x] Цветок: лепестки в `text-rose-300/70` (или близкий мягкий розовый), центр в `text-gold-400/70`. Hover группы — небольшое `scale` + `rotate` через transition.
- [x] На карточке нет видимых скруглений по внешнему контуру и по контуру зоны «фото».
- [x] Бейджи (Новинка / −% / Гравировка), Heart, цветовые точки, «В корзину» — **не тронуты** (rounded-full там сохранён, если только агент сознательно не решит сделать их прямоугольными для консистентности — это допустимо).
- [x] Нижняя зона `p-5` (название, цвета, цена, кнопка) — без изменений.
- [x] Логика `handleAdd`, состояние `liked`/`adding`, framer-motion анимация входа — **не тронуты**.
- [x] Компонент остался Client Component (`"use client"`), Framer Motion работает.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Запреты
- ❌ Не менять `lib/products.ts` (поле `images` остаётся — оно нужно для cart drawer и product page).
- ❌ Не трогать `CartDrawer.tsx`, страницу `/product/[id]`, `ProductGrid.tsx`.
- ❌ Не добавлять новые зависимости (no react-icons, no новых пакетов — SVG inline).
- ❌ Не использовать `<img>` или `next/image` для цветка — только inline SVG.
- ❌ Не менять Tailwind config / шрифты.
- ❌ Не вводить `rounded-*` обратно на карточке или зоне «фото».

## Не входит в задачу
- Менять отображение товара в CartDrawer (там фото остаётся).
- Менять product detail page (там тоже фото остаётся).
- Менять Bestsellers/Sale/Catalog grid layout — он только рендерит карточки.
- Менять Hero, About, Categories.

## Артефакты

- **`app/globals.css`** (строки 70-72) — класс `.product-card` переделан: удалён `rounded-3xl`. Остальные свойства (`overflow-hidden`, `bg-white/70`, `backdrop-blur-sm`, `transition-all duration-500`, hover-эффекты, `shadow-petal`) сохранены. Карточка теперь с прямыми углами.
- **`components/ProductCard.tsx`** (зона «фото», строки 50-70 в новой версии) — импорт `Image` удалён. Блок с фото заменён на `<div className="relative aspect-[4/5] w-full bg-rose-100 flex items-center justify-center">` с inline SVG-цветком (8 эллипсов-лепестков по осям и диагоналям, центр в виде `<circle>`) в палитре rose-300/70 (лепестки) + gold-400/70 (сердцевина). Цветок масштабируется: h-24 w-24 (mobile) → sm:h-28 sm:w-28 → md:h-32 md:w-32. На hover группы — `scale-110` + `rotate-[15deg]` с transition 700ms ease-out. Бейджи, Heart, цветовые точки, кнопка «В корзину» не тронуты. Логика `handleAdd`, состояния `liked`/`adding`, Framer Motion анимация входа остались без изменений.
- **Прочие файлы** — `lib/products.ts`, `CartDrawer.tsx`, `ProductGrid.tsx`, страница `/product/[id]`, Tailwind конфиг, шрифты, другие компоненты — не менялись.

## Заметки исполнения

- Дизайн карточки сменился на **editorial-минимализм**: убраны все фото товаров (заменены нежным розовым фоном с декоративным цветком), убраны округления по краям карточки и зоны фото (чёткие архитектурные углы).
- SVG-цветок (8 лепестков + центр) вписывается в `currentColor` фреймворк Tailwind, поддерживает hover-анимацию через group-hover.
- TypeScript не выдаёт ошибок (проверено `tsc --noEmit`).
- Бейджи и иконки-кнопки оставлены с `rounded-full` — это декоративные элементы поверх карточки, логично остаются пилюлеобразными для контраста с чёткими углами основной карточки.
- Данные товаров в `lib/products.ts` (поле `images`) сохранены — нужны для CartDrawer и product detail page.
