import { prisma } from "../config/prisma";

// CREATE A NEW APPOINTMENT
export const createAppointment = async (req: any, res: any) => {
    try {
        const { date, reason, notes, patientId, doctorId } = req.body;

        const appointment = await prisma.appointment.create({
            data: {
                date: new Date(date),
                reason,
                notes,
                patientId,
                doctorId
            },
            include: {
                patient: true,
                doctor: true
            }
        });

        return res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET ALL LIST OF APPOINTMENTS
export const listAppointments = async (req: any, res: any) => {
    const appointments = await prisma.appointment.findMany({
        include: {
            patient: true,
            doctor: true
        }
    });

    return res.json(appointments);
}

// GET A SPECIFIC APPOINTMENT BY ID
export const getAppointment = async (req: any, res: any) => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: req.params.id },
        include: {
            patient: true,
            doctor: true
        },
    });

    if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    return res.json(appointment);
};

// UPDATE AN APPOINTMENT BY ID
export const updateAppointment = async (req: any, res: any) => {
    const data = req.body;

    const appointment = await prisma.appointment.update({
        where: { id: req.params.id },
        data
    });

    return res.json(appointment);
};

// DELETE AN APPOINTMENT BY ID
export const deleteAppointment = async (req: any, res: any) => {
    await prisma.appointment.delete({
        where: { id: req.params.id }
    });

    return res.json({ message: "Appointment deleted successfully." });
};