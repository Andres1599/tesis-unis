const solc = require('solc')
const path = require('path')
const fs = require('fs')

module.exports = ({web3Instance, app, response, message}) => {
    return {
        getAccount: (req, res, next) => { getCurrentAccount({req, res, next, response, web3Instance}) },
        deployDo: (req, res, next) => { deployNewContractDeliveryOrder({req, res, next, response}) },
        deployIC: (req, res, next) => { deployNewContractIssueOrder({req, res, next, response}) },
    }
}

const pathDeliveryContract = path.resolve(__dirname, '../../../../contracts/DeliveryOrder.sol')
const pathOrderIssuePayment = path.resolve(__dirname, '../../../../contracts/OrderIssuePayment.sol')

const deliveryContract = fs.readFileSync(pathDeliveryContract, 'utf8')
const issuePaymentContract = fs.readFileSync(pathOrderIssuePayment, 'utf8')

async function getCurrentAccount({req, res, next, response, web3Instance}) {
    try {
        web3Instance.eth.getCoinbase(function(err, account) {
        
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

async function deployNewContractIssueOrder({req, res, next, response}) {
    try {
        const input = {
            language: 'Solidity',
            sources: {'OrderIssuePayment.sol': {content: issuePaymentContract}},
            settings: {outputSelection: {'*': {'*': ['*']}}}
        };

        const output = JSON.parse(solc.compile(JSON.stringify(input)));

        const interface = output.contracts["OrderIssuePayment.sol"]["OrderIssuePayment"].abi;
        const bytecode = output.contracts['OrderIssuePayment.sol']["OrderIssuePayment"].evm.bytecode.object;

        req.body.bytecode = bytecode;
        req.body.interface = interface;

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json(response.fail(error))
    }
}