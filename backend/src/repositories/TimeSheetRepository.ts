import { Types } from "mongoose";
import { ITimeSheet } from "../interfaces/TimeSheetInterface";
import { TimeSheet, TimeSheetSchema } from "../models";
import { logger } from "../services/logger";
import { BaseRepository } from "./BaseRepository";

/**
 * @description MytimeSheetRepository.
 */
class MytimeSheetRepository extends BaseRepository<ITimeSheet> {
  constructor() {
    super("TimeSheet", TimeSheetSchema);
  }
  public createTimeSheet = async (timeSheet: ITimeSheet): Promise<ITimeSheet> => {
    try {
      let id = await this.lastId() + 1;
      let newTimeSheet = new TimeSheet({
        _id: Types.ObjectId(),
        ...timeSheet,
        isCharged: false,
        status: 0,
        id
      })
      await newTimeSheet.save();
      return await this.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }
  public approveTimesheet = async (id: number): Promise<ITimeSheet> => {
    try {
      await TimeSheet.updateOne({ id }, { status: 2 })
      return await this.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }
  public rejectTimesheet = async (id: number): Promise<ITimeSheet> => {
    try {
      await TimeSheet.updateOne({ id }, { status: 3 })
      return await this.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }
  public getAllTimesheets = async (startDate: string, endDate: string, status: number): Promise<ITimeSheet[]> => {
    try {
      let timeSheets = await TimeSheet.find({
        status,
        $and: [
          { dateAt: { $gte: startDate } },
          { dateAt: { $lte: endDate } },
        ]  // and operator
      });
      return timeSheets;
    }
    catch (error) {
      console.log(error);
      logger.error(error);
    }
  }
  public getTimesheetsOfUser = async (userId: number, startDate: string, endDate: string): Promise<ITimeSheet[]> => {
    try {
      let timeSheets = await TimeSheet.find({
        userId,
        $and: [
          { dateAt: { $gte: startDate } },
          { dateAt: { $lte: endDate } },
        ]  // and operator
      });
      return timeSheets;
    }
    catch (error) {
      logger.error(error);
    }
  }
}
export = new MytimeSheetRepository();
