import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import * as UserController from '../controllers/user.controller';
import * as RoleController from '../controllers/role.controller';
import * as PatientController from '../controllers/patient.controller';
import * as AppointmentController from '../controllers/appointment.controller';

const router = Router();

// USERS ROUTE
router.get('/users', authenticate, requirePermission('MANAGE_USERS'), UserController.listUsers);
router.get('/users/:id', authenticate, requirePermission('MANAGE_USERS'), UserController.getUser);
router.put('/users/:id', authenticate, requirePermission('MANAGE_USERS'), UserController.updateUser);
router.delete('/users/:id', authenticate, requirePermission('MANAGE_USERS'), UserController.deleteUser);

// ROLES ROUTE
router.get('/roles', authenticate, requirePermission('MANAGE_ROLES'), RoleController.listRoles);
router.get('/roles/:role/permissions', authenticate, requirePermission('MANAGE_ROLES'), RoleController.getRolePermissions);

// PATIENTS ROUTE
router.get('/patients', authenticate, requirePermission('VIEW_PATIENTS'), PatientController.listPatients);
router.get('/patients/:id', authenticate, requirePermission('VIEW_PATIENTS'), PatientController.getPatient);
router.put('/patients/:id', authenticate, requirePermission('EDIT_PATIENTS'), PatientController.updatePatient);
router.delete('/patients/:id', authenticate, requirePermission('EDIT_PATIENTS'), PatientController.deletePatient);

// APPOINTMENTS ROUTE
router.get('/appointments', authenticate, requirePermission('VIEW_APPOINTMENTS'), AppointmentController.listAppointments);
router.get('/appointments/:id', authenticate, requirePermission('VIEW_APPOINTMENTS'), AppointmentController.getAppointment);
router.put('/appointments/:id', authenticate, requirePermission('EDIT_APPOINTMENTS'), AppointmentController.updateAppointment);
router.delete('/appointments/:id', authenticate, requirePermission('EDIT_APPOINTMENTS'), AppointmentController.deleteAppointment);

export default router;