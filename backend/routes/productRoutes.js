import express from 'express';
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// PUBLIC: Anyone can view products
router.get('/', getProducts);
router.get('/:id', getProduct);

// PROTECTED: Only admins can add, edit, or delete
router.post('/add', authMiddleware, adminMiddleware, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;