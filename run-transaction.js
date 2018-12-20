const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function runTransaction() {
    const postBody = {
        merchantId: process.env.MERCHANT_ID,
        tokenex: {
            token: process.env.TOKENEX_TOKEN
        },
        data: {
            amount: 12.34,
			currency:'USD'
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
            Authorization: process.env.JWT
        }
    };
    const { data } = await axios.post(process.env.API_URL + 'pay/v3/process', postBody, config);

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
