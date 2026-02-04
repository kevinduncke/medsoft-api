import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerRoutes } from './routes';

dotenv.config();

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    registerRoutes(app);

    return app;
};