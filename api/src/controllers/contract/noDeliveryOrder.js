module.exports = ({
    web3,
    app,
    response,
    message
}) => {
    const node = require('./node.js')({
        web3,
        app,
        response,
        message
    })

    console.log(node.ownerContract())

    return {
        getAccounts: (req, res) => {
            getAccountsNode({
                res,
                response,
                message,
                web3
            })
        }
    }
}

async function getAccountsNode({
    res,
    response,
    message,
    web3,
}) {
    try {
        web3.web3.eth.getAccounts((err, accounts) => {
            if (err) {
                res.json(response.fail(err))
            }
            res.json(response.success(accounts, message.MESSAGE_GET))
        })
    } catch (error) {
        res.status(500).send(response.fail(error))
    }
}