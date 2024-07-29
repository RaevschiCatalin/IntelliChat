# Stage 1: Build the application with Gradle
FROM gradle:7.6-jdk17 AS build

# Set the working directory
WORKDIR /app

# Copy Gradle files
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# Copy the source code
COPY src ./src

# Build the application
RUN gradle build --no-daemon

# Stage 2: Run the application with a minimal JRE image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/build/libs/myapp.jar /app/myapp.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/myapp.jar"]
