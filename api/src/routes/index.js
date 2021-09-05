const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = ({
    app,
    response,
    config,
    logger,
    web3
}) => {

    const swaggerSpec = require('../utils/docs')(app)
    const httpLogger = require('../middlewares/log/http_logger')(logger);

    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    const noDeliveryOrderController = require('../controllers/contract/noDeliveryOrder.js')({
        web3,
        app,
        response,
        message
    });

    routes.get('/accounts', noDeliveryOrderController.getAccounts);

    return routes;
};