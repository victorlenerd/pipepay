const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const config = {
	db: {
		url: "mongodb://127.0.0.1:27017/pipepay"
	}
};
