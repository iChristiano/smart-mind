# smart-mind
The project is a basic showcase of a full-stack JavaScript application, enriched with multiple technologies, frameworks & concepts:

- Docker
- Node.js
- Express
- PostgresSql
- Redis
- JWT
- Sessions
- Authorization
- Authentication
- React
- Serverless
- Amazon Web Service
- API
- Artificial-intelligence
- ...

### Use case
The aim of the application is to detect faces in user provided images. A user can register via the web-app (CLIENT), login and provide urls to images via its created user profile. Provided images are handed over with API calls to the backend application (SERVER). On the server a third party Artificial-intelligence-API is called and its responses are processed as well as some data are stored via the backend application (DATABASE). The results are finally handed over to the client application and visually displayed inside the analyzed image. Finally serverless functionalty evaluates the user score.

### Project structure
- Backend: [smart-mind-api-docker](https://github.com/iChristiano/smart-mind/tree/main/smart-mind-api-docker)
- Frontend: [smart-mind-app-react](https://github.com/iChristiano/smart-mind/tree/main/smart-mind-app-react)
- Serverless part: [smart-mind-rankly-lambda](https://github.com/iChristiano/smart-mind/tree/main/smart-mind-rankly-lambda)
- Additional Serverless feature: [smart-mind-smart-mind-avatar-s3-lambda](https://github.com/iChristiano/smart-mind/tree/main/smart-mind-avatar-s3-lambda)


### Local deployment
- Check out the source code of this project from the Git repository [smart-mind](https://github.com/iChristiano/smart-mind)
- Install Docker on the local PC
- Start Docker on the local PC
- Navigate to the project directory
- Navigate to backend directory
    > /smart-mind-api-docker
- Build and run the backend via terminal
    > docker-compose up --build

    The backend applicaltion starts on localhost:3000; a test user is already set up within your database -> email: test@gmail.com / password: test

- Navigate to frontent directory
    > /smart-mind-app-react
- Install npm libraries
    > npm install
- Build and run the frontend via terminal
    > npm run start-dev

    The backend applicaltion starts on localhost:3001; a test user is already set up within your application -> email: test@gmail.com / password: test

- Login or register and start face detection on provides images

- Close the backend application via terminal
    > docker-compose down

- Close the frontend application via terminal
