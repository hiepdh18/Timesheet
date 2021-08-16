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
    this.router.get('/GetAll', authen, author('ProjectAdmin'), this._service.getAll);
    this.router.post('/ApproveTimesheets', authen, author('ProjectAdmin'), this._service.approve);
    this.router.post('/RejectTimesheets', authen, author('ProjectAdmin'), this._service.reject);
  }
}

export = new TimeSheetRouter().router;
