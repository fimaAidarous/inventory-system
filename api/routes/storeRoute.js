import express from 'express';
import { createStore,updateStore,
    getAllStores,getStore
  } from '../controllers/storeController.js';

const router = express.Router();

router.post('/',createStore);
router.put('/:id',updateStore);
router.get('/',getAllStores);
router.get('/:id',getStore);

export default router;