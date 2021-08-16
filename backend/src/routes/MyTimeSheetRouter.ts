import { BaseRouter } from "./BaseRouter";
import myTimeSheetService from "../services/TimeSheetService"
import { authen, author } from "../middlewares";

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
    this.router.post('/Create', authen, author('BasicUser'), this._service.create);
    this.router.put('/Update', authen, author('BasicUser'), this._service.update);
    this.router.get('/GetAllTimeSheetOfUser', authen, author('BasicUser'), this._service.getAllTimeSheetOfUser);
    this.router.get('/GetAll', authen, author('BasicUser'), this._service.getAll);
    this.router.delete('/Delete', authen, author('BasicUser'), this._service.delete);
    this.router.get('/Get', authen, author('BasicUser'), this._service.getOne);
    this.router.post('/SubmitToPending', authen, author('BasicUser'), this._service.submit);
    this.router.post('/SaveAndReset', authen, author('BasicUser'), this._service.saveAndReset);
  }
}

export = new MyTimeSheetRouter().router;
