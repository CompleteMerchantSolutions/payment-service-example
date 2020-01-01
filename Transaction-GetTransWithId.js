const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const util = require('util');

dotenv.config();

// Convert fs.readFile into Promise version
const readFile = util.promisify(fs.readFile);

async function runTransaction () {
    let result = await readFile('./translist.json', 'utf8');
    console.log(result);
    //const postBody = await ReadTransList();
    const config = {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.PASSWORD).toString('base64')
        }
    };

    const url = process.env.API_URL + 'transaction/v3/' + JSON.parse(result).id;
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
