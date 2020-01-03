This repository includes examples to integrate with Nexio's API using Node.js.
See our [documentation](https://docs.nexiopay.com/) for a complete list of available endpoints and parameters.

# Getting Started
To get started, install all the [dependencies](#dependencies), then complete the [configuration](#configuration) steps.
Now you're ready to try out the following examples:
- [E-commerce Iframes](#e-commerce-iframe-examples)
- [E-commerce API Examples](#e-commerce-api-examples)
- [Transaction Reports](#transaction-report-examples)

## Dependencies
* Node: 
  * To install via a package manager: visit the following [link](https://nodejs.org/en/download/package-manager) and follow the instructions corresponding to your system's package manager.
  * To install via an installer: visit the following [link](https://nodejs.org/en/download/) and download your system's installer.

## Configuration
1. [Clone or download](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
the example [source](https://https://github.com/nexiopay/payment-service-example-node/).
2. Go to location of the source directory:

    > cd payment-service-example-node

3. Install Node modules:

    > npm install

4. Copy example.env and save as .env:

    > cp example.env .env

5. Update the following variables in .env:
	* **API_URL** (The API's [base URL](https://docs.nexiopay.com/#base-urls-and-environments). This will be https://api.nexiopaysandbox.com for Sandbox.)
    * **USERNAME** (Your [dashboard.nexiopay.com](https://dashboard.nexiopay.com) username)
    * **PASSWORD** (Your [dashboard.nexiopay.com](https://dashboard.nexiopay.com) password)
	* **MERCHANT_ID** (The merchant ID assigned to you from Nexio)
	* **TOKENEX_TOKEN** _Optional_ (Provided by Nexio)
	<!--Tokenex token is only required by certain endpoints-->
	
# E-commerce
## E-commerce Iframe Examples
Follow the steps below to view our example e-commerce iframes.

1. Complete the [configuration](#configuration) steps

2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.
    
3. View the desired iframe in a browser:
    - [Run Card Transaction Iframe](https://docs.nexiopay.com/#run-transaction-iframe): http://localhost:3400/examples/creditCardTransaction.html
    - [Save Card Token Iframe](https://docs.nexiopay.com/#save-card-iframe): http://localhost:3400/examples/saveCard.html
    - [Run E-check Transaction Iframe](https://docs.nexiopay.com/#run-e-check-transaction-iframe): http://localhost:3400/examples/eCheckTransaction.html
    - [Save E-check Transaction Iframe](https://docs.nexiopay.com/#save-e-check-iframe): http://localhost:3400/examples/saveECheck.html
    - [Run Alipay Transaction Iframe](https://docs.nexiopay.com/#alipay): http://localhost:3400/examples/AlipayTransaction.html

    When you load any of the above HTML files the following happens:
    - An [E-commerce One-time-use token](https://docs.nexiopay.com/#one-time-use-token-e-commerce) is requested from Nexio.
    (You need a new one-time-use token prior to loading any iframe.)
    - The iframe is loaded:
        - The one-time-use token is appended to the iframe's URL a query parameter called `token`.
        - The is result is assigned to your iframe's `src` tag.
    - An event listener is added to the form's submit button that will cause the form to submit when a user clicks submit.
      
See our [E-commerce Flows & Operations](https://docs.nexiopay.com/#e-commerce-overview) documentation for guided tutorials,
or [contact our integrations team](https://docs.nexiopay.com/#contact-us) for help.

## E-commerce API Examples
Integrating directly with Nexio's API allows you to preform any operation that can be done in an iframe:
- [Save a Card Token](https://docs.nexiopay.com/#save-card)
- [Run a Card Transaction](https://docs.nexiopay.com/#run-transaction)
- [Create an E-check Token](https://docs.nexiopay.com/#save-e-check)
- [Run an E-check Transaction](https://docs.nexiopay.com/#run-e-check-transaction)

It also allows you to perform certain operations that cannot be done in an iframe, including:
- [Capture a Card Transaction](https://docs.nexiopay.com/#capture-transaction)
- [Refund a Card Transaction](https://docs.nexiopay.com/#refund-transaction)
- [Void a Card Transaction](https://docs.nexiopay.com/#void-transaction)
- [View a Card Token](https://docs.nexiopay.com/#view-card-token)
- [Edit a Card Token](https://docs.nexiopay.com/#edit-card-token)
- [Delete a Card Token](https://docs.nexiopay.com/#delete-card-token)

For a complete list of available API endpoints and their parameters, see our [documentation](https://docs.nexiopay.com).
The examples below can be used for testing as well as a starting point for integrating Nexio's Payment API into your own code base.

### Save Card Token
To run our example, follow the steps below:

1. Run saveCardToken.js

    > node e-commerce/api-examples/saveCardToken.js
    
    When you run the script the following occurs:
    - A one-time-use token is requested
    - The one-time-use token is used to send a request to Nexio's [Save Card](https://docs.nexiopay.com/#save-card) endpoint
    
**Note:** For example purposes a fake encrypted card number is used.
When integrating into your own code base you will accept the card number through your own form and encrypt it prior to sending a request to the [Save Card](https://docs.nexiopay.com/#save-card) endpoint.
See our [Browser-based Encryption](https://docs.nexiopay.com/#browser-based-encryption) tutorial for more information. 

2. Interpret the Response
- A success or failure response will be output to the console.
See our [docs](https://docs.nexiopay.com/#save-card) for a 200 response example.
- For convenience, the card token will also be saved to `translist.json`

3. View or Delete the Token _(optional)_
You may now wish to 

### Credit Card Transaction
1. Run runCardTransaction.js

    > node e-commerce/api-examples/runCardTransaction.js

2. Result will input in console. 
3. The transaction result includes id and amount will be written into translist.json for other API using, like Void, Refund, Capture, Get Transaction by original Id etc. 

### eCheck Transaction
1. Run runECheckTransaction.js

    > node e-commerce/api-examples/runECheckTransaction.js

2. Result will input in console. 
3. The transaction result includes id and amount will be written into translist.json for other API using, like Void, Refund, Get Transaction by transaction Id etc. 

### Void Transaction
1. A successful Credit Card transaction or eCheck transaction need be made first.
2. Run voidTransaction.js

    > node e-commerce/api-examples/voidTransaction.js

3. Result will input in console. 

### Refund Transaction
1. A successful Credit Card transaction or eCheck transaction need be made first.
2. Run refundTransaction.js

    > node e-commerce/api-examples/refundTransaction.js

3. Result will input in console. 

### Capture Transaction
1. A successful Credit Card transaction need be made first.
2. Run captureTransaction.js

    > node e-commerce/api-examples/captureTransaction.js

3. Result will input in console. 

### Delete Card Token(s)
1. A successful Save Card transaction need be made first.
2. Run deleteCardTokens.js

    > node e-commerce/api-examples/deleteCardTokens.js

3. Result will input in console. 
4. This sample only delete one token, but actaully multi tokens deleting are supported.

# Reports
## Transaction Report Examples
### Transaction(Using Transaction Id)
1. A successful Credit Transactions need be made first.
2. Run Transaction-GetTransWithId.js

    > node Transaction-GetTransWithId.js

3. Result will input in console. 
4. The id use in this sample is the original id in response of Credit Card Transaction or eCheck Transaction.

### Transaction
1. A successful Transactions need be made first.
2. Run Transaction-GetTrans.js

    > node Transaction-GetTrans.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

### Matching Transaction For FDR Chargeback
1. Run Transaction-MatchTransForFDR.js

    > node Transaction-MatchTransForFDR.js

2. Result will input in console. 

### Transaction Count
1. Run Transaction-TransactionCount.js

    > node Transaction-TransactionCount.js

2. Result will input in console. 

### Daily Transaction Summary
1. Run Transaction-DailyTransSummary.js

    > node Transaction-DailyTransSummary.js

2. Result will input in console. 

### Transaction Total
1. Run Transaction-TransactionTotal.js

    > node Transaction-TransactionTotal.js

2. Result will input in console. 

### Transaction Summary
1. Run Transaction-TransactionSummary.js

    > node Transaction-TransactionSummary.js

2. Result will input in console. 

### Payment Types
1. Run Transaction-PaymentTypes.js

    > node Transaction-PaymentTypes.js

2. Result will input in console. 

### Search Transaction
1. Run Transaction-SearchTransaction.js

    > node Transaction-SearchTransaction.js

2. Result will input in console. 
3. This sample does not include any query parameter, but actually, user can pass their own search condition with name 'search'.

### Transactions
1. Run Transaction-transactions.js

    > node Transaction-transactions.js

3. Result will input in console. 
4. The result will be written into translist.json for later using, like Transaction, Refund, Void, Capture, Bulk Void and Bulk Capture.

### Refund
1. A successful Transactions need be made first.
2. Run Transaction-RefundTransaction.js

    > node Transaction-RefundTransaction.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

### Void
1. A successful Transactions need be made first.
2. Run Transaction-VoidTransaction.js

    > node Transaction-VoidTransaction.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

### Capture
1. A successful Transactions need be made first.
2. Run Transaction-CaptureTransaction.js

    > node Transaction-CaptureTransaction.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

### Bulk Void
1. A successful Transactions need be made first.
2. Run Transaction-BulkVoid.js

    > node Transaction-BulkVoid.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

### Bulk Capture
1. A successful Transactions need be made first.
2. Run Transaction-BulkCapture.js

    > node Transaction-BulkCapture.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

# Features
## Browser-based Encryption
1. Run ClientSideToken.js

    > node ClientSideToken.js

3. Result will input in console. 
