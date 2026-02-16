import { prisma } from "../config/prisma";

// CREATE A NEW PATIENT
export const createPatient = async (req: any, res: any) => {
    try {
        const data = req.body;

        const patient = await prisma.patient.create({
            data
        });

        return res.status(201).json(patient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET ALL LIST OF PATIENTS
export const listPatients = async (req: any, res: any) => {
    const patients = await prisma.patient.findMany();
    return res.json(patients);
};

// GET A SPECIFIC PATIENT BY ID
export const getPatient = async (req: any, res: any) => {
    const patient = await prisma.patient.findUnique({
        where: { id: req.params.id }
    });

    if (!patient) {
        return res.status(404).json({ message: "Patient not found." });
    }

    return res.json(patient);
}

// UPDATE A PATIENT BY ID
export const updatePatient = async (req: any, res: any) => {
    const data = req.body;

    const patient = await prisma.patient.update({
        where: { id: req.params.id },
        data
    });

    return res.json(patient);
};

// DELETE A PATIENT BY ID
export const deletePatient = async (req: any, res: any) => {
    await prisma.patient.delete({
        where: { id: req.params.id }
    });

    return res.json({ message: "Patient deleted successfully from database." });
};