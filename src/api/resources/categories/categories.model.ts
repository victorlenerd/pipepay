import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	category: String,
}, { timestamps: { createdAt: "created_at" } });

const CategoryModel = mongoose.model("Category", CategorySchema);

const defaultCategories = [
	"Arts & Collectibles",
	"Audio",
	"Baby Items",
	"Bikes",
	"Books",
	"Business & Industrial",
	"Cameras & Camcorders",
	"CDs, DVDs & Blu-ray",
	"Clothing",
	"Computers",
	"Computer Accessories",
	"Electronics",
	"Fashion",
	"Furniture",
	"Home Appliances",
	"Home Renovation Materials",
	"Jewellery & Watches",
	"Musical Instruments",
	"Phones",
	"Tickets",
	"Tools",
	"Toys & Games",
	"TVs & Video",
	"Video Games & Consoles",
	"Cars & Trucks",
	"Classic Cars",
	"Vehicle Parts, Tires, & Accessories",
	"Motorcycles",
	"Heavy Equipment",
	"Other"
];

(async function() {
	const categories = await CategoryModel.find({});
	if (categories.length < 1) {
		defaultCategories.forEach((category) => {
			CategoryModel.create({ category });
		});
	}
})();

export default CategoryModel;
