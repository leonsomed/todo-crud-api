import express from 'express';
import mongoose from 'mongoose';

import config from './config';
import todoController from './controllers/todo';
import errorMiddleware from './middleware/errors';
import notImplementedMiddleware from './middleware/notImplemented';

(async () => {
    await mongoose.connect(config.mongo.connection, { useNewUrlParser: true });

    const app = express();

    app.use(express.json());
    app.use('/todo', todoController);
    app.use(errorMiddleware);
    app.use(notImplementedMiddleware);

    app.listen(config.api.port, () => console.log('API ready!'));
})();