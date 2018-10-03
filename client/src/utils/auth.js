//@flow
import {
	AuthenticationDetails,
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from "amazon-cognito-identity-js";

export let userPool: any;
export let cognitoUser: any;

export const init = () => {
	userPool = new CognitoUserPool({
		UserPoolId: "us-east-2_ZAwetvcgl",
		ClientId: "1kim3ke0fq358jrota00sam46r",
	});

	return userPool;
};

export const signup = (Username: string, Password: string, attributes: any) =>
	new Promise((resolve, reject) => {
		let attributeList = attributes.map(data => new CognitoUserAttribute(data));

		userPool.signUp(Username, Password, attributeList, null, (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			cognitoUser = result;
			resolve(result);
		});
	});

export const confirmRegistration = (Username: string, code: string) =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool,
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.confirmRegistration(code, true, (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(result);
		});
	});

export const setAttributes = attributes =>
	new Promise((resolve, reject) => {
		let attributeList = attributes.map(data => new CognitoUserAttribute(data));

		cognitoUser.updateAttributes(attributeList, (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(result);
		});
	});

export const signin = (Username, Password) =>
	new Promise((resolve, reject) => {
		let authenticationData = {
			Username,
			Password,
		};

		let userData = {
			Username,
			Pool: userPool,
		};

		cognitoUser = new CognitoUser(userData);
		let authenticationDetails = new AuthenticationDetails(authenticationData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: resolve,
			onFailure: reject,
		});
	});

export const forgotPassword = Username =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool,
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.forgotPassword({
			onSuccess: resolve,
			onFailure: reject,
		});
	});

export const confirmPassword = (Username, verificationCode, newPassword) =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool,
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.confirmPassword(verificationCode, newPassword, {
			onSuccess: resolve,
			onFailure: reject,
		});
	});

export const signOut = Username =>
	new Promise(() => {
		let userData = {
			Username,
			Pool: userPool,
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.signOut();
	});
