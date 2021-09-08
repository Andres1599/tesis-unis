module.exports = () => {
    const orderService = require('./models/order');
    const issueService = require('./models/issues');
    return {
        orderService,
        issueService
    }
}
