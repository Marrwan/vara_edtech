import {Request, Response, NextFunction} from 'express';

class HttpException extends Error {
    status: number;
    message: string;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
  }


export default function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) : void {
    const status = error.status || 500;
    const message =  error.message || error ||'Something went wrong...';
    response.status(status).send({
        status,
        message,
    });
}