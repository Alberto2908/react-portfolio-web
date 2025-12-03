# Stage 1: Build the React app with Vite
FROM node:20-alpine AS build

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_EMAILJS_PUBLIC_KEY

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* .npmrc* ./

# Install dependencies (fallback if no lockfile)
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Copy source
COPY . .

# Inject env vars for Vite build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Build
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Copy SPA nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
