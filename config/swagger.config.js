export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Nextora Studio API',
    version: '1.0.0',
    description: 'Production-Ready Enterprise Backend API for Nextora Digital Studio.',
    contact: {
      name: 'Nextora Support',
      email: 'support@nextora.tech',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local development server',
    },
    {
      url: 'https://api.nextora.tech/api/v1',
      description: 'Production API Gateway',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {},
};
