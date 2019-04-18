const env = process.env;

export default {
    api: {
        port: env.apiPort,
    },
    mongo: {
        connection: env.mongoConnection,
    },
};
