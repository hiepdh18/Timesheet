import { BaseRouter } from "./BaseRouter";
import SessionRouter from './SessionRouter';
// import CustomerRouter from './CustomerRouter';
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
    this.router.use('/Session', SessionRouter);
    // this.router.use('/Customer', CustomerRouter);
    // this.router.use('/MyTimesheets', MyTimeSheetRouter);
    // this.router.use('/Project', ProjectRouter);
    this.router.use('/Task', taskRouter);
    this.router.use('/User', userRouter);
  }
}

export = new ServiceRouter().router;
