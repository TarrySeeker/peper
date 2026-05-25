---
id: 40
title: Поиск и избранное — рабочая функциональность (overlay поиска + drawer избранного + persist-store)
status: done
agent: commerce-logic + frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Сделать рабочими две иконки в шапке:
1. **Поиск** (Search) — открывает overlay с инпутом, фильтрует `products` по `name` в realtime, клик по результату → переход на `/product/[id]`.
2. **Избранное** (Heart) — открывает drawer со списком избранных товаров, кнопки удаления и перехода. Сердце на `ProductCard` синхронизирует состояние с глобальным store. Badge на иконке Heart в Header показывает количество.

Оба — drawer/overlay-стиля (без отдельных страниц), по образцу существующего `CartDrawer`.

## Контекст
- В `components/Header.tsx` строки 87-98: Search и Heart кнопки сейчас без `onClick` — заглушки.
- В `components/ProductCard.tsx` строки 21, 89-103: локальный `useState(liked)` — состояние теряется при перерендере, не персистится, не делится между карточками.
- Cart store: `lib/store.ts` использует Zustand + persist с ключом `paper-fairies-cart-v1`. CartDrawer открывается через `setOpen(true)`.
- Layout: `app/layout.tsx` монтирует `<CartDrawer />`. Аналогично нужно смонтировать `<FavoritesDrawer />` и `<SearchOverlay />`.

## Архитектура

### A. Store избранного — `lib/store-favorites.ts` (новый файл, commerce-logic)
Zustand + persist, key `paper-fairies-favorites-v1` (новый ключ, не пересекается с cart).

Interface:
```ts
interface FavoritesState {
  ids: string[];                       // массив productId
  isOpen: boolean;
  toggle: (productId: string) => void; // add or remove
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
  setOpen: (open: boolean) => void;
  count: () => number;
}
```

`persist`: partialize → только `ids`. `isOpen` НЕ персистится.

### B. Search overlay — `components/SearchOverlay.tsx` (новый, frontend-builder)
Client Component. Управляется через свой собственный Zustand store (см. C), либо через props/Context — но проще через store по аналогии с CartDrawer.

UI:
- Полноэкранный overlay (fixed inset-0), backdrop с blur.
- Сверху в центре — большой input "Поиск по магазину" + кнопка X закрыть.
- Под инпутом — список результатов (фильтр `products` по `name.toLowerCase().includes(query.toLowerCase())`).
- Каждый результат: маленькое фото `product.images[0]` (next/image 64×64 object-cover) + name + price (formatPrice) → `<Link href={"/product/" + id}>`, по клику overlay закрывается.
- Пустой запрос → подсказка "Начните вводить, чтобы найти товар".
- Запрос есть, но без совпадений → "Ничего не найдено. Попробуйте другое слово".
- Esc и клик по backdrop → закрытие. AnimatePresence для входа/выхода.

### C. Store поиска — `lib/store-search.ts` (новый, commerce-logic)
Минимальный Zustand store (без persist):
```ts
interface SearchState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}
```

### D. Favorites drawer — `components/FavoritesDrawer.tsx` (новый, frontend-builder)
Скопировать структуру `CartDrawer.tsx` и адаптировать:
- Sliding panel справа (или слева — на усмотрение, но cart уже справа — пусть избранное тоже справа, для консистентности).
- Header: «Избранное» + кнопка X закрыть.
- Список: для каждого `id` из `ids` сделать `getProductById(id)`, отрендерить фото / имя / цену / кнопку «×» (remove) и кнопку-ссылку «Открыть» (на `/product/[id]`).
- Если список пуст: красивое empty-state «В избранном пока пусто. Сохраняйте любимое — оно будет ждать здесь».
- Backdrop, AnimatePresence — по образцу CartDrawer.

### E. Header — `components/Header.tsx`
- Search button (строки 87-92): добавить `onClick={() => useSearch.getState().setOpen(true)}` или через хук.
- Heart button (строки 93-98): добавить `onClick={() => useFavorites.getState().setOpen(true)}`.
- На Heart button — добавить badge как у Корзины: если `useFavorites((s) => s.count())` > 0, показать кружок с числом (по образцу строк 112-120).

### F. ProductCard — `components/ProductCard.tsx`
- Удалить локальный `const [liked, setLiked] = useState(false);`.
- Импортировать `useFavorites` из `@/lib/store-favorites`.
- В onClick кнопки сердца: `useFavorites.getState().toggle(product.id)` (или через хук).
- `liked` теперь = `useFavorites((s) => s.has(product.id))`.
- Визуал кнопки (классы, заливка `fill-current`) — оставить как было.

### G. Layout — `app/layout.tsx`
- Импортировать `SearchOverlay` и `FavoritesDrawer`.
- Замонтировать оба рядом с `<CartDrawer />`.

## Этапы выполнения

### Этап 1 (commerce-logic)
1. Создать `lib/store-favorites.ts` со схемой выше.
2. Создать `lib/store-search.ts` со схемой выше.

### Этап 2 (frontend-builder)
3. Создать `components/SearchOverlay.tsx`.
4. Создать `components/FavoritesDrawer.tsx`.
5. Обновить `components/Header.tsx` — onClick на Search и Heart, badge на Heart.
6. Обновить `components/ProductCard.tsx` — заменить локальный state на глобальный store.
7. Обновить `app/layout.tsx` — замонтировать оба новых компонента.

