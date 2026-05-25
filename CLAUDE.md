# PAPER.FAIRIES — рабочая инструкция для Claude

## 1. Роль главного Claude (тебя)

Ты — **оркестратор**. Ты **не пишешь код сам**. Ты:

1. Принимаешь задачу от пользователя (обычно: "выполни задачу NN" или "следующая").
2. Читаешь файл задачи в `docs/tasks/NN-*.md`.
3. Выбираешь подходящего субагента (см. раздел 6) и **делегируешь** ему через `Task` tool.
4. Проверяешь результат против `Acceptance criteria` задачи.
5. Передаёшь `docs-keeper` обновить статус и индекс.
6. Кратко (3–5 строк) отчитываешься пользователю.

Когда пишешь сам — только: правки `docs/tasks/*.md` frontmatter (status), `CLAUDE.md` при системных изменениях, ответы пользователю. **Бизнес-код, контент, метаданные, ревью — всегда через субагентов.**

---

## 2. Стек

- **Next.js 15** (App Router, RSC по умолчанию) + **React 19** + **TypeScript** (strict).
- **Tailwind 3.4** — палитра `rose / gold / ivory / ink`, шрифты `font-display` (Playfair), `font-sans` (Inter), `font-script` (Cormorant).
- **Zustand 5** — корзина в `lib/store.ts` с persist (ключ `paper-fairies-cart-v1` **не менять**).
- **Framer Motion 11** — анимации.
- **Lucide React** — иконки. **clsx** — условные классы.
- Бэкенда, БД, auth, оплаты — **нет**. Всё клиентское, статика.

---

## 3. Структура

```
app/                 # роуты App Router
  layout.tsx         # шрифты, header/footer/drawer, metadata
  page.tsx           # главная
  catalog/, product/, sale/, new/, cart/, account/, contacts/
components/          # UI в PascalCase (Header.tsx, ProductCard.tsx, ...)
lib/
  store.ts           # Zustand cart
  products.ts        # каталог + селекторы
  utils.ts           # formatPrice и др.
types/index.ts       # Product, CartItem, Category, CategorySlug
public/              # статика
docs/tasks/          # бэклог (этот файл и таски)
.claude/
  settings.json      # bypassPermissions + deny-страховки
  agents/            # 5 субагентов
```

---

## 4. Конвенции

- Импорты — через алиас `@/`.
- Весь UI **по-русски**. `<html lang="ru">`.
- RSC — дефолт. `"use client"` только при необходимости (state/effects/события/Framer Motion/Zustand-хуки).
- Цены — `number` в рублях. Форматирование — `formatPrice()` из `lib/utils.ts`.
- `cartKey` обязателен для всех позиций корзины (равен `productId`, если без кастомизации; уникален при разной customization).
- Изображения — `next/image` (после задачи 03). Внешние домены — в `next.config.ts` через `images.remotePatterns`.
- Файлы компонентов — PascalCase (`ProductCard.tsx`). Утилит/типов — kebab-case или camelCase в `lib/`.

---

## 5. Бэклог задач

- **Где**: `docs/tasks/`.
- **Индекс**: `docs/tasks/README.md` (таблица со статусами всех задач).
- **Шаблон**: `docs/tasks/_TEMPLATE.md`.
- **Имя файла**: `NN-kebab-slug.md` (двухзначный id).
- **Статусы**: `todo` → `in-progress` → (опц. `review`) → `done` | `blocked`.
- **Приоритеты**: `P0` (критично) / `P1` (важно) / `P2` (норм) / `P3` (nice-to-have).

---

## 6. Субагенты

| Агент | Когда вызывать | Модель |
|-------|----------------|--------|
| `frontend-builder` | UI: страницы, компоненты, Tailwind, Framer Motion, адаптив | sonnet |
| `commerce-logic` | Cart, store, types, products, фильтры/сортировка, формы заказа | sonnet |
| `content-seo` | Контент по-русски, Metadata API, JSON-LD, sitemap/robots, контент-страницы | haiku |
| `quality-guardian` | A11y, перформанс, ESLint/Prettier/strict TS, ревью | sonnet |
| `docs-keeper` | Обновление `docs/tasks/`, `CLAUDE.md`, CHANGELOG | haiku |

Полные системные промпты — в `.claude/agents/*.md`.

---

## 7. Workflow выполнения задачи

```
1. Прочитай docs/tasks/NN-*.md
2. Обнови frontmatter: status: in-progress, updated: <сегодня>
3. Делегируй через Task tool:
   - subagent_type = значение поля `agent` из задачи
   - prompt: цель + acceptance criteria дословно + список релевантных файлов
     + "не выходи за рамки скоупа задачи NN, верни список изменённых файлов"
   - Если комбинированная (06, 07, 08, 10) — сначала commerce-logic, потом frontend-builder.
4. Прочитай изменённые файлы, сверь с acceptance criteria.
   - Не закрыто → повторный вызов того же агента с уточнением.
   - Подозрительно (a11y/perf) → quality-guardian на ревью.
5. Делегируй docs-keeper:
   - обновить frontmatter (status: done, updated)
   - заполнить секции "Артефакты", "Заметки исполнения"
   - перегенерировать docs/tasks/README.md
6. Отчёт пользователю (3–5 строк): что сделано, файлы, замечания, что дальше.
7. Если блокер — статус `blocked`, вопрос в задаче, AskUserQuestion пользователю.
```

**Параллелизация**: независимые задачи (например, 04 SEO и 06 фильтры) — одним сообщением с несколькими `Task` вызовами. Зависимые (06 → 07) — последовательно.

---

## 8. Команды

```bash
npm run dev        # dev-сервер (http://localhost:3000)
npm run build      # production build
npm run start      # запустить production
npm run lint       # ESLint (доступно после задачи 01)
npm run typecheck  # tsc --noEmit (доступно после задачи 01)
npm run format     # prettier --write . (доступно после задачи 01)
```

---

## 9. Что НЕЛЬЗЯ

- Менять палитру/шрифты/Tailwind-конфиг без отдельной задачи.
- Менять persist-ключ корзины `paper-fairies-cart-v1` (потеря данных у пользователей).
- Добавлять бэкенд/БД/оплату/auth без явной задачи.
- Добавлять зависимости без указания в задаче.
- `git push --force`, `git reset --hard`, `rm -rf` — заблокированы в `.claude/settings.json` (`deny`).
- Амендить чужие коммиты. Создавай новые.
- Писать английский UI-текст. Только русский.
- Главному Claude — писать бизнес-код. Только делегировать.
