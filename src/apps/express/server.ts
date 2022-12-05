import express from 'express';
import { Server as HttpServer } from 'http';
import Router from 'express-promise-router';
import errorHandler from 'errorhandler';
import { registerRoutes } from './routes';
import httpStatus from 'http-status';
import bodyParser from 'body-parser';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: HttpServer;

  constructor(port: string) {
    // Instantiate express
    this.port = port;
    this.express = express();

    // Configure express
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    // Register routes
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);
    registerRoutes(router);

    router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  /**
   * Start the server
   */
  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Server listening on port ${this.port} in ${this.express.get('env')} mode`);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  /**
   * 
   * @returns stop the server
   */
  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(this.httpServer) {
        this.httpServer.close(err => {
          if(err) {
            reject(err);
          }
          resolve();
        });
      }
    });
  }
}