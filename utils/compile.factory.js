const path = require('path');
const fse = require('fs-extra');
const solc = require('solc');
const readlineSync = require("readline-sync");

const compileContract = (compileName) =>{
    const buildPath = path.resolve(__dirname, '../builds');
    fse.removeSync(buildPath);

    const campaignPath = path.resolve(__dirname, '..', 'contracts', `${compileName}.sol`);
    const source = fse.readFileSync(campaignPath, 'utf8');
    console.log('Source code:', source);

    const input = {
        language: 'Solidity',
        sources: {
            [`${contractName}.sol`]: {
                content: source,
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode']
                }
            }
        }
    }
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Ensure the build directory exists
    fse.ensureDirSync(buildPath);

// Write the output to the build directory
    for (let contract in output.contracts[`${compileName}.sol`]) {
        fse.outputJsonSync(
            path.resolve(buildPath, contract + '.json'),
            output.contracts[`${contractName}.sol`][contract]
        );
    }

    console.log('Contracts compiled and output to', buildPath);
}

// Get the contract name from command line arguments
const contractName = readlineSync.question('Enter the contract name (without .sol extension): ');

if (!contractName) {
    console.error('Please provide a contract name as an argument');
    process.exit(1);
}

(async () => {
    await compileContract(contractName);
})();
