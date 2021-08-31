const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = (app, response, config, logger) => {

    const swaggerSpec = require('../utils/docs')(app)
    const httpLogger = require('../middlewares/log/http_logger')(logger);
    
    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    return routes;
};