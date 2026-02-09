import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma';
import { Role } from '../config/generated/enums'; // Imported generated type for Role
import { Permission } from '../config/generated/enums';

const SALT_ROUNDS = 10;

// Hash a plain password.
export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

// Compare plain password with hashed password.
export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

// Create a new User.
export const createUser = async (email: string, password: string, role: Role, permissions: Permission[]) => {
    return prisma.user.create({
        data: {
            email,
            password,
            role,
            permissions
        },
    });
};

// Find a user by email.
export const findUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    });
};