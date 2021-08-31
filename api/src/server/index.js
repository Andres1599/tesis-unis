const helmet = require('helmet')
const cors = require('cors');
const express = require('express');
const compression = require('compression');

module.exports = (config, logger) => {

    const app = express()
    // const dataBase = require('../database')(config);
    const response = require('../utils/messages')(logger);
    app
        .use(helmet())
        .use(compression())
        .use(cors())
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use('/api/', require('../routes')(app, response, config, logger))

    return {
        app,
        start: () => new Promise((resolve) => {
            const http = app.listen(config.port, () => {
                const { port } = http.address()
                logger.info(`API - Port ${port}`)
            })
        }),
        close: () => { app.close() }
    }
}