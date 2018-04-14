# Plugin: Getting Started
## Dependencies
* Node:
 * To install via a package manager: go to the following [link](https://nodejs.org/en/download/package-manager) and follow the instructions corresponding to your system's package manager.
 * To install via an installer: visit the following [link](https://nodejs.org/en/download/) and download your system's installer.

## Obtain JSON Web Token (JWT)
1. Clone or download the example [source](https://bitbucket.org/emvio/payment-service-examples/downloads/) and unzip.
2. Go to location of the source directory:

    > cd emvio-payment-service-examples

3. Install Node modules:

    > npm install

4. Copy example.env and save as .env:

    > cp example.env .env

5. Update the following variables in .env:
    * **USERNAME** (Your [dashboard.transactionplatform.com](https://dashboard.transactionplatform.com) username)
    * **PASSWORD** (Your [dashboard.transactionplatform.com](https://dashboard.transactionplatform.com) password)

    If you have questions about any of these variables please contact us via the [Emvio Support Slack Channel](https://emviosupport.slack.com).

6. Run Get Json Web Token (JWT):

    > node get-jwt.js

    * This script will print your JSON Web Token to the console. This token will be used in the next step to create a one time use token.
    * (Note that this token expires after one hour.)

## Use the JWT to Get a One Time Use Token
1. Update the following variables in .env:
    * **MERCHANT_ID** (The merchant id assigned to you from CMS)
    * **GATEWAY_NAME** (The name of the gateway to be used to run the transaction, e.g. 'usaepay', 'nmi')
    * **JWT** (The JSON Web Token from the previous step.)
2. Run get-one-time-use-token.js:

    > node get-one-time-use-token.js

3. This script will print out your one time use token. This token can be used for retrieving the saveCard and makePayment iframes.

# Plugin: Run Transaction
1. Follow the steps in the [Getting Started](#plugin-getting-started) section.
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. To load the example iframe for running a transaction visit:  [localhost:3400/examples/makePayment.html](http://localhost:3400/examples/makePayment.html)
4. The iframe is now embedded in this website and can be used to process a transaction.
5. (Include more information about what's happening and how to run it on their own website.)

# Plugin: Save Card
1. Follow the steps in the [Getting Started](#plugin-getting-started) section.
2. Start the example server:

    > npm run start

    This starts a local server running on port 3400.

3. To load the example iframe for running a transaction visit: [localhost:3400/examples/saveCard.html](http://localhost:3400/examples/saveCard.html)
4. The iframe is now embedded in this website and can be used to save a card and customer information.
5. (Include more information about what's happening and how to run it on their own website.)

# API: Getting Started
## Dependencies
* Node:
 * To install via a package manager: go to the following [link](https://nodejs.org/en/download/package-manager) and follow the instructions corresponding to your system's package manager.
 * To install via an installer: visit the following [link](https://nodejs.org/en/download/) and download your system's installer.

## Obtain JSON Web Token (JWT)
1. Clone or download the example [source](https://bitbucket.org/emvio/payment-service-examples/downloads/) and unzip.
2. Go to location of the source directory:

    > cd emvio-payment-service-examples

3. Install Node modules:

    > npm install

4. Copy example.env and save as .env:

    > cp example.env .env

5. Update the following variables in .env:
    * **USERNAME** (Your [dashboard.transactionplatform.com](https://dashboard.transactionplatform.com) username)
    * **PASSWORD** (Your [dashboard.transactionplatform.com](https://dashboard.transactionplatform.com) password)

    If you have questions about any of these variables please contact us via the [Emvio Support Slack Channel](https://emviosupport.slack.com).

6. Run Get Json Web Token (JWT):

    > node get-jwt.js

    * This script will print your JSON Web Token to the console. This token will be used in the next step to run a transaction.
    * (Note that this token expires after one hour.)

# API: Run Transaction
1. Follow the steps in the [Getting Started](#api-getting-started) section.
2. Update the following variable in .env:
    * **TOKENEX_TOKEN** (add description here)
    * (Do merchants always need to save cards before they can do this step?)
3. Run run-transaction.js

    > node run-transaction.js

# API: Refund/Void
1. Follow the steps in the [Getting Started](#api-getting-started) section.
2. Update the following variables in .env
    * **TOKENEX_TOKEN** (add description here)
    * (Do merchants always need to save cards before they can do this step?)
    * **TRANSACITON_REF_NUMBER** (The reference number of the transaction)
3. Run run-transaction.js
