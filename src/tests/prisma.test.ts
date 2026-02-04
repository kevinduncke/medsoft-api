/// <reference types="jest" />
import { prisma } from '../config/prisma';

describe('Prisma Sanity Check', () => {
    it('Should connect and run a simple query', async () => {
        const result = await prisma.$queryRaw`SELECT 1`;
        expect(result).toBeTruthy();
    });
});