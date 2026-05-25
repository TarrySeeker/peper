---
id: 23
title: Hero — журнальная обложка с именем бренда и 2 фото
status: reverted
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

> ⚠ **Откачено пользователем 2026-05-25.** Файл `components/Hero.tsx` возвращён к состоянию до этой задачи — мозаика из 3 фото (hero-1/2/3) с авторотацией каждые 7s, размытый featured-фотофон, золотые уголки-рамка, белая backdrop-blur подложка, точки-индикаторы. Magazine cover редизайн не прижился.

## Цель
Полностью переделать Hero-секцию (`components/Hero.tsx`) в свежий журнальный editorial-cover: имя бренда крупным Playfair как обложечный заголовок, 2 фотографии (вместо 3), много воздуха, никаких декоративных рамок.

## Контекст
- Файл: `components/Hero.tsx` (заменяется почти полностью; маркизу в конце оставить как есть).
- Используется в `app/page.tsx` как первая секция главной.
- Стек: Next.js 15, Tailwind 3.4, Framer Motion 11, `next/image`. Шрифты: `font-display` Playfair, `font-sans` Inter, `font-script` Cormorant.

## Что есть сейчас (удалить большую часть)
- Массив `photos` из 3 элементов (hero-1, hero-2, hero-3) с автоматической ротацией каждые 7s.
- `MosaicCell`-сетка 3 фото с featured-логикой и кликабельным переключением.
- Размытый featured-фотофон (`filter: blur(60px)`) на весь section + 2 градиентных оверлея.
- Золотые "уголки" по 4 углам (border-l-t / border-r-t / etc) — декоративная рамка-фотоальбом.
- Белая подложка `bg-white/90 p-2 shadow-petal backdrop-blur`.
- Кликабельные точки-индикаторы прогресса.
- bg-rose-100 background.

## Решения интервью с пользователем
1. **Фото**: оставить `hero-1.png` (портрет на берегу) и `hero-3.png` (расчёска с персонализацией). `hero-2.png` НЕ используется (файл оставить в `public/hero/`, не удалять).
2. **H1**: `«PAPER.FAIRIES»` — само имя бренда крупным Playfair как обложечный заголовок.

## Что должно быть

### Layout (lg+):
- Двухколоночная сетка 50/50 или 55/45 (текст слева, фото-блок справа).
- Контейнер: `container-site`, паддинги `py-20 lg:py-28`.
- Фон секции: однотонный светлый — `bg-ivory-50` или `bg-white`. **БЕЗ blur-фотофона, БЕЗ radial gradient, БЕЗ rose-пятен.**

### Левая колонка — типографика:
1. **Eyebrow** (вверху): мелкий sans-капс `text-[11px] uppercase tracking-[0.35em] text-gold-600`. Содержание: `Boutique №06 · Spring`. Можно использовать `font-sans`.
2. **H1** «PAPER.FAIRIES» — огромный `font-display text-6xl md:text-7xl lg:text-8xl text-ink-900 font-light leading-[0.95] tracking-tight`. Можно немного "раздать" буквы по горизонтали через `tracking-tighter` или `tracking-wide` — на твоё усмотрение, чтобы выглядело как обложка журнала. Опционально: одно слово (например, `FAIRIES`) можно оформить в `font-script italic text-rose-700` для контрастного акцента.
3. **Subline** — короткий слоган-подзаголовок под H1, в `font-script italic text-2xl lg:text-3xl text-rose-700 mt-3`. Содержание: «Бутик нежности».
4. **Lead-параграф** — 1-2 короткие строки в `font-sans text-base lg:text-lg text-ink-600 mt-6 max-w-md leading-relaxed`. Например: «Аксессуары для волос, рук и историй. Ручная работа, премиум-материалы, доставка по всей России.»
5. **CTA** — простая текст-ссылка без яркой кнопки. Например `<Link href="/catalog" className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.25em] text-ink-900 border-b border-ink-900 pb-1 hover:text-rose-700 hover:border-rose-700 transition-colors">Открыть каталог →</Link>` (одна строка, стрелка → как `→` или ArrowRight из Lucide).
6. **Micro-meta** — внизу левой колонки, мелким капсом: `text-[10px] uppercase tracking-[0.3em] text-ink-500`. Например: «Made in Russia · Since 2024» или подобное.

