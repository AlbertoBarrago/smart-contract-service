const path = require('path');
const fse = require('fs-extra');
const solc = require('solc');
const readlineSync = require("readline-sync");
const fs = require("node:fs");

/**
 * CompileContract
 * @param compileName
 * @return json
 */
const compileContract = (compileName) => {
    const campaignPath = path.resolve(__dirname, '..', 'contracts', `${compileName.toString()}.sol`);
    const source = fse.readFileSync(campaignPath, 'utf8');
    const buildPath = path.resolve(__dirname, '../builds');
    //fse.removeSync(buildPath);


    const input = {
        language: 'Solidity',
        sources: {
            [`${compileName}.sol`]: {
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
            output.contracts[`${compileName}.sol`][contract]
        );
    }

    console.log(`Contracts ${compileName} compiled and output to`, buildPath);
}

// Get all contract present in folder
const getAllContracts = () => {
    const contractPath = path.resolve(__dirname, '..', 'contracts');
    const contractList = fs.readdirSync(contractPath);
    return contractList.map((item) => item.replace('.sol', ''));
}

// Get the contract name from command line arguments
const contractName = readlineSync.question('Enter the contract name (without .sol extension): ');

if (!contractName) {
    console.info('Compiling all contracts...');
    const contractName = getAllContracts();
    let contractLength = contractName.length;
    let index = 0;
    do {
        compileContract(contractName[index]);
        index++;
    } while (index < contractLength);
} else {
    compileContract(contractName)
}


