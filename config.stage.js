const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = [
	{
		entry: "./src/index",
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
			new Dotenv(),
			new webpack.DefinePlugin({
				"process.env": {
					BUILD_TARGET: JSON.stringify("server"),
					NODE_ENV: JSON.stringify("development")
				}
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
				"process.env": {
					BUILD_TARGET: JSON.stringify("server"),
					NODE_ENV: JSON.stringify("development")
				}
			})
		],

		output: {
			path: path.join(__dirname, "src/public/dist"),
			filename: "bundle.js"
		}
	}
];
