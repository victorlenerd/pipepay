const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = [{
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
							presets: [["@babel/preset-env", { modules: "auto" }], "@babel/preset-react", "@babel/preset-flow"],
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
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				use: {
					loader: "raw-loader"
				}
			}
		]
	},
	plugins: [
		new Dotenv(),
		new StartServerPlugin("server.js"),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": { BUILD_TARGET: JSON.stringify("server"), NODE_ENV: JSON.stringify("production") }
		}),
		new webpack.BannerPlugin({ banner: "require(\"source-map-support\").install();", raw: true, entryOnly: false })
	],
	output: { path: path.join(__dirname, "dist"), filename: "server.js" }
},{
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
							presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
							plugins: ["transform-regenerator", "@babel/plugin-syntax-dynamic-import", ["@babel/plugin-transform-runtime", { useESModules: true }], "transform-class-properties"]
						}
					}],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { BUILD_TARGET: JSON.stringify("server"), NODE_ENV: JSON.stringify("production") }
		})
	],

	output: {
		path: path.join(__dirname, "src/public/dist"), filename: "bundle.js"
	}
}];