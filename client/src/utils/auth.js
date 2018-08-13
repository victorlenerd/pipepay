import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

export let userPool;
export let cognitoUser;

export const init = () => {
    userPool = new CognitoUserPool({
        UserPoolId : 'us-east-2_ZAwetvcgl',
        ClientId : '5igeiircu8gvq2vgc1uj004qvf'
    });

    return userPool;
}

export const signup = (Username, Password, attributes) => new Promise((resolve, reject) => {
    let attributeList = attributes.map(data => new CognitoUserAttribute(data))

    userPool.signUp(Username, Password, attributeList, null, (err, result) => {
        if (err) {
            reject(err);
            return;
        }

        cognitoUser = result;
        resolve(result);
    });
});

export const confirmRegistration = (Username, code) => new Promise((resolve, reject) => {
    let userData = {
        Username,
        Pool: userPool   
    }

    cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
            reject(err);
            return;
        }

        resolve(result);
    });
});

export const setAttributes = (Username, attributes) => new Promise((resolve, reject) => {
    let attributeList = attributes.map(data => new CognitoUserAttribute(data));
    
    // let userData = {
    //     Username,
    //     Pool: userPool   
    // }

    // cognitoUser = new CognitoUser(userData);

    cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
            reject(err);
            return;
        }

        resolve(result); 
    });
});

export const signin = (Username, Password) => new Promise((resolve, reject) => {
    let authenticationData = {
        Username,
        Password
    };

    let userData = {
        Username,
        Pool: userPool   
    }

    cognitoUser = new CognitoUser(userData);
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: resolve,
        onFailure: reject
    });
});

export const forgotPassword = Username => new Promise((resolve, reject)=> {
    let userData = {
        Username,
        Pool: userPool   
    }

    cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
        onSuccess: resolve,
        onFailure: reject
    });
});

export const confirmPassword = (verificationCode, newPassword) => new Promise((resolve, reject)=> {
    cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: resolve,
        onFailure: reject
    });
})

export const signOut = Username => new Promise((resolve, reject)=> {
    let userData = {
        Username,
        Pool: userPool   
    }

    cognitoUser = new CognitoUser(userData);
    
    cognitoUser.signOut();
});