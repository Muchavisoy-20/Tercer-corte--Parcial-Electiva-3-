# Etapa 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:24-alpine AS production

WORKDIR /app

# Instalar un servidor estático simple
RUN npm install -g serve

# Asignar permisos al usuario node
RUN chown -R node:node /app

COPY --from=builder /app/dist ./dist

# Cambiar a usuario no-root seguro
USER node

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
