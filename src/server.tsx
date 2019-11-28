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
const Sentry = require("@sentry/node");

import request from "superagent";
const secret = process.env.PAYSTACK_SECRET;

import CategoryModel from "./api/resources/categories/categories.model";
import InvoiceModel from "./api/resources/invoice/invoice.model";
import SellerModel from "./api/resources/seller/seller.model";

const app = express();

const isDev = process.env.NODE_ENV === 'development';

getJWT();

setupMiddleware(app);

Sentry.init({
	dsn: "https://34c300355f66498a8e7a7b21df7fadbd@sentry.io/1315245"
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

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
const HTML = (body, data) => `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="Flexible and secure deferred payments for online markets.">
		<meta name="keywords" content="escrow, payment, nigeria, africa, payment, online, deferred, money, buy, online">
		
		<link href="https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i" rel="stylesheet">
		<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
		<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>	
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css" integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
		
		<link type="text/css" href="../styles/index.css" rel="stylesheet"  />
		<link type="text/css" href="../styles/home.css" rel="stylesheet"  />
		<link type="text/css" href="../styles/nprogress.css" rel="stylesheet"  />
			
		<title>PipePay</title>
		
		<script type="text/javascript">
			(function() {
			  window.__initial_data__ = ${JSON.stringify(data)};
			})()
		</script>
		
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-151883141-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
		
			gtag('config', 'UA-151883141-1');
		</script>
		
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
`;


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

app.get("(/|/invoices|/invoice/:invoiceId|/payment-request/:invoiceId|/login|/register|/forgot-password|/verify-email|/verify-account|/business-info|/new-invoice|/settings|/request/:invoice|/request/:invoice/:milestoneId|/confirm/:token|/reason|/pricing|/report/:invoiceId|/terms|/privacy)",
	async (req, res) => {

	const data = {
		categories: [],
		invoice: null,
		seller: null
	};

	try {
		const categories = await CategoryModel.find({});
		data.categories = categories;

		if (req.url.match("payment-request")) {
			const invoiceId = req.params.invoiceId;
			const invoice = await InvoiceModel.findOne({ _id: invoiceId }, '_id type description deliveryAmount customerName customerPhone customerEmail created_at purchaseAmount totalPrice whoPaysDeliveryFee whoPaysPipePayFee pipePayFee bankCharges status merchantEmail merchantName userId');
			data.invoice = invoice;
			// @ts-ignore:
			if (invoice && Boolean(invoice.userId)) {
				// @ts-ignore:
				const seller = await SellerModel.findOne({  userId: invoice.userId }, '_id address facebook_username instagram_username twitter_username website_url');
				data.seller = seller
			}
		}
	} catch (e) {
		res.redirect("/not-found");
		Sentry.captureException(e);
	}

	const html = reactDOMServer.renderToString(
		<StaticRouter location={req.url}>
			<ReactApp />
		</StaticRouter>);

		return res.send(HTML(html, data));
	});

app.get("/pay-now/:invoiceId",
	async (req, res) => {
		try {
			const invoiceId = req.params.invoiceId;
			const invoice = await InvoiceModel.findOne({ _id: invoiceId }, '_id type description deliveryAmount customerName customerPhone customerEmail created_at purchaseAmount totalPrice whoPaysDeliveryFee whoPaysPipePayFee pipePayFee bankCharges status merchantEmail merchantName userId');

			// @ts-ignore:
			if (invoice.status === "sent") {
				request
					.post("https://api.paystack.co/transaction/initialize")
					.set("Content-Type", "application/json")
					.set("Cache-Control", "no-cache")
					.set("Authorization", `Bearer ${secret}`)
					.send({
						// @ts-ignore:
						email: invoice.customerEmail,
						// @ts-ignore:
						amount: invoice.totalPrice  * 100
					})
					.end((err, { body: { data: { authorization_url = null } } }) => {
						if (err) {
							Sentry.captureException(err);
							return res.status(400).send({
								success: false
							});
						}

						return res.status(200).send({
							success: true,
							authorization_url
						});
					});
			} else {
				return res.send("Quak Quak!");
			}
		} catch (e) {
			res.redirect("/not-found");
			Sentry.captureException(e);
		}

	});

app.use((req, res) => {
	const html = reactDOMServer.renderToString(
		<StaticRouter location={req.url}>
			<ReactApp />
		</StaticRouter>);

	return res.send(HTML(html, {}));
});


export default app;
