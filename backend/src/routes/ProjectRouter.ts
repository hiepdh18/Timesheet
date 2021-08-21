import { BaseRouter } from "./BaseRouter";
import projectService from "../services/ProjectService";
import { authen, author } from "../middlewares";

class ProjectRouter extends BaseRouter {
  private _service = projectService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/Get', authen, author('Admin'), this._service.get);
    this.router.get('/GetAll', authen, author('Admin'), this._service.getAllProject);
    this.router.post('/Save', authen, author('Admin'), this._service.saveProject);
    this.router.post('/Inactive', authen, author('Admin'), this._service.inactiveProject);
    this.router.post('/Active', authen, author('Admin'), this._service.activeProject);
    this.router.delete('/Delete', authen, author('Admin'), this._service.delete);
    this.router.get('/GetProjectsIncludingTasks', authen, author('BasicUser'), this._service.getProjectsIncludingTasks);
  }
}

export = new ProjectRouter().router;