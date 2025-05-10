# Build stage
FROM maven:3.9-amazoncorretto-23 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Development stage (cho hot-reload)
FROM maven:3.9-amazoncorretto-23 AS dev
WORKDIR /app
COPY pom.xml .
EXPOSE 8080
CMD [".mvn", "spring-boot:run", "-Dspring-boot.run.profiles=dev"]

# Production stage
FROM amazoncorretto:23-alpine
WORKDIR /app
COPY --from=build /app/target/aivideocreator.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]