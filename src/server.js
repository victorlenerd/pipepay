import express from "express";
import path from "path";
import setupMiddleware from "./middleware";
import MainRouter from "./api/resources";
import { connect } from "./db";
import { getJWT } from "./api/modules/auth";
import exphbs from "express-handlebars";

const Sentry = require("@sentry/node");
Sentry.init({
	dsn: "https://34c300355f66498a8e7a7b21df7fadbd@sentry.io/1315245"
});

const app = express();

getJWT();

app.use(Sentry.Handlers.requestHandler());
setupMiddleware(app);

app.set("views", path.join(__dirname, "views"));

app.engine(
	"handlebars",
	exphbs({ defaultLayout: "main", layoutsDir: "src/views/layouts/" })
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Authorization, Content-Type, Accept"
	);
	next();
});

connect().catch(err => {
	Sentry.captureException(err);
});

app.get(
	"(/|/invoices|/invoice/:invoiceId|/signin|/signup|/forgotpassword|/verifyemail|/verifyaccn|/newinvoice|/settings|/request/:invoice|/request/:invoice/:milestoneId|/confirm/:token|/reason|/pricing|/report/:invoiceId|/terms|/privacy)",
	(req, res) => {
		res.render("index");
	}
);

app.use("/api", MainRouter);
app.use(Sentry.Handlers.errorHandler());

export default app;
