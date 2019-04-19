This is the Node.js app that provides a RESTful API.

# Requirements

This project requires a MongoDB server. You can provide your own or use the docker container that is already configured in this repository.

### Your own MongoDB service
If you want to use your own server make sure to update the .env file and add the following changes:
NOTE: The app was tested using MongoDB 3.4

```
mongoConnection=[your_mongo_connection_string]
```

### Docker Container MongoDB
If you want to use the docker container already configured you will need to make sure to have Docker and docker compose installed. Go to the root directory in your shell and run:

```
# start mongo
npm run mongo:up
# stop mongo
npm run mongo:down
```

# How to?

All you need to do is make sure to have a mongoDB service running (check above) and then just run:

```
npm install
npm start
```
