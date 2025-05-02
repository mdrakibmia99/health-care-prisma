import express from 'express';;
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();



router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    DoctorScheduleController.getAllFromDB
);







export const DoctorScheduleRoutes = router;