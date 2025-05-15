import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./appointement.controller";

const router = Router();

/**
 * ENDPOINT: /appointment/
 * 
 * Get all appointment with filtering
 * Only accessable for Admin & Super Admin
 */
router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    AppointmentController.getAllFromDB
);

export const AppointmentRoutes = router;