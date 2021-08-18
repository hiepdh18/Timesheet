import { ICustomer } from "../interfaces";
import { Customer ,CustomerSchema} from "../models";
import { logger } from "../services/logger";
import { BaseRepository } from "./BaseRepository";
class CustomerRepository extends BaseRepository<ICustomer> {
  constructor() {
    super("Customer", CustomerSchema);
  }
  public async findAllPagging(skip: number, max: number, search: string) {
    try {
      let name = new RegExp(search, 'i');
      let customers = await Customer
        .find({ name })
        .select('name address id')
        .skip(skip)
        .limit(max);
      return customers;
    } catch (error) {
      logger.error(error);
    }
  }
}

export = new CustomerRepository();
