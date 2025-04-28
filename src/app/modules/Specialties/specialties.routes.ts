import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import { SpecialtiesValidation } from "./specialties.validations";
import { SpecialtiesController } from "./specialties.controller";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.create.parse(JSON.parse(req.body.data));
    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

export const SpecialtiesRoutes = router;
