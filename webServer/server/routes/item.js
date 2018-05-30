import express from 'express';

import db from '../db';


const router = express.Router();


router.route('/todo/:id')
    .patch(async(req, res) => {
        try {
            const { text, completed } = req.body;
            const id = req.params.id;

            await db.update({ id, text, completed });

            res.end();
        } catch (e) { console.log(e); res.status(400).send({ error: 'Invalid user parameter' }); }
    })
    .delete(async(req, res) => {
        try {
            const id = req.params.id;

            await db.delete({ id });

            res.end();
        } catch (e) { console.log(e); res.status(400).send({ error: 'Invalid user parameter' }); }
    });

export default router;
