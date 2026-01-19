# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Instalar dependências (React agora está no package.json como dependência normal)
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copiar código fonte
COPY . .

# Build da aplicação (variáveis de ambiente são injetadas no build)
# As variáveis VITE_* precisam estar disponíveis durante o build
ARG VITE_ASK_SOFYA_API_URL
ARG VITE_VOICE_CHAT_WS_URL
ARG VITE_VOICE_CHAT_API_URL
ARG VITE_GATEWAY_API_URL
ARG VITE_MARKETPLACE_API_KEY
ARG VITE_WORKSPACE_UUID

ENV VITE_ASK_SOFYA_API_URL=$VITE_ASK_SOFYA_API_URL
ENV VITE_VOICE_CHAT_WS_URL=$VITE_VOICE_CHAT_WS_URL
ENV VITE_VOICE_CHAT_API_URL=$VITE_VOICE_CHAT_API_URL
ENV VITE_GATEWAY_API_URL=$VITE_GATEWAY_API_URL
ENV VITE_MARKETPLACE_API_KEY=$VITE_MARKETPLACE_API_KEY
ENV VITE_WORKSPACE_UUID=$VITE_WORKSPACE_UUID

RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração do nginx para SPA
RUN echo 'server { \
    listen 8080; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /health { \
        access_log off; \
        return 200 "healthy\n"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expor porta 8080 (requerido pelo Cloud Run)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
