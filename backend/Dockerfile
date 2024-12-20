# Use an OpenJDK image for building and running the app
FROM alpine/java:21-jdk

# Set environment variable
ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS
ENV JAVA_OPTS=""

# Set working directory
WORKDIR /app
RUN java -version

# Copy the build files
COPY build/libs/*.jar app.jar

# Expose the app's port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
