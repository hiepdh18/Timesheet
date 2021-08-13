import { Server } from "./server";
import { logger } from './services/logger';
import { mongoService } from './services/mongo';
import express from 'express';
import path from 'path';
import allRoutes from 'express-list-endpoints';
import { handleError, handleNotfound } from "./services/exception";
import morgan from "morgan"

/**
 * Application class.
 * @description Handle init config and components.
 */

export class Application {
  server: Server;

  init() {
    this.initServer();
    this.initDatabase();
  }

  start() {
    ((port = process.env.APP_PORT || 5000) => {
      this.server.app.listen(port, () => {
        logger.info(`> Listening on port ${port}!!`);
      });
      this.server.app.use(morgan('dev'));
      this.server.app.use('/api', this.server.router);
      console.log(allRoutes(this.server.app)); // log out all routes that server serve
      this.server.app.use(handleError);
      this.server.app.use(handleNotfound);
    })();
  }

  private initServer() {
    this.server = new Server();
    this.server.app.use('/avatars', express.static(path.join(__dirname + '/../public/avatars')));
  }


  private initDatabase() {
    mongoService.connect();
  }

}
