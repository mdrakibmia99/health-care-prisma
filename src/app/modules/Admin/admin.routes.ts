
import { Router } from "express";
import { adminController } from "./admin.controller";

const router= Router()
router.get('/',adminController.getAllFromDB )
router.get('/:id',adminController.getByIdFromDB )

export const adminRoutes = router