import { PrismaClient, PrismaClientOptions } from '../generated/prisma/client';

const prismaClientOptions: PrismaClientOptions = {
    log: ['query', 'info', 'warn', 'error'],
};

if (process.env.PRISMA_ACCELERATE_URL) {
    prismaClientOptions.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
}

export const prisma = new PrismaClient(prismaClientOptions);
