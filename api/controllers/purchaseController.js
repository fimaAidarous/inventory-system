import Purchase from '../models/purchaseModel.js';
import Supplier from '../models/supplierModel.js';
import { errorHandler } from '../utils/error.js';

export const createPurchase = async (req,res,next) => {
    const { supplier_id, total, purchase_date } = req.body;

    try {
        const supplier = await Supplier.findById(supplier_id);
        if (!supplier) return next (errorHandler(404, 'Supplier not found'));

        const newPurchase = new Purchase({
            supplier_id,
            total,
            purchase_date,
        });
        await newPurchase.save();
        res.status(201).json('Purchase created successfully!');
    } catch (error) {
        next(error);
    }
};