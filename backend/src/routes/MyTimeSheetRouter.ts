import { BaseRouter } from "./BaseRouter";
import myTimeSheetService from "../services/TimeSheetService"

class MyTimeSheetRouter extends BaseRouter {
  private _service = myTimeSheetService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.post('/Create', this._service.create);
    this.router.put('/Update', this._service.update);
    this.router.get('/GetAllTimeSheetOfUser', this._service.getAllTimeSheetOfUser);
    this.router.delete('/Delete', this._service.delete);
    this.router.get('/Get', this._service.getOne);
    this.router.post('/SaveList');
    this.router.post('/SubmitToPending');
    this.router.get('/GetTimesheetStatisticMembers');
    this.router.get('/GetTimesheetStatisticTasks');
    this.router.get('/GetTimesheetStatisticProjects');
    this.router.get('/GetTimesheetStatisticClients');
  }
}

export = new MyTimeSheetRouter().router;
