import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import setupMiddleware from "./middleware";
import MainRouter from "./api/resources";
import { connect } from "./db";
import { getJWT } from "./api/modules/auth";
const collect = require('node-style-loader/collect');
import ReactApp from './public/js/app';
const React = require('react');
const StaticRouter = require('react-router-dom').StaticRouter;
const reactDOMServer = require('react-dom/server');

const app = express();

const isDev = process.env.NODE_ENV === 'development';

getJWT();

setupMiddleware(app);

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Authorization, Content-Type, Accept"
	);
	next();
});

connect()
	.then(() => {
		console.log('DB Connected!');
	})
	.catch(err => {
		throw err;
	});

const initialStyleTag = collect.collectInitial();
const HTML = (body) => `
<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<meta name="decriptions" content="Flexible and secure deferred payments for online markets.">
			<meta name="keywords" content="escrow, payment, nigeria, africa, payment, online, deferred, money, buy, online">
			
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous" />
			<link href="https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i" rel="stylesheet">
			<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
			<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
       <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
			
			<link type="text/css" href="../styles/index.css" rel="stylesheet"  />
			<link type="text/css" href="../styles/home.css" rel="stylesheet"  />
			<link type="text/css" href="../styles/nprogress.css" rel="stylesheet"  />
			
			<title>PipePay</title>
			${initialStyleTag}
		</head>
		<body>
			<noscript>
				You need to enable JavaScript to run this app.
			</noscript>
			<div id="loading-bar-container"></div>
			<div id="main">${body}</div>
			<script type="text/javascript" src="../assets/js/bundle.js"></script>
		</body>
		</html>
)`;


const config = require(isDev ? "../config.dev.js" : "../config.stage.js");
const compiler = webpack(config[1]);

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config[1].output.publicPath,
		hot: isDev,
		writeToDisk: true,
		historyApiFallback: true
	})
);

app.use(require("webpack-hot-middleware")(compiler));

app.use("/api", MainRouter);

app.get(
	"(/|/invoices|/invoice/:invoiceId|/signin|/signup|/forgotpassword|/verifyemail|/verifyaccn|/newinvoice|/settings|/request/:invoice|/request/:invoice/:milestoneId|/confirm/:token|/reason|/pricing|/report/:invoiceId|/terms|/privacy)",
	(req, res) => {

		res.send(HTML(reactDOMServer.renderToString(
			<StaticRouter location={req.url} context={{}}>
				<ReactApp />
			</StaticRouter>)));
	}
);

if (!isDev) {
	const Sentry = require("@sentry/node");

	Sentry.init({
		dsn: "https://34c300355f66498a8e7a7b21df7fadbd@sentry.io/1315245"
	});

	app.use(Sentry.Handlers.requestHandler());
	app.use(Sentry.Handlers.errorHandler());
}

export default app;
