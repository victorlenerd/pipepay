import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import timeout from "connect-timeout";

const setGlobalMiddleware = app => {
	app.use(helmet());
	app.use(morgan());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(timeout(120000));
	app.use(haltOnTimedout);

	function haltOnTimedout(req, res, next) {
		if (!req.timedout) next();
	}
};

export default setGlobalMiddleware;
