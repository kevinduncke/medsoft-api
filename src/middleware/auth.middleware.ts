import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.service";

// Interface for Authenticated Request
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
        permissions: string[];
    };
}

// Authentication Middleware to Protect Routes.
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get Auth Header.
    const authHeader = req.headers.authorization;

    // Check for Bearer token in the Authorization Header..
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or Invalid Authorization Header.' });
    }

    // Extract token from header.
    const token = authHeader.split(' ')[1];

    try {

        // Check if the token exists befor calling verifyToken
        if (!token) {
            return res.status(401).json({ message: 'Invalid or Missing Token.' });
        }

        // Verify Token and Attach Payload to req.user.
        const payload = verifyToken(token);

        req.user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
            permissions: payload.permissions || []
        };

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid or Expired Token.' });
    }
};