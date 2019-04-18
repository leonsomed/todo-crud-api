const errorHandler = (error, req, res, next) => {
    let result;

    if (error && typeof error.toObject === 'function') {
        result = error.toObject();
    } else {
        result = {
            httpCode: 500,
            message: error.message,
        };
    }

    res.status(result.httpCode).json({ error: result });
};

export default errorHandler;