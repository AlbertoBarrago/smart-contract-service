const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const Lottery = require('../builds/Lottery.json');

let accounts;
let lotteryContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lotteryContract = await new web3.eth.Contract(Lottery.abi)
      .deploy({ data: Lottery.evm.bytecode.object})
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

    it('should register a group of players', async () => {

        await lotteryContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether'),
        });
        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether'),
        });
        await lotteryContract.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether'),
        });
        const players = await lotteryContract.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(players.length, 3);
        assert.equal(players[0], accounts[0]);
        assert.equal(players[1], accounts[1]);
        assert.equal(players[2], accounts[2]);
    });


    it('should not register a player with less than 0.02 ether', async () => {
        try {
            await lotteryContract.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.01', 'ether'),
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('only manager can call pickWinner', async () => {
        try {
            await lotteryContract.methods.pickWinner().send({
                from: accounts[1],
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('should send money to the winner and reset the players', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether'),
        });
        const balance = await web3.eth.getBalance(accounts[0]);
        await lotteryContract.methods.pickWinner().send({from: accounts[0]})
        const newBalance = await web3.eth.getBalance(accounts[0]);
        const difference = newBalance - balance;
        assert(difference > web3.utils.toWei('1.8', 'ether'));


        const players = await lotteryContract.methods.getPlayers().call({
            from: accounts[0],
        });
        assert.equal(players.length, 0);
    });

});
