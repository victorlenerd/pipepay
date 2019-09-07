const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

require("dotenv").config();

const envs = {
	NODE_ENV: JSON.stringify("production"),
	BUILD_TARGET: JSON.stringify("server"),
	TEST_USERNAME: JSON.stringify(process.env.TEST_USERNAME),
	TEST_PASSWORD: JSON.stringify(process.env.TEST_PASSWORD),
	PAYSTACK_SECRET: JSON.stringify(process.env.PAYSTACK_SECRET),
	PAYSTACK_PUBLIC_KEY: JSON.stringify(process.env.PAYSTACK_PUBLIC_KEY),
	COGNITO_AUD: JSON.stringify(process.env.COGNITO_AUD),
	COGNITO_USER_POOL_ID: JSON.stringify(process.env.COGNITO_USER_POOL_ID),
	ZOHO_EMAIL: JSON.stringify(process.env.ZOHO_EMAIL),
	ZOHO_PASSWORD: JSON.stringify(process.env.ZOHO_PASSWORD),
	DB_HOST: JSON.stringify(process.env.DB_HOST),
	DB_USER: JSON.stringify(process.env.DB_USER),
	DB_PASSWORD: JSON.stringify(process.env.DB_PASSWORD),
	JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
	AWS_ACCESS_KEY_ID: JSON.stringify(process.env.AWS_ACCESS_KEY_ID),
	AWS_SECRET_KEY: JSON.stringify(process.env.AWS_SECRET_KEY)
};

console.log({ envs });

module.exports = [
	{
		entry: ["./src/index.ts"],
		watch: false,
		mode: "production",
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
					test: /\.(js|ts)x?$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								babelrc: false,
								presets: [
									["@babel/preset-env"],
									"@babel/preset-react",
									"@babel/preset-typescript"
								],
								plugins: [
									"@babel/transform-regenerator",
									"@babel/plugin-transform-runtime",
									"transform-class-properties",
									"react-hot-loader/babel"
								]
							}
						}
					],
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					loader: 'style-loader'
				},
				{
					test: /\.css$/,
					loader: 'css-loader',
					query: {
						modules: true,
						localIdentName: '[name]__[local]___[hash:base64:5]'
					}
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'url-loader'
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				"process.env": envs
			}),
			new webpack.BannerPlugin({
				banner: "require(\"source-map-support\").install();",
				raw: true,
				entryOnly: false
			})
		],
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
			modules: [
				path.resolve( __dirname, 'src'),
				'node_modules'
			]
		},
		output: { path: path.resolve(__dirname, "dist"), filename: "server.js" }
	},
	{
		entry: ["./src/public/js/index.tsx"],
		watch: false,
		mode: "production",
		target: "web",
		devtool: "cheap-module-eval-source-map",
		module: {
			rules: [
				{
					test: /\.(js|ts)x?$/,
					use: [
						"react-hot-loader/webpack",
						{
							loader: "babel-loader",
							options: {
								babelrc: false,
								presets: [
									"@babel/preset-env",
									"@babel/preset-react",
									"@babel/preset-typescript"
								],
								plugins: [
									"react-hot-loader/babel",
									"@babel/transform-regenerator",
									"@babel/plugin-syntax-dynamic-import",
									["@babel/plugin-transform-runtime", { useESModules: true }],
									"transform-class-properties"
								]
							}
						}
					],
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					loader: 'style-loader'
				},
				{
					test: /\.css$/,
					loader: 'css-loader',
					query: {
						modules: true,
						localIdentName: '[name]__[local]___[hash:base64:5]'
					}
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({
				"process.env": envs
			}),
			new webpack.optimize.OccurrenceOrderPlugin()
		],
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
			modules: [
				path.resolve( __dirname, 'src'),
				'node_modules'
			]
		},
		output: {
			publicPath: "/public/",
			path: path.resolve(__dirname, "src/public/assets/js/"),
			filename: "bundle.js"
		}
	}
];
