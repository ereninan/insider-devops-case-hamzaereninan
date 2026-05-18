# --- AŞAMA 1: Builder ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server.js ./

# --- AŞAMA 2: Production ---
FROM node:18-alpine
WORKDIR /app
USER node
COPY --from=builder --chown=node:node /app ./
EXPOSE 3000
CMD ["node", "server.js"]
