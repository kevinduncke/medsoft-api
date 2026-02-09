import jwt from 'jsonwebtoken';

// JWT secret key and token expiration time.
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = '1h';

// Structure of the JWT Payload.
export interface JWTPayload {
    sub: string;
    email: string;
    role: string;
    permissions: string[];
};

// Sign a new JWT Token.
export const signToken = (payload: JWTPayload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify and decode the JWT Token..
export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
};