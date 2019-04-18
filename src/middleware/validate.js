import ValidationError from '../errors/validation';

const validate = schema => async (req, res, next) => {
    try {
        const values = await schema.validate({
            ...req.query,
            ...req.params,
            ...req.body,
        }, { stripUnknown: true });

        req.locals = { input: values };

        next();
    } catch (error) {
        if (error.name === 'ValidationError') {
            next(new ValidationError(error.message, error.path));
        } else {
            next(error);
        }
    }
};

export default validate;
