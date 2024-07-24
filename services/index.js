require('dotenv').config();
const path = require('path');
const readlineSync = require('readline-sync');
const ContractCompiler = require('../utils/compile');
const {deploy} = require("../utils/deploy");

// Prompt for the contract name
const contractName = readlineSync.question('Enter the contract name (without .sol extension): ');

// Construct the contract path
const contractPath = path.resolve(__dirname, '..', 'contracts', `${contractName}.sol`);

// Compile the contract
const compiler = new ContractCompiler(contractPath);
const { abi, bytecode } = compiler.compileContract();


const contractData = {
    abi,
    bytecode: bytecode
}
/**
 * Deploy Smart Contract
 * @param {contractData} - Contract to deploy
 */
deploy(contractData).then((address) => {
    console.log('Abi code:', abi)
    console.log('Deployment successful. Contract address:', address);
    process.exit(0);
}).catch((err) => {
    console.error('Deployment failed:', err);
    process.exit(1);
});