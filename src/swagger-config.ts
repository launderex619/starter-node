import swaggerDocjs from 'swagger-jsdoc';
import * as path from 'path';

const app: swaggerDocjs.OAS3Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Initial project app',
      version: '1.0.0',
      description: 'Test app',
      license: {
        name: 'test',
        url: 'https://github.com/launderex619/starter-node',
      },
    },
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
  },
  apis: [
    `${path.resolve(process.cwd(), 'src/database/**/**.ts')}`,
    `${path.resolve(process.cwd(), 'src/routes/**/**.ts')}`,
  ],
};

export default app;
