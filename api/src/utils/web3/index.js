const w3 = require('web3')
const tx = require('ethereumjs-tx')
const fs = require('fs')
const path = require('path')
// file configuration for web3 and tx
module.exports = ({config}) => {

    const web3Instance = new w3(new w3.providers.HttpProvider(config.url_provider))

    return web3Instance

}