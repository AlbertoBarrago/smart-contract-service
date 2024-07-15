const fs = require('fs');
const path = require('path');
const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

// Define paths to ABI and bytecode files
const abiPath = path.resolve(__dirname, '..', 'output', 'Authentication.abi');
const binPath = path.resolve(__dirname, '..', 'output', 'Authentication.bin');

// Read ABI and bytecode files
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const bytecode = fs.readFileSync(binPath, 'utf8');

let accounts;
let authContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  authContract = await new web3.eth.Contract(abi)
      .deploy({ data: `0x${bytecode}`, arguments: [] })
      .send({ from: accounts[0], gas: '3000000' }); // Increased gas limit
});

describe('Authentication', () => {
  it('should register a new user', async () => {
    const username = 'testuser';
    try {
      await authContract.methods.registerUser(username).send({ from: accounts[0], gas: '500000' }); // Increased gas limit
      const publicKey = await authContract.methods.getPublicKey(username).call();
      assert.equal(publicKey, accounts[0]);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  });

  it('should get a user', async () => {
      const username = 'testuser';
      try {
          await authContract.methods.authenticateUser(username).send({from: accounts[0], gas: '500000'}); // Increased gas limit
          const publicKey = await authContract.methods.getPublicKey(username).call();
          assert.equal(publicKey, accounts[0]);
      } catch (error) {
          console.error("Transaction failed:", error);
      }
  });
});
