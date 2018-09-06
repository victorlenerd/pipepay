import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    userId: String,
    description: String,
    deliveryAmount: Number,
    purchaseAmount: Number,
    totalPrice: Number,
    customerName: String,
    customerEmail: String,
    marchantName: String,
    marchantAccountNumber: String,
    marchantBankCode: String,
    marchantEmail: String,
    invoice_code: String,
    verifyCode: String,
    status: String
});

export default mongoose.model('Invoice', InvoiceSchema);