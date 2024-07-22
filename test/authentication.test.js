const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { abi , evm } = require('../compiles/auth');

let accounts;
let authContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  authContract = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object })
      .send({ from: accounts[0], gas: '3000000' });
});

describe('Authentication', () => {
  it('should register a new user', async () => {
    const username = 'testuser';
    try {
      await authContract.methods.registerUser(username).send({ from: accounts[0], gas: '500000' });
      const username = await authContract.methods.getUser(accounts[0]).call();
      assert.equal(username, 'testuser');
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  });

  it('should authenticate user', async () => {
      const username = 'testuser';
      try {
          await authContract.methods.authenticateUser(username).send({from: accounts[0], gas: '500000'});
          const publicKey = await authContract.methods.getPublicKey(username).call();
          assert.equal(publicKey, accounts[0]);
      } catch (error) {
          console.error("Transaction failed:", error);
      }
  });
});
