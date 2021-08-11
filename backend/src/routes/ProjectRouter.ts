import { BaseRouter } from "./BaseRouter";
import projectService from "../services/ProjectService";

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
    this.router.get('/Get', this._service.get);
    this.router.get('/GetAll', this._service.getAllProject);
    this.router.post('/Save', this._service.saveProject);
    this.router.post('/Inactive', this._service.inactiveProject);
    this.router.post('/Active', this._service.activeProject);
    this.router.delete('/Delete', this._service.deleteProject);
    this.router.get('/GetProjectsIncludingTasks', this._service.getProjectsIncludingTasks);
  }
}

export = new ProjectRouter().router;