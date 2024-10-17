import express from 'express';
import { createProduct,getAllProducts,updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/',getAllProducts);
router.put('/:id', updateProduct);

export default router;