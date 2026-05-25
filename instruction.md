# Инструкция по деплою PAPER.FAIRIES на GitHub Pages

## Что уже сделано в проекте

- `next.config.ts` настроен на статический экспорт (`output: "export"`)
- Создан GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Автодеплой срабатывает при каждом пуше в ветку `main`

---

## Шаги деплоя

### 1. Создать репозиторий на GitHub

1. Зайти на [github.com](https://github.com) → **New repository**
2. Имя репозитория (запомни его, понадобится далее): например `paper-fairies`
3. Выбрать **Public** (GitHub Pages бесплатен только для публичных репо)
4. **Не** инициализировать с README, .gitignore и т.п.
5. Нажать **Create repository**

### 2. Инициализировать git и запушить код

Открыть терминал в папке проекта (`paper/`) и выполнить:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/НАЗВАНИЕ_РЕПО.git
git push -u origin main
```

Заменить:
- `ВАШ_ЛОГИН` — твой GitHub username
- `НАЗВАНИЕ_РЕПО` — имя репозитория из шага 1

### 3. Включить GitHub Pages

1. Зайти в репозиторий → **Settings** → **Pages** (левое меню)
2. В разделе **Build and deployment** выбрать:
   - Source: **GitHub Actions**
3. Сохранить

### 4. Проверить деплой

1. Перейти во вкладку **Actions** репозитория
2. Там должен запуститься workflow **Deploy to GitHub Pages**
3. Дождаться зелёной галочки (обычно 1–3 минуты)
4. Сайт будет доступен по адресу:

```
https://ВАШ_ЛОГИН.github.io/НАЗВАНИЕ_РЕПО/
```

---

## Последующие обновления

Каждый раз, когда делаешь изменения:

```bash
git add .
git commit -m "описание изменений"
git push
```

GitHub Actions автоматически соберёт и задеплоит новую версию.

---

## Локальный запуск (для разработки)

```bash
npm install      # первый раз
npm run dev      # http://localhost:3000
```

Для проверки production-сборки локально:

```bash
npm run build    # создаст папку out/
npx serve out    # локальный сервер из папки out/
```

---

## Возможные проблемы

### Картинки не отображаются

Убедись, что в `next.config.ts` задан правильный `repoName`. Если имя репозитория отличается от `paper-fairies`, укажи его явно:

```ts
const repoName = process.env.REPO_NAME || "paper-fairies"; // или твоё имя репо
```

Либо GitHub Actions передаёт его автоматически через `REPO_NAME: ${{ github.event.repository.name }}` — это уже настроено в `.github/workflows/deploy.yml`.

### Страница 404 на обновление/прямой переход

GitHub Pages не поддерживает серверную маршрутизацию. При прямом заходе на `/product/123` может вернуть 404.

Обходное решение — создать файл `public/404.html`, который перенаправляет на главную. Но для витрины этот сценарий некритичен — пользователи навигируют через интерфейс.

### Workflow не запускается

Убедись что:
1. Ветка называется `main` (не `master`)
2. В **Settings → Pages** выбрано `GitHub Actions` как источник
3. Файл `.github/workflows/deploy.yml` закоммичен и запушен

---

## Структура деплоя

```
git push → GitHub Actions → npm run build → папка out/ → GitHub Pages
```

Сайт полностью статический (HTML + CSS + JS), работает без сервера.
