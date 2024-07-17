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

For compiling the smart-contract use, this command
produce ABI and BIN files in the build folder `/output`

``` bash
npm run deploy
npm run compile 
```

## INFO
The smart-contract is deployed to the [Infura](https://app.infura.io/) testnet.
But you can use [Remix](https://remix.ethereum.org/) to deploy it to the mainnet.


When you deploy the smart-contract, you will get the address of the contract.

``` text 
Attempting to deploy from account 0xH9D3c8c8BE6a0a292ae4B448f614C....
Deploying contract...
Contract deployed to 0xD0b8716B1610ecBb979cC5BE975f68d9xxxx2EE
Deployment successful. Contract address: 0xD0b8716B1610ecBb979cC5BE975f68dxxxx2EE
```