import express from "express";
import { getAddresses,updateAddress,addAddress,deleteAddress } from "../controllers/addressController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post('/add',authMiddleware,addAddress);
router.get("/",authMiddleware, getAddresses);
router.put("/:id",authMiddleware ,updateAddress);
router.delete("/:id",authMiddleware ,deleteAddress);

export default router;