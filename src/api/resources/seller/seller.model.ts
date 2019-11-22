import mongoose from "mongoose";

export interface ISellerModel {
	_id: string
	userId: string
	address: string
	balance: number
	facebook_username: string
	instagram_username: string
	twitter_username: string
	website_url: string
 	createdAt: string
}

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
