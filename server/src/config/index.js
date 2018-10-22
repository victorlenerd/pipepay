import merge from "lodash.merge";
const env = process.env.NODE_ENV;

const baseConfig = {
	port: 4545,
	db: {
		url: ""
	}
};

let envConfig = {};

switch (env) {
case "development":
case "dev":
	envConfig = require("./dev").config;
	break;
case "staging":
case "stge":
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