---
id: 32
title: ProductCard — вернуть отображение фото товара (откат части задачи 30), сохранить чёткие углы
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Вернуть отображение фото товара на карточке — частичный откат задачи 30. **Чёткие углы карточки (без `rounded-3xl`) — оставить**, это была отдельная просьба пользователя и она в силе.

Итог:
- Зона «фото» в `ProductCard` снова показывает `product.images[0]` через `next/image` (плюс `images[1]` как hover-вариант, если есть).
- SVG-цветок из задачи 30 удаляется (он был заместителем фото).
- `.product-card` остаётся без `rounded-3xl` (углы чёткие).
- Hover-эффект на изображение (zoom + crossfade на второе фото, если есть) — восстановлен.

## Контекст
Файлы:
- `components/ProductCard.tsx` — основная правка. Сейчас: `bg-rose-100 flex items-center justify-center` + inline SVG-цветок. Возвращаем `<Image>` × 1-2 + градиент.
- `app/globals.css` строка 70-72 — класс `.product-card` УЖЕ без `rounded-3xl` (после задачи 30). **Не возвращать** скругление.
- `next.config.ts` — `images.unsplash.com` и `plus.unsplash.com` уже в `remotePatterns`. Локальные пути `/products/...` и `/categories/...` работают без конфига. Дополнительных доменов не нужно.
- `lib/products.ts` — у каждого товара есть `images: string[]`, минимум 1 элемент. Не трогаем.

## Что сделать

### `components/ProductCard.tsx`

1. **Вернуть импорт `Image`**:
   ```tsx
   import Image from "next/image";
   ```
   Импорт должен стоять рядом с `Link` (был там до задачи 30).

2. **Заменить SVG-блок на оригинальный image-блок**. Сейчас (после задачи 30) в карточке:
   ```tsx
   <Link href={`/product/${product.id}`} className="relative block overflow-hidden">
     <div className="relative aspect-[4/5] w-full bg-rose-100 flex items-center justify-center">
       {/* Декоративный цветок — 8 лепестков + центр, inline SVG */}
       <svg aria-hidden="true" viewBox="0 0 100 100" ...>
         <g> ... 8 ellipses ... </g>
         <circle cx="50" cy="50" r="8" className="text-gold-400/70" fill="currentColor" />
       </svg>
     </div>
     ...badges + heart...
   </Link>
   ```

   Заменить на:
   ```tsx
   <Link href={`/product/${product.id}`} className="relative block overflow-hidden">
     <div className="relative aspect-[4/5] w-full bg-rose-50">
       <Image
         src={product.images[0]}
         alt={product.name}
         fill
         sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
         className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
       />
       {product.images[1] && (
         <Image
           src={product.images[1]}
           alt=""
           fill
           sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
           className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
         />
       )}
       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
     </div>
     ...badges + heart...
   </Link>
   ```

   Это **полная копия** того блока, что был до задачи 30 (см. её раздел Контекст). Цвет фона блока — `bg-rose-50` (как было до задачи 30, мягкий розовый под фото).

3. **Бейджи (Новинка / −% / Гравировка), Heart-кнопка, нижняя зона с названием/ценой/кнопкой, framer-motion, логика handleAdd, состояния liked/adding, `"use client"`** — НЕ ТРОГАТЬ.

### НЕ ТРОГАТЬ
- `app/globals.css` — класс `.product-card` уже без `rounded-3xl`. Скругление **не возвращать** (углы остаются чёткие — отдельная задача 30, которая в силе).
- `lib/products.ts`, типы, `next.config.ts`, `CartDrawer.tsx`, `ProductGrid.tsx`, страницу `/product/[id]`.
- Tailwind, шрифты.

## Acceptance criteria
- [x] `import Image from "next/image";` снова присутствует в `components/ProductCard.tsx`.
- [x] Inline SVG-цветок (вся секция `<svg>...</svg>` с 8 эллипсами и центральным кругом) удалён из ProductCard.
- [x] Внутри `<div className="relative aspect-[4/5] w-full bg-rose-50">` отрисовываются:
  - основной `<Image src={product.images[0]} ... className="object-cover ... group-hover:scale-[1.06]" />`,
  - условный hover-`<Image src={product.images[1]} ...>` с `opacity-0 group-hover:opacity-100`,
  - градиент `bg-gradient-to-t from-black/10 via-transparent to-transparent`.
- [x] Фон зоны «фото» — `bg-rose-50` (НЕ `bg-rose-100`).
- [x] Класс зоны «фото» НЕ содержит `flex items-center justify-center` (он был для центрирования цветка — больше не нужен).
- [x] В `app/globals.css` класс `.product-card` по-прежнему БЕЗ `rounded-3xl` (и без любого другого `rounded-*` на самой карточке). Это требование задачи 30 остаётся в силе.
- [x] Бейджи, Heart, нижняя зона `p-5` (название, цвета, цена, кнопка), `handleAdd`, framer-motion — не тронуты.
- [x] Компонент остаётся Client Component (`"use client"`).
- [x] `npx tsc --noEmit` — без ошибок. **НЕ запускать** `npm run build`.

## Запреты
- ❌ Не возвращать `rounded-3xl` (или другие `rounded-*`) на `.product-card` или зону «фото».
- ❌ Не менять `next.config.ts` (unsplash уже whitelisted, локальные пути работают и так).
- ❌ Не трогать `lib/products.ts`, типы, остальные компоненты.
- ❌ Не менять логику корзины/handleAdd, состояния, framer-motion.

## Не входит в задачу
- Сжимать/конвертировать существующие изображения.
- Менять Tailwind / шрифты.
- Менять Hero / Categories / Bestsellers (sliсe и т.п.) / Sale / About / New.
- Создавать новые товары.

## Артефакты
- `components/ProductCard.tsx` — вернул импорт `Image`, удалил inline SVG-цветок, восстановил image-блок с основным фото, условным hover-вариантом, градиент-overlay.

## Заметки исполнения
Частичный откат задачи 30: фото товаров восстановлены на карточках,但чёткие углы (без `rounded-3xl`) из задачи 30 сохранены. Итоговый вид — minimal editorial с фото и чёткой геометрией. Новые товары (raschesk-aurora, shkatulka-petite-maison из задачи 31) теперь корректно показывают локальные фото из `/products/...`. TypeScript-проверка пройдена без ошибок.
