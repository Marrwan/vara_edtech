import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const customerData= [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    phone: "090762w762"
    
  },
  {
    name: 'Nilu',
    email: 'vara@edtech.io',
    phone: "0817837639"
   
  },
  {
    name: 'Afnaan',
    email: 'myasake@love.io',
    phone: "07054426515"
   
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of customerData) {
    const customer = await prisma.customer.create({
      data: u,
    })
    console.log(`Created customer with id: ${customer.id}`)
    const customerId : number = Number(customer.id)
    await prisma.address.create({
        data: {
            city: "Ibadan",
            province: "Oyo",
            zip: "20224",
            house: "Orogun",
            customerId,


            
    }
    })

  console.log(`Seeding finished.`)
}
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })