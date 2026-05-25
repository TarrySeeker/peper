---
id: 25
title: Страница /new — оставить только информационный блок без карточек товаров
status: done
agent: frontend-builder
priority: P2
created: 2026-05-25
updated: 2026-05-25
---

## Цель
На странице «Новые поступления» (`/new`) удалить сетку карточек товаров и оставить только информационный заголовок (SectionHero с eyebrow, title, description, breadcrumb).

## Контекст
Файл: `/Users/reoglw/Desktop/wes/app/new/page.tsx`.

Сейчас структура:
```tsx
<>
  <SectionHero eyebrow="Свежее в бутике" title={...} description="..." breadcrumb={...} />
  <section className="container-site mt-14 pb-24">
    <ProductGrid
      products={items}
      emptyTitle="Совсем скоро"
      emptyText="Готовим новую партию изделий — следите за обновлениями."
    />
  </section>
</>
```

## Что сделать
1. Удалить блок `<section>...<ProductGrid /></section>` целиком.
2. Удалить импорты `ProductGrid` и `products` (`import ProductGrid from "@/components/ProductGrid";`, `import { products } from "@/lib/products";`).
3. Удалить переменную `const items = products.filter((p) => p.isNew);`.
4. `SectionHero` — оставить как есть, не трогать его поля.
5. `export const metadata` — не трогать.

## Acceptance criteria
- [x] В `app/new/page.tsx` нет упоминаний `ProductGrid`, `products`, `items`.
- [x] Остался только `<SectionHero>` внутри возвращаемого JSX (без обёртки `<>`-fragment если она больше не нужна; но фрагмент можно оставить — он не мешает).
- [x] `metadata` сохранён.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Не входит в задачу
- Менять `SectionHero` компонент.
- Менять `ProductGrid` компонент (он используется на других страницах).
- Менять `lib/products.ts`, флаг `isNew` у продуктов.
- Менять страницы `/sale`, `/catalog`, главную.

## Артефакты
- `app/new/page.tsx` — упрощён с 42 до 28 строк. Удалены: импорты `ProductGrid` и `products`, переменная `items`, блок `<section>` с `<ProductGrid>`, обёртка-фрагмент. Компонент теперь возвращает только `<SectionHero>` напрямую. Импорт `SectionHero` и `export const metadata` сохранены.

## Заметки исполнения
- Подход — полное удаление блока продуктов с страницы, без empty-state. Если позже нужно показать «Совсем скоро» — можно вернуть ProductGrid с `products={[]}` (он сам отрисует empty-state).
- На главной и в каталоге товары с флагом `isNew: true` продолжают отображаться (флаг не тронут).
- `npx tsc --noEmit` прошёл без ошибок. `npm run build` не запускался.
