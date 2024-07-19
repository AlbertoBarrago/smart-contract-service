const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { abi , evm } = require('../compiles/lottery');

let accounts;
let authContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  authContract = await new web3.eth.Contract(abi)
      .deploy({ data: String(evm.bytecode.object), arguments: [] })
      .send({ from: accounts[0], gas: '3000000' });
});

describe('Lottery', () => {

});
