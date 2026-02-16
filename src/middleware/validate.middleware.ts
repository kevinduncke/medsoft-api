import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
    (schema: ZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                const err = error as any;
                return res.status(400).json({
                    message: `Validation Error: ${error}`,
                    errors: err.errors
                });
            }
        }        