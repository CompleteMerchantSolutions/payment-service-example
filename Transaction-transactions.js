const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();



async function runTransaction() {
	
    const config = {
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.API_USERNAME + ":" + process.env.PASSWORD).toString('base64')
        }
    };
	
	const url = process.env.API_URL + 'transaction/v3';
	console.log('url: ' + url);
	
    const { data } = await axios.get(url, config);

    return data;
}

runTransaction()
.then(transactionResponse => {
    console.log(transactionResponse);
	
	//write the first id into translist.json for latter using by other transaction APIs.
	jsondata = {amount: transactionResponse.rows[0].amount ,id: transactionResponse.rows[0].id}
	fs.writeFile('./translist.json', JSON.stringify(jsondata), 'utf8', function(err){
			if(err)
			{
				console.log('write json file failed: ' + err);
			}
			else
			{
				console.log('wirte file success');
			}
		});
})
.catch(err => {
    if (err && err.response) {
        console.error(err.response.data.message);
    } else {
        console.error(err);
    }
});
