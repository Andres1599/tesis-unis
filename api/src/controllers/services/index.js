const solc = require('solc')
const path = require('path')
const fs = require('fs')

module.exports = ({utilEth, app, response, message}) => {
    return {
        getAccount: (req, res, next) => { getCurrentAccount({req, res, next, response, utilEth}) },
        deployDo: (req, res, next) => { deployNewContractDeliveryOrder({req, res, next, response}) }
    }
}

const pathDeliveryContract = path.resolve(__dirname, '../../../../contracts/DeliveryOrder.sol')
const deliveryContract = fs.readFileSync(pathDeliveryContract, 'utf8')

async function getCurrentAccount({req, res, next, response, utilEth}) {
    try {
        utilEth.web3.eth.getCoinbase(function(err, account) {
        
            if (err) {
                res.status(500).json(response.fail(err))
            }

            req.body.account = account;

            next()
            
        })
    } catch (error) {
        res.status(500).json(response.fail(error))
    }
}

async function deployNewContractDeliveryOrder({req, res, next, response}) {
    try {
        const input = {
            language: 'Solidity',
            sources: {'DeliveryOrder.sol': {content: deliveryContract}},
            settings: {outputSelection: {'*': {'*': ['*']}}}
        };

        const output = JSON.parse(solc.compile(JSON.stringify(input)));

        const interface = output.contracts["DeliveryOrder.sol"]["DeliveryOrder"].abi;
        const bytecode = output.contracts['DeliveryOrder.sol']["DeliveryOrder"].evm.bytecode.object;

        req.body.bytecode = bytecode;
        req.body.interface = interface;

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json(response.fail(error))
    }
}