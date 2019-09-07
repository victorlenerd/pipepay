import {
	AmazonCognitoIdentity,
	AuthenticationDetails,
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser
} from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: process.env.COGNITO_USER_POOL_ID,
	ClientId: process.env.COGNITO_AUD
};

export let userPool;
export let cognitoUser;

export const init = () => {
	userPool = new CognitoUserPool(poolData);
	return userPool;
};

export const signup = (Username, Password, attributes) =>
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

export const confirmRegistration = (Username, code) =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool
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

export const setAttributes = (attributes, Username) =>
	new Promise((resolve, reject) => {
		let attributeList = attributes.map(data => new CognitoUserAttribute(data));

		if (!cognitoUser) {
			var userPool = new CognitoUserPool(poolData);
			cognitoUser = userPool.getCurrentUser();
		}

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
			Password
		};

		let userData = {
			Username,
			Pool: userPool
		};

		cognitoUser = new CognitoUser(userData);
		let authenticationDetails = new AuthenticationDetails(authenticationData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: resolve,
			onFailure: reject
		});
	});

export const resendVerificationCode = (Username, Password) =>
	new Promise((resolve, reject) => {
		let authenticationData = {
			Username,
			Password
		};

		let userData = {
			Username,
			Pool: userPool
		};

		let cognitoUser = new CognitoUser(userData);

		cognitoUser.resendConfirmationCode((err, result) => {
			if (err) {
				resolve(result);
			} else {
				reject(err);
			}
		});
	});

export const forgotPassword = Username =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.forgotPassword({
			onSuccess: resolve,
			onFailure: reject
		});
	});

export const changePassword = (Username, oldPassword, newPassword) =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.getSession((err, session) => {
			if (err) {
				reject(err);
			} else {
				cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
					if (err) reject(err);
					resolve(result);
				});
			}
		});
	});

export const getSession = Username =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool
		};
		cognitoUser = new CognitoUser(userData);
		cognitoUser.getSession((err, session) => {
			if (err) {
				reject(err);
			} else {
				resolve(session);
			}
		});
	});

export const confirmPassword = (Username, verificationCode, newPassword) =>
	new Promise((resolve, reject) => {
		let userData = {
			Username,
			Pool: userPool
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.confirmPassword(verificationCode, newPassword, {
			onSuccess: resolve,
			onFailure: reject
		});
	});

export const signOut = Username =>
	new Promise(() => {
		let userData = {
			Username,
			Pool: userPool
		};

		cognitoUser = new CognitoUser(userData);

		cognitoUser.signOut();
	});
