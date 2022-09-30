import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'API-LOAN',
      version: '1.0.0',
      description: 'loan-api is the backend of the loan application that allows you to manage loans and customers',
      contact: {
        name: 'Carlos Castillo Blas',
        email: 'carloscb8080@gmail.com',
      },
      servers: ['http://localhost:8080'],
    },
  },
  apis: ['./routes/*.ts'],
};
