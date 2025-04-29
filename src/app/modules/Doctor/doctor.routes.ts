import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorValidation } from "./doctor.validations";
import { DoctorController } from "./doctor.controller";

const router = Router();
router.get("/", DoctorController.getAllFromDB);

router.get("/:id", DoctorController.getByIdFromDB);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest(DoctorValidation.update),
  DoctorController.updateIntoDB
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.deleteFromDB
);
router.delete(
  '/soft/:id',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.softDelete);

export const DoctorRoutes = router;
