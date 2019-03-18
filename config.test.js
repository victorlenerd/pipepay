const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
require("dotenv").config();

const envs = {
	NODE_ENV: JSON.stringify("testing"),
	TEST_USERNAME: JSON.stringify(process.env.TEST_USERNAME),
	TEST_PASSWORD: JSON.stringify(process.env.TEST_PASSWORD),
	PAYSTACK_SECRET: JSON.stringify(process.env.PAYSTACK_SECRET),
	PAYSTACK_PUBLIC_KEY: JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY),
	COGNITO_AUD: JSON.stringify(process.env.COGNITO_AUD),
	COGNITO_USER_POOL_ID: JSON.stringify(process.env.COGNITO_USER_POOL_ID),
	ZOHO_EMAIL: JSON.stringify(process.env.ZOHO_EMAIL),
	ZOHO_PASSWORD: JSON.stringify(process.env.ZOHO_PASSWORD),
	DB_USER: JSON.stringify(process.env.DB_USER),
	DB_PASSWORD: JSON.stringify(process.env.DB_PASSWORD),
	JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
	AWS_ACCESS_KEY_ID: JSON.stringify(process.env.AWS_ACCESS_KEY_ID),
	AWS_SECRET_KEY: JSON.stringify(process.env.AWS_SECRET_KEY)
};

module.exports = {
	target: "node",
	mode: "none",
	output: {
		devtoolModuleFilenameTemplate: "[absolute-resource-path]",
		devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
	},
	devtool: "cheap-module-source-map",
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.(js|ts)/,
				include: path.resolve("src"), // instrument only testing sources with Istanbul, after ts-loader runs
				loader: "istanbul-instrumenter-loader",
				query: {
					esModules: true
				}
			},
			{
				test: /\.js?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: false,
							presets: [
								["@babel/preset-env", { modules: "auto" }],
								"@babel/preset-react",
								"@babel/preset-flow"
							],
							plugins: [
								"transform-regenerator",
								"@babel/plugin-syntax-dynamic-import",
								"@babel/plugin-transform-runtime",
								"transform-class-properties"
							]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: "raw-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": envs
		})
	]
};
