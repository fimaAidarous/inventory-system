import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';


dotenv.config();

const app = express();
app.use(express.json());

// Database connection
mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MONGODB');
    
})
.catch((err) => {
    console.log(err);
});


app.use('/api/user', userRoute);


app.listen(9000, () => {
    console.log('Server is running on port 9000');
} );

app.use(( err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
    return res.status(statusCode).json ({
        success: false,
        statusCode,
        message,
    });
});