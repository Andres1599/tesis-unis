const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = ({app,response,config,logger,utilEth}) => {

    const swaggerSpec = require('../utils/docs')(app)
    const httpLogger = require('../middlewares/log/http_logger')(logger);
    const services = require('../database/')()
    
    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    const orderCtl = require('../controllers/order')({utilEth,app,response,message, services})
    const deliveryOrderCtl = require('../controllers/contract/deliveryOrder.js')({utilEth,app,response,message});
    const orderIssuesPaymentCtl = require('../controllers/contract/orderIssuesPayment')({utilEth,app,response,message,services});
    const servicesCtl = require('../controllers/services')({utilEth,app,response,message});

    routes.post('/order/', servicesCtl.getAccount, servicesCtl.deployDo, orderCtl.create);
    routes.get('/orders/', orderCtl.getOrders);

    routes.get('/state/', deliveryOrderCtl.getStateContract);
    routes.post('/state/delivery/consumer', deliveryOrderCtl.updateStateConsumer);
    routes.post('/state/delivery/supplier', deliveryOrderCtl.updateStateSupplier);

    routes.get('/issues/payment/:id', orderIssuesPaymentCtl.getStateOrderIssuesPayment);
    routes.put('/issues/payment/:id', orderIssuesPaymentCtl.updateState);
    routes.post('/issues/payment/cancel', orderIssuesPaymentCtl.closeOrderIssuesPayment);

    return routes;
};