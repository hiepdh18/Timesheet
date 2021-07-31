import { ICustomer } from "../interfaces";
import { Customer } from "../models/CustomerModel";
import { logger } from "../services/logger";
import { BaseRepository } from "./BaseRepository";

class CustomerRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async getLastId() {
    try {
      const lastCustomer = await Customer.findOne().sort({ id: -1 });
      if (lastCustomer) return await lastCustomer.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<ICustomer[]> {
    try {
      return await Customer.find();

    } catch (error) {
      logger.error(error)
    }
  }

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    try {
      const id = await this.getLastId() + 1;
      const newCustomer = new Customer({
        ...customer,
        id,
      })
      await newCustomer.save();
      return newCustomer;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<ICustomer> {
    try {
      return await Customer.findOne({ id: id });
    } catch (error) {
      logger.error(error);
    }
  }
  public async findByName(name: string): Promise<ICustomer> {
    try {
      return await Customer.findOne({ name });
    } catch (error) {
      logger.error(error);
    }
  }
}

export = new CustomerRepository();