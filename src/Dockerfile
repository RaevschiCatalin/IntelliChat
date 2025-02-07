# Base Node.js image
FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package manager files
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm list tailwindcss postcss autoprefixer

# Copy the rest of the app
COPY . .

# Set permissions
RUN chmod -R 777 /app/.next

# Build the app
RUN pnpm build

# Expose the app on port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "dev"]
