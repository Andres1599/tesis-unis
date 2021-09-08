const fs = require('fs');
const path = require('path');

const getOrdersIssues = () => {
    try {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../mock/issues.json'), 'utf8'));
        return data
    } catch (error) {
        return null
    }
}

const getCorrelative = async () => {
    try {
        const data = await getOrdersIssues()
        const correlative = (data.length) + 1
        return correlative
    } catch (error) {
        return 1
    }
}

const saveOrderIssues = async (order) => {
    try {
        const data = await getOrdersIssues()
        data.push(order)
        const saveOrder = await fs.writeFileSync(path.resolve(__dirname,'../mock/issues.json'), JSON.stringify(data))
        return saveOrder
    } catch (error) {
        return false
    }
}

const getOrderById = async (id) => {
    try {
        const data = await getOrdersIssues()
        const order = data.find(order => order.orderId === id)
        return order
    } catch (error) {
        return null
    }
}

module.exports = {
    getOrdersIssues,
    saveOrderIssues,
    getCorrelative,
    getOrderById
}
