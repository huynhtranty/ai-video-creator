# AI Video Creator Backend

This is the backend service for the AI Video Creator application. Follow the steps below to set up and run the application.

## Prerequisites

- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (version 11 or higher)
- [Maven](https://maven.apache.org/) (for building the project)
- [PostgreSQL](https://www.postgresql.org/) or any required database
- [Git](https://git-scm.com/)
- [Environment Variables](#environment-variables)

## Setup

1. **Clone the Repository**:
   ```bash
   cd ai-video-creator/backend
   ```

2. **Update the `.env` File**:
   Copy the `.env.example` file, rename it to `.env` and add the required environment variables. Below is an example:

   ```env
   # The URL of the client application. This is the URL where the client application is hosted.
   CLIENT_URL=http://localhost:3000
   # The URL of the database. 
   DB_URL=jdbc:mysql://localhost:3306/aivideocreator
   # The username for the database.
   DB_USERNAME=yourname
   # The password for the database.
   DB_PASSWORD=yourpassword
   ```

   Replace the values with your actual database credentials and client URL.

3. **Install Dependencies**:
   Ensure Maven is installed, then run:
   ```bash
   ./mvnw clean install
   ```

4. **Database Setup**:
   - Create the required database.
   - Update the `application.properties` file to use the environment variables defined in the `.env` file.

## Running the Application

1. **Start the Backend**:
   Run the following command to start the application:
   ```bash
   ./mvnw spring-boot:run
   ```

2. **Access the Application**:
   By default, the backend will run on `http://localhost:8080`.

3. **For IntelliJ Users**:
   - Open the project in IntelliJ IDEA.
   - Navigate to the `AivideocreatorApplication` class (or the main class with the `@SpringBootApplication` annotation).
   - Right-click and select `Run 'AivideocreatorApplication.main()'`.
   - IntelliJ will handle the build and run process automatically.

## Environment Variables

The application uses environment variables to store sensitive information. Below is a list of required variables:

- `CLIENT_URL`: The URL of the client application.
- `DB_URL`: The URL of the database.
- `DB_USERNAME`: The username for the database.
- `DB_PASSWORD`: The password for the database.

Ensure these variables are set in the `.env` file before running the application.

## Additional Notes

- For production, ensure to use a secure method to manage environment variables.
- Refer to the `application.properties` file for additional configuration options.
