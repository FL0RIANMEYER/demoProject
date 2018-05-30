import { MongoClient, ObjectID } from 'mongodb';

import { DB_URL } from '../config/env';

const mongodb = {
    getAll: (event, user, session) => connect({ todo: 'todo' }, async({ todo }) =>
        await todo.find({}).toArray()),
    add: ({ text }) => connect({ todo: 'todo' }, async({ todo }) =>
        await todo.insert({ text, completed: false })),
    update: ({ id, text, completed }) => connect({ todo: 'todo' }, async({ todo }) => {
        if(id == 'all') {
            return await todo.updateMany({}, { $set: { completed } });
        } else  {
            const $set = {};
            if(text      != undefined) { $set.text      = text;      }
            if(completed != undefined) { $set.completed = completed; }

            return await todo.updateOne({ _id: ObjectID(id) }, { $set });
        }
    }),
    delete: ({ id }) => connect({ todo: 'todo' }, async({ todo }) => {
        if(id == 'all') {
            return await todo.remove({ completed: true });
        } else {
            return await todo.removeOne({ _id: ObjectID(id) }, { w:1 });
        }
    }),
};

/**
 * Open connection to db and ensure closing after fn call
 * @param  {Object}   collections
 * @param  {Function} fn
 * @return {Promise}
 */
function connect(collections, fn) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, async function(err, database) {
            const db = database.db('testProject');

            const activeCollections = {};

            for (let name in collections)
            { activeCollections[name] = db.collection(collections[name]); }

            try {
                const result = await fn(activeCollections, db);

                database.close();
                resolve(result);
            } catch (e) {
                database.close();
                reject(e);
            }
        });
    });
}

export default mongodb;
