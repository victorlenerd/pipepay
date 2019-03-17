const username = process.env.DB_USER || "";
const password = process.env.DB_PASSWORD || "";

export const config = {
	db: {
		url: "mongodb://localhost:27017/pipepay"
	}
};
