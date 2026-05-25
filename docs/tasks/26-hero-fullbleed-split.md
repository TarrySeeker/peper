---
id: 26
title: Hero — full-bleed split 50/50 (фото слева, нежно-розовый фон справа)
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Полностью заменить текущий Hero на минималистичный full-bleed split-screen: левая половина — фото на 50% ширины, правая половина — нежно-розовый цветовой блок. Без текста, без CTA, без декоративных рамок. На весь экран по высоте (100vh).

## Контекст
- Файл: `components/Hero.tsx` (полная замена кроме marquee-блока внизу).
- Файл фото уже скопирован: `/Users/reoglw/Desktop/wes/public/hero/hero-split.png` (из `photo/6.PNG`, 2.67 МБ).
- Marquee-лента после `</section>` (строки 168-180 в текущем файле) — **оставить без изменений**.
- Старые фото `hero-1.png`, `hero-2.png`, `hero-3.png` — оставить в public/hero/ на случай возврата.

## Решения интервью
1. **Текст**: без текста — чистые фото и фон. Никаких H1, слогана, CTA в Hero.
2. **Высота**: 100vh (на весь экран).

## Что должно быть

### Структура
```tsx
<>
  <section className="h-screen w-full">
    {/* Split 50/50 — flex (desktop), stack (mobile) */}
    <div className="flex h-full flex-col md:flex-row">
      {/* LEFT — фото */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
        <Image src="/hero/hero-split.png" alt="..." fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      {/* RIGHT — нежно-розовый блок */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-rose-100" />
    </div>
  </section>

  {/* Marquee — БЕЗ ИЗМЕНЕНИЙ */}
  <div className="border-y border-rose-200/70 bg-white/40 py-5 backdrop-blur">
    <Marquee ... />
  </div>
</>
```

### Технические детали
- **Section**: `h-screen w-full` (100vh, full-bleed без `container-site`).
- **Левая половина**: `<Image fill object-cover>`. На desktop — `w-1/2 h-full`. На mobile (`< md`) — `w-full h-1/2`.
- **Правая половина**: однотонный `bg-rose-100` (#F7DFE2 — нежный розовый из палитры). Никаких текстов внутри. Никаких градиентов (если только не хочется тонкого радиального для глубины — на усмотрение, но **без дополнительного декора**).
- **Alt-текст** для фото: что-то осмысленное, например «PAPER.FAIRIES — бутик нежности».
- **Без анимаций входа**, или совсем тонкие (fade-in 0.6s) — это не journal-блок, это статичная композиция.
- **Никаких MosaicCell, авторотации, точек-индикаторов, gold-уголков, blur-фона** — всё это удалить.
- Marquee-блок после `</section>` — **оставить как есть** (border-y border-rose-200/70 bg-white/40 py-5 backdrop-blur + `<Marquee>` с теми же параметрами).

### Mobile (< md)
- Stack: фото сверху (h-1/2 экрана), розовый блок снизу (h-1/2 экрана).
- Или: фото на 60vh + розовый на 40vh — но проще симметрия 50/50.

## Запреты
- ❌ Не использовать `container-site` или padding с краёв — это full-bleed.
- ❌ Без текста (нет H1, CTA, подписей внутри hero).
- ❌ Без gold-уголков, blur-фотофона, MosaicCell, авторотации.
- ❌ Без рамок и shadow.
- ❌ Не трогать marquee-блок после `</section>`.
- ❌ Не удалять `hero-1.png`, `hero-2.png`, `hero-3.png` из `public/hero/`.

## Acceptance criteria
- [x] `components/Hero.tsx` полностью переписан. Все остатки MosaicCell, авторотации, gold-corners, blur-фотофона удалены. Импорты подчищены (только то что нужно).
- [x] Section занимает `h-screen w-full` (100vh, без container).
- [x] Левая половина — `next/image fill` с `hero-split.png`, `object-cover`, `priority`. На desktop `w-1/2 h-full`, на mobile `w-full h-1/2`.
- [x] Правая половина — `bg-rose-100` без текста, без декора.
- [x] Marquee-блок после `</section>` сохранён без изменений.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Не входит в задачу
- Менять Categories, About, Footer, Header, другие секции.
- Менять marquee.
- Удалять старые hero-фото из public/.

## Артефакты
- `public/hero/hero-split.png` — новый файл (2.67 МБ, из `photo/6.PNG`).
- `components/Hero.tsx` — переписан как минималистичный full-bleed split. Файл сократился с 255 до 49 строк. Структура: `<section className="h-screen w-full">` без container-site → `flex flex-col md:flex-row h-full` → ЛЕВО: `relative h-1/2 w-full md:h-full md:w-1/2` с `<Image fill priority object-cover>` (`/hero/hero-split.png`, sizes `(min-width: 768px) 50vw, 100vw`) → ПРАВО: пустой `<div aria-hidden bg-rose-100 h-1/2 w-full md:h-full md:w-1/2>`. Marquee-блок после `</section>` сохранён без изменений. На mobile (< md) — вертикальный стек: фото сверху на 50vh, розовый снизу на 50vh.

## Заметки исполнения
- Удалено целиком: `"use client"` директива (теперь чистый server-component), импорты useState/useEffect/motion/AnimatePresence, массив `photos` с 3 фото и авторотация каждые 7s, функции `orderedPhotos`/`selectFeatured`, MosaicCell-компонент целиком, 4 декоративных gold-corner div, размытый featured-фотофон blur(60px), 2 gradient overlay, белая подложка bg-white/90 backdrop-blur shadow-petal, кликабельные точки-индикаторы.
- Файлы `public/hero/hero-1.png`, `hero-2.png`, `hero-3.png` оставлены в проекте на случай возврата — не используются текущим Hero.
- `npx tsc --noEmit` прошёл без ошибок. `npm run build` не запускался.
