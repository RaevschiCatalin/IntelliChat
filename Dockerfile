# Use the official Gradle image to build the application
FROM gradle:8.1.1-jdk17 AS build

# Set the working directory
WORKDIR /app

# Copy the build.gradle and settings.gradle files
COPY build.gradle settings.gradle ./

# Copy the source code
COPY src /app/src

# Build the application
RUN gradle build --no-daemon

# Use the official OpenJDK image to run the application
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
