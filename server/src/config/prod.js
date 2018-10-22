const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const config = {
	db: {
		url: `mongodb://${username}:${password}@18.223.102.113:27017/pipepay`
	}
};
