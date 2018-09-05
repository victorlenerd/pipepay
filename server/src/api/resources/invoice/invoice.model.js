import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    userId: String,
    description: String,
    deliveryAmount: Number,
    purchaseAmount: Number,
    customerName: String,
    customerEmail: String,
    marchantEmail: String,
    verifyCode: String,
    status: String
});

export default mongoose.model('Invoice', InvoiceSchema);