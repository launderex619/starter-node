/// <reference types="vite/client" />

import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocjs from 'swagger-jsdoc';
import swaggerConfig from './swagger-config';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import AppError from './utils/app-error';
import GlobalErrorHandler from './controllers/errors/global-error-handler.controller';

class Server {
  private app: Application;
  private port: string;
  // private dbConnection: Database; -- In case you require a database configuration
  private swaggerDoc: swaggerDocjs.OAS3Options;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '5000';
    // this.dbConnection = Database;
    this.swaggerDoc = swaggerConfig; // specification: https://swagger.io/specification/#info-object
    this.initialize();
  }

  private initialize() {
    console.log('----------------');
    console.log('----TEST APP----');
    console.log('----------------');
    console.log('Boot: enabling events...');
    this.handleEvents();
    console.log('Boot: adding middlewares...');
    this.startMiddlewares();
    console.log('Boot: creating routes...');
    this.createRoutes();
    console.log('Boot: handling errors...');
    this.handleErrors();
  }

  private handleEvents() {
    process.on('uncaughtException', (err) => {
      console.error('uncaughtException', err.name, err.message, err);
      process.exit(1);
    });
    process.on('unhandledRejection', (err) => {
      console.error('unhandledRejection', err);
      process.exit(1);
    });
  }

  private startMiddlewares() {
    if (process.env.NODE_ENV === 'PROD') {
      this.app.use(morgan('common'));
    } else {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors()); // in case of not knowing your origin remove params in cors()
    this.app.use(
      express.urlencoded({
        extended: true,
        limit: 8 * 1024, // 1kb
      })
    );
    this.app.use(helmet()); // security http, this already includes kind of protections against xss

    this.app.use((req, res, next) => {
      // @ts-ignore
      console.log(new Date().toISOString());
      next();
    });
  }

  private handleErrors() {
    const globalErrorHandler = new GlobalErrorHandler();
    this.app.use(globalErrorHandler.handleErrors);
  }

  private createRoutes() {
    // unprotected routes
    this.app.use('/api/v1/status', (req, res) => {
      res.status(200).json({
        status: 'running',
        message: 'Server is running',
      });
    });

    this.app.use(
      '/api/v1/swagger',
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocjs(this.swaggerDoc))
    );

    //custom routes goes here

    this.app.all('**', (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
  }

  public async run(): Promise<void> {
    try {
      // await this.startDBConnection(); // enables DB connection
      this.app.listen(this.port, () => {
        console.log('App running on port ', this.port, '\n');
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

export default Server;
