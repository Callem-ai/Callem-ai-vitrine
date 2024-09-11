# Build stage
FROM node:alpine AS build

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.27-alpine

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from the build stage
COPY --from=build /app/dist/callem-ai-vitrine/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
