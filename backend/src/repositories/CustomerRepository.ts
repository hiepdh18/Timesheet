import { Types } from "mongoose";
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

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    let id = await this.getLastId() + 1;
    let newCustomer = new Customer({
      _id: Types.ObjectId(),
      ...customer,
      id,
    })
    try {
      if (!await this.findByName(customer.name)) {
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
      if (await this.findById(customer.id)) {
        await Customer.updateOne({ id: customer.id }, customer);
        return await this.findById(customer.id);
      }
      return undefined;
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteCustomer(id: number): Promise<boolean> {
    try {
      if (await this.findById(id)) {
        await Customer.deleteOne({ id: id });
        return true;
      }
      return false;
    } catch (error) {
      logger.error(error);
    }
  }

}

export = new CustomerRepository();
