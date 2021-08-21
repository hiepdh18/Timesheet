import { BaseRouter } from "./BaseRouter";
import testRouter from "./TestRouter";
import express from "express";
import cors from "cors";
import serviceRouter from "./ServiceRouter";
import authRouter from "./AuthRouter";

/**
 * @description MasterRouter
 */

class MasterRouter extends BaseRouter {
  constructor() {
    super();
    this.configure();
    this.init();
  }

  private configure() {
    // define onfigurations
    this.router.use(cors());
    this.router.use(express.json()); // to support JSON-encoded bodies
    this.router.use(
      express.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      })
    );
  }

  /**
   * Connect routes to their matching routers.
   */
  protected init() {
    this.router.use("/test", testRouter);
    this.router.use("/services/app", serviceRouter);
    this.router.use("/TokenAuth", authRouter);
  }
}

export = new MasterRouter().router;
