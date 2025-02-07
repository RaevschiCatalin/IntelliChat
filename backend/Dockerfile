# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Copy Gradle wrapper and dependencies configuration
COPY gradlew gradlew.bat build.gradle settings.gradle /app/
COPY gradle /app/gradle

# Make Gradle wrapper executable
RUN chmod +x /app/gradlew

# Copy source code
COPY src /app/src

# Build the application
RUN ./gradlew build --no-daemon

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/build/libs/proiect-0.0.1-SNAPSHOT.jar app.jar

# Expose the app's port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
