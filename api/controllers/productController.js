import mongoose from "mongoose";
import Product from "../models/productModel.js";
import { errorHandler } from "../utils/error.js";

export const createProduct = async (req, res, next) => {
  const {
    name,
    description,
    price,
    cost_price,
    stock_quantity,
    category_id,
    supplier_id,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(category_id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(supplier_id)) {
    return res.status(400).json({ message: "Invalid supplier ID" });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    cost_price,
    stock_quantity,
    category_id: new mongoose.Types.ObjectId(category_id),
    supplier_id: new mongoose.Types.ObjectId(supplier_id),
  });

  try {
    await newProduct.save();
    res.status(201).json("Product created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req,res,next) => {
  try {
    const products = await Product.find().populate('category_id supplier_id');

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};