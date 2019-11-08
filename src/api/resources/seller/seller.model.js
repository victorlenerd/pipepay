import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
	{
		userId: String,
		balance: Number,
		links: [{ type: String, link: String }],
		productCategories: [String]
	},
	{ timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Seller", SellerSchema);
