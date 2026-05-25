---
id: 27
title: Hero — добавить editorial-текст на правый розовый блок
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
На правый розовый блок Hero добавить editorial-композицию текста в стиле журнальной обложки. Использовать **микс шрифтов**: массивный serif (Playfair) для главного высказывания и нежный курсив (Cormorant) для акцентного слова и подзаголовка.

## Контекст
- Файл: `components/Hero.tsx` (49 строк сейчас, после задачи 26).
- Правый блок сейчас — пустой `<div aria-hidden className="h-1/2 w-full bg-rose-100 md:h-full md:w-1/2" />`. Его нужно наполнить контентом и убрать `aria-hidden`.
- Фон остаётся `bg-rose-100`. Декор не добавляем.

## Содержание

**Главное высказывание (большой H2):**
> Маленькие детали *создают* магию

**Подзаголовок-tagline:**
> Любимые аксессуары для самых нежных образов

## Типографика (микс шрифтов)
- **Eyebrow** (сверху): мелкий sans-капс — `font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600`. Текст: `Spring 2026 · №06` (опционально, для editorial-вкуса).
- **H2 главное**: Playfair (`font-display`), `text-5xl md:text-6xl lg:text-7xl xl:text-8xl`, `font-light`, `text-ink-900`, `leading-[0.95]`, `tracking-tight`. На 3-4 строки:
  ```
  Маленькие
  детали
  создают  ← это слово в font-script italic text-rose-700 — нежный акцент
  магию
  ```
  Или: «Маленькие детали» (строка) + «создают магию» (строка с акцентом на «создают» или «магию» в script).
- **Тонкая золотая линия** между H2 и tagline: `h-px w-12 bg-gold-400/60`.
- **Tagline**: `font-script text-2xl md:text-3xl italic text-rose-700`. Может занимать 2 строки: «Любимые аксессуары / для самых нежных образов».

## Layout правого блока
- На desktop (md+): `flex items-center` (центрирование по вертикали), padding `px-8 md:px-12 lg:px-20 py-12`. Текстовый блок `max-w-md` или `max-w-lg`.
- На mobile (< md): тот же layout, но контент компактнее (text-4xl для H2 вместо text-5xl, можно сократить eyebrow или убрать его).

## Что должно быть
- Правый блок наполнен композицией: eyebrow → H2 (массивный Playfair с одним script-italic акцентом) → тонкая золотая линия → tagline (script italic).
- Без `aria-hidden` на блоке (раз там теперь смысловой контент).
- Без анимаций (компонент остаётся чистым server-component без `"use client"` и Framer Motion).
- Без CTA-кнопок, без иконок, без дополнительного декора.

## Запреты
- ❌ Не добавлять `"use client"` или Framer Motion (статичный hero).
- ❌ Не возвращать MosaicCell, авторотацию.
- ❌ Не трогать левую половину с фото.
- ❌ Не трогать marquee после `</section>`.
- ❌ Не добавлять кнопки или ссылки внутри hero.
- ❌ Не использовать `font-bold` 700+ для Playfair — у нас `font-light` или `font-normal` смотрится журнальнее.

## Acceptance criteria
- [x] На правом блоке `bg-rose-100` есть editorial-текст по структуре: (опц) eyebrow → H2 + script-акцент → золотая линия → tagline.
- [x] H2 использует `font-display` (Playfair), tagline — `font-script italic` (Cormorant).
- [x] Один акцент внутри H2 — слово в `font-script italic text-rose-700` (на твоё усмотрение: «создают», «магию» или «детали»).
- [x] Размеры заголовков — журнальные крупные: lg+ ≥ text-7xl для H2.
- [x] Mobile: H2 не вылазит за пределы, читаем (text-4xl или 5xl).
- [x] Компонент остался server-component (без `"use client"`).
- [x] `aria-hidden` снят с правого блока.
- [x] Левая половина с фото и marquee — НЕ тронуты.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Не входит в задачу
- Менять структуру section/split.
- Менять marquee, другие компоненты.

## Артефакты
- `components/Hero.tsx` — правый розовый блок наполнен editorial-композицией текста. Файл вырос с 49 до 74 строк. Структура правого блока: `flex items-center bg-rose-100 px-8 py-12 md:px-12 lg:px-20` → `max-w-md` контейнер → eyebrow `Spring 2026 · №06` (font-sans 11px uppercase tracking-0.35em text-gold-600) → H2 «Маленькие / детали *создают* / магию» (font-display font-light text-4xl→xl:8xl, leading-0.95, tracking-tight, text-ink-900) со script-italic акцентом на слове «создают» (font-script italic text-rose-700) и переносами `<br className="hidden sm:block"/>` для журнальной разбивки на 3 строки → тонкая золотая линия `h-px w-12 bg-gold-400/60` → tagline «Любимые аксессуары для самых нежных образов» (font-script italic text-rose-700 text-xl→md:3xl).

## Заметки исполнения
- Mix двух шрифтов: массивный Playfair (font-display font-light) для главного высказывания + нежный Cormorant italic (font-script italic) для акцентного слова «создают» и для tagline.
- Aria-hidden убран с правого блока — теперь там смысловой контент.
- Компонент остался server-component (без `"use client"`, без Framer Motion).
- Изначально агент frontend-builder самовольно заменил слово «создают» на «рождают» — оркестратор откатил эту замену вручную через Edit, восстановив оригинальный текст пользователя.
- `npx tsc --noEmit` прошёл без ошибок. `npm run build` не запускался.
