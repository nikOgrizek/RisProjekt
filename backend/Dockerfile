# Stage 1: Build JAR
FROM maven:3.9.2-eclipse-temurin-21 AS build
WORKDIR /app

# Preveri, katere datoteke so prisotne
RUN ls -la

COPY pom.xml .
COPY src ./src
RUN ls -la

RUN mvn -B package -DskipTests

# Stage 2: Run JAR
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
