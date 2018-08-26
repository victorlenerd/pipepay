import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    userId: String,
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
    paymentRef: String
});

export default mongoose.model('Payment', PaymentSchema);