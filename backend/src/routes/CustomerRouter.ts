import { BaseRouter } from "./BaseRouter";
import customerService from "../services/CustomerService";
import { authen } from "../middlewares";
import { author } from "../middlewares";

class CustomerRouter extends BaseRouter {
  private _service = customerService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/GetAll', authen, author('Admin'), this._service.getAll);
    this.router.post('/GetAllPagging', authen, author('Admin'), this._service.getAllPagging);
    this.router.post('/Save', authen, author('Admin'), this._service.saveCustomer);
    this.router.delete('/Delete', authen, author('Admin'), this._service.deleteCustomer);
  }
}

export = new CustomerRouter().router;
