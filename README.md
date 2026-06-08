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
- Fluid-адаптив

## Деплой

Vercel / Netlify: build `npm run build`, output — корень проекта.
