---
id: 44
title: Декоративный розовый blur-blob градиент в Bestsellers / Sale / About / ContactSection
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
В 4-х секциях главной — Bestsellers, SaleSection, About, ContactSection — добавить декоративные **розовые размытые «пятна»** (`absolute blur-3xl rounded-full`) для создания эффекта мягкого градиента из «пятен поярче». Текущие тонкие blob-ы (`rose-100/60`, `rose-200/50`) — слишком блёклые: пользователь хочет «поярче».

Цвета — из палитры rose проекта (rose-200, rose-300, rose-400), opacity 40-70%, blur-3xl. Никаких новых цветов, только бренд-палитра.

## Контекст

### Палитра rose (`tailwind.config.ts`):
- rose-200: `#F4D6D8` — мягкий пастельный, opacity 60-70% → ощутимо
- rose-300: `#EFC1C5` — средний пастельный, opacity 40-50%
- rose-400: `#E5A4AB` — насыщенный, opacity 25-35% → акцентное «пятно»

### Текущее состояние:
- **`components/Bestsellers.tsx`**: `<section id="bestsellers" className="bg-rose-100/50 py-28">` — НЕТ blur-blob. Также НЕТ `relative overflow-hidden` — добавить.
- **`components/SaleSection.tsx`**: уже есть `bg-rose-200/50 blur-3xl` (1 шт., правый верх). Дополнить.
- **`components/About.tsx`**: уже есть `bg-rose-100/60 blur-3xl` (левый top) и `bg-gold-400/10 blur-3xl` (правый bottom). Усилить розовые, золотое оставить.
- **`components/ContactSection.tsx`**: уже есть `bg-rose-200/50 blur-3xl` (левый top) и `bg-gold-400/20 blur-3xl` (правый bottom). Дополнить.

### Структура «пятна» (паттерн):
```tsx
<div
  aria-hidden
  className="pointer-events-none absolute <position> h-<size> w-<size> rounded-full bg-rose-<shade>/<opacity> blur-3xl"
/>
```

`pointer-events-none` обязательно — пятна не должны перехватывать клики.
`absolute` — внутри секции с `relative overflow-hidden`.

## Что сделать

### `components/Bestsellers.tsx`
1. Корневой `<section id="bestsellers" className="bg-rose-100/50 py-28">` → добавить `relative overflow-hidden`:
   ```
   <section id="bestsellers" className="relative overflow-hidden bg-rose-100/50 py-28">
   ```
2. Сразу внутри `<section>` (перед `<div className="container-site">`) добавить 4 декоративных blur-blob-а:
   ```tsx
   <div aria-hidden className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-rose-200/60 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-rose-300/45 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-rose-400/25 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute -right-16 bottom-20 h-64 w-64 rounded-full bg-rose-200/55 blur-3xl" />
   ```

### `components/SaleSection.tsx`
1. У существующего blob `bg-rose-200/50` (~строка 27) — повысить насыщенность: `bg-rose-200/50` → `bg-rose-300/50`.
2. Добавить ещё 2-3 blob (рядом с существующим, перед `<div className="container-site">`):
   ```tsx
   <div aria-hidden className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute left-1/2 bottom-12 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-300/35 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute right-16 bottom-0 h-60 w-60 rounded-full bg-rose-400/25 blur-3xl" />
   ```

### `components/About.tsx`
1. У существующего blob `bg-rose-100/60` (~строка 91) — усилить: `bg-rose-100/60` → `bg-rose-200/70`.
2. Существующий `bg-gold-400/10` (gold-blob) — НЕ ТРОГАТЬ.
3. Добавить ещё 2 розовых blob (рядом с существующими):
   ```tsx
   <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute left-1/4 bottom-1/4 h-72 w-72 rounded-full bg-rose-400/25 blur-3xl" />
   ```

### `components/ContactSection.tsx`
1. У существующего blob `bg-rose-200/50` (~строка 27) — повысить: `bg-rose-200/50` → `bg-rose-300/55`.
2. Существующий `bg-gold-400/20` — НЕ ТРОГАТЬ.
3. Добавить ещё 2 розовых blob:
   ```tsx
   <div aria-hidden className="pointer-events-none absolute right-1/3 top-20 h-72 w-72 rounded-full bg-rose-200/55 blur-3xl" />
   <div aria-hidden className="pointer-events-none absolute left-1/4 bottom-12 h-80 w-80 rounded-full bg-rose-400/25 blur-3xl" />
   ```

