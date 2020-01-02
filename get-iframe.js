const express = require('express');

const app = express();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// A one-time-use token is required prior to loading any iframe
async function getOneTimeUseToken (postdata) {
    const { data } = await axios.post(
        process.env.API_URL + '/pay/v3/token',
        postdata,
        {
            headers: {
                Authorization: 'Basic ' + Buffer.from(process.env.API_USERNAME + ':' + process.env.PASSWORD).toString('base64')//process.env.JWT,
            }
        }
    );
    return data.token;
}

//
app.get('/getTokenSaveCard', async (req, res) => {
    try {
        const postdata = {
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

        const oneTimeUseToken = await getOneTimeUseToken(postdata);
        res.status(200).send(oneTimeUseToken);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error while retrieving "card save" template');
    }
});

app.get('/getTokenCreditCard', async (req, res) => {
    try {
        const postdata = {
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
                cardHolderName: 'Cardholder Name'
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

        const oneTimeUseToken = await getOneTimeUseToken(postdata);
        res.status(200).send(oneTimeUseToken);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error while retrieving "Credit Card Transaction" template');
    }
});

app.get('/getTokenAlipay', async (req, res) => {
    try {
        const postdata = {
            data: {
                paymentMethod: 'aliPay',
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
                testMode: 'EXTERNAL'
            },
            uiOptions: {
                customTextUrl: ''
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

        const oneTimeUseToken = await getOneTimeUseToken(postdata);
        res.status(200).send(oneTimeUseToken);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error while retrieving "Alipay Transaction" template');
    }
});

app.get('/getTokenSaveECheck', async (req, res) => {
    try {
        const postdata = {
            data: {
                paymentMethod: 'eCheck',
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
            bank: {
                accountHolderName: 'Todd Risenmay'
            }
        };

        const oneTimeUseToken = await getOneTimeUseToken(postdata);
        res.status(200).send(oneTimeUseToken);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error while retrieving "Save eCheck" template');
    }
});

app.get('/getTokenECheck', async (req, res) => {
    try {
        const postdata = {
            data: {
                paymentMethod: 'eCheck',
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
            bank: {
                accountHolderName: 'Todd Risenmay'
            }
        };

        const oneTimeUseToken = await getOneTimeUseToken(postdata);
        res.status(200).send(oneTimeUseToken);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error while retrieving "eCheck Transaction" template');
    }
});

app.use('/example', express.static('templates'));
app.use('/examples', express.static('templates'));

app.get('/', async (req, res) => {
    res.status(200).send('Welcome to Nexio\'s API Node.js integration example. See our <a href=\'https://github.com/nexiopay/payment-service-example-node\'>GitHub page</a> for help <a href=\'https://github.com/nexiopay/payment-service-example-node/tree/revisions#getting-started\'>getting started</a>.');
});

const PORT = 3400;
//eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
