import { Types } from "mongoose";
import { ICustomer } from "../interfaces";
import { Customer } from "../models/CustomerModel";
import { logger } from "../services/logger";
import { BaseRepository } from "./BaseRepository";

class CustomerRepository extends BaseRepository<Customer> {
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
      return await Customer.find().select('name id address');
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<ICustomer> {
    try {
      return await Customer.findOne({ id: id }).select('name id address');
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

  public async findByName(name: string): Promise<ICustomer> {
    try {
      return await Customer.findOne({ name }).select('name id address');
    } catch (error) {
      logger.error(error);
    }
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

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    let id = await this.getLastId() + 1;
    let newCustomer = new Customer({
      _id: Types.ObjectId(),
      ...customer,
      id,
    })
    try {
      await newCustomer.save();
      return newCustomer;
    } catch (error) {
      logger.error(error)
    }
  }

  public async updateCustomer(customer: ICustomer): Promise<ICustomer> {
    try {
      await Customer.updateOne({ id: customer.id }, customer);
      return await this.findById(customer.id);
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteCustomer(id: number): Promise<boolean> {
    try {
      await Customer.deleteOne({ id: id });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }

}

export = new CustomerRepository();
