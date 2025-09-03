# MyAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# Confusion-Squidex
This is a repo for squidex version control.

## Project Setup
### Prerequisites

Make sure you have the following tools installed:

- **Node @latest:** For running the app.
- **Visual Studio:** To run and test the application.

### Running the Application

Follow these steps to set up and run the system:

1. **Clone the Repository and Secrets:**
   Clone the repo

   ```bash
   git clone https://github.com/MphoNkalaTIH/Confusion-Squidex.git
   cd Confusion-Squidex
   ```

   Add secrets file ```.env``` in your root folder with fields:
   ```bash
      ENVIRONMENT="DEV" #examples: DEV, SIT, UAT
      CLIENT_ID="example_client_id"
      CLIENT_SECRET="example_client_secret"
      DEV_QOUTE_SECTIONS_URL="https://squidex-dev.isservices.co.za/api/content/con-fusion/quote-sections"
      SIT_QOUTE_SECTIONS_URL="m_i_a"
      UAT_QOUTE_SECTIONS_URL="m_i_a"
   ```

3. **Build and Run the project**

   The project uses node for execution.
   
   ```bash
   Containers will be create on application launch and or create/ recreated on application start so no need to run any docker commands
   ```

   Commands:
   - **pull latest models from squidex:** ```>>> npx ts-node pull-squidex-data.ts```
   - **push updated models to squidex:** ```>>> npx ts-node push-squidex-data.ts output/thabang/budget/car-insurance/car-details-68a9b8df-f9c5-4af6-9207-363bb2a90a19.json 68a9b8df-f9c5-4af6-9207-363bb2a90a19```


6. **Monitor the System:**

## Architecture Diagram

Here is an overview of the architecture flow:

```
[State 1 Squidex Models] ---> [Confusion-Squidex] ---> [State 2 Squidex Models]

[Confusion-Squidex] can:
  1. pull latest models from (dev, sit, or uat squidex)
  2. manage version control
  3. push updated models to cloud squidex (coming soon)

```



## Troubleshooting

- **App Not running:** Ensure that you run npm install before runnng any app commands. And also ensure that you have a .env file with updated credentials.
- **Don't have credentials:**
  ```  
  1. not having an access token
     -- log in to squidex and check application tab -> under user profile in session storage you should see access token
  2. getting client id and client secret
    -- log in to squidex >> navigate to profile >> generate secret >> copy client id and secret
  ```