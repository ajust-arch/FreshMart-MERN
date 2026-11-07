import express from 'express';
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// PUBLIC: Anyone can view categories
router.get('/', getCategories);
router.get('/:id', getCategory);

// PROTECTED: Only admins can add, edit, or delete
router.post('/add', authMiddleware, adminMiddleware, addCategory);
router.put('/:id', authMiddleware, adminMiddleware, updateCategory); // ✅ Changed from GET to PUT
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

export default router;