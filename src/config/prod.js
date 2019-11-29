const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

export const config = {
	db: {
		url: `mongodb+srv://${username}:${password}@${host}`,
	}
};
