import express from 'express';
import { createProduct,getAllProducts,updateProduct,getProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/',getAllProducts);
router.put('/:id', updateProduct);
router.get('/:id',getProduct);

export default router;