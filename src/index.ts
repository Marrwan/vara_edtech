import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import CustomerController from './resources/customer/controller';
import AddressController from './resources/address/controller';

validateEnv();
// execSync('ls');
const app = new App(
    [new CustomerController(), new AddressController()],Number(process.env.PORT)
);

app.listen();