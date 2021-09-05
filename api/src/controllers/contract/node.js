module.exports = ({
    web3,
    app,
    response,
    message
}) => {
    return {
        ownerContract: () => {
            getAccountData({
                web3
            })
        }
    }
}

function getAccountData({
    web3
}) {
    return web3.web3.eth.getCoinbase((err, account) => {
        if (err) {
            return err
        } else {
            return account
        }
    })
}