import Controller from "@/utils/interfaces/controllers";
import {Request, Response, NextFunction, Router} from "express";
import CustomerService from "./service";

export default class CustomerController implements Controller {
  public path = "/customers";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllCustomers);
    this.router.get(`${this.path}/:id`, this.getCustomerById);
    this.router.post(this.path, this.createCustomer);
    this.router.patch(`${this.path}/:id`, this.modifyCustomer);
    this.router.delete(`${this.path}/:id`, this.deleteCustomer);
  }

  private async getAllCustomers  (request: Request, response: Response)  {
    try{
    const Customers = await CustomerService.getAllCustomers();
    response.send(Customers);
  } catch (error : any) {
      return response.status(400).json({status: 'error',message: error.message});
    }
  };

  private  async getCustomerById  (request: Request, response: Response){
    try{
    const id: number = parseInt(request.params.id);

    const Customer = await CustomerService.getCustomerById(id);
    response.send(Customer);
  } catch (error : any) {
    return response.status(400).json({status: 'error',message: error.message});
  }
  };

    private  async createCustomer(request: Request, response: Response)  {
      try{
      const {name,email,phone} = request.body;
      if(!name || !email || !phone){
          throw new Error('Please fill all the fields')
      }
         
      const CustomerData = {name,email,phone};
        const newCustomer : any = await CustomerService.createCustomer(CustomerData);
        // console.log(newCustomer)
     
      // if(newCustomer.status == 'error'){
      //   return response.status(400).json({status: 'error',message: newCustomer.message});
      // }
        response.status(201).json({status: 'success',data: newCustomer});
      } catch (error : any) {
        return response.status(400).json({status: 'error',message: error.message});
      }
    };

  private async modifyCustomer (request: Request, response: Response)  {
    try{
    const id: number = parseInt(request.params.id);
    const {name,email,phone} = request.body;
    const CustomerData = {name,email,phone};
    const updateCustomer = await CustomerService.modifyCustomer(id, CustomerData);
    response.send(updateCustomer);
    } catch (error : any) {
      return response.status(400).json({status: 'error',message: error.message});
    }

  };

  private async deleteCustomer(request: Request, response: Response) {
    try {
    const id: number = parseInt(request.params.id);
    await CustomerService.deleteCustomer(id);
    response.send(200).send({ status: "success", message: "Customer deleted" });
  } catch (error : any) {
      return response.status(400).json({status: 'error',message: error.message});
    }
  };

}