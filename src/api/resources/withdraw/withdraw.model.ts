import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	amount: { type: Number, required: true },
	sent: { type: Boolean, required: true, default: false },
}, { timestamps: { createdAt: "created_at" }
});

export default mongoose.model("Withdraw", WithdrawSchema);
