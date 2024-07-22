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
      .deploy({ data: evm.bytecode.object})
      .send({ from: accounts[0], gas: '30000000' });
});

describe('Lottery', () => {

    it('should deploy a contract', async () => {
        const address = lotteryContract.options.address;
        assert.ok(address);
    });

    it('should register a new player', async () => {

        await lotteryContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether'),
        });
        const players = await lotteryContract.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(players.length, 1);
        assert.equal(players[0], accounts[0]);
    });

});
