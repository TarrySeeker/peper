# Бэклог задач — PAPER.FAIRIES

Индекс задач. Поддерживается агентом `docs-keeper` после каждой завершённой задачи.

**Легенда статусов:** `todo` · `in-progress` · `review` · `done` · `blocked` · `reverted`
**Приоритеты:** `P0` критично · `P1` важно · `P2` норм · `P3` nice-to-have

## Стартовый набор

| ID | Title | Agent | Priority | Status | Updated |
|----|-------|-------|----------|--------|---------|
| 01 | [ESLint + Prettier + strict TS](./01-eslint-prettier-setup.md) | quality-guardian | P0 | todo | 2026-05-25 |
| 02 | [CLAUDE.md финализация](./02-claude-md-bootstrap.md) | docs-keeper | P0 | todo | 2026-05-25 |
| 03 | [Миграция на next/image](./03-next-image-migration.md) | quality-guardian | P1 | todo | 2026-05-25 |
| 04 | [SEO metadata + JSON-LD](./04-seo-metadata-jsonld.md) | content-seo | P1 | todo | 2026-05-25 |
| 05 | [sitemap.ts + robots.ts](./05-sitemap-robots.md) | content-seo | P1 | todo | 2026-05-25 |
| 06 | [Каталог: фильтры и сортировка](./06-catalog-filters-sort.md) | commerce-logic → frontend-builder | P1 | todo | 2026-05-25 |
| 07 | [Checkout flow (stub)](./07-checkout-flow-stub.md) | commerce-logic → frontend-builder | P1 | todo | 2026-05-25 |
| 08 | [Контент-страницы (доставка, оплата, политики)](./08-policy-pages.md) | content-seo → frontend-builder | P2 | todo | 2026-05-25 |
| 09 | [A11y-аудит](./09-a11y-audit-pass.md) | quality-guardian | P2 | todo | 2026-05-25 |
| 10 | [Полировка раздела «Аккаунт»](./10-account-stub-polish.md) | frontend-builder + commerce-logic | P3 | todo | 2026-05-25 |
| 11 | [Блок «Категории» — визуальное обновление](./11-categories-visual-refresh.md) | frontend-builder | P1 | done | 2026-05-25 |
| 12 | [Блок «Категории» — типографическая лента с marquee-hover и винтажной фурнитурой](./12-categories-typographic-marquee.md) | frontend-builder | P1 | done | 2026-05-25 |
| 13 | [Блок «Категории» — polaroid lookbook (журнальный коллаж)](./13-categories-polaroid-lookbook.md) | frontend-builder | P1 | done | 2026-05-25 |
| 14 | [Блок «Категории» — архитектурная чистота (Apple/Aesop редизайн)](./14-categories-architectural-quiet.md) | frontend-builder | P1 | done | 2026-05-25 |
| 15 | [Бегущая лента — editorial-редизайн в стиле сайта](./15-marquee-editorial-redesign.md) | frontend-builder | P1 | reverted | 2026-05-25 |
| 16 | [Бегущая лента — акцентная типографика + элегантные разделители-символы](./16-marquee-elegant-symbols.md) | frontend-builder | P1 | done | 2026-05-25 |
| 17 | [Бегущая лента — обновить контент и ускорить](./17-marquee-content-speed-tweak.md) | frontend-builder | P1 | done | 2026-05-25 |
| 18 | [Раздел «О бренде» — editorial moodboard + slideshow + pull quotes](./18-about-editorial-moodboard.md) | frontend-builder | P1 | done | 2026-05-25 |
| 19 | [Категория «Крабики» — заменить Unsplash-фото на локальный файл](./19-krabiki-local-photo.md) | commerce-logic | P1 | done | 2026-05-25 |
| 20 | [Категории «Расчёски» и «Косметички» — заменить Unsplash-фото на локальные файлы](./20-rascheski-kosmetichki-local-photos.md) | commerce-logic | P1 | done | 2026-05-25 |
| 21 | [Категории «Гребешки» и «Сумки» — заменить Unsplash-фото на локальные файлы](./21-grebeshki-sumki-local-photos.md) | commerce-logic | P1 | done | 2026-05-25 |
| 22 | [Удалить категорию «Заколки» из проекта](./22-remove-zakolki-category.md) | commerce-logic + content-seo + frontend-builder | P1 | done | 2026-05-25 |
| 23 | [Hero — журнальная обложка с именем бренда и 2 фото](./23-hero-editorial-magazine-cover.md) | frontend-builder | P1 | reverted | 2026-05-25 |
| 24 | [Бестселлеры и Акции — оставить по 2 карточки в каждом блоке](./24-reduce-bestsellers-sale-cards.md) | frontend-builder | P2 | done | 2026-05-25 |
| 25 | [Страница /new — оставить только информационный блок без карточек товаров](./25-new-page-info-only.md) | frontend-builder | P2 | done | 2026-05-25 |
| 26 | [Hero — full-bleed split 50/50 (фото слева, нежно-розовый фон справа)](./26-hero-fullbleed-split.md) | frontend-builder | P1 | done | 2026-05-25 |
| 27 | [Hero — добавить editorial-текст на правый розовый блок](./27-hero-add-editorial-text.md) | frontend-builder | P1 | done | 2026-05-25 |
| 28 | [Hero — подключить дизайнерский шрифт Unbounded для H2 + сместить текст правее и выше](./28-hero-designer-font-position.md) | frontend-builder | P1 | done | 2026-05-25 |
| 29 | [Hero — Manrope (аналог Josefin Sans с кириллицей) + текст в центр розового блока](./29-hero-josefin-center.md) | frontend-builder | P1 | done | 2026-05-25 |
| 30 | [ProductCard — убрать фото, поставить нежно-розовый фон с цветком + чёткие углы (без скруглений)](./30-product-card-flower-sharp.md) | frontend-builder | P1 | done | 2026-05-25 |
| 31 | [Bestsellers — добавить 2 новых товара (расчёска + шкатулка) и расширить отображение до 4 карточек](./31-bestsellers-add-two-products.md) | commerce-logic | P1 | done | 2026-05-25 |
| 32 | [ProductCard — вернуть отображение фото товара (откат части задачи 30), сохранить чёткие углы](./32-product-card-restore-images.md) | frontend-builder | P1 | done | 2026-05-25 |
| 33 | [Bestsellers — заменить фото 3-й и 4-й карточек на photo/9 и photo/10, добавить -25% на Beech Bloom](./33-bestsellers-update-krab-beech-images.md) | commerce-logic | P1 | done | 2026-05-25 |
| 34 | [About — добавить акцентный блок «Итальянские ткани · premium качество · от 700 ₽/м»](./34-about-italian-fabrics-accent.md) | frontend-builder | P1 | done | 2026-05-25 |
| 35 | [About — убрать «Materiali» из eyebrow, заменить 5 изображений](./35-about-remove-materiali-replace-images.md) | frontend-builder | P1 | done | 2026-05-25 |
| 36 | [Удалить из каталога товары raschesk-poket (Карманная расчёска) и kosmet-mini (Косметичка «Petite»)](./36-remove-raschesk-poket-kosmet-mini.md) | commerce-logic | P1 | done | 2026-05-25 |
| 37 | [Hero — заменить шрифт H2 на прописной кириллический Marck Script](./37-hero-marck-script-cyrillic.md) | frontend-builder | P1 | done | 2026-05-25 |
| 38 | [Hero — заменить Marck Script на локальный Julia Script (с Mac пользователя)](./38-hero-julia-script-local.md) | frontend-builder | P1 | done | 2026-05-25 |
| 39 | [Hero — заменить Julia Script на локальный Passions Conflict RUS](./39-hero-passions-conflict-rus.md) | frontend-builder | P1 | done | 2026-05-25 |
| 40 | [Поиск и избранное — рабочая функциональность (overlay поиска + drawer избранного + persist-store)](./40-search-favorites-functional.md) | commerce-logic + frontend-builder | P1 | done | 2026-05-25 |
| 41 | [Убрать изображения у товаров greb-bamboo и kosmet-quilt + fallback на пустой розовый блок во всех местах](./41-remove-images-greb-bamboo-kosmet-quilt.md) | commerce-logic + frontend-builder | P1 | done | 2026-05-25 |
| 42 | [Розовее Header и фоны секций Bestsellers / Sale / About / ContactSection](./42-pinker-header-sections.md) | frontend-builder | P1 | done | 2026-05-25 |
| 43 | [Адаптивный аудит и точечные правки — desktop / tablet / mobile](./43-responsive-audit-fix.md) | quality-guardian → frontend-builder | P1 | done | 2026-05-25 |
| 44 | [Декоративный розовый blur-blob градиент в Bestsellers / Sale / About / ContactSection](./44-pink-blob-gradient-sections.md) | frontend-builder | P1 | done | 2026-05-25 |
| 45 | [About — упорядочить moodboard, выровнять фото и текст в чистую editorial-сетку](./45-about-moodboard-cleanup.md) | frontend-builder | P1 | done | 2026-05-25 |

## Как добавить задачу

1. Скопируй [_TEMPLATE.md](./_TEMPLATE.md) в `NN-kebab-slug.md` (следующий свободный id).
2. Заполни frontmatter и секции "Цель", "Контекст", "Acceptance criteria".
3. Добавь строку в таблицу выше (или попроси `docs-keeper`).

## Будущие идеи (не в стартовом наборе)
- Vitest + React Testing Library setup.
- Реальный бэкенд (Next API routes + БД, например SQLite/Postgres).
- Платёжная интеграция (ЮKassa / СберPay).
- E-mail уведомления о заказе.
- Админка для редактирования каталога.