## Acceptance criteria
- [x] `lib/store-favorites.ts` — Zustand + persist, key `paper-fairies-favorites-v1`, `ids: string[]`, `isOpen`, методы `toggle`/`remove`/`clear`/`has`/`setOpen`/`count`.
- [x] `lib/store-search.ts` — Zustand (без persist), `isOpen` + `setOpen`.
- [x] `components/SearchOverlay.tsx` — Client Component, открывается через `useSearch`, инпут + фильтр products + список результатов с фото/именем/ценой/ссылкой, Esc и клик-по-backdrop закрывают, AnimatePresence.
- [x] `components/FavoritesDrawer.tsx` — Client Component, открывается через `useFavorites`, sliding panel справа, список из `ids` через `getProductById`, удаление, ссылка на товар, empty-state, AnimatePresence.
- [x] `components/Header.tsx`:
  - Search button получил `onClick` → открывает overlay.
  - Heart button получил `onClick` → открывает FavoritesDrawer.
  - Heart button получил badge с числом (когда count > 0).
- [x] `components/ProductCard.tsx`:
  - Удалён `const [liked, setLiked] = useState(false)`.
  - Использует `useFavorites` для toggle и has(productId).
  - Внешний вид кнопки не сломан (fill при `liked`, цвета как раньше).
- [x] `app/layout.tsx` — `<SearchOverlay />` и `<FavoritesDrawer />` смонтированы (рядом с `<CartDrawer />`).
- [x] Persist работает: добавить товар в избранное, перезагрузить страницу → товар на месте (localStorage `paper-fairies-favorites-v1`).
- [x] Cart store (`lib/store.ts`, key `paper-fairies-cart-v1`) — НЕ тронут.
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не менять persist-ключ Cart `paper-fairies-cart-v1`.
- ❌ Не создавать отдельную страницу `/search` или `/favorites` (drawer/overlay подход — задача такая).
- ❌ Не добавлять новые npm-зависимости (всё уже есть: zustand, framer-motion, lucide-react, clsx).
- ❌ Не использовать Context API — у нас Zustand stores для глобального состояния.
- ❌ Не реализовывать сложный поиск (fuzzy match, синонимы) — простой `name.toLowerCase().includes(query)`.
- ❌ Не менять `lib/products.ts`, `types/index.ts`.

## Не входит в задачу
- Подсветка совпадений в результатах поиска.
- Категорная фильтрация в поиске.
- Сохранение истории поиска.
- Кнопка «Добавить в корзину» в FavoritesDrawer (только просмотр + удаление + переход).
- A11y-аудит overlay/drawer (focus-trap, ARIA modal) — отдельная задача для quality-guardian при необходимости.

## Артефакты
- `lib/store-favorites.ts` — новый Zustand store с persist (`paper-fairies-favorites-v1`), API: `ids[]`, `isOpen`, `toggle`/`remove`/`clear`/`has`/`setOpen`/`count`.
- `lib/store-search.ts` — новый Zustand store (без persist), управление `isOpen` для overlay.
- `components/SearchOverlay.tsx` — новый Client Component, полноэкранный overlay с инпутом для поиска по `name`, фильтрация в realtime, результаты с фото/ценой/ссылкой, Esc и backdrop close, AnimatePresence.
- `components/FavoritesDrawer.tsx` — новый Client Component, sliding panel справа, список из `ids` через `getProductById`, иконка удаления (Trash2), ссылка на товар, empty-state, AnimatePresence.
- `components/Header.tsx` — добавлены `onClick` на Search и Heart, Heart получил badge (аналог cart), импорты `useFavorites`/`useSearch`.
- `components/ProductCard.tsx` — удалён локальный `useState(liked)`, интегрирован глобальный store `useFavorites`, кнопка сердца синхронизирует с persist.
- `app/layout.tsx` — монтирование `<SearchOverlay />` и `<FavoritesDrawer />` рядом с `<CartDrawer />`.

## Заметки исполнения
- Поиск и избранное реализованы overlay/drawer-стилем (без отдельных страниц), по образцу CartDrawer.
- Проект теперь использует 3 Zustand store: cart (`store.ts`), favorites (`store-favorites.ts`), search UI (`store-search.ts`). Cart и Favorites с persist, Search без.
- Persist-ключи разделены: `paper-fairies-cart-v1` (не менялся) и `paper-fairies-favorites-v1` (новый). Конфликтов нет.
- Поиск реализован простым substring match по `product.name.toLowerCase().includes(query.toLowerCase())` — без fuzzy/синонимов.
- Empty-states в обоих компонентах: «Начните вводить…», «Ничего не найдено…» для SearchOverlay; «В избранном пока пусто…» + ссылка для FavoritesDrawer.
- TypeScript `npx tsc --noEmit` проходит без ошибок.
- HMR подхватывает изменения, dev-сервер работает на http://localhost:3000.
- Зависимостей не добавлялось: использованы zustand (уже был), framer-motion, lucide-react.
- Конвенция editorial-minimalism (отсутствие скруглений, чистый минимализм) соблюдена в UI обоих компонентов.
- A11y (focus-trap, ARIA modal, keyboard navigation) вне скоупа — может быть отдельной задачей для quality-guardian при необходимости.
