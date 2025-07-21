import { Request } from 'express';

interface IDecode {
    address: string,
    role: string,
    iat: number,
    exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: IDecode;
    }
  }
}