import express from 'express';

import db from '../db';


const router = express.Router();


router.route('/todo')
    .get(async(req, res) => {
        try {
            const todos = await db.getAll();

            res.json(todos);
        } catch (e) { console.log(e); res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .post(async(req, res) => {
        try {
            const { text } = req.body;
            const todo = await db.add({ text });

            res.json(todo);
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .patch(async(req, res) => {
        try {
            await db.insert(req.body.task);

            const todos = await db.getAll();

            res.json(todos);
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .delete(async(req, res) => {
        try {
            await db.delete(req.body.id);

            const todos = await db.getAll();

            res.json(todos);
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    });

export default router;
