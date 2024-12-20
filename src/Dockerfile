# Base Node.js image
FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package manager files
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN npm install -g pnpm && pnpm install
RUN pnpm --version

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm build

# Expose the app on port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
