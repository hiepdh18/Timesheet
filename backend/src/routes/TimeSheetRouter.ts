import { BaseRouter } from "./BaseRouter";
import timeSheetService from "../services/TimeSheetService"

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
    this.router.get('/GetAll', this._service.getAll);
    this.router.post('/ApproveTimesheets', this._service.approve);
    this.router.post('/RejectTimesheets', this._service.reject);
  }
}

export = new TimeSheetRouter().router;
