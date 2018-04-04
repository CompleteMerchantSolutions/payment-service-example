const axios = require('axios');
const dotenv = require('dotenv');
const {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} = require('amazon-cognito-identity-js-node');

dotenv.config();

function getAuthToken() {
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
    const authToken = await getAuthToken();
    const postBody = {
        merchantId: process.env.MERCHANT_ID,
        tokenex: {
            token: process.env.TOKENEX_TOKEN
        },
        data: {
            amount: 12.34
        },
        gateway: {
            name: process.env.GATEWAY_NAME
        },
        card: {
            expirationMonth: '04',
            expirationYear: '2019'
        }
    };
    const config = {
        headers: {
            Authorization: authToken
        }
    };
    const { data } = await axios.post('https://api.emviodev.com/pay/v3/process', postBody, config);

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
