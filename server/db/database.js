import MongoDb from 'mongodb';
import {config} from '../config.js';

let db;
export async function connectDB() {
    return MongoDb.MongoClient.connect(config.db.host, {dbName: 'banacafe'})
        .then((client) =>db = client.db());
}

export function getStore() {
    return db.collection('store');
}