## Что НЕ трогать
- `bg-rose-100/50` wash на секциях (из задачи 42) — оставить как фоновый слой.
- Hero, Categories, Marquee, Header, Footer — не трогать.
- Карточки товаров, drawer'ы, формы, текст, иконки — не трогать.
- `tailwind.config.ts`, `app/globals.css` — не трогать.
- Container и контент секций — не трогать.
- `useScroll`/`useTransform`, `framer-motion`, useState/useEffect — не трогать.
- Gold-blob-ы — оставить как есть (для акцентного контраста с розовым).

## Acceptance criteria
- [x] `Bestsellers.tsx` корневой `<section>` имеет `relative overflow-hidden` (добавлено к существующим классам).
- [x] В Bestsellers добавлено 4 розовых blur-blob с разной позицией/размером/opacity (rose-200/60, rose-300/45, rose-400/25, rose-200/55).
- [x] В SaleSection: существующий blob усилен до rose-300/50, добавлено 3 новых blob (rose-200/60, rose-300/35, rose-400/25).
- [x] В About: существующий rose-100/60 усилен до rose-200/70; добавлено 2 новых blob (rose-300/40, rose-400/25); gold-blob не тронут.
- [x] В ContactSection: существующий rose-200/50 усилен до rose-300/55; добавлено 2 новых (rose-200/55, rose-400/25); gold-blob не тронут.
- [x] Все новые blob имеют `pointer-events-none absolute ... rounded-full bg-rose-... blur-3xl` и `aria-hidden`.
- [x] Секции остаются с `overflow-hidden` — blob не вызывают горизонтальной прокрутки.
- [x] Контент секций (заголовки, карточки, формы) не закрыт blob-ами (они на фоне, под контентом).
- [x] Hero, Categories, Marquee, Header, Footer — не тронуты.
- [x] `tailwind.config.ts` и `globals.css` не тронуты.
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не использовать цвета вне палитры rose/gold.
- ❌ Не использовать opacity > 70% (получится плашка, а не «пятно»).
- ❌ Не убирать `pointer-events-none` — иначе сломается клик по контенту.
- ❌ Не убирать `aria-hidden` — это декор, не семантический контент.
- ❌ Не добавлять анимацию на blob (без motion, без CSS animation — статичные).
- ❌ Не использовать `z-index` — blob естественно под контентом за счёт порядка DOM.
- ❌ Не трогать Hero, Categories, Header, Footer, Marquee.

## Не входит в задачу
- Параллакс на blob.
- Добавить blob на Hero, Categories, Marquee.
- Менять палитру.

## Артефакты
- `components/Bestsellers.tsx` — добавлена обвёртка `relative overflow-hidden`, 4 декоративных rose-blob (rose-200/60, rose-300/45, rose-400/25, rose-200/55).
- `components/SaleSection.tsx` — усилен существующий blob до rose-300/50, добавлено 3 новых (rose-200/60, rose-300/35, rose-400/25).
- `components/About.tsx` — усилен rose-blob до rose-200/70, добавлено 2 новых (rose-300/40, rose-400/25); gold-blob оставлен без изменений.
- `components/ContactSection.tsx` — усилен существующий blob до rose-300/55, добавлено 2 новых (rose-200/55, rose-400/25); gold-blob оставлен без изменений.

## Заметки исполнения
- Палитра: использованы rose-200/55-70, rose-300/35-55, rose-400/25 — три уровня насыщенности для создания глубины (крупные мягкие blob + более интенсивные акценты).
- Композиция: blob асимметрично размещены по углам и центру каждой секции (top + bottom, left + right + center) — создаёт ощущение лёгкого облачного градиента, не плашки.
- `aria-hidden="true"` + `pointer-events-none` гарантирует чистоту а11y (blob декоративные) и не мешает тапам.
- `overflow-hidden` на секциях предотвращает горизонтальную прокрутку при отрицательных offsets (-left-24, -right-32 и т.п.).
- Gold-blob в About и ContactSection оставлены для тёплого золотого акцента, который контрастирует с rose — без них композиция стала бы монохромной.
- `npx tsc --noEmit` exit 0, dev-server HTTP 200, HMR подхватил изменения.
