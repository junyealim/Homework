import express from "express";
import morgan from "morgan";
import cors from 'cors';
import storeRouter from './router/store.js';
import { config } from "./config.js";
import {connectDB } from './db/database.js'

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use('/', storeRouter)

app.use((req, res, next)=> {
    res.sendStatus(404);
});

connectDB().then((db) => {
    const server = app.listen(config.host.port);
}).catch(console.error)