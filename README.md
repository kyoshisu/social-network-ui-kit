# UI Kit - Social Network

UI Kit для итогового проекта social_network. Компоненты на БЭМ, стили в SCSS.

## Структура

```
UI kit/
├── docs/index.html
├── css/
├── scss/
│   ├── variables/
│   ├── base/
│   ├── layout/
│   ├── components/
│   └── pages/
├── html/
├── js/
└── assets/
```

## Компоненты

- button - primary, secondary, disabled, 3 размера
- input - normal, focus, error, с иконкой
- dropdown
- checkbox, radio
- card - с картинкой и без, 3 размера
- navbar - десктоп и мобилка
- container, grid

## Запуск

Открыть `docs/index.html` в браузере.

Сборка css:

```bash
npm install
npm run build:css
```

## Домашнее задание: асинхронный JavaScript

Папка `async-javascript/`:

| Файл | Задание |
|------|---------|
| `task1-event-loop.js` | Event Loop (console.log, setTimeout, Promise) |
| `task2-promise.js` | Цепочка Promise и fetchData |
| `task3-async-await.js` | То же через async/await |
| `task4-progress-bar.html` | Прогресс-бар на 5 секунд |

Запуск в терминале:

```bash
node async-javascript/task1-event-loop.js
node async-javascript/task2-promise.js
node async-javascript/task3-async-await.js
```

Задание 4 — открыть `async-javascript/task4-progress-bar.html` в браузере.

## React-приложение (маршрутизация, API, Context)

Папка `app/` — каталог на React Router.

| Маршрут | Страница |
|---------|----------|
| `/` | Главная |
| `/list` | Список товаров |
| `/list/:id` | Карточка товара |
| `/about` | О проекте |

Запуск:

```bash
cd app
npm install
npm run dev
```

Сборка: `npm run build` (в папке `app`).

API: [fakestoreapi.com](https://fakestoreapi.com). Каталог кэшируется в Context, избранное хранится в Context и localStorage.

Маршрут `/favourites` — страница избранного (название, количество, мета, удаление).

Тесты (Vitest + React Testing Library, API как у Jest):

```bash
cd app
npm test
```

Сборка и превью:

```bash
npm run build
npm run preview
```

### GitHub Pages

После push в `main` workflow `.github/workflows/deploy-app.yml` публикует приложение.

Ссылка: `https://kyoshisu.github.io/social-network-ui-kit/`

В настройках репозитория: Settings → Pages → Source: GitHub Actions.

### Lighthouse

```bash
cd app
npm run build
npm run preview
npx lighthouse http://localhost:4173 --only-categories=performance,accessibility --view
```

Цели: Performance > 80, Accessibility > 90.

### Netlify

Можно подключить репозиторий, base directory: `app`, build: `npm run build`, publish: `dist`.

## GitHub

https://github.com/kyoshisu/social-network-ui-kit
