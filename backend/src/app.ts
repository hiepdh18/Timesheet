import { Server } from "./server";
import { logger } from './services/logger';
import { mongoService } from './services/mongo';
import express from 'express';
import path from 'path';
import allRoutes from 'express-list-endpoints';
import { Level } from "./models";
import { Types } from "mongoose";

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
      this.server.app.use('/api', this.server.router);
      console.log(allRoutes(this.server.app)); // log out all routes that server serve
    })();
  }

  private initServer() {
    this.server = new Server();
    this.server.app.use('/avatars', express.static(path.join(__dirname + '/../public/avatars')));
    this.createLevel();

  }

  private createLevel = async () => {
    const level = new Level({
      _id :Types.ObjectId(),
      name :'intern'
    });
    await level.save();
    console.log(level)
  }

  private initDatabase() {
    mongoService.connect();
  }

}
