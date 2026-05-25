---
id: 45
title: About — упорядочить moodboard, выровнять фото и текст в чистую editorial-сетку
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Текущий 4-колоночный сложный grid в About (slideshow + 4 маленьких фото + цитата 2 в центре + асимметричные aspect-ratio) выглядит «хаотично»: фото съехали, текст и фото не сбалансированы. Нужен **редизайн moodboard** в простую editorial-сетку с равномерным выравниванием. Без новых картинок, без новых данных — только пересборка layout-классов и порядка элементов.

## Контекст
Файл: `components/About.tsx` строки ~210-365 (блок «Editorial Moodboard Grid» + «Bottom Pull Quotes Row»).

Сейчас:
- 4-col grid (lg) с `lg:grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]`
- Slideshow занимает col 1-2 row 1-3 (большой левый)
- Small photo 1 — col 3 row 1
- Small photo 2 — col 4 row 1
- Pull Quote 2 — col 3-4 row 2 (текст в правой средней зоне)
- Small photo 3 — col 3 row 3, `aspect-[4/5]` (искусственно выше)
- Small photo 4 — col 4 row 3, `aspect-square`
- Ниже: Bottom row с Pull Quotes 3 & 4 в `grid-cols-2`

Проблемы:
- Photo 3 и 4 в одной row, но разные aspect → row растягивается под высокий, photo 4 имеет пустое пространство сверху/снизу.
- Pull Quote 2 в правой средней зоне ломает симметрию (фото слева, текст справа).
- На mobile (когда grid становится `grid-cols-1`) порядок DOM выдаёт фото-фото-цитата-фото-фото — без визуального ритма.

## Что сделать

### `components/About.tsx`

**Заменить весь блок Editorial Moodboard Grid (строки ~210-360) и Bottom Pull Quotes Row** на упрощённую структуру:

```tsx
{/* ── Editorial Moodboard — cleaned up 2-col layout ── */}
<div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
  {/* Slideshow — левая колонка, spans 2 rows на lg */}
  <motion.div
    ref={slideshowRef}
    style={{ y }}
    className="relative overflow-hidden rounded-sm lg:row-span-2"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
  >
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ivory-200 lg:aspect-auto lg:h-full">
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slideshowImages[activeIndex].src}
            alt={slideshowImages[activeIndex].alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slideshow dot indicators — только если slides > 1 */}
      {slideshowImages.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
          role="tablist"
          aria-label="Слайды главного фото"
        >
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Фото ${i + 1} из ${slideshowImages.length}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1 rounded-full transition-all duration-400 ${
                i === activeIndex
                  ? "w-6 bg-rose-700"
                  : "w-6 bg-ink-300/70 hover:bg-ink-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  </motion.div>

  {/* Правая верхняя ячейка — Pull Quote 2 над сеткой 2x2 */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    className="flex flex-col gap-3 lg:gap-6"
  >
    <div className="border-l-2 border-gold-400/40 pl-5">
      <PullQuoteBlock quote={pullQuotes[1]} />
    </div>

    {/* 2x2 grid маленьких фото */}
    <div className="grid grid-cols-2 gap-3 lg:gap-6">
      {smallPhotos.slice(0, 4).map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.07 * i, ease: "easeOut" }}
          className="group relative overflow-hidden rounded-sm"
        >
          <div className="relative aspect-square overflow-hidden bg-ivory-200">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</div>

{/* ── Bottom Pull Quotes Row — quotes 3 & 4 ── */}
<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-10">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="border-l-2 border-rose-200 pl-6"
  >
    <PullQuoteBlock quote={pullQuotes[2]} />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    className="border-l-2 border-gold-400/40 pl-6"
  >
    <PullQuoteBlock quote={pullQuotes[3]} />
  </motion.div>
</div>
```

### Логика нового layout

**Desktop (lg+):**
- 2 равных колонки.
- ЛЕВАЯ колонка — большое слайдшоу (`aspect-auto h-full` чтобы занимать всю высоту правой колонки).
- ПРАВАЯ колонка — стек: Pull Quote 2 (вверху) + 2×2 сетка из 4-х маленьких фото (внизу).
- Все маленькие фото — **`aspect-square`** (единообразно).
- Слайдшоу через `lg:row-span-2`+`lg:h-full` тянется по высоте правой колонки.

**Mobile/Tablet (< lg):**
- Слайдшоу первым (`aspect-[3/4]`, полная ширина).
- Pull Quote 2 ниже.
- 2×2 сетка маленьких фото ещё ниже.
- Bottom Pull Quotes 3 & 4 — `grid-cols-1 sm:grid-cols-2`.

