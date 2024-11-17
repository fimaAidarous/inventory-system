import Store from '../models/storeModel.js';
import Product from '../models/productModel.js';

export const createStore = async (req, res) => {
    const { productId, quantity } = req.body;
  
    try {
      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the store already has this product, then update it
      const existingStore = await Store.findOne({ productId });
      if (existingStore) {
        existingStore.quantity += quantity; // Update the quantity if product already exists
        await existingStore.save();
        return res.status(200).json(existingStore);  // Return the updated store
      }
  
      // Otherwise, create a new store entry
      const store = new Store({
        productId,
        quantity,
      });
  
      await store.save();
      res.status(201).json(store);  // Return the newly created store
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating store' });
    }
  };