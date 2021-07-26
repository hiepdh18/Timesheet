import SessionService = require("../services/session/SessionService");
import { BaseRouter } from "./BaseRouter";

/**
 * @description AuthLoginRouter
 */
class SessionRouter extends BaseRouter {
  private _service = SessionService
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get(
      "/GetCurrentLoginInformations",
      this._service.getCurrentLogin
    );
  }
}

export = new SessionRouter().router;
