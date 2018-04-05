const AWS = require('aws-sdk');
const { CognitoUserPool, AuthenticationDetails, CognitoUser } = require('amazon-cognito-identity-js-node');
const dotenv = require('dotenv')

function getJWT () {
    const authenticationData = {
        Username : process.env.EMVIO_USERNAME,
        Password : process.env.EMVIO_PASSWORD
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
            console.log(result.idToken.jwtToken)
        },
        onFailure: function(err) {
            console.error(err)
        }
    });
};

dotenv.config()
getJWT()
