import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import supplierRoute from './routes/supplierRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import purchaseRoute from './routes/purchaseRoute.js';
import storeRoute from './routes/storeRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MONGODB');
})
.catch((err) => {
    console.log(err);
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/supplier', supplierRoute);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/purchases', purchaseRoute);
app.use('/api/stores', storeRoute);

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
