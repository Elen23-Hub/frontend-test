# ---- Build Stage ----
FROM node:18 AS builder
WORKDIR /app
# Copy files and install dependencies. Using ADD = intentional vulnerability
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
#FROM nginx:1.25.3-alpine3.18  test test
# Install specific vulnerable libxml2 version 2.13.4-r5, trivy vuln
RUN apk add --no-cache libxml2=2.13.4-r5

#RUN apk update && apk upgrade libxml2   
# Create a custom non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Change ownership of files to the new user
RUN chown -R appuser:appgroup /usr/share/nginx/html
# Use the non-root user
USER appuser
# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
