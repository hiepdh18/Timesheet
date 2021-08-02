import { BaseRouter } from "./BaseRouter";
import sessionRouter from './SessionRouter';
import customerRouter from './CustomerRouter';
// import MyTimeSheetRouter from './MyTimeSheetRouter';
// import ProjectRouter from './ProjectRouter';
import taskRouter from './TaskRouter';
import userRouter from './UserRouter';
/**
 * @description ServiceRouter
 */
class ServiceRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.use('/Session', sessionRouter);
    this.router.use('/Customer', customerRouter);
    // this.router.use('/MyTimesheets', MyTimeSheetRouter);
    // this.router.use('/Project', ProjectRouter);
    this.router.use('/Task', taskRouter);
    this.router.use('/User', userRouter);
  }
}

export = new ServiceRouter().router;
