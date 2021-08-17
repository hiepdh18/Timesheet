import { authen, author, uploadOne } from "../middlewares";
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
    this.router.get("/GetAllManager", authen, author('Admin'),
      this._service.getAllManager
    );
    this.router.get("/GetUserNotPagging", authen, author('Admin'),
      this._service.getUserNotPagging
    );
    this.router.post("/Create", authen, author('Admin'),
      this._service.createUser
    );
    this.router.post("/GetAllPagging", authen, author('Admin'),
      this._service.getAllPagging
    );
    this.router.put("/Update", authen, author('Admin'),
      this._service.update
    );
    this.router.delete("/Delete", authen, author('Admin'),
      this._service.delete
    );
    this.router.get("/GetRoles", authen, author('Admin'),
      this._service.getRoles
    );
    this.router.get("/Get", authen, author('Admin'),
      this._service.getUser
    );
    this.router.post("/ActiveUser", authen, author('Admin'),
      this._service.active
    );
    this.router.post("/DeactiveUser", authen, author('Admin'),
      this._service.deActive
    );
    this.router.post("/UpdateAvatar", authen, author('Admin'), uploadOne,
      this._service.updateAvatar
    );
    this.router.post("/ResetPassword", authen, author('Admin'),
      this._service.resetPassword
    );
  }
}

export = new UserRouter().router;
