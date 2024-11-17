import mongoose, { mongo } from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
    },
    total: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    purchase_date: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

export default Purchase;