class NotFound extends Error {
    constructor(message, path) {
        super(message);

        this.path = path;
        this.httpCode = 400;
    }

    toObject() {
        return {
            path: this.path,
            message: this.message,
            httpCode: this.httpCode,
        };
    }
}

export default NotFound;