import mongoose, { mongo } from "mongoose";
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

// Get all Categories
export const getAllCategories = async (req,res,next) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

// Get Category by ID
export const getCategoryById = async (req,res,next) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if(!category) return next(errorHandler(404, 'Category not found'));
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

// Update Category
export const updateCategory = async(req,res,next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
    const category = await Category.findOneAndUpdate(
        {_id: new mongoose.Types.ObjectId(id) },
        { name, updated_at:Date.now() },
        { new: true }
    );

    if(!category) return next(errorHandler(404,'Category not found'));

    res.status(200).json('Category updated successfully!');
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async(req,res,next) => {
    const { id } = req.params;

    try {
    const category = await Category.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id) });
    
    if(!category) return next(errorHandler(404, 'Category not found'));

    res.status(200).json('Category deleted successfully!');
    } catch (error) {
        next(error);
    }
};