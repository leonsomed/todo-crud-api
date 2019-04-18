import express from 'express';
import * as yup from 'yup';
import validate from '../middleware/validate';
import asyncRoute from '../middleware/asyncRoute';
import Todo from '../models/todo';
import NotFoundError from '../errors/notFound';

const endpoints = [
    {
        path: '/',
        method: 'get',
        async handler(req, res) {
            const data = await Todo.find({}).lean();

            res.json({ data });
        },
    },
    {
        path: '/:_id',
        method: 'get',
        middleware: [
            validate(yup.object({
                _id: yup.string().matches(/^[a-f0-9]{24}$/).required(),
            })),
        ],
        async handler(req, res) {
            const { _id } = req.locals.input;
            const data = await Todo.findOne({ _id }).lean();

            if (!data) {
                throw new NotFoundError(_id);
            }

            res.json({ data });
        },
    },
    {
        path: '/',
        method: 'post',
        middleware: [
            validate(yup.object({
                name: yup.string().required(),
                title: yup.string().required(),
                completed: yup.bool().required(),
            })),
        ],
        async handler(req, res) {
            const { input } = req.locals;
            const todo = await Todo.create(input);

            res.json({ data: todo });
        },
    },
    {
        path: '/:_id',
        method: 'put',
        middleware: [
            validate(yup.object({
                _id: yup.string().matches(/^[a-f0-9]{24}$/).required(),
                name: yup.string().required(),
                title: yup.string().required(),
                completed: yup.bool().required(),
            })),
        ],
        async handler(req, res) {
            const { _id, ...data } = req.locals.input;
            const todo = await Todo.findOneAndUpdate({ _id }, { $set: data }, { new: true });

            if (!todo) {
                throw new NotFoundError(_id);
            }

            res.json({ data: todo });
        },
    },
    {
        path: '/:_id',
        method: 'patch',
        middleware: [
            validate(yup.object({
                _id: yup.string().matches(/^[a-f0-9]{24}$/).required(),
                completed: yup.bool().required(),
            })),
        ],
        async handler(req, res) {
            const { _id, completed } = req.locals.input;
            const todo = await Todo.findOneAndUpdate({ _id }, { $set: { completed } }, { new: true });

            if (!todo) {
                throw new NotFoundError(_id);
            }

            res.json({ data: todo });
        },
    },
];

const router = express.Router();

endpoints.forEach((next) => {
    const args = [
        next.path,
        ...(next.middleware || []),
        asyncRoute(next.handler),
    ];

    router[next.method](...args);
});

export default router;