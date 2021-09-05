const w3 = require('web3')
const tx = require('ethereumjs-tx')
const fs = require('fs')
const path = require('path')
// file configuration for web3 and tx
module.exports = ({config}) => {
    
    // import compile contracts
    const NoDeliveryOrder = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../build/contracts/NoDeliveryOrder.json'), 'utf8'))
    const NoDeliveryOrderData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../build/data/NoDeliveryOrder.json'), 'utf8'))
    const OrderDelayed = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../build/contracts/OrderDelayed.json'), 'utf8'))
    const OrderDelayedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../build/data/OrderDelayed.json'), 'utf8'))

    // instance of web3 
    const web3 = new w3(config.provider)

    return {
        web3,
        contracts: {
            NoDeliveryOrder: new web3.eth.Contract(NoDeliveryOrder.abi, NoDeliveryOrderData.address),
            OrderDelivery: new web3.eth.Contract(OrderDelayed.abi, OrderDelayedData.address)
        },
    }

}


/*
    To create a new instance of a contract, you need to pass the ABI and address of the contract.
    The ABI is the interface of the contract, and the address is the address of the contract.
    The ABI is a JSON object that describes the contract’s interface.
    The address is the address of the contract on the blockchain.
    To do this you need to use the web3.eth.contract() method.
    The first argument is the ABI, and the second argument is the address.
    In truffle to create a new instance of contract 
*/