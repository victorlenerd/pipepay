import mongoose from "mongoose";

export const MilestoneSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true },
		description: { type: String, required: true },
		dueDate: { type: Date },
		requestSent: { type: Boolean },
		paid: { type: Boolean, required: true, default: false }
	},
	{ timestamps: { createdAt: "created_at" } }
);

const InvoiceSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		type: { type: String, enum: ["service", "good"], required: true },
		description: { type: String, required: true },

		deliveryAmount: { type: Number, required: true },
		purchaseAmount: { type: Number, required: true },
		pipePayFee: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		bankCharges: { type: Number, required: true },

		customerName: { type: String, required: true },
		customerEmail: { type: String, required: true },
		customerPhone: { type: String, required: true },

		marchantName: { type: String, required: true },
		marchantAccountNumber: { type: String, required: true },
		marchantBankCode: { type: String, required: true },
		marchantEmail: { type: String, required: true },

		milestones: [MilestoneSchema],

		requested: { type: Boolean, default: false },
		disputed: { type: Boolean, default: false },

		invoice_code: { type: String, unique: true },
		verifyCode: { type: String, unique: true },

		whoPaysPipepayFee: { type: String, enum: ["buyer", "seller", "both"] },
		whoPaysDeliveryFee: { type: String, enum: ["buyer", "seller", "both"] },

		status: {
			type: String,
			enum: ["sent", "paid", "accepted", "rejected"],
			required: true
		}
	},
	{ timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Invoice", InvoiceSchema);
