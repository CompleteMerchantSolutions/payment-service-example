const AWS = require('aws-sdk');
const { CognitoUserPool, AuthenticationDetails, CognitoUser } = require('amazon-cognito-identity-js');
const dotenv = require('dotenv')

function getAuthToken () {
    console.log(process.env)
    const authenticationData = {
        Username : process.env.USERNAME,
        Password : process.env.PASSWORD
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
        UserPoolId : process.env.USER_POOL_ID,
        ClientId : process.env.CLIENT_ID
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username : authenticationData.Username,
        Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // result.idToken.jwtToken
        },
        onFailure: function(err) {
            // handle err
        }
    });
};

dotenv.config()
getAuthToken()
