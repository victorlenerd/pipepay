import merge from "lodash.merge";

const env = process.env.NODE_ENV;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const baseConfig = {
	port: 4545,
	db: {
		url: `mongodb://${username}:${password}@${host}`,
	}
};

let envConfig = {};

switch (env) {
	case "development":
	case "dev":
		envConfig = require("./dev").config;
		break;
	case "testing":
	case "test":
		envConfig = require("./test").config;
		break;
	case "staging":
	case "stage":
		envConfig = require("./stage").config;
		break;
	case "prod":
	case "production":
		envConfig = require("./prod").config;
		break;
	default:
		envConfig = require("./dev").config;
}

export default merge(baseConfig, envConfig);
