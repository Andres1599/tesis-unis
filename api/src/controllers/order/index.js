const time = require('../../utils/time')
module.exports = ({utilEth,app,response,message, services}) => {
    return {
        create: (req, res) => { createOrder({req, res, response, message, services}) },
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

async function createOrder({req, res, response, message, services}) {
    try {

        const correlative = await services.orderService.getCorrelative()

        const order = {
            orderId: correlative,
            address: 'asdfx123',
            payOrder: false,
            stimedTime: time.getTime(new Date(req.body.stimedTime)),
            userId: req.body.userId,
        }

        const orderCreated = services.orderService.saveOrder(order);

        res.status(200).json(response.success(order,message.MESSAGE_CREATE))

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}