import express from 'express';
import { createStore,updateStore,
    getAllStores,getStore,deleteStore 
  } from '../controllers/storeController.js';

const router = express.Router();

router.post('/',createStore);
router.put('/:id',updateStore);
router.get('/',getAllStores);
router.get('/:id',getStore);
router.delete('/:id', deleteStore);

export default router;