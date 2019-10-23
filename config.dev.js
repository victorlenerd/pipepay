const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
	DB_HOST: JSON.stringify(process.env.DB_HOST),
	DB_USER: JSON.stringify(process.env.DB_USER),
	DB_PASSWORD: JSON.stringify(process.env.DB_PASSWORD),
	JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
	ACCESS_KEY_ID: JSON.stringify(process.env.ACCESS_KEY_ID),
	SECRET_KEY: JSON.stringify(process.env.SECRET_KEY)
};

module.exports = [
	{
		entry: ["./src/index.ts"],
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
					loader: 'node-style-loader!css-loader',
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'url-loader'
				}
			]
		},
		plugins: [
			new StartServerPlugin({
				name: "server.js",
				nodeArgs: ['--inspect=0.0.0.0']
			}),
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
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
		entry: [
			"webpack-hot-middleware/client?path=http://localhost:4545/__webpack_hmr",
			"./src/public/js/index.tsx"
		],
		watch: true,
		mode: "development",
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
					use: ["style-loader", "css-loader"]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({
				"process.env": envs
			}),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
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
