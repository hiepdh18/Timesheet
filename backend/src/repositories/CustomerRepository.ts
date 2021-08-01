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
      if (lastCustomer) return lastCustomer.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<ICustomer[]> {
    try {
      return await Customer.find().select('name address id');
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAllPagging(skip: number, max: number) {
    try {
      let customers = await Customer
        .find()
        .select('name address id')
        .skip(skip)
        .limit(max);
      return customers;
    } catch (error) {
      logger.error(error);
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

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    try {
      const id = await this.getLastId() + 1;
      const newCustomer = new Customer({
        ...customer,
        id,
      })
      let customerFound = this.findByName(customer.name);
      if (!customerFound) {
        await newCustomer.save();
        return newCustomer;
      }
      return undefined;
    } catch (error) {
      logger.error(error)
    }
  }

  public async updateCustomer(customer: ICustomer): Promise<ICustomer> {
    try {
      let customerFound = this.findById(customer.id);
      if (customerFound) {
        await Customer.updateOne({ id: customer.id }, customer);
        return await this.findById(customer.id);
      }
      return undefined;
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteCustomer(id: number): Promise<boolean> {
    let customer = this.findById(id);
    if (customer) {
      Customer.deleteOne({ id: id });
      return true;
    }
    return false;
  }
}

export = new CustomerRepository();
