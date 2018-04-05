const axios = require('axios');
const dotenv = require('dotenv');

function getOneTimeUseToken() {
    return axios.post(
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
                Authorization: process.env.JWT
            }
        }
    );
}

dotenv.config()
getOneTimeUseToken()
    .then(({ data }) => {
        console.log(data)
    }).catch(err => {
        if (err && err.data) {
            console.error(err.data.message)
        } else {
            console.error(err)
        }
    })
