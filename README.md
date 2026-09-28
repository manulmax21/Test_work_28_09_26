# GREEN-API Chat

Веб-интерфейс для отправки и получения текстовых сообщений через мессенджер с использованием сервиса [GREEN-API](https://green-api.com).

## Стек

- React 19, TypeScript, Vite
- Zustand (состояние)
- React Router (маршрутизация)
- Tailwind CSS
- FSD-архитектура

## Запуск (локально)

```bash
npm install
npm run dev
```

Откроется на `http://localhost:5173`

## Запуск (Docker)

```bash
docker build -t green-api-chat .
docker run -p 3000:80 green-api-chat
```

Откроется на `http://localhost:3000`

## Переменные окружения

| Переменная | По умолчанию | Описание |
|---|---|---|
| `VITE_API_URL` | `https://api.green-api.com` | Базовый URL API GREEN-API |

## Использование

1. Введите **idInstance** и **apiTokenInstance** из личного кабинета GREEN-API
2. Введите номер телефона получателя (формат: `79001234567`)
3. Отправляйте и получайте текстовые сообщения

## Структура (FSD)

```
src/
├── app/          — роутер, провайдеры, глобальные стили
├── pages/        — страницы (Login, CreateChat, Chat)
├── features/     — фичи (messaging)
├── entities/     — сущности (session)
└── shared/       — API, типы, UI-компоненты, конфиг
```
