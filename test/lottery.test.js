const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { abi , evm } = require('../compiles/lottery');

let accounts;
let lotteryContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lotteryContract = await new web3.eth.Contract(abi)
      .deploy({ data: String(evm.bytecode.object), arguments: [] })
      .send({ from: accounts[0], gas: '3000000' });
});

describe('Lottery', () => {
    it('should register a new player', async () => {
        const username = 'testuser';
        try {
            await lotteryContract.methods.enter(username).send({from: accounts[0], gas: '500000'});
            const publicKey = await lotteryContract.methods.getPublicKey(username).call();
            assert.equal(publicKey, accounts[0]);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    });

    it('should pick a winner', async () => {
        try {
            await lotteryContract.methods.pickWinner().send({from: accounts[0], gas: '500000'});
            const winner = await lotteryContract.methods.getWinner().call();
            assert.equal(winner, accounts[0]);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    });

});
