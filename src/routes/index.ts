import { Express } from 'express';
import dbRouter from './db';

export const registerRoutes = (app: Express) => {
    app.use('/db', dbRouter);
    // app.use('/auth', authRouter);
    // app.use('/patientes', patientsRouter);
    // etc..
};