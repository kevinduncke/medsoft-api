import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '../src/config/generated/client';
import bcrypt from 'bcrypt';

dotenv.config();

// Initialize Prisma Client with PSQL Adapter. ;(
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const SALT_ROUNDS = 10;

// Seed main function to create an admin user.
async function main() {
    const email = 'admin@medsoft.local';
    const password = 'adminDoc123!';

    // Check if admin user already exists.
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log('Admin user already exists. Skipping creation...');
        return;
    }

    // Hash new password and create admin user.
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create admin user.
    await prisma.user.create({
        data: {
            email,
            password: hash,
            role: Role.ADMIN,
        },
    });

    // Log admin user email + password.. (Remove in prod).
    console.log('Admin user created with email: ' + email + ' and a password: ' + password);
}

// Execute the main function to seed the database with an admin user (testing only).
main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });