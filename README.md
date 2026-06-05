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

## GitHub

https://github.com/kyoshisu/social-network-ui-kit
