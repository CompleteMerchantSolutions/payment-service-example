const express = require('express')
const app = express()
const axios = require('axios');
const dotenv = require('dotenv');
const { CognitoUserPool, AuthenticationDetails, CognitoUser } = require('amazon-cognito-identity-js-node');

dotenv.config()

async function getOneTimeUseToken (jwt) {
    const { data } = await axios.post(
        'https://api.emviodev.com/pay/v3/token',
        {
            merchantId: process.env.MERCHANT_ID,
            gateway: {
                name: process.env.GATEWAY_NAME
            },
            data: {
                amount: 50.5
            }
        },
        {
            headers: {
                Authorization: jwt
            }
        }
    );
    return data.token
}

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

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                resolve(result.idToken.jwtToken)
            },
            onFailure: function(err) {
                reject(err)
            }
        });
    })
};

app.get('/getToken', async (req, res) => {
    try {
        const jwt = await getJWT()
        const oneTimeUseToken = await getOneTimeUseToken(jwt)
        res.status(200).send(oneTimeUseToken)
    } catch (err) {
        console.error(err)
        res.status(500).send('An error while retrieving "card save" template')
    }
})

app.use('/example', express.static('templates'))
app.use('/examples', express.static('templates'))

app.get('/', async (req, res) => {
    res.status(200).send('Welcome to Emvio! Visit /example to get started.')
})

const PORT = 3400
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
