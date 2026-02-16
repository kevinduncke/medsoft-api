import { z } from 'zod';

export const createPatientSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email().optional().nullable(),
    phone: z.string().min(6).optional().nullable(),
    birthDate: z.iso.datetime().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    address: z.string().optional(),
    notes: z.string().optional()
});

export type CreatePatientDTO = z.infer<typeof createPatientSchema>;

/* 

{
    "firstName": "Kyla",
    "lastName": "Dods",
    "email": "kyla@example.com",
    "phone": "+00555334400",
    "birthDate": "2026-02-15T00:00:00Z",
    "gender": "FEMALE",
    "address": "123 Main Street",
    "notes": "New Patient"
}

*/