# ---- Build Stage ----
FROM node:18 AS builder

WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code, including .env.production
COPY . .

# Vite automatically uses `.env.production` when `NODE_ENV=production`
ENV NODE_ENV=production

# Build with Vite (loads .env.production by default)
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
USER non-root
CMD ["nginx", "-g", "daemon off;"]
