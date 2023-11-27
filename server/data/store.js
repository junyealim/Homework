import MongoDb from 'mongodb';
import { getStore } from '../db/database.js';


export async function getAll() {
    try {
        const result = await getStore().find().toArray(); 
        console.log(result);
        // Added .toArray() to get the result as an array
        return result;
    } catch (error) {
        console.error('Error in getAll:', error);
        throw error;
    }
}