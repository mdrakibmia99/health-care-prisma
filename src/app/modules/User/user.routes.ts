import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

import { fileUploader } from "../../helpers/fileUploader";
import { userValidation } from "./user.validations";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// router.post("/", fileUploader.upload.single('file'), auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), userController.createAdmin);
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllUserFromDB
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  userController.getMyProfile
);
router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data));
    return userController.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatient.parse(JSON.parse(req.body.data));
    return userController.createPatient(req, res, next);
  }
);

router.patch(
  "/update-my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (
      req?.user?.role === UserRole.SUPER_ADMIN ||
      req?.user?.role === UserRole.ADMIN
    ) {
      req.body = userValidation.updateAdminProfile.parse(
        JSON.parse(req.body.data)
      );
    } else if (req?.user?.role === UserRole.DOCTOR) {
      req.body = userValidation.updateDoctorProfile.parse(
        JSON.parse(req.body.data)
      );
    } else if (req?.user?.role === UserRole.PATIENT) {
      req.body = userValidation.updatePatientProfile.parse(
        JSON.parse(req.body.data)
      );
    }
    
    return userController.updateMyProfile(req, res, next);
  }
);
router.patch(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidation.updateStatus),
  userController.changeProfileStatus
);

export const userRoutes = router;
