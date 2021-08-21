import { BaseRouter } from "./BaseRouter";
import sessionRouter from './SessionRouter';
import customerRouter from './CustomerRouter';
import myTimeSheetRouter from './MyTimeSheetRouter';
import timeSheetRouter from './TimeSheetRouter';
import projectRouter from './ProjectRouter';
import taskRouter from './TaskRouter';
import userRouter from './UserRouter';
import configurationRouter from './ConfigurationRouter';
import timekeepingRouter from './TimekeepingRouter';
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
    this.router.use('/MyTimesheets', myTimeSheetRouter);
    this.router.use('/Timesheet', timeSheetRouter);
    this.router.use('/Project', projectRouter);
    this.router.use('/Task', taskRouter);
    this.router.use('/User', userRouter);
    this.router.use('/TimeKeeping', timekeepingRouter);
    this.router.use('/Configuration', configurationRouter);
  }
}

export = new ServiceRouter().router;
