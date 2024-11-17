import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, 
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
        min: 0, 
    },
    totalAmount: {
        type: mongoose.Types.Decimal128,
        required: true,
        min: 0, 
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'cancelled'],
        default: 'pending',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

export default Purchase;
