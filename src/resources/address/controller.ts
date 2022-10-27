import Controller from "@/utils/interfaces/controllers";
import {Request, Response, NextFunction, Router} from "express";
import AddressService from "./service";

export default class AddressController implements Controller {
    public path = "/address";
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(this.path, this.getAllAddress);
        this.router.get(`${this.path}/:id`, this.getAddressById);
        this.router.post(this.path, this.createAddress);
        this.router.patch(`${this.path}/:id`, this.modifyAddress);
        this.router.delete(`${this.path}/:id`, this.deleteAddress);
    }
    
    private async getAllAddress  (request: Request, response: Response) {
        try{
        const Address = await AddressService.getAllAddress();
        response.send(Address);
    } catch (error : any) {
        return response.status(400).json({status: 'error',message: error.message});
        }
    };
    
    private async  getAddressById (request: Request, response: Response) {
        try{
        const id: number = parseInt(request.params.id);
    
        const Address = await AddressService.getAddressById(id);
        response.send(Address);
    } catch (error : any) {
        return response.status(400).json({status: 'error',message: error.message});
    }
    };
    
        private  async createAddress (request: Request, response: Response)  {
        try{
        const {customerId, city, province,zip,house} = request.body;
        if(!customerId || !city || !province || !zip || !house){
            throw new Error('Please fill all the fields')
        }

           const AddressData = {customerId, city, province,zip,house};
            const newAddress = await AddressService.createAddress(AddressData);
            response.status(201).json({status: 'success',data: newAddress});
        } catch (error : any) {
            return response.status(400).json({status: 'error',message: error.message});
        }
        };
    
    private async  modifyAddress (request: Request, response: Response)  {
        try{
        const id: number = parseInt(request.params.id);
        const {city, province,zip,house} = request.body;
        const AddressData = {city, province,zip,house};
        const updateAddress = await AddressService.modifyAddress(id, AddressData);
        response.send(updateAddress);
        } catch (error : any) {
            return response.status(400).json({status: 'error',message: error.message});
        }
    };
    
    private async deleteAddress (request: Request, response: Response)  {
        try{
        const id: number = parseInt(request.params.id);
       await AddressService.deleteAddress(id);
        response.status(200).send({ status: 'success', message: 'Address deleted successfully' });
        } catch (error : any) {
            return response.status(400).json({status: 'error',message: error.message});
        }
    };
    }
