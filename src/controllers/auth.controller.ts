import { Request, Response } from 'express';
import { createUser, comparePassword, findUserByEmail, hashPassword } from '../services/auth.service';
import { signToken } from '../services/jwt.service';

// Login Controller.
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if email and pass are provided.
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required, seriously?.' });
        }

        // Check if user already exists.
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email.' });
        }

        // Check password.
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid Password.' });
        }

        // Sign JWT Token 'Ring'.
        const token = signToken(
            {
                sub: user.id,
                email: user.email,
                role: user.role,
                permissions: user.permissions,
            }
        );

        // Returned token and user info.
        return res.json({
            accessToken: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('REGISTER ERROR', err);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// Register Controller.
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role, permissions } = req.body;

        // Check if email and password are provided.
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required.' });
        }

        // Check if user already exists.
        const existing = await findUserByEmail(email);
        if (existing) {
            return res.status(409).json({ message: 'Email already exists.' });
        }

        // Calling to hash the password
        const hashed = await hashPassword(password);

        // Calling to create a new user with default role as RECEPTIONIST 
        // if not provided in the body.
        // Later restrict this router to admin ONLY!!.
        const user = await createUser(email, hashed, role, permissions);

        return res.status(201).json({
            message: 'User Created Successfully',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};