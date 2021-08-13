import { BaseRouter } from "./BaseRouter";
import timekeepingService from "../services/TimekeepingService";

class TimekeepingRouter extends BaseRouter {
  private _service = timekeepingService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/GetMyDetails', this._service.getMyDetails);
  }
}

export = new TimekeepingRouter().router;
