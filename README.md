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
    - [Save Card Iframe](https://docs.nexiopay.com/#save-card-iframe): http://localhost:3400/examples/saveCard.html
    - [Run E-check Transaction Iframe](https://docs.nexiopay.com/#run-e-check-transaction-iframe): http://localhost:3400/examples/eCheckTransaction.html
    - [Save E-check Transaction Iframe](https://docs.nexiopay.com/#save-e-check-iframe): http://localhost:3400/examples/saveECheck.html
    - [Run Alipay Transaction Iframe](https://docs.nexiopay.com/#alipay): http://localhost:3400/examples/AlipayTransaction.html

    When you load any of the above HTML files the following happens:
    - An [E-commerce One-time-use token](https://docs.nexiopay.com/#one-time-use-token-e-commerce) is requested from Nexio.
    (You need a new one-time-use token prior to loading any iframe.)
    - The one-time-use token is appended to the iframe's URL a query parameter called `token`.
    - The is result is assigned to your iframe's `src` tag.
      
See our [E-commerce Flows & Operations](https://docs.nexiopay.com/#e-commerce-overview) documentation for guided tutorials,
or [contact our integrations team](https://docs.nexiopay.com/#contact-us) for help.

## E-commerce API Examples
### Save Card
1. Run Payment-SaveCard.js

    > node Payment-SaveCard.js

2. Result will input in console. 
3. The sample includes sample of get one time token API. 
4. The transaction result includes token will be written into translist.json for Delete Token using. 

### Credit Card Transaction
1. Run Payment-CreditCardTransaction.js

    > node Payment-CreditCardTransaction.js

2. Result will input in console. 
3. The transaction result includes id and amount will be written into translist.json for other API using, like Void, Refund, Capture, Get Transaction by original Id etc. 

### eCheck Transaction
1. Run Payment-eCheckTransaction.js

    > node Payment-eCheckTransaction.js

2. Result will input in console. 
3. The transaction result includes id and amount will be written into translist.json for other API using, like Void, Refund, Get Transaction by transaction Id etc. 

### Void Transaction
1. A successful Credit Card transaction or eCheck transaction need be made first.
2. Run Payment-VoidTransaction.js

    > node Payment-VoidTransaction.js

3. Result will input in console. 

### Refund Transaction
1. A successful Credit Card transaction or eCheck transaction need be made first.
2. Run Payment-RefundTransaction.js

    > node Payment-RefundTransaction.js

3. Result will input in console. 

### Capture Transaction
1. A successful Credit Card transaction need be made first.
2. Run Payment-CaptureTransaction.js

    > node Payment-CaptureTransaction.js

3. Result will input in console. 

### Delete Tokens
1. A successful Save Card transaction need be made first.
2. Run Payment-DeleteTokens.js

    > node Payment-DeleteTokens.js

3. Result will input in console. 
4. This sample only delete one token, but actaully multi tokens deleting are supported.

# Transaction Report Examples
## Transaction(Using Transaction Id)
1. A successful Credit Transactions need be made first.
2. Run Transaction-GetTransWithId.js

    > node Transaction-GetTransWithId.js

3. Result will input in console. 
4. The id use in this sample is the original id in response of Credit Card Transaction or eCheck Transaction.

## Transaction
1. A successful Transactions need be made first.
2. Run Transaction-GetTrans.js

    > node Transaction-GetTrans.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

## Matching Transaction For FDR Chargeback
1. Run Transaction-MatchTransForFDR.js

    > node Transaction-MatchTransForFDR.js

2. Result will input in console. 

## Transaction Count
1. Run Transaction-TransactionCount.js

    > node Transaction-TransactionCount.js

2. Result will input in console. 

## Daily Transaction Summary
1. Run Transaction-DailyTransSummary.js

    > node Transaction-DailyTransSummary.js

2. Result will input in console. 

## Transaction Total
1. Run Transaction-TransactionTotal.js

    > node Transaction-TransactionTotal.js

2. Result will input in console. 

## Transaction Summary
1. Run Transaction-TransactionSummary.js

    > node Transaction-TransactionSummary.js

2. Result will input in console. 

## Payment Types
1. Run Transaction-PaymentTypes.js

    > node Transaction-PaymentTypes.js

2. Result will input in console. 

## Search Transaction
1. Run Transaction-SearchTransaction.js

    > node Transaction-SearchTransaction.js

2. Result will input in console. 
3. This sample does not include any query parameter, but actually, user can pass their own search condition with name 'search'.

## Transactions
1. Run Transaction-transactions.js

    > node Transaction-transactions.js

3. Result will input in console. 
4. The result will be written into translist.json for later using, like Transaction, Refund, Void, Capture, Bulk Void and Bulk Capture.

## Refund
1. A successful Transactions need be made first.
2. Run Transaction-RefundTransaction.js

    > node Transaction-RefundTransaction.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

## Void
1. A successful Transactions need be made first.
2. Run Transaction-VoidTransaction.js

    > node Transaction-VoidTransaction.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

## Capture
1. A successful Transactions need be made first.
2. Run Transaction-CaptureTransaction.js

    > node Transaction-CaptureTransaction.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

## Bulk Void
1. A successful Transactions need be made first.
2. Run Transaction-BulkVoid.js

    > node Transaction-BulkVoid.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

## Bulk Capture
1. A successful Transactions need be made first.
2. Run Transaction-BulkCapture.js

    > node Transaction-BulkCapture.js

3. Result will input in console. 
4. The id use in this sample is the id in response of Transactions (Transaction-transactions.js).

# Sample: Client Side Token
1. Run ClientSideToken.js

    > node ClientSideToken.js

3. Result will input in console. 
