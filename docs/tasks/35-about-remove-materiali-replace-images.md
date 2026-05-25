---
id: 35
title: About — убрать «Materiali» из eyebrow, заменить 5 изображений (большое + 4 маленьких)
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
1. В акцентном баннере над «Итальянские ткани» убрать **слово «Materiali»** и разделитель ` · `. Оставить только «Atelier».
2. Заменить все 5 изображений в moodboard секции About на локальные фото из `public/about/`:
   - Крупное (слайдшоу) → `/about/13.jpg`
   - Маленькие 4 шт. → `/about/11.jpg`, `/about/12.jpg`, `/about/14.png`, `/about/15.jpg`

## Контекст
Файл: `components/About.tsx`.

Файлы изображений уже скопированы оркестратором:
- `public/about/11.jpg` (~165 KB)
- `public/about/12.jpg` (~383 KB)
- `public/about/13.jpg` (~273 KB)
- `public/about/14.png` (~2.2 MB) — обрати внимание: расширение **png**, а не jpg
- `public/about/15.jpg` (~317 KB)

Текущая структура изображений в About (на момент задачи):

1. **`slideshowImages`** (строки 9-26) — массив из **4 объектов** (из categories[0], categories[4], product raschesk-buk, categories[2]).
2. **`smallPhotos`** (строки 29-46) — массив из **4 объектов** (товары kosmet-quilt, raschesk-buk, krab-mini, greb-bamboo).
3. **Слайдшоу-рендер** (строки ~205-256) использует `slideshowImages[activeIndex]` с `AnimatePresence` и dot-индикаторами.
4. **Small photo 1-4** — каждая ссылается на `smallPhotos[0..3]`.

Eyebrow «Atelier · Materiali» сейчас в строке 188-190 — внутри акцентного баннера задачи 34.

## Что сделать

### 1. Eyebrow «Atelier · Materiali» → «Atelier»

Найти в `components/About.tsx`:
```tsx
<p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600">
  Atelier · Materiali
</p>
```

Заменить на:
```tsx
<p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600">
  Atelier
</p>
```

Только это изменение — обёртку, классы, motion-анимацию баннера не трогать.

### 2. Заменить `slideshowImages` массив

Сейчас 4 объекта (`categories[0]`, `categories[4]`, `getProductById("raschesk-buk")`, `categories[2]`). Заменить на ОДИН объект:

```ts
const slideshowImages: { src: string; alt: string }[] = [
  {
    src: "/about/13.jpg",
    alt: "PAPER.FAIRIES — атмосфера ателье",
  },
];
```

Импорт `categories` и `getProductById` можно оставить — `smallPhotos` его использует. Но проверь, что после правки массив `slideshowImages` валидный (одного элемента достаточно).

**Слайдшоу-логика**: интервал каждые 4500ms всё равно вызывает `setActiveIndex((prev) => (prev + 1) % slideshowImages.length)`. С length=1: `(0+1) % 1 = 0` — index остаётся 0, всё стабильно. **Dot-индикаторы**: при length=1 будет 1 dot. Это OK, но если хочешь — спрячь индикаторы условно через `{slideshowImages.length > 1 && (...dots block...)}`. **Это рекомендуется** для чистоты — один dot выглядит как недосмотр.

### 3. Заменить `smallPhotos` массив

Сейчас 4 объекта из products (kosmet-quilt, raschesk-buk, krab-mini, greb-bamboo). Заменить на:

```ts
const smallPhotos: { src: string; alt: string }[] = [
  { src: "/about/11.jpg", alt: "PAPER.FAIRIES — детали коллекции" },
  { src: "/about/12.jpg", alt: "PAPER.FAIRIES — материал и текстура" },
  { src: "/about/14.png", alt: "PAPER.FAIRIES — мастерская" },
  { src: "/about/15.jpg", alt: "PAPER.FAIRIES — финальный штрих" },
];
```

