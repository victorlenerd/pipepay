import mongoose from 'mongoose';

const DisputeSchema = new mongoose.Schema({
    customerEmail: String,
    marchantEmail: String,
    invoiceId: String,
    status: String
});

export default mongoose.model('Dispute', DisputeSchema);