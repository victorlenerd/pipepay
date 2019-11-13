import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	address: { type: String, required: true },
	balance: { type: Number, required: true, default: 0 },
	facebook_username: { type: String },
	instagram_username: { type: String },
	twitter_username: { type: String },
	website_url: { type: String }
	}, { timestamps: { createdAt: "created_at" }
});

export default mongoose.model("Seller", SellerSchema);
