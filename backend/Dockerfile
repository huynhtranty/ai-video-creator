# Build stage
FROM maven:3.9-amazoncorretto-23 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM maven:3.9-amazoncorretto-23 AS dev
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY src ./src
EXPOSE 8080
CMD [".mvn/wrapper/mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=dev"]

