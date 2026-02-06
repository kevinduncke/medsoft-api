import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const requireRole = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {

        // Checks if req.user is defined (should be set by auth middleware)..
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not registered or authenticated.' });
        }

        // Check if user's role is in the allowedRoles array.
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions to access this resource.' });
        }

        next();
    };
};

export const authorize = (...roles: string[]) => {
    return (req: any, res: any, next: any) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient Role' });
        }
        next();
    };
};