### Правая колонка — фото-композиция:
- **Главное фото — hero-1.png**: крупное портретное `aspect-[3/4]` или `aspect-[4/5]`, `next/image fill`, `object-cover`. Без рамок, без скруглений (`rounded-none`) или минимальные `rounded-sm`. Без overlay.
- **Второе фото — hero-3.png**: меньшего размера, расположено снизу-слева главного с **частичным перекрытием на ~15-20%** (это допустимая editorial-композиция, в отличие от polaroid-коллажа задачи 13 — здесь это два прямоугольника, не повёрнутые, аккуратно расположенные). ИЛИ — без перекрытия, просто рядом снизу с офсетом по горизонтали. На усмотрение, главное — выглядит чисто и журнально.
- Опционально: под одним из фото (вне рамки) — caption-подпись мелким капсом (например, «Spring '26 collection» в `text-[10px] uppercase tracking-[0.3em] text-ink-500`). Не обязательна.

### Mobile (< md):
- Стек вертикально: типографика сверху, фото снизу.
- H1 — `text-5xl` или `text-6xl` (по-крупному, как обложка).
- Главное фото на всю ширину, второе фото — либо под главным с меньшим размером и офсетом, либо убрать на mobile (показать только главное), чтобы не загромождать.

### Декор и анимации:
- **Без золотых уголков** в 4 углах — это удаляем.
- **Без backdrop-blur**, без розовых пятен, без радиальных градиентов.
- Опционально: одна тонкая золотая горизонтальная линия (`border-t border-gold-400/40`) между H1 и subline, или под subline — для editorial-вкуса. Без агрессии.
- Анимации входа Framer Motion: stagger fade + slide-up 12-16px для текстовых элементов (eyebrow → H1 → subline → lead → CTA с задержкой), fade + scale 1.02→1 для фото. Duration ~0.6-0.8s, ease cubic-bezier(0.22, 0.61, 0.36, 1).

### Внизу секции — Marquee лента (НЕ ТРОГАТЬ):
Текущий блок `<div className="border-y border-rose-200/70 bg-white/40 py-5 backdrop-blur">` с `<Marquee>` — оставить как есть. Это отдельная задача 16/17 — её пользователь принимает.

## Запреты
- ❌ Удалять третье фото `hero-3.png` (оставить в public/hero/, оно используется).
- ❌ Менять marquee-блок в конце.
- ❌ Никаких золотых "уголков" в 4 углах.
- ❌ Никакого `bg-rose-100` или blur-фотофона на section.
- ❌ Никаких backdrop-blur подложек.
- ❌ Никакой ротации/slideshow (всего 2 фото и они статичны).
- ❌ Никаких кликабельных карточек/MosaicCell — фото просто рендерятся.
- ❌ Никаких поворотов/polaroid стиля.
- ❌ Никаких кнопок с фоном — только text-link CTA.

## Acceptance criteria
- [x] Hero-section (всё до `</section>`) полностью переписан.
- [x] Используется только 2 фото: `hero-1.png` (главное) и `hero-3.png` (второе).
- [x] H1 — «PAPER.FAIRIES», `font-display`, очень крупно (lg ≥ text-7xl).
- [x] Под H1 — subline «Бутик нежности» в `font-script italic`.
- [x] Есть eyebrow «Boutique №06 · Spring» (или подобный) в gold-600 капсе.
- [x] Есть короткий lead-параграф (1-2 строки) и CTA-text-ссылка в каталог.
- [x] Двухколоночный layout на lg+, вертикальный стек на mobile.
- [x] Фон section — однотонный светлый (`bg-ivory-50` / `bg-white`).
- [x] Marquee-блок (после `</section>`) — НЕ тронут.
- [x] Все «запреты» соблюдены (нет золотых уголков, backdrop-blur, rose-фона, ротации, MosaicCell).
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build`.

## Не входит в задачу
- Менять Categories, About, Footer, Header.
- Менять marquee-ленту.
- Добавлять новые фото в `public/hero/`.

## Артефакты
- `components/Hero.tsx` — переписан как magazine cover. Файл сократился с 254 до 159 строк. Структура: 2-колоночный grid на lg+ (`container-site grid lg:grid-cols-2 lg:items-center lg:gap-16`), фон `bg-ivory-50`, padding `py-20 lg:py-28`. ЛЕВО (типографика): eyebrow «Boutique №06 · Spring» (gold-600 капс 11px, tracking-0.35em) → H1 «PAPER.» (Playfair font-light text-6xl→8xl, leading-0.95) + перенос строки + «Fairies» (font-script italic text-rose-700) → subline «Бутик нежности» (font-script italic 2xl→3xl rose-700) → тонкая золотая линия `h-px w-12 bg-gold-400/60` → lead-параграф «Аксессуары для волос, рук и историй...» (text-ink-600) → CTA `<Link>` «Открыть каталог» с ArrowRight, тонкий text-link с `border-b border-ink-900` и hover на rose-700 → micro-meta «Made in Russia · Since 2024» (10px капс ink-500). ПРАВО (фото): главное hero-1 `aspect-3/4` чистое без рамок (priority, fill, object-cover), второе hero-3 `w-48% aspect-3/4 absolute bottom-[-5%] left-[-8%] z-10` с легким перекрытием на ~15-20%, скрыто на mobile через `hidden sm:block`. Под вторым фото caption «Spring '26» (10px капс).

## Заметки исполнения
- 2026-05-25 — пользователь попросила отменить редизайн. Откат выполнен через frontend-builder, Hero.tsx приведён к исходному виду. tsc прошёл без ошибок.
- Полностью удалено: массив 3 фото с авторотацией каждые 7s, useState/useEffect для featured, MosaicCell-функция (~70 строк), orderedPhotos, selectFeatured, размытый featured-фотофон с blur(60px), 2 gradient overlay, 4 декоративных gold-corner div, белая подложка bg-white/90+backdrop-blur+shadow-petal, кликабельные точки-индикаторы прогресса, импорт AnimatePresence.
- Сохранено: блок Marquee после `</section>` — без изменений, остался на font-script italic rose-700 с символами ❀⚜❋☙ (задачи 16/17).
- Креативное решение в H1: «PAPER.» Playfair regular + перенос + «Fairies» в font-script italic rose-700 — контрастный микс шрифтов как обложка журнала.
- hero-2.png физически не удалён — файл оставлен в `public/hero/` на случай возврата.
- `npx tsc --noEmit` запущен агентом — без ошибок. `npm run build` не запускался.
- Без отклонений от acceptance criteria.
