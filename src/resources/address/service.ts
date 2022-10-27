import { PrismaClient } from '@prisma/client'  
const prisma = new PrismaClient()

export default class AddressService {
    public static getAllAddress = async () => {
        try {
        const address = await prisma.address.findMany();
        return address;
        } catch (error : any) {
        throw new Error(error.message)
        }
        
    };
    
    public static getAddressById = async (id: number) => {
        try{
        const address = await prisma.address.findUnique({
        where: {
            id,
        },
        });
        if(!address) {
        throw new Error('Address not found')
        }
        return address;
        } catch (error : any) {
        throw new Error(error.message)
        }
    };
    
    public static createAddress = async (AddressData :  any) => {
        try{
            const {customerId} = AddressData;
            const customer = await prisma.customer.findUnique({
                where: {
                    id: Number(customerId),
                },
            });
            if(!customer) {
                throw new Error('Customer not found')
            }

        const newAddress = await prisma.address.create({
        data: {
            ...AddressData,
        },
        });
        return newAddress;
        } catch (error : any) {
        throw new Error(error.message)
        }
    };
    
    public static modifyAddress = async (id: number, AddressData: any) => {
        const address = await prisma.address.findUnique({
            where: {
                id,
            },
            });
            if(!address) {
            throw new Error('Address not found')
            }
        const updateAddress = await prisma.address.update({
        where: {
            id,
        },
        data: {
            ...AddressData,
        },
        });
        return updateAddress;
    };
    
    public static deleteAddress = async (id: number) => {
        const address = await prisma.address.findUnique({
            where: {
                id,
            },
            });
            if(!address) {
            throw new Error('Address not found')
            }
        const deleteAddress = await prisma.address.delete({
        where: {
            id,
        },
        });
        return deleteAddress;
    };
    }