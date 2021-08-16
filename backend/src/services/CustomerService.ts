import { NextFunction, Request, Response } from "express";
import { IService } from "../interfaces";
import { CustomerDTO, GetAllPaggingReqDTO } from "../routes/reqdtos";
import { GetAllCustomerResDTO } from "../routes/resdtos";
import { CreateCustomerResDTO } from "../routes/resdtos";
import { DeleteCustomerResDTO } from "../routes/resdtos";
import { GetCustomerAllPaggingResDTO } from "../routes/resdtos";
import customerRepository from "../repositories/CustomerRepository";
import projectRepo from "../repositories/ProjectRepository";

/**
 * @description CustomerService.
 */
class CustomerService implements IService {
  private _customerRepository = customerRepository;
  private _projectRepo = projectRepo;

  defaultMethod(req: Request, res: Response, next: NextFunction) { };

  // there is no effect of filterItemts
  getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
    let filter: GetAllPaggingReqDTO = req.body;
    let response: GetCustomerAllPaggingResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let total = (await this._customerRepository.findAll()).length;
      let customers = await this._customerRepository.findAllPagging(filter.skipCount, filter.maxResultCount, filter.searchText);
      response = {
        ...response,
        success: true,
        result: {
          totalCount: total,
          items: customers
        }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllCustomerResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let customers = await this._customerRepository.findAll();
      response = {
        ...response,
        success: true,
        result: customers
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  saveCustomer = async (req: Request, res: Response, next: NextFunction) => {
    let customer: CustomerDTO = req.body;
    let response: CreateCustomerResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      // case update customer
      if (customer.id) {
        if (await this._customerRepository.findById(customer.id)) {
          let updatedCustomer = await this._customerRepository.updateCustomer(customer);
          response = {
            ...response,
            success: true,
            result: updatedCustomer
          }
          res.status(200).json(response);
        }
        else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Customer id ${customer.id} does not exist!`,
              details: null,
              validationErrors: null
            }
          }
          res.status(500).json(response);
        }
      }
      // case create new customer
      else {
        if (!await this._customerRepository.findByName(customer.name)) {
          let newCustomer = await this._customerRepository.createCustomer(customer);
          response = {
            ...response,
            success: true,
            result: newCustomer
          }
          res.status(200).json(response);
        }
        else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Customer name ${customer.name} already existed`,
              details: null,
              validationErrors: null
            }
          }
          res.status(500).json(response);
        }
      }

    } catch (error) {
      next(error);
    }
  };

  // there is no constraint with other table
  delete = async (req: Request, res: Response, next: NextFunction) => {
    let id = Number(req.query.Id);
    let response: DeleteCustomerResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      const customer = await this._customerRepository.findById(id);
      const projects = await this._projectRepo.getByCustomerId(id);
      console.log(projects)
      if (customer && projects.length==0) {
        await this._customerRepository.deleteCustomer(id);
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Customer id ${id} does not exist or in project`,
            details: null,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
    } catch (error) {
      next(error)
    }
  };
}

export = new CustomerService();
