const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const JSEncrypt = require('node-jsencrypt');

dotenv.config();

function encrypt()
{
	const cardNumber = '4111111111111111';
    //the public key provided by Nexio
    const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvWpIQFjQQCPpaIlJKpeg irp5kLkzLB1AxHmnLk73D3TJbAGqr1QmlsWDBtMPMRpdzzUM7ZwX3kzhIuATV4Pe 7RKp3nZlVmcrT0YCQXBrTwqZNh775z58GP2kZs+gVfNqBampJPzSB/hB62KkByhE Cn6grrRjiAVwJyZVEvs/2vrxaEpO+aE16emtX12RgI5JdzdOiNyZEQteU6zRBRJE ocPWVxExaOpVVVJ5+UnW0LcalzA+lRGRTrQJ5JguAPiAOzRPTK/lYFFpCAl/F8wt oAVG1c8zO2NcQ0Pko+fmeidRFxJ/did2btV+9Mkze3mBphwFmvnxa35LF+Cs/XJHDwIDAQAB';

    const crypt = new JSEncrypt();
    crypt.setKey(publicKey);
	const encryptedNumber = crypt.encrypt(cardNumber);
	
	console.log('encrypted result: ' + encryptedNumber);
	return encryptedNumber;
}

async function GetOneTimeToken(){
	const postBody = {
										 data: {
										           		paymentMethod: 'creditCard',
										            		allowedCardTypes: [
													                                          'visa',
													                                          'mastercard',
													                                          'discover',
													                                          'amex'
													                                        ],
										            		amount: 1.15,
										            		currency: 'USD',
										            		description: 'test purchase',
										            		customFields: {
											                                          	custom1: 'hi mom',
											                                          	custom2: 'P#dfk1234kdf'
											                                        },
										                customer: {
										                                      invoice: '123',
										                                      orderNumber: '456',
										                                      customerRef: '123',
										                                      firstName: 'buck',
										                                      lastName: 'wild',
										                                      billToAddressOne: '123 Street',
										                                      billToAddressTwo: 'Suite 232',
										                                      billToCity: 'Amarillo',
										                                    	  billToState: 'TX',
										                                      billToPostal: '56649',
										                                      billToCountry: 'US'
										                                    }
										          },
										  processingOptions: {
										                                        webhookUrl: '',
										                                        webhookFailUrl: '',
										                                        checkFraud: true,
										                                        verifyCvc: false,
										                                        verifyAvs: 0,
										                                        verboseResponse: true
										                                  },
										  uiOptions: {
										                       	customTextUrl: '',
										                        displaySubmitButton: false,
										                        hideCvc: false,
										                        requireCvc: true,
										                        hideBilling: false,
										                        limitCountriesTo: [
														                                          'CA',
														                                          'MX',
														                                          'GB',
														                                          'US'
														                                        ]
										                      },
										  card: {
										    cardHolderName: 'Kevin Batchelor'
										  },
										  cart: {
										    items: [
										      {
										        item: 'E100',
										        description: 'Electric Socks',
										        quantity: 2,
										        price: 5,
										        type: 'sale'
											  }
										    ]
										  }
								};
	
    const config = {
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.API_USERNAME + ":" + process.env.PASSWORD).toString('base64')
        }
    };
	
    const { data } = await axios.post(process.env.API_URL + 'pay/v3/token', postBody, config);
	
    return data.token;
	
}

async function runTransaction() {
	
	const OneTimeToken_token = await GetOneTimeToken();
	const encrpytedcardnumber = encrypt();
	console.log('token: ' + OneTimeToken_token);
    const postBody = {
										token:  OneTimeToken_token, 
										card:{
													encryptedNumber: encrpytedcardnumber,//'cu3yRktaYFK2LUC6DpNK289tYDsGRCi7cO+GeG0hkeYFvT7Y8/oY5r53obMz6Q/BZ38gk2u2Ufwy8ojBcX2sfNjG5jplGTXA4NNlSIUjMFfiHe1sff1JFpThoiW/IIlifGlbWu+S1/9pqWPTzJ2+DcjwohbHzsDahhYewFhXgC8qsK0ypi/Shlp+CwRITyIvbVXESD0xz3YOTRHeZLlChvVqN8z4ZzN8nm0MXkmT1wcpYI73bH4KdnPwNU3s7XxvP/ernQP73SHHAOKSLlz4F6AEHFjJiCoXzeLF7LwEjRdxDJ0sKVXbRk3i9BGh+8Nle2VYgjpUWtk2763QkvZiQQ==',
													expirationMonth: '1',
													expirationYear: '2024',
													cardHolderName: 'Kevin Batchelor',
													securityCode: '123' 
												},
										procesingOptions:{verifyAvs:'3'}
									};
	
    const config = {
        headers: {
            Authorization: "Basic " + Buffer.from(process.env.API_USERNAME + ":" + process.env.PASSWORD).toString('base64')
        }
    };
	
    const { data } = await axios.post(process.env.API_URL + 'pay/v3/saveCard', postBody, config);
    return data;
}

runTransaction()
    .then(transactionResponse => {
        console.log(transactionResponse);
		
		var json = {tokens:[transactionResponse.token.token]};
		fs.writeFile('./translist.json', JSON.stringify(json), 'utf8', function(err){
			if(err)
			{
				console.log('write json file failed: ' + err);
			}
			else
			{
				console.log('wirte file success');
			}
		});
		//write trans id into .env file
		//editDotenv(result.parsed,'trans_id=' + transactionResponse.id);
    })
    .catch(err => {
        if (err && err.response) {
            console.error(err.response.data.message);
        } else {
            console.error(err);
        }
    });