### Что НЕ трогать
- Header row (eyebrow / h2 / интро-параграфы) — не менять.
- Accent banner «Итальянские ткани» — не менять.
- **Pull Quote 1** (`mt-12 mb-10 border-l-2 border-rose-200 pl-6 max-w-md`) — оставить НА МЕСТЕ (перед moodboard).
- Pull Quotes 3 & 4 в bottom row — сохранить.
- Декоративные blur-blob, секция wrapper, `<section id="about">` — не менять.
- Массивы `slideshowImages`, `smallPhotos`, `pullQuotes` — не менять.
- Хуки `useScroll`, `useTransform`, `useState`, `useEffect`, `useRef` — не менять.
- Файл `lib/products.ts`, изображения в `public/about/` — не менять.

## Acceptance criteria
- [x] Editorial moodboard перестроен: на lg+ — 2 равных колонки (слайдшоу слева full-height, правая — quote 2 сверху + 2×2 сетка фото внизу).
- [x] Все 4 маленьких фото теперь `aspect-square` (без `aspect-[4/5]` на photo 3).
- [x] Pull Quote 2 находится в правой колонке вверху, перед сеткой фото.
- [x] Слайдшоу на lg занимает всю высоту правой колонки (`lg:row-span-2 lg:h-full lg:aspect-auto`).
- [x] На mobile (< lg) элементы стекаются вертикально: слайдшоу → quote 2 → 2×2 сетка фото → quotes 3&4.
- [x] Pull Quote 1 (перед moodboard), Pull Quote 3 и 4 (в bottom row) сохранены без изменений.
- [x] Header row, accent banner, секция wrapper, blur-blob — не тронуты.
- [x] Массивы `slideshowImages`, `smallPhotos`, `pullQuotes` — не тронуты.
- [x] Параллакс `y` на слайдшоу через `useScroll`/`useTransform` сохранён.
- [x] Hover-пауза слайдшоу (`onMouseEnter`/`onMouseLeave`) — работает.
- [x] Dot-индикаторы условны (length > 1), сохранены.
- [x] Компонент остаётся Client Component (`"use client"`).
- [x] `npx tsc --noEmit` без ошибок.

## Запреты
- ❌ Не менять Hero / Categories / Sale / Bestsellers / Footer / Header.
- ❌ Не вводить новые шрифты, цвета, иконки.
- ❌ Не добавлять новые изображения.
- ❌ Не менять PullQuoteBlock компонент.
- ❌ Не возвращать `aspect-[4/5]` на маленькие фото.
- ❌ Не менять массивы данных в начале файла.

## Не входит в задачу
- Добавлять анимацию параллакса на маленькие фото.
- Менять SVG-цветки или иконки.
- A11y-аудит структуры.

## Артефакты
- `components/About.tsx` — переписан блок Editorial Moodboard Grid (строки ~210-365) и Bottom Pull Quotes Row на 2-колоночный layout: слайдшоу full-height слева, Pull Quote 2 + 2×2 сетка фото справа.

## Заметки исполнения
**Решение проблемы:** Заменён сложный 4-col grid на редактор-симметричный 2-col layout. Левая колонка (слайдшоу) через `lg:row-span-2 lg:h-full lg:aspect-auto` занимает всю высоту правой, устраняя пустые пространства. Маленькие фото объединены в DRY-цикл `smallPhotos.slice(0, 4).map()` с единобразным `aspect-square`.

**Ключевые изменения:**
- Удалён `lg:grid-cols-4 lg:grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]`, заменён на `lg:grid-cols-2 lg:gap-6`.
- Pull Quote 2 перемещена в правую колонку вверху перед сеткой (вместо центральной позиции в grid).
- Все маленькие фото синхронизированы на `aspect-square` (убрана `aspect-[4/5]` с photo 3).
- Маленькие фото рендерятся через цикл вместо разноскатерных `absolute` позиций.
- Bottom row остался `grid gap-6 sm:grid-cols-2 lg:mt-10` для Pull Quotes 3 & 4.

**Верификация:**
- `npx tsc --noEmit` — exit 0.
- Dev-server HMR подхватил, HTTP 200.
- На desktop (lg): слайдшоу занимает левую колонку полностью по высоте, правая содержит quote 2 + 2×2 сетка маленьких фото, всё выравнено.
- На mobile: вертикальный flow слайдшоу → quote 2 → фото → bottom quotes.
- Параллакс, hover-пауза, dot-индикаторы работают.

**Не трогано:** Pull Quote 1, Header row, accent banner, blur-blob, массивы данных, прочие компоненты.
