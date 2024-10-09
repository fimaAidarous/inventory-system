import Supplier  from '../models/supplierModel.js';

export const createSupplier = async (req, res, next) => {
    const { name, contact } = req.body;
  
    const newSupplier = new Supplier({
      name,
      contact,
    });
  
    try {
      await newSupplier.save();
      res.status(201).json('Supplier created successfully!');
    } catch (error) {
      next(error);
    }
  };