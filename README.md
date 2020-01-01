# Getting Started
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
	* **TOKENEX_TOKEN** (Provided by Nexio)
	
# E-commerce Examples
## Run Card Transaction
1. Complete the [configuration](#configuration) steps
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. The example iframe at [localhost:3400/examples/creditCardTransaction.html](http://localhost:3400/examples/creditCardTransaction.html)
can now be used to process a transaction.

<!--4. (Include more information about what's happening and how to run it on their own website.)-->

4. Customize the iframe.
For a full list of available body parameters, see our [documentation](https://docs.nexiopay.com/)

## Save Card
1. Complete the [configuration](#configuration) steps
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. To load the example iframe for running a transaction visit: [localhost:3400/examples/saveCard.html](http://localhost:3400/examples/saveCard.html)
4. The iframe is now embedded in this website and can be used to save a card and customer information.
<!--4. (Include more information about what's happening and how to run it on their own website.)-->

## Alipay Transaction
1. Complete the [configuration](#configuration) steps
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. To load the example iframe for running a transaction visit: [localhost:3400/examples/AlipayTransaction.html](http://localhost:3400/examples/AlipayTransaction.html)
4. The iframe is now embedded in this website and can be used to save a card and customer information.
<!--4. (Include more information about what's happening and how to run it on their own website.)-->

## Save eCheck
1. Complete the [configuration](#configuration) steps
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. To load the example iframe for running a transaction visit: [localhost:3400/examples/saveECheck.html](http://localhost:3400/examples/saveECheck.html)
4. The iframe is now embedded in this website and can be used to save a card and customer information.
<!--4. (Include more information about what's happening and how to run it on their own website.)-->

## eCheck Transaction
1. Complete the [configuration](#configuration) steps
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. To load the example iframe for running a transaction visit:  [localhost:3400/examples/eCheckTransaction.html](http://localhost:3400/examples/eCheckTransaction.html)
4. The iframe is now embedded in this website and can be used to process a transaction.
<!--5. (Include more information about what's happening and how to run it on their own website.)-->

# Sample : Payment Service
## Save Card
1. Run Payment-SaveCard.js

    > node Payment-SaveCard.js

2. Result will input in console. 
3. The sample includes sample of get one time token API. 
4. The transaction result includes token will be written into translist.json for Delete Token using. 

## Credit Card Transaction
1. Run Payment-CreditCardTransaction.js

    > node Payment-CreditCardTransaction.js

2. Result will input in console. 
3. The transaction result includes id and amount will be written into translist.json for other API using, like Void, Refund, Capture, Get Transaction by original Id etc. 

## eCheck Transaction
1. Run Payment-eCheckTransaction.js

    > node Payment-eCheckTransaction.js

2. Result will input in console. 
3. The transaction result includes id and amount will be written into translist.json for other API using, like Void, Refund, Get Transaction by transaction Id etc. 

## Void Transaction
1. A successful Credit Card transaction or eCheck transaction need be made first.
2. Run Payment-VoidTransaction.js

    > node Payment-VoidTransaction.js

3. Result will input in console. 

## Refund Transaction
1. A successful Credit Card transaction or eCheck transaction need be made first.
2. Run Payment-RefundTransaction.js

    > node Payment-RefundTransaction.js

3. Result will input in console. 

## Capture Transaction
1. A successful Credit Card transaction need be made first.
2. Run Payment-CaptureTransaction.js

    > node Payment-CaptureTransaction.js

3. Result will input in console. 

## Delete Tokens
1. A successful Save Card transaction need be made first.
2. Run Payment-DeleteTokens.js

    > node Payment-DeleteTokens.js

3. Result will input in console. 
4. This sample only delete one token, but actaully multi tokens deleting are supported.

# Sample : Transaction Service
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
