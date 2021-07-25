import { Router } from "express";

export abstract class BaseRouter {
  private _router = Router();

  get router() {
    return this._router;
  }
  protected abstract init();
}
