# Используем официальный образ Node.js как базовый
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Используем Nginx для сервировки файлов
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем сертификаты
COPY certs/selfsigned.crt /etc/ssl/certs/selfsigned.crt
COPY certs/selfsigned.key /etc/ssl/private/selfsigned.key

# Открываем порты
EXPOSE 80
EXPOSE 443

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
