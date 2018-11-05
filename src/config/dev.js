const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const config = {
	db: {
		url: `mongodb://${username}:${password}@18.222.216.244:27017/pipepay`
		// url: "mongodb://localhost:27017/pipepay"
	}
};
