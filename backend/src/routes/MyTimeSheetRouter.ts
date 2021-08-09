import { BaseRouter } from "./BaseRouter";
import myTimeSheetService from "../services/MyTimeSheetService"

class MyTimeSheetRouter extends BaseRouter {
  private _service  = myTimeSheetService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post('/Create', this._service.createMyTimeSheet);
    this.router.put('/Update');
    this.router.get('/Get');
    this.router.post('/SaveList');
    this.router.post('/SubmitToPending');
    this.router.delete('/Delete');
    this.router.get('/GetTimesheetStatisticMembers');
    this.router.get('/GetTimesheetStatisticTasks');
    this.router.get('/GetTimesheetStatisticProjects');
    this.router.get('/GetTimesheetStatisticClients');
  }
}

export = new MyTimeSheetRouter().router;
