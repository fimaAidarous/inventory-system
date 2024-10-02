import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res,next) => {
    const { username,email,password,role } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User ({ username, email, password:
        hashedPassword,
        role
    });
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(error);
    }
}