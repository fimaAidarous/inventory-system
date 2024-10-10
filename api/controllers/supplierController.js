import mongoose from 'mongoose';
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

export const updateSupplier = async (req, res, next) => {
  const { id } = req.params;
  const { name, contact } = req.body;

  try {
    // Instantiate ObjectId with `new` keyword
    const supplier = await Supplier.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) }, 
      { name, contact },
      { new: true }
    );

    if (!supplier) return next(errorHandler(404, 'Supplier not found'));

    res.status(200).json('Supplier updated successfully!');
  } catch (error) {
    next(error);
  }
};


export const deleteSupplier = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the supplier by _id and delete
    const supplier = await Supplier.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (!supplier) return next(errorHandler(404, 'Supplier not found'));

    res.status(200).json('Supplier deleted successfully!');
  } catch (error) {
    next(error);
  }
};