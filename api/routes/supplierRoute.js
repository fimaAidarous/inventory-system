import express from 'express';
import { createSupplier, getAllsuppliers,getSupplierById} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/', createSupplier);
router.get('/', getAllsuppliers);
router.get('/:id', getSupplierById);

export default router;
