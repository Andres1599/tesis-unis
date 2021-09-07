module.exports = ({utilEth,app,response,message}) => {
    return {
        create: (req, res) => { createOrder({req, res, response, message}) }
    }
}

async function createOrder({req, res, response, message, orderService}) {
    try {
        
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}