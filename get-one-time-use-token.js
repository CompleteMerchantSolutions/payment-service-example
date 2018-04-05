const axios = require('axios');
const dotenv = require('dotenv');

function getOneTimeUseToken() {
    const testMerchantId = 888886
    const gatewayName = 'usaepay' // Can also be set to "nmi"
    return axios.post(
        'https://api.emviodev.com/pay/v3/token',
        {
            merchantId: testMerchantId,
            gateway: {
                name: gatewayName
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
