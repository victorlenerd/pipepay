import { Schema, SchemaType, model }  from 'mongoose';

const PaymentSchema = new Schema({
    userId: String,
    invoiceId: { type: SchemaType.ObjectId, ref: 'Invoice' },
    paymentRef: String
});

export default model('Payment', PaymentSchema);