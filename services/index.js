const HDWalletProvider = require("@truffle/hdwallet-provider");
const {Web3} = require("web3");

//Check if mnemonic and infura url are set in.env file
if (!process.env.MNEMONIC || !process.env.INFURA_URL) {
    console.error('Please make sure MNEMONIC and INFURA_URL are set in your .env file');
    process.exit(1);
}
// Create a new HDWalletProvider instance with the mnemonic and infura url
const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_URL
);
const web3 = new Web3(provider);
// Deploy the contract
const deploy = async (contractAddress) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to auth from account', accounts[0]);

        // Get the current nonce and gas price
        const nonce = await web3.eth.getTransactionCount(accounts[0], 'pending');
        const gasPrice = await web3.eth.getGasPrice();
        const adjustedGasPrice = BigInt(gasPrice.toString()) * BigInt(120) / BigInt(100);

        const contract = new web3.eth.Contract(contractAddress.abi);
        const deployTransaction = contract.deploy({data: contractAddress.bytecode, arguments: []});

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

module.exports = {web3, deploy};