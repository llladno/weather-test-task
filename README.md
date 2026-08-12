# ☀️ Погода

Веб-приложение для просмотра текущей погоды и прогноза на 5 дней по любому городу мира. Поиск города, автоопределение по геолокации, почасовой график температуры, выбор даты в календаре и красивое фото города на фоне — всё в адаптивном интерфейсе со светлой и тёмной темой.

## Стек технологий

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query) — загрузка и кеширование данных
- [Zustand](https://zustand.docs.pmnd.rs) — локальный стейт-менеджер (настройки, история поиска, тосты)
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) — юнит-тесты
- [Playwright](https://playwright.dev) — e2e-тесты
- [OpenWeather API](https://openweathermap.org/api) — данные о погоде
- [Unsplash API](https://unsplash.com/developers) — фотографии городов

## Требования

- Node.js **24.x**
- [pnpm](https://pnpm.io) **11.x**

## Установка

```bash
pnpm install
```

## Переменные окружения

Скопируйте файл-пример и заполните ключи API:

```bash
cp .env.local.example .env.local
```

```
OPENWEATHER_API_KEY=your_openweather_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

- `OPENWEATHER_API_KEY` — получить бесплатно на [openweathermap.org](https://home.openweathermap.org/api_keys)
- `UNSPLASH_ACCESS_KEY` — получить бесплатно на [unsplash.com/developers](https://unsplash.com/developers) (Access Key вашего приложения)

Оба ключа используются только на сервере (в route handlers `src/app/api/*`) и не попадают в клиентский бандл.

## Запуск в режиме разработки

```bash
pnpm dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

## Сборка и запуск production-версии

```bash
pnpm build
pnpm start
```

## Проверки качества кода

```bash
pnpm typecheck     # проверка типов TypeScript
pnpm lint          # ESLint
pnpm format        # автоформатирование Prettier
pnpm format:check  # проверка форматирования без изменений
```

## Тесты

```bash
pnpm test          # юнит-тесты (Vitest), одноразовый запуск
pnpm test:watch    # юнит-тесты в watch-режиме
pnpm test:e2e      # e2e-тесты (Playwright)
```

## Структура проекта

```
src/
├── app/                 # Страницы и API-роуты (Next.js App Router)
│   ├── api/             # Серверные прокси-эндпоинты (weather, geocode, city-photo)
│   └── page.tsx          # Главная страница приложения
├── features/            # Функциональные модули интерфейса
│   ├── current-weather/ # Карточка текущей погоды и панель деталей
│   ├── forecast/        # Прогноз на 5 дней, почасовой график, выбор даты
│   ├── geolocation/     # Определение местоположения пользователя
│   ├── search/          # Поиск города с автодополнением
│   ├── settings/        # Переключатель единиц измерения
│   └── theme/            # Переключатель светлой/тёмной темы
├── store/                # Zustand-хранилища (настройки, история поиска, тосты)
├── components/ui/        # Переиспользуемые UI-компоненты
└── lib/                  # Работа с OpenWeather API, форматирование, утилиты
```

## Деплой

Проект настроен на автоматический деплой на [Vercel](https://vercel.com) через GitHub Actions при пуше в `main` — см. [`.github/workflows/ci.yml`](.github/workflows/ci.yml). Пайплайн последовательно прогоняет проверки качества, e2e-тесты и только затем деплоит prod-сборку.
