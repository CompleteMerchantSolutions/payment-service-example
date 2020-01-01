const axios = require('axios');
const fs = require('fs');

async function runTransaction () {
    const postBody = {
        tokenex: {
            token: process.env.TOKENEX_TOKEN
        },
        bank: {
            accountHolderName: 'Test Name',
            routingNumber: '999546788'
        },
        data: {
            amount: 1.00,
            currency: 'USD',
            description: 'test purchase',
            customFields: {
                custom1: 'hi mom',
                custom2: 'P#dfk1234kdf'
            },
            customer: {
                billToAddressOne: '123 Street',
                billToAddressTwo: 'Box 232',
                billToCity: 'Amarillo',
                billToState: 'TX',
                billToPostal: '79118',
                billToCountry: 'USA'
            },
            cart: {
                items: [
                    { item: 'E100', description: 'Electric Socks', quantity: 2, price: 5, type: 'sale' }
                ]
            }
        }
    };

    const config = {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.PASSWORD).toString('base64')
        }
    };
    const { data } = await axios.post(process.env.API_URL + '/pay/v3/processECheck', postBody, config);

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
