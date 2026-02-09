import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/roles.middleware'

const router = Router();

router.post('/login', login);

// ONLY Administrative users can create users, okay?.
// User must be logged in & have role ADMIN.
router.post('/register', authenticate, authorize('ADMIN'), register);

/*

// PATIENTS
router.post(
    '/patients', 
    authenticate, 
    requirePermission('EDIT_PATIENTS'), 
    createPatient
);

// USERS
router.get(
    '/patients',
    authenticate,
    requirePermission('EDIT_PATIENTS'),
    createPatient
);
*/

export default router;