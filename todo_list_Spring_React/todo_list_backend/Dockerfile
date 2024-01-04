FROM eclipse-temurin:17-jdk-alpine
# Create user to run app as (instead of root)
RUN addgroup -S app && adduser -S app -G app

# user user "app"
USER app

#Copy the jar file into the docker image
COPY target/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]