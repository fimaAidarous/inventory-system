import express from 'express';
import { createStore,updateStore,
    getAllStores
  } from '../controllers/storeController.js';

const router = express.Router();

router.post('/', createStore);
router.put('/:id', updateStore);
router.get('/',getAllStores);

export default router;