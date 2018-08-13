import { Schema, model }  from 'mongoose';

const InvoiceSchema = new Schema({
    userId: String,
    description: String,
    deliveryAmount: Number,
    purchaseAmount: Number,
    customerEmail: String
});

export default model('Invoice', InvoiceSchema);