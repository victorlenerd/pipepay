import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    marchantEmail: String,
    customerEmail: String,
    amount: Number,
    invoiceId: String,
    reference: String
});

export default mongoose.model('Payment', PaymentSchema);