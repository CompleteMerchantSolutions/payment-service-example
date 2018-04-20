const express = require('express');

const app = express();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function getOneTimeUseToken (jwt) {
    const { data } = await axios.post(
        process.env.API_URL + 'pay/v3/token',
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
                Authorization: process.env.JWT,
            }
        }
    );
    return data.token;
}

async function getJWT () {
    const { data } = await axios.post(
        process.env.API_URL + 'user/v3/login',
        {
            username: process.env.API_USERNAME,
            password: process.env.PASSWORD
        }
    );
    return data.idToken;
}

app.get('/getToken', async (req, res) => {
    try {
        const jwt = await getJWT();
        const oneTimeUseToken = await getOneTimeUseToken(jwt);
        res.status(200).send(oneTimeUseToken);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error while retrieving "card save" template');
    }
});

app.use('/example', express.static('templates'));
app.use('/examples', express.static('templates'));

app.get('/', async (req, res) => {
    res.status(200).send('Welcome to Transactionplatform! Visit /example to get started.');
});

const PORT = 3400;
//eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
