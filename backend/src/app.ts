import { Server } from "./server";
import { logger } from './services/logger';
import { mongoConfig } from './services/mongo';
import express from 'express';
import path from 'path';


/**
 * Application class.
 * @description Handle init config and components.
 */

export class Application {
  server: Server;

  init() {
    this.initServer();
    this.connectToDatabase();
  }

  private initServer() {
    this.server = new Server();
  }

  private connectToDatabase() {
    mongoConfig.connect()
  }

  start() {
    ((port = process.env.APP_PORT || 5000) => {
      this.server.app.listen(port, () =>
        logger.info(`> Listening on port ${port}!!`)
      );
      this.server.app.use('/api', this.server.router);
    })();
  }
}
