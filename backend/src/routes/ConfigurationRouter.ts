import { BaseRouter } from "./BaseRouter";
import configurationService from "../services/ConfigurationService";

class ConfigurationRouter extends BaseRouter {
  private _service = configurationService;
  constructor() {
    super();
    this.init();
  }
  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get('/GetWorkingTimeConfigAllBranch', this._service.getWorkingTime);

  }
}

export = new ConfigurationRouter().router;
