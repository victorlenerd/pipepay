import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export const MilestoneSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true },
		description: { type: String, required: true },
		dueDate: { type: Date },
		requested: { type: Boolean, default: false },
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

		merchantUsername: { type: String, required: true },
		merchantName: { type: String, required: true },
		merchantEmail: { type: String, required: true },

		milestones: [MilestoneSchema],

		requested: { type: Boolean, default: false },
		disputed: { type: Boolean, default: false },

		requestedMilestones: { type: Array },

		invoice_code: { type: String, unique: true },
		verifyCode: { type: String, unique: true },

		whoPaysPipepayFee: { type: String, enum: ["buyer", "seller", "both"] },
		whoPaysDeliveryFee: { type: String, enum: ["buyer", "seller", "both"] },

		status: {
			type: String,
			enum: ["processing", "sent", "paid", "accepted", "rejected"],
			required: true
		}
	},
	{ timestamps: { createdAt: "created_at" } }
);

InvoiceSchema.index({
	customerName: "text",
	customerEmail: "text",
	customerPhone: "text"
});

InvoiceSchema.plugin(mongoosePaginate);

export default mongoose.model("Invoice", InvoiceSchema);
