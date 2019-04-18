const errorHandler = (req, res, next) => {
    res.status(404).json({ error: { message: 'that endpoints does not exist' } });
};

export default errorHandler;