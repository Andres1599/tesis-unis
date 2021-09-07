module.exports = ({utilEth, app, response, message}) => {
    return {
        getAccount: (req, res) => { getCurrentAccount({req, res, response, message, utilEth}) }
    }
}

async function getCurrentAccount({req, res, response, message, utilEth}) {
    try {
        utilEth.web3.eth.getCoinbase(function(err, account) {
            if (err) {
                res.status(500).json(response.fail(err))
            }

            res.status(200).json(response.success(account, message.MESSAGE_GET))
        })
    } catch (error) {
        res.status(500).json(response.fail(error))
    }
}