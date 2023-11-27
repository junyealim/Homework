import * as storeRepository from '../data/store.js'

export async function getStore(req, res) {
    const data = await storeRepository.getAll();
    res.status(200).json(data);
}