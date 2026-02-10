import { Role, Permission } from '../config/generated/client';

// GET ALL ROLES
export const listRoles = async (req: any, res: any) => {
    return res.json(Object.values(Role));
};

// GET PERMISSIONS FOR A SPECIFIC ROLE
export const getRolePermissions = async (req: any, res: any) => {
    const role = req.params.role as Role;

    if(!Object.values(Role).includes(role)) {
        return res.status(400).json({ message: "Invalid Role." });
    }

    // LOAD THIS IF FROM DB IF ROLES BECOME DYNAMIC IN THE FUTURE
    const ROLE_DEF_PERMISSIONS = {
        ADMIN: Object.values(Permission),
        DOCTOR: [
            Permission.VIEW_PATIENTS,
            Permission.EDIT_PATIENTS,
            Permission.VIEW_APPOINTMENTS,
            Permission.EDIT_APPOINTMENTS,
            Permission.VIEW_DASHBOARD
        ],
        RECEPTIONIST: [
            Permission.VIEW_PATIENTS,
            Permission.EDIT_PATIENTS,
            Permission.VIEW_APPOINTMENTS,
            Permission.EDIT_APPOINTMENTS,
            Permission.VIEW_DASHBOARD            
        ]
    };

    return res.json({
        role,
        permissions: ROLE_DEF_PERMISSIONS[role] || []
    });
}