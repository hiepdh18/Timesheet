import { Model } from 'mongoose';
import { IBase } from '../interfaces';
import { logger } from '../services/logger';
// import { Document } from 'mongoose';

/**
 * @description BaseService.
 */

export class BaseRepository<T>{
  defaultMethod() {
    return {
      text: `You've reached the ${this.constructor.name} default method`,
    };
  }
  public async getLastId() {
    try {
       
      const lastItem = await .findOne().sort({ id: -1 });
      // if (lastCustomer) return lastCustomer.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

}
