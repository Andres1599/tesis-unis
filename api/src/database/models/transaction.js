
module.exports = ({web3, Tx, txNum, gasAmount, addressContract, methContract, privateKey}) => {
    let rawtx = {
        nonce: web3.web3.utils.toHex(txNum),
        gasPrice: web3.web3.utils.toHex(web3.web3.utils.toWei('10', 'gwei')),
        gasLimit: web3.web3.utils.toHex(gasAmount),
        to: addressContract,
        value: '0x00',
        data: methContract
    }

    const tx = new Tx(rawtx);
    tx.sing(privateKey)

    return tx.serialize().toString('hex');
}