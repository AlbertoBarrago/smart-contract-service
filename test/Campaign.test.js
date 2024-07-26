const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const Campaign = require('../builds/Campaign.json');
const CampaignFactory = require('../builds/CampaignFactory.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(CampaignFactory.abi)
        .deploy({data: CampaignFactory.evm.bytecode.object})
        .send({ from: accounts[0], gas: '10000000' });

    // 100 wei
    await factory.methods.createCampaign('100').send({
            from: accounts[0],
            gas: '10000000'
        }
    );

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(Campaign.abi, campaignAddress)

    console.log(campaign.address)
})

describe('Campaign',()=> {
    it('Should deploy factory and campaign', async () => {
        assert.ok(factory.options.address)
        assert.ok(campaign.options.address)
    })


    it('Should user can contribute', async () => {
        await campaign.methods.contribute('100').send({
            from: accounts[1],
            value: '200'
        })
        const Contributor = await campaign.methods.approvers(accounts[1]).call()
        assert(Contributor)
    })

    it('should give an error without minimum contribution', async () => {
        try {
            await campaign.methods.contribute('10').send({
                from: accounts[1],
                value: '20'
            })
        } catch (error) {
            assert(error)
        }
    })
})