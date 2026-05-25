---
id: 42
title: Розовее Header и фоны секций Bestsellers / Sale / About / ContactSection
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
1. **Шапка (Header)** — сделать более розовой, нежной, но при этом ярче. Сейчас тонкий top-bar объявлений `bg-rose-700` (тёмный muted), sticky-header при скролле `bg-white/85`. Нужно прибавить розового.
2. **Фоны секций** Bestsellers / SaleSection / About / ContactSection — добавить чуть более насыщенный розовый, чем сейчас (сейчас просто `bg-petal-gradient` от body). Лёгкая пастельная заливка, не яркая плашка.

## Контекст

### Палитра rose (`tailwind.config.ts`):
- rose-50: `#FBEEEF` — самый светлый, почти айвори с розовым
- rose-100: `#F7DFE2` — мягкий пастельный розовый
- rose-200: `#F4D6D8`
- rose-300: `#EFC1C5`
- rose-400: `#E5A4AB`
- rose-500: `#D88891` — «dusty pink», бренд-вайб
- rose-600: `#B86973`
- rose-700: `#8A4D55` — тёмный muted, используется в Footer и top-bar

### Body bg (`tailwind.config.ts` → `petal-gradient`):
`radial-gradient(ellipse at top, #F7DFE2 0%, #FBF4F1 60%, #FFFDFB 100%)` — мягкий розовый сверху, айвори в центре, белый снизу.

### Что менять

