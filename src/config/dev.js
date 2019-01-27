const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const config = {
	db: {
		url: `mongodb://${username}:${password}@18.220.77.141:27017/pipepay`
	}
};
