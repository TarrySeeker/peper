---
id: 18
title: Раздел «О бренде» — editorial moodboard + slideshow + pull quotes
status: done
agent: frontend-builder
priority: P1
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Полностью переосмыслить раздел «О бренде» в эстетике журнального разворота: убрать плашки и иконки, добавить moodboard из 5-6 фото с одним slideshow-кадром, преимущества подать как pull quotes с подписями.

## Контекст
- Файл: `components/About.tsx` (полная замена). Используется только на главной (`app/page.tsx`).
- Стек: Tailwind 3.4 (палитра `rose / gold / ivory / ink`), Framer Motion 11, `next/image`. Шрифты: `font-display` Playfair, `font-sans` Inter, `font-script` Cormorant.

## Что есть сейчас (удалить)
- Одно фото слева в скруглённой rounded-[2.5rem] рамке + плашка `«Тихая роскошь»` с backdrop-blur.
- 4 карточки-фичи в 2×2 сетке с иконками Lucide (Heart/Leaf/Gem/Scissors) в розовых кружках. Иконки убрать, кружки убрать, плашки `bg-white/60 backdrop-blur` убрать.

## Решения интервью
1. **Фото**: Moodboard из 5-6 фотографий разного размера в асимметричной (но НЕ хаотичной — выровненной) сетке. Без поворотов, без polaroid-рамок, без перекрытий — это editorial-разворот, а не скрэпбук.
2. **Интерактив**: одно из фото moodboard — slideshow с автоматической сменой 3-4 кадров с crossfade каждые 4-5 секунд, pause on hover. Можно сделать переключение thumbnails-ами (на маленьких фото moodboard) — клик меняет главное фото. Малые фото — статичные, лёгкий hover-зум (max scale 1.03, без агрессии).
3. **Pull quotes**: 4 преимущества (Ручная работа, Бережная упаковка, Премиум материалы, Персонализация) переписаны как короткие журнальные цитаты в крупном Playfair italic в кавычках «…», с микро-подписью капсом снизу (например `— РУЧНАЯ РАБОТА` в `text-[10px] uppercase tracking-[0.3em] text-gold-600`). Цитаты разбросаны по развороту между фото и текстовыми блоками.

## Что должно быть
1. **Заголовок секции**: 
   - eyebrow «О бренде» — тонкий, без декора.
   - h2 — оставить «Мы создаём вещи, которые хочется хранить» (или вариант), `font-display`, размер до `text-6xl` на lg.
2. **Основной текст истории бренда** — 1-2 коротких абзаца. Можно немного переписать существующий текст («PAPER.FAIRIES — небольшое московское ателье...») в более editorial-стиль, но не сильно.
3. **Moodboard 5-6 фото** — асимметричная CSS Grid (не absolute positioning). Размеры разные (например: 1 большое slideshow-фото `col-span-2 row-span-2`, 4-5 маленьких фото размера 1×1 или 2×1). Все выровнены в сетке, **без поворотов**.
4. **Slideshow** — одно фото из moodboard. Логика:
   - `useState<number>(activeIndex)` + `useEffect` с `setInterval` (4-5 секунд).
   - `AnimatePresence` + Framer Motion для crossfade (opacity 0 → 1, scale 1.02 → 1, duration 0.8s).
   - Pause on hover (через state `isPaused`).
   - Массив из 3-4 URL фотографий (брать первое фото из 3-4 категорий в `lib/products.ts` → `categories[i].image` ИЛИ из products[i].images[0]).
   - Снизу slideshow — мелкие точки-индикаторы (3-4 точки), кликабельные.
5. **Малые фото moodboard** — статичные, `next/image fill`, `object-cover`, hover: `scale-[1.03]` + лёгкий fade overlay (`bg-ink-900/5`). Без иконок-стрелок, без caption под ними (это moodboard, не каталог).
6. **Pull quotes** — 4 цитаты, разбросаны по сетке (не подряд):
   - Цитата 1: «Каждая вещь проходит через руки мастеров — без конвейера и спешки.» — РУЧНАЯ РАБОТА
   - Цитата 2: «Переработанный картон, шёлковые ленты и сухоцветы — упаковка как часть подарка.» — БЕРЕЖНАЯ УПАКОВКА
   - Цитата 3: «Ацетат, nappa-кожа, пресноводный жемчуг — материалы, которые приятно держать в руках.» — ПРЕМИУМ МАТЕРИАЛЫ
   - Цитата 4: «Гравировка инициалов превращает аксессуар в личную историю.» — ПЕРСОНАЛИЗАЦИЯ
   - Стилизация: `<blockquote>` с открывающей крупной кавычкой «», текст `font-display italic text-2xl lg:text-3xl text-ink-900` (или `font-script` если хочется ещё нежнее — но не яркое). Под текстом — подпись `font-sans text-[10px] uppercase tracking-[0.3em] text-gold-600 mt-3`.
   - Можно расположить цитаты так: одна сверху между текстом и moodboard, одна в правой колонке между фото, одна снизу слева, одна снизу справа. Расстановка через CSS Grid с явными `col-start/row-start` или просто через flow в нужных местах разметки.