Импорт `getProductById` можно удалить, если он больше нигде в файле не используется (после удаления `slideshowImages.{2}` и всех `smallPhotos`).

### 4. Импорты
- `categories` — если больше нигде не используется в `slideshowImages`, можно убрать из импорта.
- `getProductById` — если больше нигде не используется, убрать.
- Не оставлять висящих неиспользуемых импортов (TypeScript строгий).

### 5. Что не трогать
- Header row, h2, интро-параграфы.
- Акцентный баннер (структура, цена 700 ₽/м, классы) — только eyebrow «Atelier · Materiali» → «Atelier».
- PullQuotes 1-4 — не менять.
- Структуру moodboard grid, классы layout, `useScroll`/`useTransform` параллакс, `useState/useEffect`, dot-индикаторы (CSS) — не трогать. Только данные массивов и (опционально) условное скрытие dots для length=1.
- `app/globals.css`, Tailwind, шрифты, типы, `lib/products.ts`.

## Acceptance criteria
- [x] В акцентном баннере eyebrow теперь только «Atelier» (без « · Materiali»). Классы и motion остались.
- [x] `slideshowImages` массив содержит ровно ОДИН объект с `src: "/about/13.jpg"`.
- [x] `smallPhotos` массив содержит ровно ЧЕТЫРЕ объекта в порядке: `/about/11.jpg`, `/about/12.jpg`, `/about/14.png`, `/about/15.jpg`.
- [x] Все локальные пути написаны точно: `/about/14.png` (НЕ `.jpg`), остальные `.jpg`.
- [x] У каждого объекта в обоих массивах заполнен осмысленный русский `alt`.
- [x] Импорты в начале файла — без неиспользуемых (если `categories` или `getProductById` больше не нужны — убрать).
- [x] Логика слайдшоу (`useEffect` с interval, `AnimatePresence`, dot-индикаторы) физически работает: с length=1 ничего не падает. Опционально — обернуть dot-блок в `{slideshowImages.length > 1 && (...)}` для чистоты.
- [x] Header row, h2, интро-параграфы, акцентный баннер (кроме eyebrow), PullQuotes, layout moodboard, параллакс, animations — не тронуты.
- [x] `app/globals.css`, Tailwind, шрифты, типы, `lib/products.ts` — не тронуты.
- [x] Компонент остаётся Client Component (`"use client"`).
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не менять данные в `lib/products.ts`.
- ❌ Не менять текст «Итальянские ткани · premium качество · от 700 ₽/м» и его типографику.
- ❌ Не трогать структуру/классы moodboard grid (lg:grid-cols-4, gap-3 и т.п.).
- ❌ Не трогать PullQuotes 1-4.
- ❌ Не оставлять `slideshowImages` с длиной 0 (массив должен содержать ровно 1 элемент).
- ❌ Не добавлять `next.config.ts` правки — пути локальные.

## Не входит в задачу
- Менять Hero/Categories/Bestsellers/Sale/New/Footer.
- Сжимать `14.png` (хотя файл крупный 2.2 MB — это вне скоупа).
- Делать `next/image` оптимизацию параметров (sizes/priority) — оставить как было.

## Артефакты
- `components/About.tsx` — eyebrow изменён на «Atelier», `slideshowImages` заменён на 1 объект `/about/13.jpg`, `smallPhotos` заменён на 4 объекта `/about/11-15`, импорты очищены.

## Заметки исполнения
- Eyebrow осталась в motion-обёртке (className + стили не менялись, только текст).
- Слайдшоу работает стабильно с одним элементом: `(0+1) % 1 = 0` → index не меняется.
- Dot-индикаторы обёрнуты в `{slideshowImages.length > 1 && (...)}` для полировки (1 точка не рендерится).
- Импорты `categories` и `getProductById` удалены полностью (не использовались).
- TypeScript: нет ошибок (exit 0).