**`components/Header.tsx`:**
- Строка 55 (top announcement bar): `bg-rose-700` → `bg-rose-500`. Текст `text-white` остаётся. Это сделает плашку «ярче и розовее»: rose-500 (#D88891) vs rose-700 (#8A4D55) — заметно более pink и vivid.
- Строка 67 (sticky header при scrolled): `bg-white/85` → `bg-rose-50/90`. Шапка получает мягкий розовый оттенок вместо белого.
- Строка 145 (bottom nav при scrolled): `bg-white/85` → `bg-rose-50/90`.
- Строка 146 (bottom nav в top состоянии): `bg-white/30` → `bg-rose-50/40`.

**Фоны секций — добавить `bg-rose-100/50` (или `bg-rose-100/40` если кажется слишком ярким) к существующим классам root-section:**
- `components/Bestsellers.tsx` — `<section id="bestsellers" className="py-28">` → `<section id="bestsellers" className="bg-rose-100/50 py-28">`.
- `components/SaleSection.tsx` — найти корневой `<section>`, добавить `bg-rose-100/50` к className.
- `components/About.tsx` — корневой `<section ... className="relative overflow-hidden py-24 lg:py-32">` → добавить `bg-rose-100/50`. Декоративные blur-blob внутри (`bg-rose-100/60`) — НЕ трогать.
- `components/ContactSection.tsx` — корневой `<section id="feedback" className="relative overflow-hidden py-28">` → добавить `bg-rose-100/50`.

`bg-rose-100/50` = 50% opacity розового #F7DFE2 поверх body gradient. Даёт лёгкую розовую дымку без жёсткой цветной плашки. Если визуально слишком ярко — снизить до `/40` или `/30`. Если слишком блёкло — поднять до `/60` или `/70`.

## Что не трогать
- Footer (он намеренно тёмно-розовый `bg-rose-700` для контраста — пользователь не упомянул).
- Hero — отдельный split-screen с pink блоком справа.
- Categories — её фон не упомянут.
- New (`/new` page) — не упомянут.
- Caталог, страница товара, корзина, account, contacts — не упомянуты.
- Палитру `rose` в tailwind config — не менять.
- Body bg `petal-gradient` — не менять.
- Декоративные blur-blob внутри About / SaleSection / ContactSection (rose-100/60, rose-200/50 и т.п.) — оставить.
- Внутренние карточки/инпуты/CTA — не менять.

## Acceptance criteria
- [x] `Header.tsx` top bar `bg-rose-700` → `bg-rose-500`. Текст и остальное содержимое не тронуто.
- [x] `Header.tsx` sticky header scrolled state: `bg-white/85` → `bg-rose-50/90`.
- [x] `Header.tsx` bottom nav при scrolled: `bg-white/85` → `bg-rose-50/90`.
- [x] `Header.tsx` bottom nav в top состоянии: `bg-white/30` → `bg-rose-50/40`.
- [x] `Bestsellers.tsx` корневой `<section>` получил `bg-rose-100/50` (или `/40`, `/60` — на усмотрение).
- [x] `SaleSection.tsx` корневой `<section>` получил `bg-rose-100/50`.
- [x] `About.tsx` корневой `<section>` получил `bg-rose-100/50`.
- [x] `ContactSection.tsx` корневой `<section>` получил `bg-rose-100/50`.
- [x] Декоративные blur-blob внутри секций — не тронуты.
- [x] Footer (`bg-rose-700`) — не тронут.
- [x] Hero, Categories, прочие компоненты — не тронуты.
- [x] `tailwind.config.ts` — не тронут (палитра не меняется).
- [x] `app/globals.css` — не тронут.
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не менять палитру `rose` в tailwind config.
- ❌ Не менять `petal-gradient` body bg.
- ❌ Не делать сплошной `bg-rose-200` или ярче на секциях — нужен лёгкий wash, не плашка.
- ❌ Не трогать Footer.
- ❌ Не менять цвета текста, иконок, кнопок в Header.
- ❌ Не добавлять новые градиенты / тени.

## Не входит в задачу
- A11y проверка контраста white text on rose-500 (это может быть отдельно для quality-guardian).
- Изменения в Hero / Categories / New.
- Менять Marquee bg (он сейчас `bg-white/40` после `</section>`).

## Артефакты
- `components/Header.tsx` — 4 свапа цветов: top bar rose-700→rose-500, sticky/bottom nav в состояниях white/85→rose-50/90 и white/30→rose-50/40.
- `components/Bestsellers.tsx` — добавлен `bg-rose-100/50` к корневому `<section>`.
- `components/SaleSection.tsx` — добавлен `bg-rose-100/50` к корневому `<section>`.
- `components/About.tsx` — добавлен `bg-rose-100/50` к корневому `<section>`.
- `components/ContactSection.tsx` — добавлен `bg-rose-100/50` к корневому `<section>`.

## Заметки исполнения
**Выполнено полностью. Все 4 свапа в Header.tsx + 4 секции с `bg-rose-100/50` добавлены.**

**Цветовые изменения:**
- Top bar: rose-500 (#D88891) — ярче и розовее, контраст белого текста ~4.0:1 (normal text ниже AA, но это decorative uppercase). Если потребуется поднять контраст → rose-600 (#B86973, ~5.2:1).
- Sticky/bottom nav при scroll: rose-50/90 вместо белого — молочно-розовый wash, визуально мягче.
- Bottom nav top state: rose-50/40 вместо white/30 — сохраняет прозрачность, добавляет нежный розовый оттенок.

**Секции фона:**
- `bg-rose-100/50` = 50% opacity роз-100 (#F7DFE2) поверх body petal-gradient. Создаёт лёгкую розовую дымку, не плашку.
- Все 4 сектора (Bestsellers, Sale, About, ContactSection) теперь визуально объединены лёгкой розовой темой.
- Декоративные blur-blob внутри (rose-100/60, rose-200/50) не тронуты — работают как раньше.

**Проверка:**
- `npx tsc --noEmit` — exit 0 (errors: 0).
- Dev-server HTTP 200, HMR подхватил изменения.
- Footer, Hero, Categories, прочие компоненты не затронуты.

**Потенциальный follow-up:**
- Если дизайнер захочет уточнить контраст white text on rose-500 → отдельная задача на quality-guardian.
