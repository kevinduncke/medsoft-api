export const requirePermission = (...required: string[]) => {
    return (req: any, res: any, next: any) => {
        const userPermissions = req.user.permissions || [];

        const hasAll = required.every(p => userPermissions.includes(p));

        if(!hasAll){
            return res.status(403).json({ message: "Forbidden: Insufficient Permissions." });
        }

        next();
    };
};