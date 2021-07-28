import { BaseRouter } from "./BaseRouter";

class CustomerRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/GetAll');
    this.router.post('/GetAllPagging');
    this.router.post('/Save');
    this.router.delete('/Delete');
  }
}

export = new CustomerRouter();