7. **Параллакс** — у одного крупного фото (главного slideshow) можно оставить `useScroll` + `useTransform` parallax (как было сейчас в `motion.div style={{ y }}`), это добавит кинематографичности.
8. **Фон секции** — мягкий, можно оставить `bg-rose-100/70 blur-3xl` пятно слева (есть сейчас) — для атмосферы. Или сменить на более спокойный градиент. На усмотрение.

## Запреты
- ❌ Никаких иконок Lucide (Heart, Leaf, Gem, Scissors — удалить импорт).
- ❌ Никаких кружков-плашек под иконки.
- ❌ Никаких карточек `bg-white/60 backdrop-blur` с features.
- ❌ Никакой плашки «Тихая роскошь» поверх фото.
- ❌ Никаких поворотов фото / polaroid-стиля.
- ❌ Никакого `rounded-[2.5rem]` гипертрофированно скруглённого фото. Допустимо `rounded-sm`/`rounded-md` максимум, лучше `rounded-none`.

## Acceptance criteria
- [x] Старая структура (одно фото + плашка + 4 карточки-иконки в 2×2) полностью убрана.
- [x] Moodboard из 5-6 фото в асимметричной CSS Grid (без поворотов, без перекрытий).
- [x] Одно фото в moodboard — slideshow с 3-4 кадрами, crossfade каждые 4-5 секунд, pause on hover, кликабельные точки-индикаторы.
- [x] 4 pull quotes в `<blockquote>` с журнальной типографикой (Playfair italic или script) и микро-подписями капсом — разбросаны по развороту, не подряд.
- [x] Иконки Lucide и плашки полностью удалены.
- [x] Заголовок секции (eyebrow + h2 + текст истории) — сохранён или слегка пересмотрен в editorial-стиле.
- [x] Hover-зум на малых фото moodboard (scale 1.03, без агрессии).
- [x] Доступность: alt у всех фото, кнопки точек-индикаторов имеют `aria-label`, `<blockquote>` правильно размечен с `<cite>` или просто `<span>` для подписи.
- [x] `npx tsc --noEmit` проходит. **НЕ запускать** `npm run build` — ломает dev-кеш.

## Фотографии
Использовать **существующие фото** из `lib/products.ts`:
- Из `categories` (6 элементов) — поле `image`.
- Из `products` (15 элементов) — поле `images[0]`.
- Это безопаснее, чем новые Unsplash URL (недавно были 404 на старых ссылках).
- Главное slideshow — 3-4 фото из разных категорий (например, krabiki/sumki/grebeshki/kosmetichki).
- Малые фото moodboard — детали разных категорий.

## Не входит в задачу
- Менять Hero, Categories, Footer, другие секции.
- Менять `lib/products.ts`.
- Глобальные стили, шрифты, палитру.

## Артефакты
- `components/About.tsx` — полностью переписан как editorial-moodboard. Структура: заголовок (eyebrow «О бренде» + h2 «Мы создаём вещи, которые хочется хранить» с font-script accent + 2 абзаца истории), Pull Quote 1 над moodboard с rose-border-left, асимметричная CSS Grid 4 колонки × 3 строки на lg (slideshow col-span-2 row-span-3 в портретном 3:4 + 4 малых aspect-square фото в правой половине + Pull Quote 2 в среднем правом пролёте с gold-border-left), внизу — Pull Quotes 3 и 4 в 2-колоночной сетке с rose- и gold-border-left. Slideshow: useState/useEffect с setInterval 4500ms, AnimatePresence + Framer Motion crossfade 0.8s, pause on hover, 4 кликабельных точки-индикатора (`h-1 w-6 bg-rose-700` активная / `bg-ink-300/70` неактивная) с aria-selected/aria-label. Малые фото с hover scale 1.03 + bg-ink-900/5 overlay. Parallax на slideshow через useScroll + useTransform y[50, -50]. Фон: rose-100/60 + gold-400/10 blur-3xl пятна. Все фото импортированы из lib/products.ts (categories + products) — 8 уникальных URL, мёртвый URL гребешков не используется.

## Заметки исполнения
- Удалено: импорт Lucide-иконок (Heart/Leaf/Gem/Scissors), массив features, плашка «Тихая роскошь», карточки bg-white/60 backdrop-blur, rounded-[2.5rem].
- Pull quotes: 4 цитаты в `<blockquote>` с открывающей кавычкой `«` в rose-300/60 font-display 5xl, текст font-display italic 2xl/3xl, подпись font-sans 10px uppercase tracking-[0.3em] gold-600.
- Slideshow: 4 фото из categories (krabiki, sumki, kosmetichki) + products[8] (заколка Crystal Drops, заменяет мёртвую категорию grebeshki).
- Малые фото: products[7], products[3], products[2], products[9] — 4 разных категории.
- Follow-up к первой версии: жёстко вшитые URL заменены на импорт из `lib/products.ts` для надёжности — мёртвый URL `photo-1631730486785-466d2b21ddca` исключён.
- `npx tsc --noEmit` прошёл. `npm run build` не запускался.
- Без отклонений от acceptance criteria.
