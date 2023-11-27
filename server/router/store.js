import express from "express";
import * as storeController from '../controller/store.js';

const router = express.Router();

router.get('/', storeController.getStore)

export default router;