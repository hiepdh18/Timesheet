import UserService from "../services/user/UserService";
import { BaseRouter } from "./BaseRouter";

/**
 * @description UserRouter.
 */
class UserRouter extends BaseRouter {
  private _service = UserService

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/GetAllManager",
      this._service.getAllManager
    );
    this.router.get("/getUserNotPagging",
      this._service.getUserNotPagging
    );
    this.router.post("/Create",
      this._service.createUser
    );
    this.router.post("/GetAllPagging",
      this._service.getAllPagging
    );
    this.router.post("/Update",
      this._service.updateUser
    );
    this.router.post("/Delete",
      this._service.deleteUser
    );
  }
}

export = new UserRouter().router;
