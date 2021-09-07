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

const saveOrder = async (order) => {
    try {
        const data = await getDataOrders()
        data.push(order)
        const saveOrder = await fs.writeFile(path.join(__dirname, '../mock/orders.json'), JSON.stringify(data), 'utf8')
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    getDataOrders,
    saveOrder
}