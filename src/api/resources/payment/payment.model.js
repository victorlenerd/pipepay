import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
	{
		merchantEmail: String,
		customerEmail: String,
		amount: Number,
		invoiceId: String,
		reference: String
	},
	{ timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Payment", PaymentSchema);
