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


export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    cost_price,
    stock_quantity,
    category_id,
    supplier_id,
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        cost_price,
        stock_quantity,
        category_id: new mongoose.Types.ObjectId(category_id),
        supplier_id: new mongoose.Types.ObjectId(supplier_id),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product updated successfully!", updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('category_id supplier_id');

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async(req,res,next) => {
  const { id } = req.params;

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);

    if(!deleteProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product deleted successfully!"});
  } catch (error) {
    next(error);
  }
};