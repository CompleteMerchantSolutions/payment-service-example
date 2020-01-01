const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const util = require('util');

dotenv.config();

// Convert fs.readFile into Promise version
const readFile = util.promisify(fs.readFile);

async function ReadTransList () {
    return await readFile('./translist.json', 'utf8');
}

async function runTransaction () {
    const result = await ReadTransList();
    console.log(result);
    const postBody = { transactionIds: [ JSON.parse(result).id ] };
    const config = {
        headers: {
            Authorization: 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.PASSWORD).toString('base64')
        }
    };
    console.log(postBody);
    const { data } = await axios.post(process.env.API_URL + 'transaction/v3/capture/bulk', postBody, config);

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
