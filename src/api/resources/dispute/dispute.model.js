import mongoose from "mongoose";

const DisputeSchema = new mongoose.Schema(
	{
		customerEmail: String,
		merchantEmail: String,
		from: String,
		reason: String,
		category: String,
		invoiceId: { type: mongoose.Types.ObjectId, unique: true },
		status: String
	},
	{ timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Dispute", DisputeSchema);
