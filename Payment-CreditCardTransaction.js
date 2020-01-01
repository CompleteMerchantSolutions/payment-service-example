const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

async function runTransaction () {
    const postBody = {
        isAuthOnly: true,
        tokenex: {
            token: process.env.TOKENEX_TOKEN,
            firstSix: '123',
            lastFour: '1234'
        },
        card: {
            expirationMonth: '1',
            expirationYear: '20',
            cardHolderName: 'Captain Hammer',
            lastFour: '1111'
        },
        data: {
            currency: 'USD',
            amount: 10,
            customFields: {
                custom1: 'hi mom',
                custom2: 'P#dfk1234kdf'
            },
            customer: {
                orderNumber: '14233',
                customerRef: '1234',
                firstName: 'Captain',
                lastName: 'Hammer',
                billToAddressOne: '123 Street',
                billToAddressTwo: 'Box 232',
                billToCity: 'Amarillo',
                billToState: 'TX',
                billToPostal: '79118',
                billToCountry: 'US'
            },
            cart: {
                items: [
                    { item: 'E100', description: 'Electric Socks', quantity: 2, price: 5, type: 'sale' }
                ]
            }
        },
        processingOptions: {
            checkFraud: true
        }
    };

    const config = {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.PASSWORD).toString('base64')
        }
    };
    const { data } = await axios.post(process.env.API_URL + '/pay/v3/process', postBody, config);

    return data;
}

runTransaction().then((transactionResponse) => {
    console.log(transactionResponse);

    var json = { data: { amount: transactionResponse.amount }, id: transactionResponse.id };
    fs.writeFile('./translist.json', JSON.stringify(json), 'utf8', function (err) {
        if (err) {
            console.log('write json file failed: ' + err);
        } else {
            console.log('wirte file success');
        }
    });
    //write trans id into .env file
    //editDotenv(result.parsed,'trans_id=' + transactionResponse.id);
}).catch((err) => {
    if (err && err.response) {
        console.error(err.response.data.message);
    } else {
        console.error(err);
    }
});
