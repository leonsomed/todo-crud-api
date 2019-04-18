class NotFound extends Error {
    constructor(id) {
        super(`resource with id: ${id} was not found`);

        this.id = id;
        this.httpCode = 404;
    }

    toObject() {
        return {
            id: this.id,
            message: this.message,
            httpCode: this.httpCode,
        };
    }
}

export default NotFound;