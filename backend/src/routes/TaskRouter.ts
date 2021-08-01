import { BaseRouter } from "./BaseRouter";
import taskService from "../services/TaskService";

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
    this.router.get('/GetAll', this._service.getAllTask);
    this.router.post('/Save', this._service.saveTask);
    this.router.delete('/Archive', this._service.archiveTask);
    this.router.post('/DeArchive', this._service.deArchiveTask);
    this.router.delete('/Delete', this._service.deleteTask);
  }
}

export = new TaskRouter().router;
