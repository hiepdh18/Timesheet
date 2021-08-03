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
    this.router.get('/Get');
    this.router.get('/GetAll', this._service.getAllProject);
    this.router.post('/Save', this._service.saveProject);
    this.router.post('/Inactive');
    this.router.post('/Active');
    this.router.delete('/Delete');
  }
}

export = new ProjectRouter().router;