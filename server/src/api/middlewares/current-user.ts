import { Request, Response, NextFunction} from 'express';

import jwt from 'jsonwebtoken';

interface UserPayload {
    id:string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}
export const currentUser = (req:Request, res:Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        return next();
    }
    try {
        const token = authHeader.split(' ')[1];
        const payload = <UserPayload>jwt.verify(token, process.env.JWT_KEY!) 
        req.currentUser = payload
    } catch (error) {
        
    }
    next();
}