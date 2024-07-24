const path = require('path');
const fs = require('fs');
const solc = require('solc');

class ContractCompiler {
    constructor(contractPath) {
        this.contractPath = contractPath;
        this.source = fs.readFileSync(contractPath, 'utf8');
    }

    compileContract() {
        const input = {
            language: 'Solidity',
            sources: {
                [path.basename(this.contractPath)]: {
                    content: this.source
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        };

        const output = JSON.parse(solc.compile(JSON.stringify(input)));
        const contractName = Object.keys(output.contracts[path.basename(this.contractPath)])[0];
        const compiledContract = output.contracts[path.basename(this.contractPath)][contractName];
        return {
            abi: compiledContract.abi,
            bytecode: compiledContract.evm.bytecode.object
        };
    }
}

module.exports = ContractCompiler;