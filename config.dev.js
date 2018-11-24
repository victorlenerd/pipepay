const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
require("dotenv").config();

const envs = {
	NODE_ENV: JSON.stringify("development"),
	BUILD_TARGET: JSON.stringify("server"),
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

module.exports = [
	{
		entry: ["webpack/hot/poll?1000", "./src/index"],
		watch: true,
		mode: "development",
		devtool: "sourcemap",
		target: "node",
		node: {
			__filename: true,
			__dirname: true
		},
		externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
		module: {
			rules: [
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
				}
			]
		},
		plugins: [
			new StartServerPlugin("server.js"),
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				"process.env": envs
			}),
			new webpack.BannerPlugin({
				banner: 'require("source-map-support").install();',
				raw: true,
				entryOnly: false
			})
		],
		output: { path: path.join(__dirname, "dist"), filename: "server.js" }
	},
	{
		entry: "./src/public/js/index.js",
		watch: true,
		mode: "development",
		devtool: "sourcemap",
		target: "web",
		module: {
			rules: [
				{
					test: /\.js?$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								babelrc: false,
								presets: [
									"@babel/preset-env",
									"@babel/preset-react",
									"@babel/preset-flow"
								],
								plugins: [
									"transform-regenerator",
									"@babel/plugin-syntax-dynamic-import",
									["@babel/plugin-transform-runtime", { useESModules: true }],
									"transform-class-properties"
								]
							}
						}
					],
					exclude: /node_modules/
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				NODE_ENV: "development"
			})
		],

		output: {
			path: path.join(__dirname, "src/public/dist"),
			filename: "bundle.js"
		}
	}
];
