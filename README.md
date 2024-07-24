# Smart Contract Service
Dive deep into the blockchain world with our clever set of smart contracts.
Whether you're deploying 'UnicornPizza' or 'RocketBanana,'
our platform makes it fun and easy to bring your unique ideas to life.
Get ready to explore, create, and enjoy the limitless possibilities of blockchain technology!

![img.png](img.png) 

### Test Contracts present in the `contracts` folder
- **AuthContract**: register user, authenticate, getPublicKey
- **LotteryContract**: register user, buy lottery ticket, claim lottery ticket


## INFO
The smart contracts are deployed to the [Infura](https://app.infura.io/) testnet. But you can also use [Remix](https://remix.ethereum.org/).

#### Prerequisites
You need to install **MetaMask** and connect it to the testnet for deploying the contracts.

## Installation Steps
Add your mnemonic and infura url in `.env` file, just rename the file `.env_sample` and fill it.

Example:
- `MNEMONIC="bla bla bla... "`    
- `INFURA_URL=https://sepolia.infura.io/v3/<YOUR_INFURA_KEY>`

Install the dependencies
``` bash 
npm install
```

``` bash
npm run deploy
```

Then add the name of target smart-contract, in this repo inside folder `contracts` there are: 
 - Authentication.sol
 - Lottery.sol

What appears on consolle:  
```text
Enter the contract name (without .sol extension): Lottery
```

The result on the terminal will be like this:

``` text 
Attempting to auth from account 0xA9D3cxxxxxxx14C5Ac96f211F2
Deploying contract...
abi [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [ [Object], [Object] ],
    name: 'ManagerSet',
    type: 'event'
  },
  {
    inputs: [],
    name: 'enter',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'players',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  }
]
Deployment successful. Contract address: 0x8Bxxxxxxxx71859dCE01

```
## Gift me a ⭐️
if you like this project, please give me a star.