import mongoose from 'mongoose';

const DisputeSchema = new mongoose.Schema({
    customerEmail: String,
    marchantEmail: String,
    from: String,
    reason: String,
    category: String,
    invoiceId: { type: String, unique: true },
    status: String
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model('Dispute', DisputeSchema);