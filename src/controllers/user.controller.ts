import { prisma } from "../config/prisma";

// GET ALL LIST OF USERS
export const listUsers = async (req: any, res: any) => {
    const users = await prisma.user.findMany();
    return res.json(users);
};

// GET A SPECIFIC USER BY ID
export const getUser = async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id }
    });

    if(!user) {
        return res.status(404).json({ message: "User not found." });
    }    

    return res.json(user);
};

// UPDATE A USER'S ROLE AND PERMISSIONS BY ID
export const updateUser = async (req: any, res: any) => {
    const { role, permissions } = req.body;

    const user = await prisma.user.update({
        where: { id: req.params.id },
        data: { role, permissions }
    });

    return res.json(user);
};

// DELETE A USER BY ID
export const deleteUser = async (req: any, res: any) => {
    await prisma.user.delete({
        where: { id: req.params.id }
    });

    return res.json({ message: "User deleted successfully from database." });
};