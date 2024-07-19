# smart-contract
A little set of smart-contract for get in deep in this blockchain world.

- AuthContract: register user, authenticate, getPublicKey  


## Installing steps 

Add your mnemonic and infura url in `.env` file
- `MNEMONIC="bla bla bla... "`    
- `INFURA_URL=https://sepolia.infura.io/v3/<YOUR_INFURA_KEY>`

Install the dependencies
``` bash 
npm install
```

``` bash
npm run auth
```

## INFO
The smart-contract is deployed to the [Infura](https://app.infura.io/) testnet.
But you can use [Remix](https://remix.ethereum.org/) to auth it to the mainnet.


When you auth the smart-contract, you will get the address of the contract.

You have to install MetaMask and connect it to the testnet.
And after you lunch `npm run auth` you will get the address of the contract.
The result on the terminal will be like this:

``` text 
Attempting to auth from account 0xH9D3c8c8BE6a0a292ae4B448f614C....
Deploying contract...
Contract deployed to 0xD0b8716B1610ecBb979cC5BE975f68d9xxxx2EE
Deployment successful. Contract address: 0xD0b8716B1610ecBb979cC5BE975f68dxxxx2EE
```