import UserService from "../services/UserService";
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
    this.router.get("/GetUserNotPagging",
      this._service.getUserNotPagging
    );
    this.router.post("/Create",
      this._service.createUser
    );
    this.router.post("/GetAllPagging",
      this._service.getAllPagging
    );
    this.router.put("/Update",
      this._service.update
    );
    this.router.delete("/Delete",
      this._service.delete
    );
    this.router.get("/GetRoles",
      this._service.getRoles
    );
    this.router.get("/Get",
      this._service.getUser
    );
    this.router.post("/ActiveUser",
      this._service.active
    );
    this.router.post("/DeactiveUser",
      this._service.deActive
    );
    this.router.post("/UpdateAvatar",
      this._service.updateAvatar
    );
    this.router.post("/ResetPassword",
      this._service.resetPassword
    );
  }
}

export = new UserRouter().router;
