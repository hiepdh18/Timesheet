import { BaseRouter } from "./BaseRouter";
import customerService from "../services/CustomerService";
import { authen } from "../middlewares";

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
    this.router.get('/GetAll', this._service.getAll);
    this.router.post('/GetAllPagging', this._service.getAllPagging);
    this.router.post('/Save',authen, this._service.saveCustomer);
    this.router.delete('/Delete', this._service.deleteCustomer);
  }
}

export = new CustomerRouter().router;
