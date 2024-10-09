import express from 'express';
import { createSupplier, getAllsuppliers,} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/', createSupplier);
router.get('/', getAllsuppliers);

export default router;
