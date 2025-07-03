````
# Auth flow

## Локальный запуск через Node.js

1. Установка зависимостей:
   ```sh
   npm install
````

2. Запуск dev-сервера:
   ```sh
   npm run dev
   ```
3. Доступно на [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка и запуск production-версии локально

1. Соборка проекта:
   ```sh
   npm run build
   ```
2. Запуск production-сервера:
   ```sh
   npm install -g serve
   serve -s dist -l 4173
   ```
3. Доступно на [http://localhost:4173](http://localhost:4173) в браузере.

## Запуск в Docker

1. Сборка и запуск контейнера:
   ```sh
   docker build -t auth-app .
   docker run -p 4173:4173 auth-app
   ```
2. Доступно на [http://localhost:4173](http://localhost:4173) в браузере.

## Запуск через Docker Compose

1. Запуск:
   ```sh
   docker-compose up --build
   ```
2. Доступно на [http://localhost:4173](http://localhost:4173) в браузере.

---
