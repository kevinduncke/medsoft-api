import { z } from 'zod';

export const createAppointmentSchema = z.object({
    date: z.iso.datetime(),
    reason: z.string().optional(),
    notes: z.string().optional(),
    patientId: z.string().min(1),
    doctorId: z.string().min(1)
});

export type CreateAppointmentDTO = z.infer<typeof createAppointmentSchema>;