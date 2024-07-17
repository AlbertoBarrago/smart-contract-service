require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const {abi, evm} = require('./compile');

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
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from account', accounts[0]);

        // Get the current nonce and gas price
        const nonce = await web3.eth.getTransactionCount(accounts[0], 'pending');
        const gasPrice = await web3.eth.getGasPrice();
        const adjustedGasPrice = BigInt(gasPrice.toString()) * BigInt(120) / BigInt(100); // 120% of current gas price

        const contract = new web3.eth.Contract(abi);
        const deployTransaction = contract.deploy({data: String(evm.bytecode.object), arguments: []});

        const gasLimit = await deployTransaction.estimateGas({from: accounts[0]});

        console.log('Deploying contract...');
        const deployReceipt = await deployTransaction.send({
            from: accounts[0],
            gas: Math.ceil(gasLimit.toString() * 1.2), // Add 20% buffer
            gasPrice: adjustedGasPrice.toString(),
            nonce: nonce
        });

        console.log('Contract deployed to', deployReceipt.options.address);
        return deployReceipt.options.address;
    } catch (error) {
        console.error('Deployment failed:', error);
        throw error;
    } finally {
        provider.engine.stop();
    }
};

deploy().then((address) => {
    console.log('Deployment successful. Contract address:', address);
    process.exit(0);
}).catch((err) => {
    console.error('Deployment failed:', err);
    process.exit(1);
});