import swaggerJsdoc from 'swagger-jsdoc'

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Documentation',
      description: 'This is a api Documentation for my application.',
      version: '1.0.0',
      contact: {
        email: 'hasib.webdev@gmail.com'
      },
      liscence: {
        name: 'Apache 2.0',
        url: 'http://apache.org/'
      }
    },
    servers: [
      { url: 'http://localhost:8000', description: 'local server' },
      { url: 'http://example.com', description: 'Production server' },
    ],

  },
  apis: ['src/apidocs/*.yaml'], // files containing annotations as above
}

const swaggerSpecs = swaggerJsdoc(options)

export { swaggerSpecs }