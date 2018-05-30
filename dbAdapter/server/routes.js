import express from 'express';

import db from './db';


const router = express.Router();

router.route('/todo')
    .get(async(req, res) => {
        try {
            const todos = await db.getAll();

            res.json(todos.map(t => ({ id: t._id, text: t.text, completed: t.completed })));
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .post(async(req, res) => {
        try {
            const { text } = req.body;
            const result = await db.add({ text });
            const id = result.insertedIds[0];

            res.json({ text, id });
        } catch (e) { console.log(e); res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .delete(async(req, res) => {
        try {
            await db.delete(req.body.id);

            const todos = await db.getAll();

            res.json(todos);
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    });

router.route('/todo/:id')
    .patch(async(req, res) => {
        try {
            const { text, completed } = req.body;
            const id = req.params.id;

            await db.update({ id, text, completed });

            res.end();
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .delete(async(req, res) => {
        try {
            const id = req.params.id;

            await db.delete({ id });

            res.end();
        } catch (e) { res.status(400).send({ error: 'Invalid user parameter' }); }
    });

export default router;
