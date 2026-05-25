---
id: 01
title: ESLint + Prettier + strict TypeScript
status: todo
agent: quality-guardian
priority: P0
created: 2026-05-25
updated: 2026-05-25
---

## Цель
Поднять базовые инструменты качества кода: линтинг, форматирование, строгий TypeScript — чтобы дальнейшие правки от агентов проходили автоматическую проверку.

## Контекст
- Сейчас в `package.json` есть только `next lint`, но конфиг ESLint не создан и зависимости не установлены.
- Prettier не подключён, форматирование разное от файла к файлу.
- `tsconfig.json` без `strict: true` — нужно проверить и включить.
- Файлы для проверки: `package.json`, `tsconfig.json`, `.gitignore`.

## Acceptance criteria
- [ ] Установлены devDependencies: `eslint`, `eslint-config-next`, `prettier`.
- [ ] Создан `.eslintrc.json` с `extends: ["next/core-web-vitals", "next/typescript"]`.
- [ ] Создан `.prettierrc.json` (printWidth 100, semi true, singleQuote false, trailingComma "all", tabWidth 2).
- [ ] Создан `.prettierignore` (.next, node_modules, package-lock.json, public, *.md в docs/tasks).
- [ ] `tsconfig.json` — включены `strict: true`, `noUncheckedIndexedAccess: true`, `forceConsistentCasingInFileNames: true`.
- [ ] В `package.json` добавлены scripts: `format` (`prettier --write .`), `typecheck` (`tsc --noEmit`). `lint` уже есть.
- [ ] `npm run lint` и `npm run typecheck` проходят без ошибок (если есть — починить или явно отметить в "Заметках исполнения" с обоснованием).
- [ ] `npm run build` проходит успешно.

## Не входит в задачу
- Глобальный авто-формат всех файлов проекта (только формат конфигов, которые создаются).
- Настройка `husky`/`lint-staged` (отдельная задача при необходимости).
- Добавление кастомных правил ESLint сверх дефолтов `next`.

## Артефакты
_Заполняется по факту._

## Заметки исполнения
_Заполняется по факту._
