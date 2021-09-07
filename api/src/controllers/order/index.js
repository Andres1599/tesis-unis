module.exports = ({utilEth,app,response,message, services}) => {
    return {
        create: (req, res) => { createOrder({req, res, response, message, services}) },
        getOrders: (req, res) => { getOrders({req, res, response, message, services}) },
    }
}

async function getOrders({req, res, response, message, services}) {
    try {
        console.log(services)
        const orders = services.orderService.getDataOrders();
        res.status(200).json(response.success(orders,message.MESSAGE_GET))
        
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function createOrder({req, res, response, message, services}) {
    try {

        let order = {}
        
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}