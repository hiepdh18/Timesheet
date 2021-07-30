import { BaseRouter } from "./BaseRouter";
import taskService from "../services/task/TaskService";

class TaskRouter extends BaseRouter {
  private _service = taskService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    // this.router.get('/Get');
    // this.router.get('/GetAll');
    this.router.post('/Save', this._service.saveTask);
  }
}

export = new TaskRouter().router;
