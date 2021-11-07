const time = require('../../utils/time')
const TxEth = require('ethereumjs-tx').Transaction;
module.exports = ({web3Instance,app,response,message, services}) => {

    return {
        create: (req, res) => { createOrder({req, res, response, message, services, web3Instance}) },
        getOrders: (req, res) => { getOrders({req, res, response, message, services}) },
        getStateOrder: (req, res) => { getStateOrder({req, res, response, message, services, web3Instance}) },
        updateStateDelivery: (req, res) => { updateStateDelivery({req, res, response, message, services, web3Instance}) },
        updateStateConsumer: (req, res) => { updateStateConsumer({req, res, response, message, services, web3Instance}) },
    }
}

async function getOrders({req, res, response, message, services}) {
    try {
        const orders = services.orderService.getDataOrders();
        res.status(200).json(response.success(orders,message.MESSAGE_GET))
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function createOrder({req, res, response, message, services, web3Instance}) {
    try {

        const correlative = await services.orderService.getCorrelative()
        const { account, bytecode, interface, stimedTime, userId  } = req.body;
        const limitTime = new Date(new Date(stimedTime).getTime() + 30*60*1000);

        const result = await new web3Instance.eth.Contract(interface)
            .deploy({ 
                data: bytecode,
                arguments: [userId, correlative, time.getTime(new Date(stimedTime)), time.getTime(limitTime)]
            })
            .send({ 
                from: account,
                gas: '3000000',
                gasPrice: '20000000000',
            });

        const order = {
            orderId: correlative,
            address: result.options.address,
            interface: interface,
            payOrder: false,
            stimedTime: time.getTime(new Date(stimedTime)),
            limitTime: time.getTime(limitTime),
            userId: userId,
        }
      
        const orderCreated = services.orderService.saveOrder(order);

        res.status(200).json(response.success(order,message.MESSAGE_CREATED))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function getStateOrder({req, res, response, message, services, web3Instance}) {
    try {
        const orderId = (req.params.id*1);
        const {account} = req.body;
        const order = await services.orderService.getOrderById(orderId);

        const instanceContract = await new web3Instance.eth.Contract(order.interface, order.address);

        instanceContract.methods.getOrderState(order.orderId).call({from: account}, function(error, result){
            
            if (error) {
                res.status(500).send(response.fail(error))
            }
            
            res.status(200).json(response.success({
                orderId: result[0],
                wasDelivery: result[1],
                wasReceived: result[2],
                payOrder: result[3],
                stimedTime: new Date(result[4]),
                state: result[5], 
                userId: result[6],
            },message.MESSAGE_GET))
            
        });

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function updateStateDelivery({req, res, response, message, services, web3Instance}){
    try {
        const { account, orderId } = req.body;
        const orderIdNumber = (orderId*1);
        const currentTime = time.getTime(new Date());
        // obtain information about the order to make a transaction on the current contract
        const order = await services.orderService.getOrderById(orderIdNumber);
        // create the instance of the contract
        const instanceContract = await new web3Instance.eth.Contract(order.interface, order.address);
        // invoke the method to update the state of the order
        instanceContract.methods
            .updateDelivery(order.orderId, currentTime)
            .send({from: account})
            .then(transactionHash => {
                res.status(200).json(response.success(transactionHash,message.MESSAGE_UPDATE))
            })
            .catch(error => res.status(500).send(response.fail(error)))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function updateStateConsumer({req, res, response, message, services, web3Instance}) {
    try {
        const { account, orderId } = req.body;
        const orderIdNumber = (orderId*1);
        const currentTime = time.getTime(new Date());
        // obtain information about the order to make a transaction on the current contract
        const order = await services.orderService.getOrderById(orderIdNumber);
        // create the instance of the contract
        const instanceContract = await new web3Instance.eth.Contract(order.interface, order.address);
        // invoke the method to update the state of the order
        instanceContract.methods
            .updateRecived(order.orderId, currentTime)
            .send({from: account})
            .then(transactionHash => {
                res.status(200).json(response.success(transactionHash,message.MESSAGE_UPDATE))
            })
            .catch(error => res.status(500).send(response.fail(error)))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}