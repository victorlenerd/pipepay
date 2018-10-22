import axios from "axios";
import jwt from "jsonwebtoken";
const aaud = process.env.COGNITO_AUD;
const tokenUrl = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_ZAwetvcgl/.well-known/jwks.json";

let tokenKeys = null;

export const getJWT = () =>
	new Promise(async (resolve, reject) => {
		try {
			const {
				data: { keys }
			} = await axios.get(tokenUrl);
			tokenKeys = keys;
			resolve();
		} catch (err) {
			reject(err);
		}
	});

export const verifyToken = (req, res, next) => {
	const bearerLength = "Bearer ".length;
	const authorization = req.headers.authorization;

	if (authorization && authorization.length > bearerLength) {
		const token = authorization.slice(bearerLength);
		const tokenData = jwt.decode(token, { complete: true });

		if (tokenData) {
			const {
				header: { kid, alg },
				payload
			} = tokenData;
			const { aud, exp } = payload;
			const [matchKey] = tokenKeys.filter(k => k.kid === kid && k.alg === alg);
			const current_ts = Math.floor(new Date() / 1000);

			if (matchKey !== undefined && aaud === aud && current_ts < exp) {
				req.user = payload;
				next();
				return;
			}
		}
	}

	if (
		(req.originalUrl.match("/api/payment") !== null &&
			req.method.toLowerCase() === "post") ||
		(req.originalUrl.match("/api/payment") !== null &&
			req.method.toLowerCase() === "get") ||
		(req.originalUrl.match("/api/banks") !== null &&
			req.method.toLowerCase() === "get") ||
		(req.originalUrl.match("/api/dispute") !== null &&
			req.method.toLowerCase() === "post") ||
		(req.originalUrl.match("/api/dispute") !== null &&
			req.method.toLowerCase() === "get") ||
		(req.originalUrl.match("/api/verify") !== null &&
			req.method.toLowerCase() === "get")
	) {
		next();
		return;
	}

	res.status(403).send({ success: false, error: "Invalid auth token" });
	return;
};
