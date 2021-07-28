import { BaseRouter } from "./BaseRouter";
import authService from "../services/auth/AuthService";

/**
 * @description AuthRouter.
 */
class AuthRouter extends BaseRouter {
  private _service = authService;
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post("/Authenticate", this._service.authenticate );
  }
}

export = new AuthRouter().router;
