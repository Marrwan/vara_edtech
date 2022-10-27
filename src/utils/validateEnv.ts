import {cleanEnv,str,port} from 'envalid';

export default function validateEnv(): void{
  cleanEnv(process.env, {
    NODE_ENV : str({
        choices: ['development', 'production', 'test'],
    }),
    DATABASE_URL: str(),
    PORT: port({default: 5000})
  });
}
