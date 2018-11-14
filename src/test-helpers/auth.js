import "../api/resources/dispute/dispute.model";
import "../api/resources/invoice/invoice.model";
import "../api/resources/payment/payment.model";

import {
	AuthenticationDetails,
	CognitoUserPool,
	CognitoUser
} from "amazon-cognito-identity-js";

import mongoose from "mongoose";
import config from "../config";

const aaud = process.env.COGNITO_AUD;
const poolId = process.env.COGNITO_USER_POOL_ID;

mongoose.Promise = global.Promise;

export const removeModel = modelName => {
	const model = mongoose.model(modelName);
	return new Promise((resolve, reject) => {
		if (!model) {
			return resolve();
		}
		model.remove(err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

export const dropDb = () => {
	return mongoose
		.connect(
			config.db.url,
			{ useNewUrlParser: true }
		)
		.then(() => Promise.all(mongoose.modelNames().map(removeModel)));
};

export const connectDb = () => {
	return mongoose.connect(
		config.db.url,
		{ useNewUrlParser: true }
	);
};

export const userPool = new CognitoUserPool({
	UserPoolId: poolId,
	ClientId: aaud
});

export const signin = (Username, Password) =>
	new Promise((resolve, reject) => {
		let authenticationData = {
			Username,
			Password
		};

		let userData = {
			Username,
			Pool: userPool
		};

		const cognitoUser = new CognitoUser(userData);
		let authenticationDetails = new AuthenticationDetails(authenticationData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: resolve,
			onFailure: reject
		});
	});
