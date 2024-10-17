import express from 'express';
import { createProduct,getAllProducts,updateProduct,getProduct,deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/',getAllProducts);
router.put('/:id', updateProduct);
router.get('/:id',getProduct);
router.delete('/:id', deleteProduct);

export default router;