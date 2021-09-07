const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = ({app,response,config,logger,utilEth}) => {

    const swaggerSpec = require('../utils/docs')(app)
    const httpLogger = require('../middlewares/log/http_logger')(logger);

    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    const orderCtl = require('../controllers/order')({utilEth,app,response,message})
    const noDeliveryOrderCtl = require('../controllers/contract/noDeliveryOrder.js')({utilEth,app,response,message});

    routes.post('/order/', orderCtl.create);

    routes.get('/accounts', noDeliveryOrderCtl.getAccounts);
    routes.get('/state/', noDeliveryOrderCtl.getStateContract);
    routes.post('/state/delivery/consumer', noDeliveryOrderCtl.updateStateConsumer);
    routes.post('/state/delivery/supplier', noDeliveryOrderCtl.updateStateSupplier);

    return routes;
};