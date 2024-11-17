import Store from '../models/storeModel.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

export const createStore = async (req,res) => {
    const { productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const existingStore = await Store.findOne({ productId });
      if (existingStore) {
        existingStore.quantity += quantity; 
        await existingStore.save();
        return res.status(200).json(existingStore);  
      }
      const store = new Store({
        productId,
        quantity,
      });
  
      await store.save();
      res.status(201).json(store);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating store' });
    }
  };


export const updateStore = async (req, res, next) => {
    const { id } = req.params; 
    const { quantity } = req.body; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Store ID format" });
    }
    try {
      const updatedStore = await Store.findByIdAndUpdate(
        id,
        {
          quantity,
          updatedAt: new Date(),
        },
        { new: true } 
      );
      if (!updatedStore) {
        return res.status(404).json({ message: "Store not found!" });
      }
      res.status(200).json({ message: "Store updated successfully!", updatedStore });
    } catch (error) {
      next(error);
    }
  };
  

export const getAllStores = async (req,res) => {
    try {
       const stores = await Store.find().populate('productId', 'name price');
       res.status(200).json(stores);
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Error fetching stores'});
    }
   };

