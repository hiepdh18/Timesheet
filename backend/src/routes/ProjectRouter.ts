import { BaseRouter } from "./BaseRouter";

class ProjectRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/Get');
    this.router.get('/GetAll');
    this.router.post('/Save');
  }
}

export = new ProjectRouter();