import { Request, Response } from 'express';
import { createUser, comparePassword, findUserByEmail } from '../services/auth.service';
import { signToken } from '../services/jwt.service';
import { Role } from '../config/generated/enums';
import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';

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
        const token = signToken({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

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
        const { email, password, role } = req.body;

        // Check if email and password are provided.
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required.' });
        }

        // Check if user already exists.
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const hashed = await bcrypt.hash(password, 10);

        // Create a new user with def role as RECEPTIONIST if not provided in the body.
        // Later restrict this router to admin ONLY!!.
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                role
            }
        });

        return res.status(201).json({
            message: 'User Created Successfully',
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
};