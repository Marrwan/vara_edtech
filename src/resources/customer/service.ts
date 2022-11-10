import { PrismaClient, Prisma } from '@prisma/client'  
const prisma = new PrismaClient()

export default class CustomerService {
  public static getAllCustomers = async () => {
    try {
      const customers = await prisma.customer.findMany( {include : {address : true}});
      
    return customers;
    } catch (error : any) {
      throw new Error(error.message)
    }
    
  };

  public static getCustomerById = async (id: number) => {
    try{
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include : {address : true}
    });
    if(!customer) {
      throw new Error('Customer not found')
    }
    return customer;
    } catch (error : any) {
      throw new Error(error.message)
    }
  };

  public static createCustomer = async (CustomerData :  any) => {
    try{
      const {email,phone} = CustomerData;

      const customer  = await prisma.customer.findUnique({
          where: {
            identifier :{
              email : email,
              phone : phone
            }
          
          }   
      });
      if(customer) {
        throw new Error('Customer already exists')
      }

    const newCustomer = await prisma.customer.create({
      data: {
        ...CustomerData,
      },
    });
    return newCustomer;
    } catch (error : any) {
      throw new Error(error.message)
    }
  };

  public static modifyCustomer = async (id: number, CustomerData: any) => {
    const updateCustomer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...CustomerData,
      },
    });
    return updateCustomer;
  };

  public static deleteCustomer = async (id: number) => {
    const customer  = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    if(!customer) {
      throw new Error('Customer not found')
    }
    
  // Delete a customer by its id and its related address
    const deleteCustomer = await prisma.customer.delete({
      where: {
        id,
      },
      include : {address : true}
    });
    return deleteCustomer;
    
    
  };
}

