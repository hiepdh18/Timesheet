import { Types } from "mongoose";
import { ITimeSheet } from "../interfaces/TimeSheetInterface";
import { TimeSheet } from "../models";
import { logger } from "../services/logger";
import { BaseRepository } from "./BaseRepository";

/**
 * @description MytimeSheetRepository.
 */
class MytimeSheetRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async getLastId(): Promise<number> {
    try {
      const lastTimeSheet = await TimeSheet.findOne().sort({ id: -1 });
      if (lastTimeSheet) return lastTimeSheet.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<ITimeSheet> {
    try {
      return await TimeSheet.findOne({ id: id });
    } catch (error) {
      logger.error(error)
    }
  }


  public create = async (timeSheet: ITimeSheet): Promise<ITimeSheet> => {
    try {
      let id = await this.getLastId() + 1;
      let newTimeSheet = new TimeSheet({
        _id: Types.ObjectId(),
        ...timeSheet,
        id,
        billable: false
      })
      await newTimeSheet.save();
      return await this.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }

  public gettimesheetsOfUser = async (userId: number, startDate: string, endDate: string): Promise<ITimeSheet[]> => {
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
