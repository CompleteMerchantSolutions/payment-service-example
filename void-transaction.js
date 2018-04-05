const axios = require('axios');
const dotenv = require('dotenv');
const {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} = require('amazon-cognito-identity-js-node');

dotenv.config();

function getJWT() {
    const authenticationData = {
        Username: process.env.EMVIO_USERNAME,
        Password: process.env.EMVIO_PASSWORD
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
        UserPoolId: process.env.USER_POOL_ID,
        ClientId: process.env.CLIENT_ID
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username: authenticationData.Username,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                resolve(result.idToken.jwtToken);
            },
            onFailure: function(err) {
                reject(err);
            }
        });
    });
}

async function runTransaction() {
    const jwt = await getJWT();
    const postBody = {
        merchantId: process.env.MERCHANT_ID,
        data: {
            amount: 12.34
        },
        gateway: {
            refNumber: process.env.TRANSACTION_REF_NUMBER,
            name: process.env.GATEWAY_NAME
        }
    };
    const config = {
        headers: {
            Authorization: jwt
        }
    };
    const { data } = await axios.post('https://api.emviodev.com/pay/v3/void', postBody, config);

    return data;
}

runTransaction()
    .then(transactionResponse => {
        console.log(transactionResponse);
    })
    .catch(err => {
        if (err && err.response) {
            console.error(err.response.data.message);
        } else {
            console.error(err);
        }
    });
