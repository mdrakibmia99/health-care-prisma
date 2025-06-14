import { Router } from "express";

const router = Router();


router.post(
    '/init-payment/:appointmentId',
    PaymentController.initPayment
)

export const PaymentRoutes = router;