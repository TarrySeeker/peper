---
id: 33
title: Bestsellers — заменить фото 3-й и 4-й карточек на photo/9 и photo/10, добавить -25% на Beech Bloom
status: done
agent: commerce-logic
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Видимые карточки 3 и 4 в блоке Бестселлеры — это `krab-pearl` (Крабик «Pearl Whisper») и `raschesk-buk` (Расчёска «Beech Bloom»). Заменить у них фото на локальные и добавить скидку −25% на «Beech Bloom».

Текущий порядок видимых в Bestsellers (slice(0,4)):
1. raschesk-aurora — Расчёска «Aurora Blush»
2. shkatulka-petite-maison — Шкатулка «Petite Maison»
3. **krab-pearl** — Крабик «Pearl Whisper» ← заменить фото
4. **raschesk-buk** — Расчёска «Beech Bloom» ← заменить фото + добавить oldPrice

## Контекст
Файлы:
- `lib/products.ts` — массив `products`. Изменяются записи `krab-pearl` и `raschesk-buk`.
- Файлы изображений уже скопированы оркестратором:
  - `public/products/krab-pearl-whisper.jpg` (~419 KB, из `photo/9.jpg`)
  - `public/products/raschesk-beech-bloom.jpg` (~450 KB, из `photo/10.jpg`)
- Текущая цена `raschesk-buk`: 1890. Для бейджа −25% (формула: `Math.round((1 - product.price / product.oldPrice) * 100)`) подходит `oldPrice: 2520` (1 − 1890/2520 = 0.25 → 25%).
- `krab-pearl` сейчас имеет ДВА изображения с Unsplash (основное + hover). Оставляем ОДНО локальное (`images: ["/products/krab-pearl-whisper.jpg"]`) — массив одного элемента. Hover-crossfade на этой карточке просто не сработает (ProductCard рендерит второе фото только если `product.images[1]` существует).

## Что сделать

### `lib/products.ts`

1. У записи `krab-pearl` (Крабик «Pearl Whisper»):
   - Заменить поле `images` (сейчас массив из двух Unsplash URL) на: `images: ["/products/krab-pearl-whisper.jpg"],`
   - Остальные поля (id, name, category, price, oldPrice, description, details, isBestseller, colors) — **не трогать**.

2. У записи `raschesk-buk` (Расчёска «Beech Bloom»):
   - Заменить поле `images` (сейчас один Unsplash URL) на: `images: ["/products/raschesk-beech-bloom.jpg"],`
   - Добавить поле `oldPrice: 2520,` (для скидки −25% от 1890).
   - Остальные поля (id, name, category, price, description, details, isBestseller) — **не трогать**.

3. Все остальные товары в массиве `products` — **не трогать**.

## Acceptance criteria
- [x] `krab-pearl.images` = `["/products/krab-pearl-whisper.jpg"]` (массив из ОДНОЙ строки, локальный путь).
- [x] `krab-pearl` сохраняет: id, name, category=krabiki, price=1290, oldPrice=1590, description, details, isBestseller=true, colors (3 цвета). Ничего из этого не тронуто.
- [x] `raschesk-buk.images` = `["/products/raschesk-beech-bloom.jpg"]` (массив из ОДНОЙ строки, локальный путь).
- [x] `raschesk-buk` получает новое поле `oldPrice: 2520`.
- [x] `raschesk-buk` сохраняет: id, name="Расчёска «Beech Bloom»", category=rascheski, price=1890, description, details, isBestseller=true.
- [x] Остальные товары (raschesk-aurora, shkatulka-petite-maison, krab-rose, krab-mini, raschesk-poket, kosmet-quilt, kosmet-mini, greb-bamboo, sumka-pouch) — не тронуты.
- [x] Категории, типы, функции-селекторы, `ProductCard.tsx`, `Bestsellers.tsx` — не тронуты.
- [x] `npx tsc --noEmit` без ошибок (запустит оркестратор).

## Запреты
- ❌ Не менять `types/index.ts`.
- ❌ Не менять `ProductCard.tsx`, `Bestsellers.tsx`.
- ❌ Не удалять и не переставлять записи в массиве `products`.
- ❌ Не менять название «Beech Bloom», цену 1890, или категорию.
- ❌ Не трогать `colors` у `krab-pearl`.
- ❌ Не делать `oldPrice` через расчёт в коде — это просто число `2520`.

## Не входит в задачу
- Менять Hero / Categories / Sale / About / New.
- Добавлять новые товары.

## Артефакты
- `public/products/krab-pearl-whisper.jpg` — новый файл (~419 KB, из photo/9.jpg), локальное фото для карточки Крабика Pearl Whisper.
- `public/products/raschesk-beech-bloom.jpg` — новый файл (~450 KB, из photo/10.jpg), локальное фото для карточки Расчёски Beech Bloom.
- `lib/products.ts` — изменены две записи в массиве `products`:
  - `krab-pearl`: поле `images` заменено на `["/products/krab-pearl-whisper.jpg"]` (было два Unsplash URL).
  - `raschesk-buk`: поле `images` заменено на `["/products/raschesk-beech-bloom.jpg"]` (было один Unsplash URL), добавлено `oldPrice: 2520`.

## Заметки исполнения
Успешно выполнена. Изменены только целевые поля в записях `krab-pearl` и `raschesk-buk`, все остальные товары и компоненты остались без изменений. Бестселлеры теперь используют локальные фото из `/public/products/` вместо внешних Unsplash URL. У `krab-pearl` осталось одно фото (hover-crossfade не сработает, что нормально). На `raschesk-buk` добавлена скидка 25% (oldPrice 2520 → 1890). TypeScript validation пройдена без ошибок.
