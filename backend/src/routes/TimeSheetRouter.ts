import { BaseRouter } from "./BaseRouter";
import timeSheetService from "../services/TimeSheetService"
import { authen, author } from "../middlewares";

class TimeSheetRouter extends BaseRouter {
  private _service = timeSheetService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/GetAll', authen, author('Admin'), this._service.getAll);
    this.router.post('/ApproveTimesheets', authen, author('Admin'), this._service.approve);
    this.router.post('/RejectTimesheets', authen, author('Admin'), this._service.reject);
  }
}

export = new TimeSheetRouter().router;
