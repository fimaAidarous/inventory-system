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


  //Get all Suppliers
export const getAllsuppliers = async (req,res,next) => {
  try {
  const suppliers = await Supplier.find();
  res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};

