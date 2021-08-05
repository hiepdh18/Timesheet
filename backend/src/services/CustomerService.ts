import { NextFunction, Request, Response } from "express";
import { IService } from "../interfaces";
import customerRepository from "../repositories/CustomerRepository";
import { CreateCustomerReqDTO, GetAllPaggingReqDTO } from "../routes/reqdtos";
import { GetAllCustomerResDTO } from "../routes/resdtos/GetAllCustomerResDto";
import { CreateCustomerResDTO } from "../routes/resdtos/CreateCustomerResDto";
import { DeleteCustomerResDTO } from "../routes/resdtos/DeleteCustomerResDto";
import { GetCustomerAllPaggingResDTO } from "../routes/resdtos";
import pick from "../utils/pick";



/**
 * @description CustomerService.
 */
class CustomerService implements IService {
  private _customerRepository = customerRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

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
      let customers = await this._customerRepository.findAllPagging(filter.skipCount, filter.maxResultCount);
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

    let customer: CreateCustomerReqDTO = req.body;
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
        let updatedCustomer = await this._customerRepository.updateCustomer(customer);
        if (updatedCustomer) {
          response = {
            ...response,
            success: true,
            result: updatedCustomer
          }
          res.status(200).json(response);
        } else {
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
        let newCustomer = await this._customerRepository.createCustomer(customer);
        // create new customer all done
        if (newCustomer) {
          response = {
            ...response,
            success: true,
            result: newCustomer
          }
          res.status(200).json(response);
        }
        // customer already existed
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

  deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    let id = Number(req.query.Id);
    let response: DeleteCustomerResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    let check = await this._customerRepository.deleteCustomer(id);
    if (check) {
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
          message: `Customer id ${id} does not exist`,
          details: null,
          validationErrors: null
        }
      }
      res.status(500).json(response);
    }
  };
}

export = new CustomerService();
