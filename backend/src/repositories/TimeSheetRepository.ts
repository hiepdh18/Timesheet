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

  public createTimeSheet = async (timeSheet: ITimeSheet): Promise<ITimeSheet> => {
    try {
      let id = await this.getLastId() + 1;
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

  public updateTimeSheet = async (timeSheet: ITimeSheet): Promise<ITimeSheet> => {
    try {
      await TimeSheet.updateOne({ id: timeSheet.id }, timeSheet)
      return await this.findById(timeSheet.id);
    } catch (error) {
      logger.error(error);
    }
  }

  public deleteTimeSheet = async (id: number) => {
    try {
      await TimeSheet.deleteOne({ id })
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
