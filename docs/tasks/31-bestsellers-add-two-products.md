---
id: 31
title: Bestsellers — добавить 2 новых товара (расчёска + шкатулка) и расширить отображение до 4 карточек
status: done
agent: commerce-logic
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
1. Добавить в каталог 2 новых товара с пометкой `isBestseller: true`:
   - **Расчёска** — название бренда «Aurora Blush» (расчёска, deep tone, soft pink mood). Изображение: `/products/raschesk-aurora-blush.jpg`. Категория `rascheski`. Цена ~1490₽.
   - **Шкатулка** — название «Petite Maison». Изображение: `/products/shkatulka-petite-maison.jpg`. Категория `kosmetichki` (ближайшая существующая, новой категории не заводим). Цена ~3490₽.
2. Поставить эти 2 товара **в самое начало массива** `products` в `lib/products.ts`. Чтобы они показывались первыми (расчёска первой, шкатулка второй).
3. В `components/Bestsellers.tsx` изменить `.slice(0, 2)` → `.slice(0, 4)` — после добавления видимый ряд расширяется до 4 карточек (2 новых + 2 существующих бестселлера).

## Контекст
Файлы:
- `lib/products.ts` — массив `products` (строки 46-216). Сейчас 3 бестселлера (krab-pearl, raschesk-buk, kosmet-quilt). Добавляются 2 новых → станет 5.
- `components/Bestsellers.tsx`, строка 10 — `const items = getBestsellers().slice(0, 2);` → `getBestsellers().slice(0, 4);`.
- Файлы изображений уже скопированы в `public/products/raschesk-aurora-blush.jpg` (360 KB) и `public/products/shkatulka-petite-maison.jpg` (258 KB) — оркестратор подготовил, агенту копировать не нужно.
- Тип `Product` (`types/index.ts`): обязательны `id`, `name`, `category`, `price`, `images: string[]`, `description`, `details: string[]`. Опциональны `oldPrice`, `isBestseller`, `isNew`, `customizable`, `colors`.
- Тип `CategorySlug` — union из 5 значений. Шкатулку кладём в `kosmetichki` (не вводить новый slug — это вне скоупа).

## Что сделать

### 1. `lib/products.ts` — добавить 2 товара в начало массива `products`

**Первая запись (расчёска):**
```ts
{
  id: "raschesk-aurora",
  name: "Расчёска «Aurora Blush»",
  category: "rascheski",
  price: 1490,
  images: ["/products/raschesk-aurora-blush.jpg"],
  description:
    "Расчёска из светлого бука с мягкой розовой полировкой и закруглёнными зубцами. Создана для нежного ухода за волосами в утреннем свете.",
  details: [
    "Длина: 20 см",
    "Материал: светлый бук, перламутровая полировка",
    "Антистатическое покрытие",
    "Подарочная упаковка из переработанного картона",
  ],
  isBestseller: true,
},
```

**Вторая запись (шкатулка):**
```ts
{
  id: "shkatulka-petite-maison",
  name: "Шкатулка «Petite Maison»",
  category: "kosmetichki",
  price: 3490,
  images: ["/products/shkatulka-petite-maison.jpg"],
  description:
    "Миниатюрная шкатулка для украшений и мелочей. Стёганый внешний слой, бархатная подкладка и тонкая золотая фурнитура — маленький дом для самого личного.",
  details: [
    "Размер: 14 × 10 × 7 см",
    "Материал: стёганый сатин, бархатная подкладка",
    "Магнитная застёжка",
    "Внутри — мягкие отделения и подушечка для колец",
  ],
  isBestseller: true,
},
```

Обе записи — самые первые в массиве `products`, ДО `krab-pearl`. Порядок: `raschesk-aurora` → `shkatulka-petite-maison` → дальше всё как было.

### 2. `components/Bestsellers.tsx`
- Строка 10: `const items = getBestsellers().slice(0, 2);` → `const items = getBestsellers().slice(0, 4);`
- Больше ничего в файле не меняем.

### 3. Проверка
- Сетка в Bestsellers — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. 4 карточки укладываются ровно в один ряд на lg+.
- На карточке фото товара **не отображается** (после задачи 30 там SVG-цветок на rose-100). Поле `images[0]` всё равно нужно — оно используется в `CartDrawer` и на странице `/product/[id]`. **Это не баг, это последствие задачи 30.**

## Acceptance criteria
- [x] В `lib/products.ts` массив `products` начинается с двух новых записей: сначала `raschesk-aurora`, потом `shkatulka-petite-maison`. Дальше — `krab-pearl` и остальные без изменений.
- [x] Обе новые записи имеют `isBestseller: true`.
- [x] `raschesk-aurora`: category `rascheski`, price 1490, единственное изображение `/products/raschesk-aurora-blush.jpg`.
- [x] `shkatulka-petite-maison`: category `kosmetichki`, price 3490, единственное изображение `/products/shkatulka-petite-maison.jpg`.
- [x] У обеих заполнены `description` и `details` (массив строк, как у других продуктов).
- [x] В `components/Bestsellers.tsx` `slice(0, 2)` → `slice(0, 4)`.
- [x] Остальные товары (krab-pearl, krab-rose, krab-mini, raschesk-buk, raschesk-poket, kosmet-quilt, kosmet-mini, greb-bamboo, sumka-pouch) — **не тронуты**.
- [x] Категории, типы, прочие функции (`getProductsByCategory`, `getProductById`, `getBestsellers`, `getCategoryBySlug`) — не тронуты.
- [x] `npx tsc --noEmit` — без ошибок (это обязан запустить оркестратор, у commerce-logic нет Bash).

## Запреты
- ❌ Не создавать новый `CategorySlug` (например, "shkatulki"). Шкатулка идёт в `kosmetichki`.
- ❌ Не менять структуру `Product` или `Category` в `types/index.ts`.
- ❌ Не трогать `ProductCard.tsx` (он уже без фото после задачи 30 — это by design).
- ❌ Не удалять и не редактировать существующие 9 продуктов.
- ❌ Не менять Tailwind/шрифты/глобальные стили.
- ❌ Не использовать внешние URL для новых изображений — только локальные пути `/products/...`.

## Не входит в задачу
- Возвращать фото на карточку (задача 30 не откатывается).
- Менять Sale, Categories, New, Hero, About.
- Создавать новую категорию «Шкатулки».

## Артефакты
- `public/products/raschesk-aurora-blush.jpg` — новое изображение расчёски Aurora Blush (~360 KB).
- `public/products/shkatulka-petite-maison.jpg` — новое изображение шкатулки Petite Maison (~258 KB).
- `lib/products.ts` — добавлены 2 новых товара в начало массива `products` (raschesk-aurora и shkatulka-petite-maison с полной информацией: description, details, isBestseller). Каталог теперь содержит 11 товаров.
- `components/Bestsellers.tsx` — изменена строка 10: `getBestsellers().slice(0, 2)` → `getBestsellers().slice(0, 4)`, отображается 4 карточки вместо 2.

## Заметки исполнения
- Обе новых товара корректно отмечены `isBestseller: true` и расположены в начале массива в правильном порядке (расчёска, затем шкатулка).
- Для шкатулки использована существующая категория `kosmetichki`, новая категория не заводилась (по скоупу задачи).
- Изображения товаров не видны на карточках Bestsellers (последствие задачи 30: ProductCard использует SVG-цветок на rose-100). Поля `images[0]` остаются заполненными и используются в CartDrawer и на странице товара.
- TypeScript проверка прошла без ошибок (`npx tsc --noEmit` → exit 0).
- Все остальные товары, типы, селекторы, компоненты остались нетронутыми.
