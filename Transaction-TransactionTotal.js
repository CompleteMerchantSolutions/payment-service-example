const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function runTransaction () {
    const config = {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.PASSWORD).toString('base64')
        }
    };

    const url = process.env.API_URL + 'transaction/v3/total?merchantIds=' + process.env.MERCHANT_ID;
    console.log('url: ' + url);

    const { data } = await axios.get(url, config);

    return data;
}

runTransaction().then((transactionResponse) => {
    console.log(transactionResponse);
}).catch((err) => {
    if (err && err.response) {
        console.error(err.response.data.message);
    } else {
        console.error(err);
    }
});
