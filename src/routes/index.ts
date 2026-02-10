import { Express } from 'express';
import dbRouter from './db';
import authRouter from './auth';
import adminRouter from './admin.routes';

// Register Routes Paths.
export const registerRoutes = (app: Express) => {
    app.use('/db', dbRouter);
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
};