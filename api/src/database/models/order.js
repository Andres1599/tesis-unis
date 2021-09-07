const fs = require('fs');
const path = require('path');

const getDataOrders = () => {
    try {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../mock/orders.json'), 'utf8'));
        return data
    } catch (error) {
        return null
    }
}

const getCorrelative = async () => {
    try {
        const data = await getDataOrders()
        const correlative = (data.length) + 1
        return correlative
    } catch (error) {
        return 1
    }
}

const saveOrder = async (order) => {
    try {
        const data = await getDataOrders()
        data.push(order)
        const saveOrder = await fs.writeFileSync(path.resolve(__dirname,'../mock/orders.json'), JSON.stringify(data))
        return saveOrder
    } catch (error) {
        return false
    }
}

module.exports = {
    getDataOrders,
    saveOrder,
    getCorrelative
}