const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = ({
    app,
    response,
    config,
    logger,
    utilEth
}) => {

    const swaggerSpec = require('../utils/docs')(app)
    const httpLogger = require('../middlewares/log/http_logger')(logger);

    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    const noDeliveryOrderCtl = require('../controllers/contract/noDeliveryOrder.js')({utilEth,app,response,message});

    routes.get('/accounts', noDeliveryOrderCtl.getAccounts);
    routes.get('/no/delivery/', noDeliveryOrderCtl.getStateContract);
    routes.post('/no/delivery/consumer', noDeliveryOrderCtl.updateStateConsumer);
    routes.post('/no/delivery/supplier', noDeliveryOrderCtl.updateStateSupplier);

    return routes;
};