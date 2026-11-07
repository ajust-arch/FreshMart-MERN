import express from 'express';
import { getHookahs, getHookah, addHookah, updateHookah, deleteHookah } from '../controllers/hookahController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// PUBLIC: Anyone can view hookahs
router.get('/', getHookahs);
router.get('/:id', getHookah);

// PROTECTED: Only admins can add, edit, or delete
router.post('/', authMiddleware, adminMiddleware, addHookah);
router.put('/:id', authMiddleware, adminMiddleware, updateHookah);
router.delete('/:id', authMiddleware, adminMiddleware, deleteHookah);

export default router;