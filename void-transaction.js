const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function runTransaction() {
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
            Authorization: process.env.JWT
        }
    };
    const { data } = await axios.post(process.env.API_URL + 'pay/v3/void', postBody, config);

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
