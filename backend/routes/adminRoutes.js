import express from 'express';
import {authMiddleware} from "../middlewares/authMiddleware.js";
import{ adminMiddleware
} from '../middlewares/adminMiddleware.js';
import {getDashboard} from '../controllers/AdminController.js';

const router=express.Router();
router.get("/",authMiddleware, adminMiddleware,getDashboard);

 export default router;
