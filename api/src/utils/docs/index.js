const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {

    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Development server',
            }
        ],
    };

    const options = {
        swaggerDefinition,
        apis: ['./src/controllers/**/*.js'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    return swaggerSpec
}