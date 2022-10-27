import express, { Application } from 'express';
// import { exec } from 'child_process';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import Controller from './utils/interfaces/controllers';
import errorMiddleware from './middlewares/error';


export default class App{
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        // this.initializeDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(){
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(helmet());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(compression());

    }
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    private initializeErrorHandling(){
        this.express.use(errorMiddleware)
    }
    // private async initializeDatabase(): Promise<void> {
    //   await  exec('npx prisma migrate dev --name init', {encoding: 'utf8'})
    // }

    public listen(): void {
        this.express.listen(this.port, () => {
       
            console.log(`App listening on the port ${this.port}`);
        });
    }


}