# smart-contract
A little set of smart-contract for get in deep in this chain world.

- 01 - SetMessage, message 
## Installing steps 

Add your mnemonic and infura url in `.env` file
- `MNEMONIC="bla bla bla... "`    
- `INFURA_URL=https://sepolia.infura.io/v3/<YOUR_INFURA_KEY>`
- `INFURA_API_KEY=<YOUR_API_KEY>`

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
The smart-contract is deployed to the Rinkeby testnet.
But you can use Remix to deploy it to the mainnet.

Notes: [Remix](https://remix.ethereum.org/)