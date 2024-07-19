require('dotenv').config();
const {abi, evm} = require('../compiles/auth');
const {deploy} = require("../services");

const contractData = {
    abi,
    bytecode: evm.bytecode.object
}
deploy(contractData).then((address) => {
    console.log('Deployment successful. Contract address:', address);
    process.exit(0);
}).catch((err) => {
    console.error('Deployment failed:', err);
    process.exit(1);
});