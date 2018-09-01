import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    userId: String,
    description: String,
    deliveryAmount: Number,
    purchaseAmount: Number,
    customerEmail: String,
    marchantEmail: String,
    status: String
});

export default mongoose.model('Invoice', InvoiceSchema);