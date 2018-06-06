import express from 'express';
import todos from './todo';
import item from './item';

const router = express.Router();

router.use('/',
    todos,
    item
);

export default router;
