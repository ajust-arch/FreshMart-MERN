import  express  from 'express';
import {
createCheckoutSession,verifyPayment
} from '../controllers/paymentController.js';
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post('/create-session',authMiddleware,createCheckoutSession);
router.post('/verify-session',authMiddleware,verifyPayment);

export default router;