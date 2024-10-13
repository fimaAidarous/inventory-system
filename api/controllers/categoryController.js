import mongoose from "mongoose";
import Category from '../models/categoryModel.js';
import { errorHandler } from '../utils/error.js';

// create Category
export const createCategory = async (req,res,next) => {
    const { name } = req.body;

    const newCategory = new Category({
        name,
    });
    try {
       await newCategory.save();
       res.status(201).json('Category created successfully!');
    } catch (error) {
       next(error); 
    }
};

