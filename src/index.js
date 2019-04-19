import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import todosController from './controllers/todos';
import errorMiddleware from './middleware/errors';
import notImplementedMiddleware from './middleware/notImplemented';

(async () => {
    await mongoose.connect(config.mongo.connection, { useNewUrlParser: true });

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/todos', todosController);
    app.use(errorMiddleware);
    app.use(notImplementedMiddleware);

    app.listen(config.api.port, () => console.log('API ready!'));
})();