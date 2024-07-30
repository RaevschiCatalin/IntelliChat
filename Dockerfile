# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy the source code
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port on which the application will run
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
