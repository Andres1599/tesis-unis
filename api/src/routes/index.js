const routes = require('express').Router();
const message = require('../utils/messages/es');

module.exports = (app, response, config, logger) => {

    const swaggerSpec = require('../utils/swagger')(app)
    const httpLogger = require('../middlewares/logging/http_logger')(logger);
    
    if (config.env !== 'test') {
        routes.use(httpLogger)
    }

    return routes;
};