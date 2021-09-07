module.exports = ({utilEth,app,response,message}) => {
    return {
        getAccounts: (req, res) => {getAccountsNode({res,response,message,utilEth})},
        getStateContract: (req, res) => {getStateContract({req, res, response, message, utilEth})},
        updateStateSupplier: (req, res) => {updateStateSupplier({req, res, response, message, utilEth})},
        updateStateConsumer: (req, res) => {updateStateConsumer({req, res, response, message, utilEth})}
    }
}

async function getAccountsNode({res,response,message,utilEth}) {
    try {
        utilEth.web3.eth.getAccounts((err, accounts) => {
            if (err) {
                res.json(response.fail(err))
            }
            res.json(response.success(accounts, message.MESSAGE_GET))
        })
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function getStateContract({req, res, response, message, utilEth}) {
    try {

    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function updateStateSupplier({req, res, response, message, utilEth}) {
    try {
        
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}

async function updateStateConsumer({req, res, response, message, utilEth}) {
    try {
        
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}