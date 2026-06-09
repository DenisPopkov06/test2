# Courses Catalog — Test Task

Каталог онлайн-курсов на **HTML + Vanilla JS + SCSS (BEM)**.

## Структура

```
src/
  assets/           # фото, SVG-декор
  scss/             # стили (BEM)
  js/
    data/           # курсы, константы
    utils/          # фильтрация, изображения
    catalog/        # CourseCatalog + render
    main.js
index.html
css/main.css        # сборка из SCSS
```

## Запуск

```bash
npm install
npm run build:css
npx serve .
```

Или `npm run dev` — соберёт CSS и запустит локальный сервер.

## Функциональность

- Поиск по названию (живой, без перезагрузки)
- Фильтрация по категориям со счётчиками
- Load more / Show less
- Fluid-адаптив (масштаб от `min(100vw, 1290px)`, контрольные точки: 1920 / 1440 / 1024 / 768 / 375 / 320)

## Семантика и a11y

- Outline страницы: `p.courses__label` (kicker) → `h1` (заголовок секции) → `h2` (название курса в карточке).
- Если каталог встраивается в страницу с собственной иерархией заголовков, уровень заголовка карточки (`h2` / `h3`) нужно согласовать с контекстом.

## Архитектура

- `CourseCatalog` — состояние и обработчики; вся мутация DOM — через `render.js` (`renderGrid`, `renderEmpty`, `setGridBusy` и т.д.).
- Обработчики привязаны через `.bind(this)`, есть `destroy()` для снятия слушателей (на одностраничнике не вызывается, но готово к переиспользованию).
- При «Show less» секция прокручивается к началу через `scrollIntoView`.

## Деплой

Vercel / Netlify: build `npm run build`, output — корень проекта.
