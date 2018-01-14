import { MongoClient, ObjectID } from 'mongodb';

const DB = function() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'test';

    this.insert = todo => {
        return query((collection, resolve, reject) =>
            collection.insert({ todo }, {w:1}, err =>
                err ? reject(err) : resolve()));
    };

    this.delete = _id =>
        query((collection, resolve, reject) =>
            collection.deleteOne({ _id: ObjectID(_id) }, err =>
                err ? reject(err) : resolve()));

    this.getAll = () =>
        query((collection, resolve, reject) =>
            collection.find({}).toArray((err, items) =>
                err ? reject() : resolve(items)));

    function query(query) {
        return new Promise((resolve, reject) =>
            MongoClient.connect(url, (err, client) =>
                query(
                    client.db(dbName).collection('createIndexExample1'),
                    (...args) => resolve(...args) || client.close(),
                    (...args) => reject( ...args) || client.close()
                )));
    }
};

export default DB;
