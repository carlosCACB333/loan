import 'dotenv/config';
import express from 'express';
import { consts } from './consts';
import { errorHandler } from './middlewares';
import { conexion } from './models/connection';
import { router } from './routes';

class Server {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.set('port', consts.port);
    conexion();
  }

  private routes(): void {
    this.app.use(router);
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`🚀 Server listening on http://localhost:${this.app.get('port')}`);
    });
  }
}

const server = new Server();
server.start();
