const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = ({app,response,config,logger,web3Instance}) => {

    const swaggerSpec = require('../utils/docs')(app)
    const httpLogger = require('../middlewares/log/http_logger')(logger);
    const services = require('../database/')()
    
    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    const orderCtl = require('../controllers/order')({web3Instance,app,response,message, services})
    const orderIssuesPaymentCtl = require('../controllers/contract/orderIssuesPayment')({web3Instance,app,response,message,services});
    const servicesCtl = require('../controllers/services')({web3Instance,app,response,message});

    routes.get('/orders/', orderCtl.getOrders);
    routes.post('/order/', servicesCtl.getAccount, servicesCtl.deployDo, orderCtl.create);
    
    routes.get('/order/state/:id', servicesCtl.getAccount, orderCtl.getStateOrder);
    
    routes.put('/order/state/delivery/', servicesCtl.getAccount, orderCtl.updateStateDelivery);
    routes.put('/order/state/recived/', servicesCtl.getAccount, orderCtl.updateStateConsumer);

    routes.get('/issues/payment/:id', servicesCtl.getAccount, orderIssuesPaymentCtl.getStateOrder);
    routes.post('/issues/payment/', servicesCtl.getAccount, servicesCtl.deployIC, orderIssuesPaymentCtl.createIssue);
    routes.put('/issues/payment/review', servicesCtl.getAccount, orderIssuesPaymentCtl.updateReview);
    routes.put('/issues/payment/reverse', servicesCtl.getAccount, orderIssuesPaymentCtl.updateReverse);

    return routes;
};