require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const {abi, evm} = require('./compile');

console.log('MNEMONIC:', process.env.MNEMONIC);
console.log('INFURA_URL:', process.env.INFURA_URL);

if (!process.env.MNEMONIC || !process.env.INFURA_URL) {
    console.error('Please make sure MNEMONIC and INFURA_URL are set in your .env file');
    process.exit(1);
}

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    const adjustedGasPrice = BigInt(gasPrice) * BigInt(60) / BigInt(100); // 60% of current gas price
    console.log('Attempting to deploy from account', accounts[0]);

    const gasLimit = await new web3.eth.Contract(abi)
        .deploy({data: String(evm.bytecode.object), arguments: []})
        .estimateGas({from: accounts[0]});

    const result = await new web3.eth.Contract(abi)
        .deploy({data: String(evm.bytecode.object), arguments: []})
        .send({from: accounts[0], gas: Math.ceil(gasLimit.toString() * 1.2), gasPrice: adjustedGasPrice.toString()});

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
}

deploy().then((address) => {
    console.log('Deployed to address', address);
}).catch((err) => {
    console.error('Failed to deploy', err);
    process.exit(1);
});

