const time = require('../../utils/time')
module.exports = ({utilEth,app,response,message, services}) => {
    return {
        create: (req, res) => { createOrder({req, res, response, message, services, utilEth}) },
        getOrders: (req, res) => { getOrders({req, res, response, message, services}) },
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

async function createOrder({req, res, response, message, services, utilEth}) {
    try {

        const correlative = await services.orderService.getCorrelative()
        const { account, bytecode, interface, stimedTime, userId  } = req.body;

        const result = await new utilEth.web3.eth.Contract(interface)
            .deploy({ 
                data: bytecode,
                arguments: [userId, correlative, time.getTime(new Date(stimedTime))]
            })
            .send({ gas: "1000000", from: account});

        const order = {
            orderId: correlative,
            address: result.options.address,
            payOrder: false,
            stimedTime: time.getTime(new Date(stimedTime)),
            userId: userId,
        }

        const orderCreated = services.orderService.saveOrder(order);

        res.status(200).json(response.success(order,message.MESSAGE_CREATE))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}