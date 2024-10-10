import Supplier  from '../models/supplierModel.js';
import { errorHandler } from '../utils/error.js';

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


  //Get all Suppliers
export const getAllsuppliers = async (req,res,next) => {
  try {
  const suppliers = await Supplier.find();
  res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};


// Get a supplier by ID
export const getSupplierById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) return next(errorHandler(404, 'Supplier not found'));
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};